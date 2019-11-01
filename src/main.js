// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  const role = sessionStorage.getItem('webToken');
  if (to.meta.title === undefined || to.meta.title === 'undefined') {
    window.document.title = 'FastDFS 文件存储系统后台'
  } else {
    window.document.title = to.meta.title
  }

  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (!role) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
