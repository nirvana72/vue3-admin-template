import { IDempPage1RspItem } from '@/api/demo/index'
import { IAppPopMenuItem } from '@/components/AppPopMenu/types'

export const popMenuItems: IAppPopMenuItem<IDempPage1RspItem>[] = [
  {
    label: '明细',
    click(row: IDempPage1RspItem): void {
      alert('明细, id=' + row.id)
    },
  },
  {
    label: '修改',
    type: 'warning',
    click(row: IDempPage1RspItem): void {
      alert('修改, id=' + row.id)
    },
  },
  {
    label: '删除',
    type: 'danger',
    auth(row: IDempPage1RspItem): boolean {
      return row.id % 3 === 0
    },
    click(row: IDempPage1RspItem): void {
      alert('删除, id=' + row.id)
    },
  },
]
