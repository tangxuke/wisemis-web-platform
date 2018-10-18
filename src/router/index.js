import Vue from 'vue'
import VueRouter from 'vue-router'

import util from '@/libs/util.js'
Vue.use(VueRouter)
// 路由数据
//import routes from './my-router-index'

//import layoutHeaderAside from '@/layout/header-aside'

import MenuRoutes from './get-routes';
var p=MenuRoutes.then(routes => {
	const router = new VueRouter({
		routes: routes.routes
	});

	/**
 * 路由拦截
 * 权限验证
 */
	router.beforeEach((to, from, next) => {
		// 验证当前路由所有的匹配中是否需要有登陆验证的
		if (to.matched.some(r => r.meta.requiresAuth)) {
			// 这里暂时将cookie里是否存有token作为验证是否登陆的条件
			// 请根据自身业务需要修改
			const token = util.cookies.get('token')
			if (token && token !== 'undefined') {
				next()
			} else {
				// 没有登陆的时候跳转到登陆界面
				next({
					name: 'login'
				})
			}
		} else {
			// 不需要身份校验 直接通过
			next()
		}
	})

	router.afterEach(to => {
		// 需要的信息
		const app = router.app
		const { name, params, query } = to
		// 多页控制 打开新的页面
		app.$store.commit('d2adminPageOpenNew', { name, params, query })
		// 更改标题
		util.title(to.meta.title)
	})

	return Promise.resolve({router,customRoutes:routes.customRoutes});
});

export default p;

/**
 * 
// 导出路由 在 main.js 里使用
const router = new VueRouter({
	routes: [{
		path: '/',
		redirect: { name: 'index' },
		component: layoutHeaderAside,
		children: [
			{
				path: 'index',
				name: 'index',
				meta: { requiresAuth: true, title: '首页' },
				component: () => import('@/pages/index')
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/pages/login')
	},
	...routes,
	{
		path: '*',
		component: () => import('@/pages/error-page-404')
	}
	]
})
*/



//export default router
