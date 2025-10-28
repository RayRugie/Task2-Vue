import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('./pages/Landing.vue') },
  { path: '/auth/login', component: () => import('./pages/Login.vue') },
  { path: '/auth/signup', component: () => import('./pages/Signup.vue') },
  { path: '/dashboard', component: () => import('./pages/Dashboard.vue'), meta: { requiresAuth: true } },
  { path: '/tickets', component: () => import('./pages/Tickets.vue'), meta: { requiresAuth: true } },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// Global auth guard
router.beforeEach((to, _from, next) => {
  const requires = to.matched.some(r => (r.meta as any)?.requiresAuth);
  const session = typeof window !== 'undefined' ? window.localStorage.getItem('ticketapp_session') : null;
  if (requires && !session) {
    next({ path: '/auth/login' });
    return;
  }
  next();
});


