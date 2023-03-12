<template>
  <div class="q-gutter-sm">
    <q-card>
      <q-card-section>
        <div class="row q-gutter-md items-center">
          <div class="col" style="max-width: 300px">
            <q-input
              filled
              :model-value="dateRangeInput"
              @update:model-value="dateChange"
              mask="##.##.#### - ##.##.####"
              label="Выберите диапазон дат"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="dateRangeCalendar" range mask="DD.MM.YYYY">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Закрыть" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="col">
            <q-option-group
              v-model="statisticType"
              :options="statisticTypeOptions"
              color="primary"
              inline
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <v-chart class="chart" :option="statisticChartOption" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watchEffect} from "vue";
import {date} from "quasar";
const {subtractFromDate, formatDate} = date
import VChart from "vue-echarts";
import {use} from "echarts/core"
import {CanvasRenderer} from 'echarts/renderers'
import {LineChart} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  ToolboxComponent
} from 'echarts/components'
import {EChartsOption} from "echarts";

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  ToolboxComponent
])



// build date picker
const timeStamp = Date.now()
const toDate = formatDate(timeStamp, 'DD.MM.YYYY')
const fromDate = formatDate(subtractFromDate(timeStamp, {months: 1}), 'DD.MM.YYYY')
const dateRangeCalendar = ref({ from: fromDate, to: toDate })

const dateRangeInput = computed(() => {
  if (dateRangeCalendar.value) {
    return `${dateRangeCalendar.value.from}-${dateRangeCalendar.value.to}`
  } else {
    return ''
  }
})
const dateChange = (dateRange: string) => {
  const dateRangeToArray = dateRange.split('-')
  dateRangeCalendar.value = {
    from: dateRangeToArray[0].trim(),
    to: dateRangeToArray[1].trim()
  }
}

// filter options
const statisticType = ref('ph')
const statisticTypeOptions = [
  {
    label: 'ph',
    value: 'ph'
  },
  {
    label: 'температура',
    value: 'temperature'
  },
  {
    label: 'двигательная активность',
    value: 'movement'
  }
]

// chart
const statisticChartOption = ref<EChartsOption>({
  legend: {},
  dataZoom: {},
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
      name: 'ph'
    }
  ]
})

// load data
watchEffect(async () => {
  const {from, to} = dateRangeCalendar.value

  const params = {
    from,
    to,
    type: statisticType.value
  }

  console.log(params)
})

</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
