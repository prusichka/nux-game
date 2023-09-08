import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/auth',
		name: 'auth',
		component: () =>
			import(/* webpackChunkName: "auth" */ '../views/AuthView.vue'),
	},
	{
		path: '/user',
		name: 'UserView',
		component: () =>
			import(/* webpackChunkName: "user-view" */ '../views/UserView.vue'),
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
