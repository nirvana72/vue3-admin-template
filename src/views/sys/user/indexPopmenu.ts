import { IPopMenuItem } from '@/components/AppPopMenu/types'
import * as SysUserApi from '@/api/sys/user'
import { ElMessageBox } from 'element-plus'

type TUser = SysUserApi.IGetUserListRspItem

interface IUsePopmenu {
  items: IPopMenuItem<TUser>[]
}

export default function usePopmenu(getList: (p?: number) => void, showForm: (row?: TUser) => void): IUsePopmenu {
  const items: IPopMenuItem<TUser>[] = [
    {
      label: '修改',
      click: showForm,
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

  return {
    items,
  }
}
