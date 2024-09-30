<?php

namespace Rpj\Daterangepicker;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Laravel\Nova\Filters\Filter;
use Laravel\Nova\Http\Requests\NovaRequest;
use Rpj\Daterangepicker\DateHelper as Helper;

class Daterangepicker extends Filter
{
    private array $periods = [];
    private bool|string $minDate = false;
    private bool|string $maxDate = false;
    private string $isoFormat = 'DD/MM/YYYY';
    private $customApplyCb = null;

    public function __construct(
        private string $column,
        private string $default = Helper::TODAY,
        private ?array $defaultDates = null
    ) {
//        if ($this->default === Helper::CUSTOM) {
//            if (count($this->defaultDates) !== 2 || !$this->defaultDates[0] || !$this->defaultDates[1])
//                $this->default = Helper::TODAY;
//        }
    }

    public $component = 'daterangepicker';


    public function apply(NovaRequest $request, $query, $value)
    {
        [$start, $end] = Helper::getParsedDatesGroupedRanges($value, $this->isoFormat);

        if ($start && $end) {
            if ($this->customApplyCb) {
                call_user_func($this->customApplyCb, $query, $start, $end);
            } else {
                $query->whereBetween($this->column, [$start, $end]);
            }
        }
    }

    public function customApply(callable $cb): self {
        $this->customApplyCb = $cb;

        return $this;
    }

    public function options(NovaRequest $request)
    {
        if (empty($this->periods)) {
            $this->setPeriods([
                'Today' => [Carbon::today(), Carbon::today()],
                'Yesterday' => [Carbon::yesterday(), Carbon::yesterday()],
                'This week' => [
                    Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek(),
                ],
                'Last 7 days' => [Carbon::now()->subDays(6), Carbon::now()],
                'Last 30 days' => [Carbon::now()->subDays(29), Carbon::now()],
                'This month' => [
                    Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth(),
                ],
                'Last month' => [
                    Carbon::now()->subMonth()->startOfMonth(),
                    Carbon::now()->subMonth()->endOfMonth(),
                ],
            ]);
        }

        return [
            'customRanges' => json_encode($this->periods),
            'maxDate' => $this->maxDate ?? false,
            'minDate' => $this->minDate ?? false,
            'format' => $this->isoFormat
        ];
    }

    /**
     * @param Carbon[] $periods
     */
    public function setPeriods(array $periods): self
    {
        $result = [];
        foreach ($periods as $periodName => $dates) {
            foreach ($dates as $date) {
                $result[$periodName][] = $date->toDateTimeString();
            }
        }
        $this->periods = $result;

        return $this;
    }

    public function setMaxDate(Carbon $maxDate): self
    {
        $this->maxDate = $maxDate->toDateTimeString();

        return $this;
    }

    public function setMinDate(Carbon $minDate): self
    {
        $this->minDate = $minDate->toDateTimeString();

        return $this;
    }

    /**
     * Set the default options for the filter.
     *
     * @return array|mixed
     */
    public function default(): string|null
    {
        [$start, $end] = Helper::getParsedDatesGroupedRanges($this->default, $this->isoFormat);

        if ($start && $end) {
            return $start->isoFormat($this->isoFormat).' '.__('to').' '.$end->isoFormat($this->isoFormat);
        }

        return null;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /*
     * Date format used by moment JS
     * DD-MM-YYYY
     */
    public function setIsoFormat(string $isoFormat): self {
        $this->isoFormat = $isoFormat;

        return $this;
    }
}
