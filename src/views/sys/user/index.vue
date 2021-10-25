<template>
  <app-page-warpper>
    <template #header>
      <div class="p-5 flex justify-center">
        <app-title-input title="账号" class="w-60 pr-2">
          <template #default>
            <el-input v-model="query.account"></el-input>
          </template>
        </app-title-input>
        <app-title-input title="角色" class="w-60 pr-2">
          <template #default>
            <el-select v-model="query.roleId">
              <el-option label="" value="" />
              <el-option label="管理员" value="admin" />
              <el-option label="业务员" value="customer" />
              <el-option label="代理商" value="agent" />
            </el-select>
          </template>
        </app-title-input>
        <div class="w-60 pr-2">
          <el-button type="primary" @click="getList(1)">查询</el-button>
          <el-button type="success" @click="onCreateCommand">+ 新建</el-button>
        </div>
      </div>
    </template>

    <el-card shadow="none" class="el-card--fix">
      <el-table :data="datasource.list" @sort-change="onTableSort">
        <el-table-column width="100" align="center">
          <template #default="scope">
            <img :src="scope.row.avatarUrl" class="rounded-1/2 w-15" />
          </template>
        </el-table-column>
        <el-table-column label="账号" prop="userId" sortable>
          <template #default="scope">
            {{ scope.row.userId }} / {{ scope.row.realName }}<br />
            {{ scope.row.account }}
          </template>
        </el-table-column>
        <el-table-column>
          <template #default="scope">
            <template v-if="scope.row.online === 1">&nbsp;<el-tag type="success">在线</el-tag></template>
            <template v-if="scope.row.state === 2">&nbsp;<el-tag type="danger">禁用</el-tag></template>
          </template>
        </el-table-column>
        <el-table-column label="角色" prop="roleId" sortable>
          <template #default="scope">
            {{ scope.row.roleName }}
            <template v-if="scope.row.roleId === 'company'"><br />{{ scope.row.companyName }}</template>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="writeTime" sortable>
          <template #default="scope">
            {{ parseTime(scope.row.writeTime, 'YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column label="最近登录" prop="lastTime" sortable>
          <template #default="scope">
            {{ scope.row.thisArea }}<br />
            {{ scope.row.thisTime }}
          </template>
        </el-table-column>
        <el-table-column width="80" align="center">
          <template #default="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="onRowCommand(scope.row, $event)" />
          </template>
        </el-table-column>
      </el-table>

      <div class="mt-5 text-center">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="datasource.total"
          @current-change="getList"
        />
      </div>
    </el-card>

    <AppPopMenu v-if="componentHandler.async('popMenuRef')" ref="popMenuRef" :items="popMenuItems" />

    <TheForm v-if="componentHandler.async('theFormRef')" ref="theFormRef" />
  </app-page-warpper>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, onMounted, reactive } from 'vue'
import { getUserListApi, IGetListReq, IGetListRspItem as IListItem } from '@/api/sys/user'
import { IApiGetListRsp, EAppBoolen } from '@/api/types'
import { ElLoading } from 'element-plus'
import { parseTime, getBetterTableRowsNumber } from '@/utils/tools'
import { IAppPopMenu } from '@/components/AppPopMenu/index.vue'
import { popMenuItems } from './popMenu'
import { ITheForm } from './form.vue'
import { useComponentHandler } from '@/utils/componentHandler'

// TODO from表单

export default defineComponent({
  name: 'SysUserIndex',
  components: {
    TheForm: defineAsyncComponent(() => import('./form.vue')),
    AppPopMenu: defineAsyncComponent(() => import('@/components/AppPopMenu/index.vue')),
  },
  setup() {
    const betterTableRowsNumber = getBetterTableRowsNumber({ rowHeight: 70, minusHeight: 70 })
    const query = reactive<IGetListReq>({ withOnline: EAppBoolen.TRUE, limit: betterTableRowsNumber })
    const datasource = reactive<IApiGetListRsp<IListItem>>({
      list: [],
      total: 0,
    })

    function getList(p?: number) {
      if (p) query.page = p
      const loading = ElLoading.service()
      getUserListApi(query)
        .then((data) => {
          datasource.list = data.list
          datasource.total = data.total
        })
        .finally(loading.close)
    }

    function onTableSort(params: { prop: string; order: string }) {
      const { order, prop } = params
      const sort = { ascending: 'ASC', descending: 'DESC' }[order]
      query.orderBy = sort ? `${prop}.${sort}` : ''
      getList(1)
    }

    const componentHandler = useComponentHandler()

    function onRowCommand(row: IListItem, e: MouseEvent) {
      componentHandler.getAsync<IAppPopMenu>('popMenuRef').then((comp) => comp.show(e, row))
    }

    function onCreateCommand() {
      componentHandler.getAsync<ITheForm>('theFormRef').then((comp) => comp.show())
    }

    onMounted(getList)

    return {
      query,
      datasource,
      getList,
      parseTime,
      onTableSort,
      popMenuItems,
      onRowCommand,
      onCreateCommand,
      componentHandler,
    }
  },
})
</script>
