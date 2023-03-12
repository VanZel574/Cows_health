import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/Dashboard.vue'),
    children: [
      { path: '', component: () => import('pages/dashboard/IndexPage.vue') },
      { path: 'animals', component: () => import('pages/dashboard/AnimalsPage.vue') },
      { path: 'groups', component: () => import('pages/dashboard/GroupsPage.vue') },
      { path: 'messages', component: () => import('pages/dashboard/MessagesPage.vue') },
      { path: 'devices', component: () => import('pages/dashboard/DevicesPage.vue') }
    ],
  },

  {
    path: '/auth',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: 'login', component: () => import('pages/auth/LoginPage.vue'), props: {routerLink: '/'} },
      { path: 'register', component: () => import('pages/auth/RegisterPage.vue') },
    ]
  },

  {
    path: '/admin',
    component: () => import('layouts/Default.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/auth/LoginPage.vue'),
        props: {routerLink: '/admin/dashboard', admin: true}
      },
      { path: 'dashboard', component: () => import('pages/admin/AdminDashboardPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
