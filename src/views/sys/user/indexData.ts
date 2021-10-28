import { reactive } from 'vue'
import { getBetterTableRowsNumber } from '@/utils/tools'
import * as SysUserApi from '@/api/sys/user'
import { EApiBoolen, IApiListRsp } from '@/api/types'
import { ElLoading } from 'element-plus'

type TQuery = SysUserApi.IGetUserListReq
type TUser = SysUserApi.IGetUserListRspItem

interface IUseData {
  query: TQuery
  datasource: IApiListRsp<TUser>
  getList: (p?: number) => void
}

export default function useData(): IUseData {
  const query = reactive<TQuery>({
    withOnline: EApiBoolen.TRUE,
    limit: getBetterTableRowsNumber({ rowHeight: 70, minusHeight: 70 }),
  })

  const datasource = reactive<IApiListRsp<TUser>>({
    list: [],
    total: 0,
  })

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

  return {
    query,
    datasource,
    getList,
  }
}
