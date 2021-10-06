<template>
  <app-page-warpper>
    <template #header>
      <Header />
    </template>
    <ElRow :gutter="20">
      <ElCol :span="8">
        <Number title="访问数" :number="123456" icon="ant-design:area-chart-outlined" />
      </ElCol>
      <ElCol :span="8">
        <Number title="成交额" :number="43214" icon="ant-design:money-collect-filled" />
      </ElCol>
      <ElCol :span="8">
        <Number title="下载数" :number="11234" icon="ic:baseline-cloud-download" />
      </ElCol>
    </ElRow>

    <el-card shadow="none" class="el-card--fix mt-5">
      <template #header> 流量趋势 </template>
      <ChartLine ref="chartLine" />
    </el-card>

    <el-card shadow="none" class="el-card--fix mt-5">
      <template #header> 访问量 </template>
      <ChartBar ref="chartBar" />
    </el-card>
  </app-page-warpper>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { ElRow, ElCol } from 'element-plus'
import Header from './header.vue'
import ChartLine, { IChartData, IChartLine } from './chart-line.vue'
import ChartBar, { IChartBar } from './chart-bar.vue'
import Number from './number.vue'
import { http } from '@/utils/http'

export default defineComponent({
  name: 'Home',
  components: { Header, Number, ElRow, ElCol, ChartLine, ChartBar },
  setup() {
    const chartLine = ref<IChartLine>()
    const chartBar = ref<IChartBar>()

    onMounted(() => {
      http.get<IChartData>('/dashboard').then((data) => {
        chartLine.value?.initChart(data)

        chartBar.value?.initChart(data.email)
      })
    })

    return {
      chartLine,
      chartBar,
    }
  },
})
</script>
