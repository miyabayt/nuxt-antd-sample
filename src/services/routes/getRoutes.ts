import routes from '@/configs/routes'

export interface Route {
  path: string
  title: string
  parentPath: string
  menuCode: string
}

const getRoutes = (): Route[] => {
  return routes
}

export default getRoutes
