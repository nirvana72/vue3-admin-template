import { DempPage1RspItemModule } from '@/api/demo/index'
import { IMenuItem } from '@/components/AppPopMenu/types'

export const popMenuItems: IMenuItem<DempPage1RspItemModule>[] = [
  {
    label: '明细',
    click(row: DempPage1RspItemModule): void {
      alert('明细, id=' + row.id)
    },
  },
  {
    label: '修改',
    type: 'warning',
    click(row: DempPage1RspItemModule): void {
      alert('修改, id=' + row.id)
    },
  },
  {
    label: '删除',
    type: 'danger',
    auth(row: DempPage1RspItemModule): boolean {
      return row.id % 3 === 0
    },
    click(row: DempPage1RspItemModule): void {
      alert('删除, id=' + row.id)
    },
  },
]
