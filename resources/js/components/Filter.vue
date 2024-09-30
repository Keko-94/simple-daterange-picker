<template>
  <FilterContainer>
    <span>{{ filter.name }}</span>
    <template #filter>
      <div class="relative">
        <input type="text" class="hidden">
        <input
            :id="id"
            class="w-full form-control form-control-sm form-input form-input-bordered bg-gray-100 text-sm px-3"
            :class="{ 'text-transparent': (value == null) }"
            type="text"
            :dusk="`${filter.name}-daterange-filter`"
            name="daterangefilter"
            autocomplete="off"
            :value="value"
            :placeholder="placeholder"
            @keydown="handleInput($event)"
            @paste.prevent
        />
        <div
          v-if="value"
          class="absolute top-0 right-0 mt-1 mr-1">
          <button class="bg-transparent"
                  @click="clearFilter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </template>
  </FilterContainer>
</template>

<script>
import debounce from 'lodash/debounce'

export default {

  emits: ['change'],

  props: {
    resourceName: {
      type: String,
      required: true,
    },
    filterKey: {
      type: String,
      required: true,
    },
    lens: String,
  },

  data: () => ({
    id: null,
    value: null,
    startDate: null,
    endDate: null,
    currentStartDate: null,
    currentEndDate: null,
    debouncedHandleChange: null,
    currentRanges: null,
    maxDate: null,
    minDate: null,

    format: null,
    trans: function (key) {
        return Nova.config('translations')[key];
    }
  }),

  created() {
    this.debouncedHandleChange = debounce(() => this.handleChange(), 500)
    this.setCurrentFilterValue()
    this.setOptions()
    this.parseDates()
  },

  mounted() {
    this.id = 'dateRangeCalendar_' + this.generateId()

    Nova.$on('filter-reset', this.unsetCurrentFilterValue)

    setTimeout(() => {
      this.initDateRange()
    }, 1);
  },

  beforeUnmount() {
    Nova.$off('filter-reset', this.unsetCurrentFilterValue)
  },

  watch: {
    value() {
      this.debouncedHandleChange()
    },
  },

  methods: {
    setOptions() {
      var customRanges = JSON.parse(this.filter.options.find(opt => opt.label === 'customRanges').value);

      Object.keys(customRanges).forEach(function (key) {
        var datesArray = customRanges[key];
        var momentsArray = datesArray.map(function (dateString) {
          return moment(dateString);
        });
        customRanges[key] = momentsArray;
      });

      this.customRanges = customRanges;

      this.maxDate = this.filter.options.find(opt => opt.label === 'maxDate').value ?
          moment(this.filter.options.find(opt => opt.label === 'maxDate').value) :
          false;

      this.minDate = this.filter.options.find(opt => opt.label === 'minDate').value ?
          moment(this.filter.options.find(opt => opt.label === 'minDate').value) :
          false;

      this.format = this.filter.options.find(opt => opt.label === 'format').value
    },
    setCurrentFilterValue() {
      this.value = this.filter.currentValue === '' ? null : this.filter.currentValue;
    },
    unsetCurrentFilterValue() {
      this.value = null
    },
    handleChange() {
      if (this.value) {
        this.$store.commit(`${this.resourceName}/updateFilterState`, {
          filterClass: this.filterKey,
          value: (this.currentStartDate && this.currentEndDate) ? (this.currentStartDate.format(this.format) + ' ' + this.trans('to') + ' ' + this.currentEndDate.format(this.format)) : '',
        })

        this.$emit('change')
      }
    },
    handleInput(e) {
      return e.preventDefault();
    },
    initDateRange: function () {
      const idSelector = ('#' + this.id)
      const ref = this

      $(idSelector).daterangepicker({
        autoUpdateInput: false,
        startDate: ref.startDate,
        endDate: ref.endDate,
        maxDate: ref.maxDate,
        minDate: ref.minDate,
        ranges: ref.customRanges,
        locale: {
            'format': this.format,
            'customRangeLabel': this.trans('Custom dates'),
            'fromLabel': this.trans('from'),
            'toLabel': this.trans('to'),
            'applyLabel': this.trans('Apply'),
            'cancelLabel': this.trans('Cancel'),
            'daysOfWeek': [
                this.trans('Su'),
                this.trans('Mo'),
                this.trans('Tu'),
                this.trans('We'),
                this.trans('Th'),
                this.trans('Fr'),
                this.trans('Sa')
            ],
            'monthNames': [
                this.trans('January'),
                this.trans('February'),
                this.trans('March'),
                this.trans('April'),
                this.trans('May'),
                this.trans('June'),
                this.trans('July'),
                this.trans('August'),
                this.trans('September'),
                this.trans('October'),
                this.trans('November'),
                this.trans('December')
            ],
            'firstDay': 1
          },
      }, function (start, end, label) {
        if (start && end) {
          ref.currentStartDate = start
          ref.currentEndDate = end
        }
      })
        .on('apply.daterangepicker', (ev, picker) => {
          if (ref.currentStartDate && ref.currentEndDate) {
            ref.value = ref.currentStartDate.format(this.format) + ' ' + this.trans('to') + ' ' + ref.currentEndDate.format(this.format)
          } else {
            ref.value = null;
          }
        })
    },
    clearFilter: function() {
      this.value = null
      this.$store.commit(`${this.resourceName}/updateFilterState`, {
        filterClass: this.filterKey,
        value: '',
      })
      this.$emit('change')
    },
    generateId: function () {
      return Math.random().toString(36).substring(2) +
          (new Date()).getTime().toString(36);
    },
    parseDates: function () {
      const dateRange = this.filter.currentValue
      let startDate = moment()
      let endDate = moment()

      if (dateRange){
        const parsedDateRange = dateRange.split(` ${this.trans('to')} `)
        if (parsedDateRange.length == 2) {
          try {
            startDate = moment(parsedDateRange[0], "DD-MM-YYYY")
            endDate = moment(parsedDateRange[1], "DD-MM-YYYY")
          } catch (e) {
          }
        }
      }

      this.startDate = startDate.format(this.format)
      this.endDate = endDate.format(this.format)

      this.currentStartDate = startDate
      this.currentEndDate = endDate
    }
  },

  computed: {
    filter() {
      return this.$store.getters[`${this.resourceName}/getFilter`](
          this.filterKey
      )
    },
  },
}
</script>
