<template>
  <app-page-warpper>
    <template #header>
      <div class="text-center p-10">
        <h1 class="float-left text-xl">错误日志</h1>
        <el-button type="primary" @click="cleanError">清空并关闭</el-button>
      </div>
    </template>
    <div class="p-4">
      <div
        v-for="(item, index) in errorList"
        :key="index"
        class="p-5 mb-5 border border-red-500 rounded bg-red-50 dark:bg-red-900"
      >
        <div>
          <div class="my-2">
            <el-tag type="danger">type: {{ item.type }}</el-tag>
          </div>
          <div class="my-2">
            <el-tag type="danger">file: {{ item.file }}</el-tag>
          </div>
          <div class="my-2">
            <el-tag type="danger">name: {{ item.name }}</el-tag>
          </div>
          <div class="my-2">
            <el-tag type="danger">message: {{ item.message }}</el-tag>
          </div>
          <div class="my-2">
            <el-tag type="danger">url: {{ item.url }}</el-tag>
          </div>
        </div>
        <div v-html="item.stack" />
      </div>
    </div>
  </app-page-warpper>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { useTabsStore } from '@/store/modules/tabs'

export default defineComponent({
  name: 'ErrorLogPage',
  setup() {
    const router = useRouter()
    const tabStroe = useTabsStore()
    const errorLogStore = useErrorLogStore()
    const errorList = computed(() => errorLogStore.getErrorList)

    tabStroe.setTitle(`~(${errorList.value.length})`, router)

    function cleanError() {
      errorLogStore.clean()
      tabStroe.closeTabByRouter(router)
    }

    return {
      errorList,
      cleanError,
    }
  },
})
</script>
