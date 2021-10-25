import { IGetListRspItem as IRow } from '@/api/sys/user'
import { IAppPopMenuItem } from '@/components/AppPopMenu/types'

export const popMenuItems: IAppPopMenuItem<IRow>[] = [
  {
    label: '明细',
    click(row: IRow): void {
      alert('明细, id=' + row.userId)
    },
  },
  {
    label: '修改',
    type: 'warning',
    click(row: IRow): void {
      alert('修改, id=' + row.userId)
    },
  },
  {
    label: '删除',
    type: 'danger',
    auth(row: IRow): boolean {
      return row.userId % 3 === 0
    },
    click(row: IRow): void {
      alert('删除, id=' + row.userId)
    },
  },
]
