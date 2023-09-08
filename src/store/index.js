import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		users: [],
		loggedUser: {},
		todos: [],
		todoStatuses: ['Complete', 'UnComplete', 'Favorites'],
	},
	getters: {
		userIds: ({ users }) => {
			return users.map((user) => user.id)
		},
	},
	mutations: {
		SET_USERS: (state, data) => {
			state.users = data
		},
		SET_LOGGED_USER: (state, data) => {
			state.loggedUser = data
		},
		SET_TODOS: (state, data) => {
			state.todos = data
		},
	},
	actions: {
		async getTodos({ commit }) {
			try {
				const res = await axios.get(
					'https://jsonplaceholder.typicode.com/todos'
				)
				commit('SET_TODOS', res.data)
			} catch (e) {
				console.log(e)
			}
		},
		async logIn({ commit, rootState }, userData) {
			const result = rootState.users.find((user) => {
				return (
					user.phone === userData.phone && user.username === userData.username
				)
			})
			if (result) {
				console.log('Successfull logged')
				commit('SET_LOGGED_USER', result)
				await router.push({ name: 'UserView' })
			} else {
				console.log('Login error')
			}
		},
		async getUsers({ commit }) {
			try {
				const res = await axios.get(
					'https://jsonplaceholder.typicode.com/users'
				)
				commit('SET_USERS', res.data)
			} catch (e) {
				console.log(e)
			}
		},
	},
	plugins: [
		createPersistedState({
			key: 'pirena',
		}),
	],
})
