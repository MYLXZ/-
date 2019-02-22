import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/homepage',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '登录' },
            children:[
                {
                    path: '/index',
                    component: resolve => require(['../components/page/teacher/index.vue'], resolve),
                    meta: { title: '教师评语' }
                },
                {
                    path: '/sign',
                    component: resolve => require(['../components/page/teacher/sign.vue'], resolve),
                    meta: { title: '教师评语' }
                }, 
                {
                    path: '/comment',
                    component: resolve => require(['../components/page/teacher/comment.vue'], resolve),
                    meta: { title: '教师评语' }
                },                               
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }                
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/login/login.vue'], resolve)
        },
        {
          path:'/director',
          component:resolve => require(['../components/page/teacher/director.vue'],resolve),
          meta:{title:'学生首页',admin:true}
        },        
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
