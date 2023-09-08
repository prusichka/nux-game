import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)
const isLogged = (to, from, next) => {
	Object.keys(store.state.loggedUser).length ? next() : next({ name: 'auth' })
}

const routes = [
	{
		path: '/',
		name: 'auth',
		component: () =>
			import(/* webpackChunkName: "auth" */ '../views/AuthView.vue'),
	},
	{
		path: '/user',
		name: 'UserView',
		beforeEnter: isLogged,
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
