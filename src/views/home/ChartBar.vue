<template>
  <div class="h-80 flex items-center">
    <ElSkeleton animated />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onDeactivated, onMounted, watch } from 'vue'

import * as echarts from 'echarts/core'
import { GridComponent, GridComponentOption } from 'echarts/components'
import { BarChart, BarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

import { ECharts } from 'echarts/core'
import { debounce } from 'lodash'
import { useAppStore } from '@/store/modules/app'
import { ElSkeleton } from 'element-plus'

echarts.use([GridComponent, BarChart, CanvasRenderer])

type EChartsOption = echarts.ComposeOption<GridComponentOption | BarSeriesOption>

export interface IChartBar {
  initChart: (data: number[]) => void
}

export default defineComponent({
  components: { ElSkeleton },
  setup() {
    const appStore = useAppStore()
    const { proxy } = getCurrentInstance()!
    let chart: ECharts
    let chartData: number[]

    function initChart(data: number[]) {
      chartData = data
      const theme = appStore.getSetting.isDarkMode ? 'dark' : 'vintage'
      const bgColor = theme === 'dark' ? '#181818' : '#fff'

      const option: EChartsOption = {
        backgroundColor: bgColor,
        grid: { left: '40', right: '20', top: '20', bottom: '20' },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        },
        yAxis: { type: 'value' },
        series: [
          {
            data,
            type: 'bar',
            showBackground: true,
            backgroundStyle: { color: 'rgba(180, 180, 180, 0.2)' },
            barWidth: 40,
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
