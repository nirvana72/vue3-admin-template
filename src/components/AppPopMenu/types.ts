import { ButtonType } from 'element-plus'

export interface IAppPopMenu {
  show: (e: MouseEvent, row: any) => void
}

export interface IAppPopMenuItem<T> {
  type?: ButtonType
  auth?: (row: T) => boolean
  label: string
  click: (row: T) => void
}
