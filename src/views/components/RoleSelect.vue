<template>
  <el-select v-model="roleId" placeholder="请选择角色" class="w-full">
    <el-option label="" value="" />
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import * as Api from '@/api/sys/role'
import { ISelectItem } from './types'

export default defineComponent({
  props: {
    onlySysRole: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const cacheKey = 'app.components.role-select'
    const roleId = ''
    const options = ref<ISelectItem[]>([])

    new Promise<Api.ISysRole[]>((resolve) => {
      const cache = sessionStorage.getItem(cacheKey)
      if (cache) {
        const list = JSON.parse(cache)
        resolve(list)
      } else {
        Api.getList().then((roles) => {
          sessionStorage.setItem(cacheKey, JSON.stringify(roles))
          resolve(roles)
        })
      }
    }).then((roles) => {
      if (props.onlySysRole) roles = roles.filter((role) => role.isSysRole === 1)
      options.value = roles.map((role) => ({ label: role.name, value: role.id }))
    })

    return {
      roleId,
      options,
    }
  },
})
</script>
