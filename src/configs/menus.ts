import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'

const menus = [
  {
    key: '/',
    title: 'トップ',
    icon: HomeOutlined,
  },
  {
    key: 'user-menu',
    title: '顧客管理',
    icon: UserOutlined,
    children: [
      {
        key: '/user/users',
        title: '顧客マスタ',
      },
    ],
  },
  {
    key: 'system-menu',
    title: 'システム設定',
    icon: SettingOutlined,
    children: [
      {
        key: '/system/staffs',
        title: '担当者マスタ',
      },
      {
        key: '/system/holidays',
        title: '祝日マスタ',
      },
    ],
  },
]

export default menus
