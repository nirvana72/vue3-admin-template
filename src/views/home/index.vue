<template>
  <app-page>
    <template #header>
      <TheHeader />
    </template>
    <ElRow :gutter="20">
      <ElCol :span="8">
        <TheNumber title="访问数" :number="123456" icon="ant-design:area-chart-outlined" />
      </ElCol>
      <ElCol :span="8">
        <TheNumber title="成交额" :number="43214" icon="ant-design:money-collect-filled" />
      </ElCol>
      <ElCol :span="8">
        <TheNumber title="下载数" :number="11234" icon="ic:baseline-cloud-download" />
      </ElCol>
    </ElRow>

    <app-card class="mt-5">
      <template #header> 流量趋势 </template>
      <TheChartLine ref="chartLine" />
    </app-card>

    <app-card class="mt-5">
      <template #header> 访问量 </template>
      <TheChartBar ref="chartBar" />
    </app-card>
  </app-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { ElRow, ElCol } from 'element-plus'
import TheHeader from './Header.vue'
import TheChartLine, { IChartData, IChartLine } from './ChartLine.vue'
import TheChartBar, { IChartBar } from './ChartBar.vue'
import TheNumber from './Number.vue'
import { http } from '@/utils/http'
import { useComponentHandler } from '@/utils/componentHandler'

export default defineComponent({
  name: 'Home',
  components: { TheHeader, TheNumber, ElRow, ElCol, TheChartLine, TheChartBar },
  setup() {
    const componentHandler = useComponentHandler()
    onMounted(() => {
      http.get<IChartData>('/dashboard').then((data) => {
        componentHandler.get<IChartLine>('chartLine').initChart(data)
        componentHandler.get<IChartBar>('chartBar').initChart(data.email)
      })
    })
  },
})
</script>
