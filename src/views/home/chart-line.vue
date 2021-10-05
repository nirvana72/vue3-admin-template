<template>
  <div class="h-80 flex items-center">
    <ElSkeleton animated />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onDeactivated, onMounted, watch } from 'vue'

import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components'
import { LineChart, LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

import { ECharts } from 'echarts/core'
import { debounce } from 'lodash'
import { useAppStore } from '@/store/modules/app'
import { ElSkeleton } from 'element-plus'

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
])

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
>

export interface IChartData {
  email: number[]
  unionAds: number[]
  videoAds: number[]
}

export interface IChartLine {
  initChart: (data: IChartData) => void
}

export default defineComponent({
  components: { ElSkeleton },
  setup() {
    const appStore = useAppStore()
    const { proxy } = getCurrentInstance()!
    let chart: ECharts
    let chartData: IChartData

    function initChart(data: IChartData) {
      chartData = data
      const theme = appStore.getSetting.isDarkMode ? 'dark' : 'vintage'
      const bgColor = theme === 'dark' ? '#181818' : '#fff'

      const option: EChartsOption = {
        backgroundColor: bgColor,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        grid: { left: '40', right: '20', top: '20', bottom: '20' },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [
              '00:00',
              '01:00',
              '02:00',
              '03:00',
              '04:00',
              '05:00',
              '06:00',
              '07:00',
              '08:00',
              '09:00',
              '10:00',
              '11:00',
            ],
          },
        ],
        yAxis: [{ type: 'value' }],
        series: [
          {
            name: 'email',
            type: 'line',
            stack: 'Total',
            areaStyle: { color: '#68E0E3' },
            lineStyle: { width: 0 },
            emphasis: { focus: 'series' },
            smooth: true,
            data: data.email,
          },
          {
            name: 'unionAds',
            type: 'line',
            stack: 'Total',
            areaStyle: { color: '#2FC7C9' },
            lineStyle: { width: 0 },
            emphasis: { focus: 'series' },
            smooth: true,
            data: data.unionAds,
          },
          {
            name: 'videoAds',
            type: 'line',
            stack: 'Total',
            areaStyle: { color: '#5BB1EF' },
            lineStyle: { width: 0 },
            emphasis: { focus: 'series' },
            smooth: true,
            data: data.videoAds,
          },
        ],
      }

      if (chart) chart.dispose()
      chart = echarts.init(proxy?.$el, theme)
      chart.setOption(option)
    }

    // 防抖调整图表尺寸
    const resizeChart = debounce(() => {
      chart.resize({ animation: { duration: 200 } })
    }, 800)

    // 监听窗口变化
    onMounted(() => {
      window.addEventListener('resize', resizeChart)
    })

    onDeactivated(() => {
      window.removeEventListener('resize', resizeChart)
    })

    // 监听侧边菜单变化
    watch(
      () => [appStore.getMenuState, appStore.getSetting.showSideMenu],
      () => resizeChart(),
    )

    // 切换主题
    watch(
      () => appStore.getSetting.isDarkMode,
      () => initChart(chartData),
    )

    return {
      initChart,
    }
  },
})
</script>
