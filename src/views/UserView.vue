<template>
	<section class="user">
		<div class="container">
			<div class="user__header">
				<div class="user__header__personal">
					<h1>
						Name: <span>{{ loggedUser.name }}</span>
					</h1>
					<h2>
						Username: <span>{{ loggedUser.username }}</span>
					</h2>
					<h3>
						Email: <span>{{ loggedUser.email }}</span>
					</h3>
					<h4>
						Phone: <span>{{ loggedUser.phone }}</span>
					</h4>
					<h5>
						Website: <span>{{ loggedUser.website }}</span>
					</h5>
				</div>
				<div class="user__header__personal">
					<div>
						<h6>Address</h6>
						<p
							v-for="(inf, _idx) in loggedUser.address"
							:key="_idx">
							{{ _idx }}: {{ inf }}
						</p>
					</div>
					<div class="divider"></div>
					<div>
						<h6>Company</h6>
						<p
							v-for="(inf, _idx) in loggedUser.company"
							:key="_idx">
							{{ _idx }}: {{ inf }}
						</p>
					</div>
				</div>
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
import Filters from '@/components/filters.vue'
import { mapState, mapActions } from 'vuex'
export default {
	name: 'UserView',
	components: { TodoItem, Filters },
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
		this.todos = await this.getTodos()
		this.todosLoading = false
	},
	methods: {
		...mapActions({
			getTodos: 'getTodos',
		}),
		setFilters(filter) {
			this.params = { ...this.params, ...filter }
		},
	},
	watch: {
		params: {
			handler() {
				this.todos = this.originalTodos
					.filter((todo) =>
						this.params.id !== -1 ? todo.userId === this.params.id : todo
					)
					.filter((todo) => {
						if (this.params.status === 'all') {
							return todo
						} else if (this.params.status === 'complete') {
							return todo.completed
						} else if (this.params.status === 'uncomplete') {
							return !todo.completed
						} else if (this.params.status === 'favorites') {
							return todo.favorite
						}
					})
					.filter((todo) => {
						return this.params.search
							? todo.title
									.toLowerCase()
									.includes(this.params.search.toLowerCase())
							: todo
					})
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

		&__personal {
			color: #fff;
			padding: 10px;
			border-radius: 14px;
			background: #919191;
			width: 100%;
			max-width: 49%;
			font-size: 17px;
			line-height: 21px;
			letter-spacing: -0.425px;
			h6 {
				margin-bottom: 20px;
				font-size: 24px;
			}
			p {
				text-transform: capitalize;
			}
			span {
				padding-left: 15px;
			}
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
