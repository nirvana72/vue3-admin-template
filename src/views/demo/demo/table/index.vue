<template>
  <app-page-warpper>
    <template #header>
      <div class="p-5 flex justify-center flex-wrap">
        <div v-auth="'123'" class="w-60 pr-2">
          <el-input v-model="query.account" placeholder="账号"></el-input>
        </div>
        <div class="w-60 pr-2">
          <el-input v-model="query.realName" placeholder="姓名"></el-input>
        </div>
        <div class="w-60 pr-2">
          <el-select v-model="query.roleId">
            <el-option label="管理员" value="admin" />
            <el-option label="业务员" value="customer" />
            <el-option label="代理商" value="agent" />
          </el-select>
        </div>
        <div class="w-60 pr-2">
          <el-button type="primary" @click="getData(1)">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </div>
      </div>
    </template>
    <el-card shadow="none" class="el-card--fix">
      <el-table :data="datasource.list">
        <el-table-column label="角色" prop="roleName" />
      </el-table>
      <div class="mt-5 text-center">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="datasource.total"
          @current-change="getData"
        />
      </div>
    </el-card>

    <AppPopMenu ref="popMenu" :items="popMenuItems" />
  </app-page-warpper>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRaw } from 'vue'
import { ElLoading } from 'element-plus'
import { DemoPage1ReqModule, DemoPage1RspModule, DempPage1RspItemModule, getDemoPageData } from '@/api/demo/index'
import AppPopMenu from '@/components/AppPopMenu/index.vue'
import { IAppPopMenu } from '@/components/AppPopMenu/types'
import { popMenuItems } from './popMenuItems'
import { cloneDeep } from 'lodash'

export default defineComponent({
  name: 'DemoTable',
  components: { AppPopMenu },
  setup() {
    const query = reactive<DemoPage1ReqModule>({
      page: 1,
      limit: 20,
      account: '',
      realName: '',
      roleId: 'admin',
    })

    const queryClone = cloneDeep(toRaw(query))
    delete queryClone.page
    delete queryClone.limit

    const popMenu = ref<IAppPopMenu>()

    const datasource = reactive<DemoPage1RspModule>({
      list: [],
      total: 0,
    })

    function getData(p?: number) {
      if (p) query.page = p
      const loading = ElLoading.service()
      getDemoPageData(query)
        .then((data) => {
          datasource.list = data.list
          datasource.total = data.total
        })
        .finally(() => {
          loading.close()
        })
    }

    function resetQuery() {
      Object.assign(query, queryClone)
    }

    function onRowCommand(row: DempPage1RspItemModule, e: MouseEvent) {
      popMenu.value?.show(e, row)
    }

    onMounted(() => {
      getData()
    })

    return {
      query,
      datasource,
      popMenu,
      popMenuItems,
      getData,
      resetQuery,
      onRowCommand,
    }
  },
})
</script>
