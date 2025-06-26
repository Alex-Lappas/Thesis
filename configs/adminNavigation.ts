import type { NavigationSection } from '~/types/admin/navigationRoutes'

export const adminNavigationRoutes: NavigationSection[] = [
  {
    title: 'Data Management',
    path: '/admin/dashboard/data',
    subItems: [
      {
        title: 'Accidents',
        path: '/admin/dashboard/data/accidents',
      },
      {
        title: 'Safety Articles',
        path: '/admin/dashboard/data/safety-articles',
      },
      {
        title: 'Greek Cities',
        path: '/admin/dashboard/data/greek-cities',
      },
    ],
  },
  {
    title: 'Statistics',
    path: '/admin/dashboard/statistics',
    subItems: [
      {
        title: 'Accidents by Region',
        path: '/admin/dashboard/statistics/accidents-by-region',
      },
      {
        title: 'Accidents by Road Type',
        path: '/admin/dashboard/statistics/accidents-by-road-type',
      },
      {
        title: 'Accidents by Severity',
        path: '/admin/dashboard/statistics/accidents-by-severity',
      },
      {
        title: 'Fatalities by Age Group',
        path: '/admin/dashboard/statistics/fatalities-by-age-group',
      },
      {
        title: 'Fatalities by Day',
        path: '/admin/dashboard/statistics/fatalities-by-day',
      },
      {
        title: 'Fatalities by Gender',
        path: '/admin/dashboard/statistics/fatalities-by-gender',
      },
      {
        title: 'Fatalities by Month',
        path: '/admin/dashboard/statistics/fatalities-by-month',
      },
      {
        title: 'Total Accidents',
        path: '/admin/dashboard/statistics/total-accidents',
      },
    ],
  },
]
