<template>
  <el-dialog v-model="state.visible" title="系统用户" width="400px">
    <h1>AAAAAA</h1>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export interface IItemForm {
  show: () => void
}

export default defineComponent({
  setup() {
    const state = reactive({
      visible: false,
    })

    function show() {
      state.visible = true
    }

    return {
      state,
      show,
    }
  },
})
</script>
