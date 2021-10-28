<template>
  <app-page-warpper>
    <template #header>
      <div class="p-5 flex justify-center">
        <app-title-input title="账号" class="w-60 pr-2">
          <el-input v-model="query.account" />
        </app-title-input>
        <app-title-input title="角色" class="w-60 pr-2">
          <RoleSelect v-model="query.roleId" />
        </app-title-input>
        <div class="pr-2">
          <el-button type="primary" @click="getList(1)">查询</el-button>
          <el-button type="success" @click="showForm()">+ 新建</el-button>
        </div>
      </div>
    </template>

    <el-card shadow="none" class="el-card--app max-w-screen-2xl mx-auto">
      <el-table :data="datasource.list" @sort-change="onTableSort">
        <el-table-column width="100" align="center">
          <template #default="scope">
            <img :src="scope.row.avatarUrl" class="rounded w-15" />
          </template>
        </el-table-column>
        <el-table-column label="账号" prop="userId" sortable>
          <template #default="scope">
            {{ scope.row.userId }} / {{ scope.row.realName }}<br />
            {{ scope.row.account }}
          </template>
        </el-table-column>
        <el-table-column label="状态">
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
            <el-button type="primary" icon="el-icon-menu" circle @click="showPopMenu(scope.row, $event)" />
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

    <ThePopMenu v-if="componentHandler.async('popMenuRef')" ref="popMenuRef" :items="popMenuItems" />

    <TheForm v-if="componentHandler.async('theFormRef')" ref="theFormRef" @submit="getList(1)" />
  </app-page-warpper>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, onMounted } from 'vue'
import RoleSelect from '@/views/components/RoleSelect.vue'
import { parseTime } from '@/utils/tools'
import { useComponentHandler } from '@/utils/componentHandler'
import useData from './indexData'
import usePopmenu from './indexPopmenu'
import { IGetUserListRspItem as IUser } from '@/api/sys/user'
import { ITheForm } from './form.vue'
import { IPopMenu } from '@/components/AppPopMenu/types'

export default defineComponent({
  name: 'SysUserIndex',
  components: {
    RoleSelect,
    TheForm: defineAsyncComponent(() => import('./form.vue')),
    ThePopMenu: defineAsyncComponent(() => import('@/components/AppPopMenu/index.vue')),
  },
  setup() {
    const { query, datasource, getList } = useData()

    const { items: popMenuItems } = usePopmenu(getList, showForm)

    const componentHandler = useComponentHandler()

    function showPopMenu(row: IUser, e: MouseEvent) {
      componentHandler.getAsync<IPopMenu>('popMenuRef').then((c) => c.show(e, row))
    }

    function showForm(row?: IUser) {
      componentHandler.getAsync<ITheForm>('theFormRef').then((c) => c.show(row))
    }

    function onTableSort(params: { prop: string; order: string }) {
      const { order, prop } = params
      const sort = { ascending: 'ASC', descending: 'DESC' }[order]
      query.orderBy = sort ? `${prop}.${sort}` : ''
      getList(1)
    }

    onMounted(getList)

    return {
      query,
      datasource,
      getList,
      parseTime,
      onTableSort,
      showPopMenu,
      popMenuItems,
      showForm,
      componentHandler,
    }
  },
})
</script>
