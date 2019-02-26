const routes = [{
  path: '/',
  component: () => import('layouts/MyLayout.vue'),
  children: [{
    path: '',
    component: () => import('pages/tasks/Index.vue'),
    meta: {
      enter: 'fadeIn',
      leave: 'fadeOut'
    }
  }, {
    path: '/task-detail/:id',
    component: () => import('components/TaskDetailView.vue'),
    meta: {
      leave: 'zoomOutDown',
      enter: 'zoomInUp'
    }
  }, {
    path: '/new-task',
    component: () => import('components/TaskDetailCreate.vue'),
    meta: {
      leave: 'zoomOutDown',
      enter: 'zoomInUp'
    }
  }, {
    path: '/completed-tasks',
    component: () => import('pages/tasks/CompletedTask.vue'),
    meta: {
      leave: 'rollOut',
      enter: 'rollIn'
    }
  }, {
    path: '/deleted-tasks',
    component: () => import('pages/tasks/DeletedTask.vue'),
    meta: {
      leave: 'rollOut',
      enter: 'rollIn'
    }
  }, {
    path: '/task-edit/:id',
    component: () => import('components/TaskDetailEdit.vue'),
    meta: {
      leave: 'fadeOut',
      enter: 'fadeIn'
    }
  }]
}]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
