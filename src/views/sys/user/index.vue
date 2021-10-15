<template>
  <app-page-warpper>
    <el-card shadow="none" class="el-card--fix">
      <el-table :data="datasource.list">
        <el-table-column>
          <template #default="scope">
            <img :src="scope.row.avatarUrl" class="rounded-1/2 w-15" />
          </template>
        </el-table-column>
        <el-table-column label="账号">
          <template #default="scope">
            {{ scope.row.userId }} / {{ scope.row.realName }}
            <br />
            {{ scope.row.account }}
          </template>
        </el-table-column>
        <el-table-column>
          <template #default="scope">
            <el-tag v-if="scope.row.online === 1" type="success">在线</el-tag>&nbsp;
            <el-tag v-if="scope.row.state === 2" type="danger">禁用</el-tag>&nbsp;
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="scope">
            {{ scope.row.roleName }}
            <template v-if="scope.row.roleId === 'company'">
              <br />
              {{ scope.row.companyName }}
            </template>
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
  </app-page-warpper>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { getUserListApi, GetListReqModule, GetListRspItemModule } from '@/api/sys/user'
import { ApiGetListRspModule, AppBoolen } from '@/types/index'
import { ElLoading } from 'element-plus'

export default defineComponent({
  name: 'SysUserIndex',
  setup() {
    const query = reactive<GetListReqModule>({ withOnline: AppBoolen.TRUE })
    const datasource = reactive<ApiGetListRspModule<GetListRspItemModule>>({
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
        .finally(() => {
          loading.close()
        })
    }

    onMounted(() => {
      getList()
    })

    return {
      getList,
      datasource,
    }
  },
})
</script>
