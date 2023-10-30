//route 访问路径，路由
//router 路由管理者
import { createRouter, createWebHashHistory } from 'vue-router';// 创建路由实例并传递 `routes` 配置const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
//创建路由 route

import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Login from "@/views/user/Login.vue";
import Register from "@/views/user/Register.vue";
import Mine from "@/views/user/Mine.vue";
import { useUserStore } from '@/stores/user';

const routes = [
    { path: '/', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/user/login', name: 'login', component: Login },
    { path: '/user/register', name: 'register', component: Register },
    { path: '/user/mine', name: 'mine', component: Mine }
]
//创建路由管理 router
const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes,
});

// 路由守卫（beforeEach）用于拦截路由导航，在用户访问不同页面之前执行特定逻辑
router.beforeEach((to, from, next) => {
    // 获取用户仓库（store），其中包含了用户信息
    const userStore = useUserStore();
    // 获取用户的访问令牌（token）
    const token = userStore.user.token;

    if (token == '') { 
        // 如果用户没有访问令牌（token），表示用户未登录
        // 只允许用户访问登录和注册页面（暂时的限制）
        if (to.path == '/user/login' || to.path == '/user/register') {
            // 放行用户前往登录和注册页面
            next();
        }else{
            // 否则，将用户重定向到登录页
            next('/user/login');
        }
    }else{
        // 如果用户有访问令牌（token），表示用户已登录
        if(to.path == '/user/login' || to.path == '/user/register'){
            // 不允许已登录用户再次访问登录和注册页面（暂时的限制）
            next(from.path);
        }else{
            // 允许已登录用户访问其他页面
            next();
        }
    }
});

//导出路由
export default router