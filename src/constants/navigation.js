
export const AppRoutes = Object.freeze({
  LOGIN: 'login',
  USERS: 'users',
  DASHBOARD: 'dashboard',
  ASSETS: 'assets',
});

export const AppRouteInfo = Object.freeze({
  [AppRoutes.DASHBOARD]: {
    path: '/Dashboard',
    name: 'Dashboard',
    description: 'Create new surveys, edit existing ones, and extract data.',
  },
  [AppRoutes.ASSETS]: {
    path: '/Assets',
    name: 'Assets',
    description: 'Define parameters for asset tagging, and view submissions.',
  },
  [AppRoutes.USERS]: {
    path: '/Users',
    name: 'Users',
    description: 'View information about mobile users authorized to use the platform.'
  },
});
