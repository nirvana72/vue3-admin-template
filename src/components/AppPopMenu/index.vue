<template>
  <div v-if="state.visible" class="app-pop-menu" @mouseleave="state.visible = false">
    <el-button v-for="(item, index) in menus" :key="index" :type="item.type || 'primary'" @click="menuClick(item)">{{
      item.label
    }}</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, ref } from 'vue'
import { IPopMenuItem } from '@/components/AppPopMenu/types'

export default defineComponent({
  name: 'PopMenu',
  props: {
    items: {
      type: Array as PropType<IPopMenuItem<any>[]>,
      default: () => [],
    },
  },
  setup(props) {
    const state = reactive({
      visible: false,
      x: '',
      y: '',
    })

    const menus = ref<IPopMenuItem<any>[]>()

    let rowTarget: any

    function show(e: MouseEvent, row: any = undefined) {
      if (state.visible === false) {
        rowTarget = row
        if (row === undefined) return
        menus.value = props.items.filter((el) => {
          if (el.auth) return el.auth(row)
          return true
        })
        if (menus.value.length === 0) return
        state.x = `${e.x - 60}px`
        state.y = `${e.y - 10}px`
      }
      state.visible = !state.visible
    }

    function menuClick(item: IPopMenuItem<any>) {
      state.visible = false
      item.click(rowTarget)
    }

    return {
      show,
      menuClick,
      state,
      menus,
    }
  },
})
</script>

<style lang="scss" scoped>
.app-pop-menu {
  @apply absolute flex flex-col rounded shadow bg-white w-35 p-2;
  @apply dark:bg-gray-700 dark:border dark:border-gray-600;
  left: v-bind('state.x');
  top: v-bind('state.y');
  .el-button {
    margin: 2px 0;
  }
}
</style>
