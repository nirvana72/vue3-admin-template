import { reactive, ref, Ref } from 'vue'
import { getBetterTableRowsNumber } from '@/utils/tools'
import * as SysUserApi from '@/api/sys/user'
import { EApiBoolen, IApiListRsp } from '@/api/types'

type TQuery = SysUserApi.IGetUserListReq
type TUser = SysUserApi.IGetUserListRspItem

interface IUseData {
  loading: Ref<boolean>
  query: TQuery
  datasource: IApiListRsp<TUser>
  getList: (p?: number) => void
}

export default function useData(): IUseData {
  const loading = ref<boolean>(false)

  const query = reactive<TQuery>({
    withOnline: EApiBoolen.TRUE,
    limit: getBetterTableRowsNumber({ rowHeight: 70, minusHeight: 200 }),
  })

  const datasource = reactive<IApiListRsp<TUser>>({
    list: [],
    total: 0,
  })

  function getList(p?: number) {
    if (p) query.page = p
    loading.value = true
    SysUserApi.getUserListApi(query)
      .then((data) => {
        datasource.list = data.list
        datasource.total = data.total
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    loading,
    query,
    datasource,
    getList,
  }
}
