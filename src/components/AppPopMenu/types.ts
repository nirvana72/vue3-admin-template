import { ButtonType } from 'element-plus'

export interface IPopMenu {
  show: (e: MouseEvent, row: any) => void
}

export interface IPopMenuItem<T> {
  type?: ButtonType
  auth?: (row: T) => boolean
  label: string
  click: (row: T) => void
}
