
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DecisionRule.vue') },
      { path: 'decision', component: () => import('pages/DecisionRule.vue') },
      { path: 'basic', component: () => import('pages/BasicRule.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/errors/Error404.vue')
  })
}

export default routes
