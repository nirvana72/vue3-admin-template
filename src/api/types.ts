// 真假值
export const enum EAppBoolen {
  TRUE = 1,
  FALSE = 0,
}

// 系统用户状态
export const enum EAppUserState {
  NORMAL = 1, // 正常
  DELETED = 0, // 假删除
  FORBIDDEN = 2, // 禁用
}

// Api列表接口返回格式
export interface IApiGetListRsp<T> {
  list: T[]
  total: number
}
