import type { NavigationItem } from '~/types/admin/navigationRoutes'
import { adminNavigationRoutes } from '~/configs/adminNavigation'

export function useAdminActivePaths() {
  const route = useRoute()

  const activePaths = computed<NavigationItem[]>(() => {
    const activePaths: NavigationItem[] = [
      {
        title: 'Admin Dashboard',
        path: '/admin/dashboard',
      },
    ]

    const pathSegments = route.path.split('/').filter(Boolean)

    // Early return if we're just on the dashboard
    if (pathSegments.length <= 2)
      return activePaths

    // Build section path (/admin/dashboard/analytics)
    const sectionPath = `/${pathSegments.slice(0, 3).join('/')}`
    const section = adminNavigationRoutes.find(nav => nav.path === sectionPath)

    if (section) {
      activePaths.push({
        title: section.title,
        path: section.path,
      })

      // Build sub-item path if it exists (/admin/dashboard/analytics/total-accidents)
      if (pathSegments.length > 3 && section.subItems) {
        const subItemPath = `/${pathSegments.slice(0, 4).join('/')}`
        const subItem = section.subItems.find(item => item.path === subItemPath)

        if (subItem) {
          activePaths.push({
            title: subItem.title,
            path: subItem.path,
          })
        }
      }
    }

    return activePaths
  })

  const isPathActive = (path: string) => {
    const lastPath = activePaths.value.at(-1)?.path
    return lastPath === path
  }

  return {
    activePaths,
    isPathActive,
  }
}
