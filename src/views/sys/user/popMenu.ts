import { GetListRspItemModule as RowItem } from '@/api/sys/user'
import { IAppPopMenuItem } from '@/components/AppPopMenu/types'

export const popMenuItems: IAppPopMenuItem<RowItem>[] = [
  {
    label: '明细',
    click(row: RowItem): void {
      alert('明细, id=' + row.userId)
    },
  },
  {
    label: '修改',
    type: 'warning',
    click(row: RowItem): void {
      alert('修改, id=' + row.userId)
    },
  },
  {
    label: '删除',
    type: 'danger',
    auth(row: RowItem): boolean {
      return row.userId % 3 === 0
    },
    click(row: RowItem): void {
      alert('删除, id=' + row.userId)
    },
  },
]
