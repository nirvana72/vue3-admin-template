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
          <el-button type="success" @click="onModifyCommand()">+ 新建</el-button>
        </div>
      </div>
    </template>

    <el-card shadow="none" class="el-card--app max-w-screen-2xl mx-auto">
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
import { defineAsyncComponent, defineComponent, onMounted, reactive } from 'vue'
import * as SysUserApi from '@/api/sys/user'
import { IApiListRsp, EApiBoolen } from '@/api/types'
import { parseTime, getBetterTableRowsNumber } from '@/utils/tools'
import { IPopMenu, IPopMenuItem } from '@/components/AppPopMenu/types'
import { ITheForm } from './form.vue'
import { useComponentHandler } from '@/utils/componentHandler'
import { ElMessageBox, ElLoading } from 'element-plus'
import RoleSelect from '@/views/components/RoleSelect.vue'

type TQuery = SysUserApi.IGetUserListReq
type TUser = SysUserApi.IGetUserListRspItem

export default defineComponent({
  name: 'SysUserIndex',
  components: {
    RoleSelect,
    TheForm: defineAsyncComponent(() => import('./form.vue')),
    ThePopMenu: defineAsyncComponent(() => import('@/components/AppPopMenu/index.vue')),
  },
  setup() {
    // 查询条件
    const query = reactive<TQuery>({
      withOnline: EApiBoolen.TRUE,
      limit: getBetterTableRowsNumber({ rowHeight: 70, minusHeight: 70 }),
    })

    // 查询结果
    const datasource = reactive<IApiListRsp<TUser>>({
      list: [],
      total: 0,
    })

    // 获取列表
    function getList(p?: number) {
      if (p) query.page = p
      const loading = ElLoading.service()
      SysUserApi.getUserListApi(query)
        .then((data) => {
          datasource.list = data.list
          datasource.total = data.total
        })
        .finally(loading.close)
    }

    // 表格排序
    function onTableSort(params: { prop: string; order: string }) {
      const { order, prop } = params
      const sort = { ascending: 'ASC', descending: 'DESC' }[order]
      query.orderBy = sort ? `${prop}.${sort}` : ''
      getList(1)
    }

    // 菜单项
    const popMenuItems: IPopMenuItem<TUser>[] = [
      {
        label: '修改',
        click: onModifyCommand,
      },
      {
        label: '重置密码',
        click: resetPassword,
      },
      {
        label: '个人授权',
        auth: ({ roleId }) => roleId !== 'admin',
        click: defaultPopMenuEvent,
      },
      {
        label: '切换账号',
        type: 'success',
        auth: ({ roleId }) => roleId !== 'admin',
        click: defaultPopMenuEvent,
      },
      {
        label: '删除',
        type: 'danger',
        click: deleteUser,
      },
    ]

    // 组件助手
    const componentHandler = useComponentHandler()

    // 弹出菜单
    function showPopMenu(row: TUser, e: MouseEvent) {
      componentHandler.getAsync<IPopMenu>('popMenuRef').then((c) => c.show(e, row))
    }

    // 修改编辑
    function onModifyCommand(row?: TUser) {
      componentHandler.getAsync<ITheForm>('theFormRef').then((c) => c.show(row))
    }

    // 重置密码
    function resetPassword(row: TUser) {
      ElMessageBox.confirm(`确定重置 ${row.realName} 密码操作么`, '提示', { type: 'warning' }).then(() => {
        SysUserApi.resetPassword(row.userId).then((msg) => {
          ElMessageBox.alert(msg, { type: 'success' })
        })
      })
    }

    // 删除账号
    function deleteUser(row: TUser) {
      ElMessageBox.confirm(`确定删除 ${row.realName} 操作么`, '提示', { type: 'warning' }).then(() => {
        SysUserApi.remove(row.userId).then(() => {
          ElMessageBox.alert('删除成功', { type: 'success' })
          getList()
        })
      })
    }

    function defaultPopMenuEvent() {
      ElMessageBox.alert('功能未实现', { type: 'error' })
    }

    // 加载事件
    onMounted(getList)

    return {
      query,
      datasource,
      getList,
      parseTime,
      onTableSort,
      popMenuItems,
      showPopMenu,
      onModifyCommand,
      componentHandler,
    }
  },
})
</script>
