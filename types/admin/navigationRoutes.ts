export interface NavigationItem {
  title: string
  path: string
  isActive?: boolean
}

export interface NavigationSection {
  title: string
  path: string
  isActive?: boolean
  subItems?: NavigationItem[]
}
