import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '@/router'

const setFavorites = (todos, favorites) => {
	return todos.map((el) => {
		let favorite = favorites.find((item) => item === el.id)
		return {
			...el,
			favorite: !!favorite,
		}
	})
}

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		users: [],
		loggedUser: {},
		todos: [],
		todoStatuses: ['complete', 'uncomplete', 'favorites'],
		favorites: [],
	},
	getters: {
		userIds: ({ users }) => {
			return users.map((user) => user.id)
		},
	},
	mutations: {
		SET_USERS: (state, users) => {
			state.users = users
		},
		SET_LOGGED_USER: (state, loggedUser) => {
			state.loggedUser = loggedUser
		},
		SET_TODOS: (state, todos) => {
			state.todos = setFavorites(todos, state.favorites)
		},
		CHANGE_COMPLETE: (state, data) => {
			state.todos = state.todos.map((todo) => {
				if (todo.id === data.todoId) {
					todo.completed = data.completed
				}
				return todo
			})
		},
		CHANGE_FAVORITE: (state, data) => {
			state.todos = state.todos.map((todo) => {
				if (todo.id === data.todoId) {
					todo.favorite = data.favorite
					if (data.favorite) {
						state.favorites.push(data.todoId)
					} else {
						state.favorites = state.favorites.filter((el) => el !== data.todoId)
					}
				}
				return todo
			})
		},
		ADD_NEW_TODO: (state, data) => {
			let newTodo = {
				completed: false,
				favorite: false,
				id: state.todos.length + 1,
				...data,
			}
			state.todos.unshift(newTodo)
		},
	},
	actions: {
		async getTodos({ commit, rootState }) {
			try {
				const res = await axios.get(
					'https://jsonplaceholder.typicode.com/todos'
				)
				commit('SET_TODOS', res.data)
				return setFavorites(res.data, rootState.favorites)
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
				return 'Login error'
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
			key: 'nuxgame',
		}),
	],
})
