<?php

namespace Rpj\Daterangepicker;

use Carbon\Carbon;
use Laravel\Nova\Filters\Filter;
use Laravel\Nova\Http\Requests\NovaRequest;
use Rpj\Daterangepicker\DateHelper as Helper;

class Daterangepicker extends Filter
{
    private array $periods = [];
    private bool|string $minDate = false;
    private bool|string $maxDate = false;
    private string $isoFormat = 'DD/MM/YYYY';

    public function __construct(
        private string $column,
        private string $default = Helper::TODAY,
        private ?array $defaultDates = null
    ) {
        if ($this->default === Helper::CUSTOM) {
            if (count($this->defaultDates) !== 2 || !$this->defaultDates[0] || !$this->defaultDates[1])
                $this->default = Helper::TODAY;
        }
    }

    public $component = 'daterangepicker';


    public function apply(NovaRequest $request, $query, $value)
    {
        [$start, $end] = Helper::getParsedDatesGroupedRanges($value, $this->isoFormat);

        if ($start && $end) {
            $query->whereBetween($this->column, [$start, $end]);
        }
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

    public function default(): string
    {
        if ($this->default === Helper::CUSTOM) {
            [$start, $end] = $this->defaultDates;
        } else {
            [$start, $end] = Helper::getParsedDatesGroupedRanges($this->default, $this->isoFormat);
        }

        return $start->isoFormat($this->isoFormat).' '.__('to').' '.$end->isoFormat($this->isoFormat);
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
