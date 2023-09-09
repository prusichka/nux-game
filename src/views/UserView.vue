<template>
	<section class="user">
		<div class="container">
			<div class="user__header">
				<PersonalInfo />
			</div>
			<div class="user__addnew">
				<h2>Add new</h2>
				<AddNewForm />
			</div>
			<div class="user__body">
				<h2>Todos</h2>
				<Filters @set-filters="setFilters" />
				<div v-if="todosLoading">Loading...</div>
				<div
					v-else
					class="todos">
					<template v-if="todos.length">
						<TodoItem
							v-for="item in todos"
							:key="item.id"
							:item="item" />
					</template>
					<p v-else>Not Found</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import TodoItem from '@/components/todo-item.vue'
import PersonalInfo from '@/components/personal-info.vue'
import Filters from '@/components/filters.vue'
import AddNewForm from '@/components/add-new-form.vue'
import { mapState, mapActions } from 'vuex'
export default {
	name: 'UserView',
	components: { TodoItem, Filters, AddNewForm, PersonalInfo },
	data() {
		return {
			todosLoading: false,
			todos: [],
			params: {
				id: -1,
				status: 'all',
				search: '',
			},
		}
	},
	computed: {
		...mapState({
			loggedUser: (s) => s.loggedUser,
			originalTodos: (s) => s.todos,
		}),
	},
	async mounted() {
		this.todosLoading = true
		this.todos = this.originalTodos.length
			? this.originalTodos
			: await this.getTodos()
		this.todosLoading = false
	},
	methods: {
		...mapActions({
			getTodos: 'getTodos',
		}),
		setFilters(filter) {
			this.params = { ...this.params, ...filter }
		},
		filterByStatus(array) {
			return array.filter((todo) => {
				switch (this.params.status) {
					case 'complete':
						return todo.completed
					case 'uncomplete':
						return !todo.completed
					case 'favorites':
						return todo.favorite
					default:
						return todo
				}
			})
		},
		filterByIds(array) {
			return array.filter((todo) =>
				this.params.id !== -1 ? todo.userId === this.params.id : todo
			)
		},
		filterBySearch(array) {
			return array.filter((todo) => {
				return this.params.search ? this.searchByTitle(todo.title) : todo
			})
		},
		searchByTitle(title) {
			return title.toLowerCase().includes(this.params.search.toLowerCase())
		},
		filterTodos() {
			let res = this.originalTodos
			res = this.filterByStatus(res)
			res = this.filterByIds(res)
			res = this.filterBySearch(res)
			return res
		},
	},
	watch: {
		params: {
			handler() {
				this.todos = this.filterTodos()
			},
			deep: true,
		},
		originalTodos: {
			handler() {
				this.todos = this.filterTodos()
			},
			deep: true,
		},
	},
}
</script>

<style lang="scss" scoped>
.todos {
	display: flex;
	flex-direction: column;
	margin-top: 10px;
	width: 100%;
	max-width: 700px;
	margin-inline: auto;

	p {
		margin-bottom: 20px;
		text-align: center;
	}
}
.user {
	height: 100%;
	background: #545454;
	overflow-y: auto;

	&__header {
		width: 100%;
		display: flex;
		align-items: stretch;
		justify-content: space-between;
		padding: 30px 0;
	}
	&__addnew {
		background: #919191;
		border-radius: 5px;
		width: 100%;
		max-width: 700px;
		margin-inline: auto;
		padding: 15px;
		margin-bottom: 30px;

		h2 {
			text-align: center;
			margin-bottom: 30px;
		}
	}
	&__body {
		h2 {
			text-align: center;
			margin-bottom: 30px;
		}
	}
}
</style>
