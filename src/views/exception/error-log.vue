<template>
  <div>
    <div class="appPageHeader text-center">
      <h1 class="float-left text-xl">错误日志</h1>
      <el-button type="primary" @click="cleanError">清空并关闭</el-button>
    </div>
    <div class="p-4">
      <div
        v-for="(item, index) in errorList"
        :key="index"
        class="p-5 mb-5 border border-red-500 rounded bg-red-50 dark:bg-red-900"
      >
        <div>
          <div class="my-2">
            <ElTag type="danger">type: {{ item.type }}</ElTag>
          </div>
          <div class="my-2">
            <ElTag type="danger">file: {{ item.file }}</ElTag>
          </div>
          <div class="my-2">
            <ElTag type="danger">name: {{ item.name }}</ElTag>
          </div>
          <div class="my-2">
            <ElTag type="danger">message: {{ item.message }}</ElTag>
          </div>
          <div class="my-2">
            <ElTag type="danger">url: {{ item.url }}</ElTag>
          </div>
        </div>
        <div v-html="item.stack" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { useTabsStore } from '@/store/modules/tabs'
import { ElTag } from 'element-plus'

export default defineComponent({
  name: 'ErrorLogPage',
  components: { ElTag },
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
