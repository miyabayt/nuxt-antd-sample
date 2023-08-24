import menus from '@/configs/menus'

export interface Menu {
  key: string
  title: string
  icon?: any
  children?: Menu[]
}

const getMenus = (): Menu[] => {
  return menus
}

export default getMenus
