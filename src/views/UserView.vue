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
				<div class="user__body__filters">
					<div class="col">
						<select
							name=""
							id="">
							<option value="">All Statuses</option>
							<option
								v-for="status in todoStatuses"
								:key="status"
								:value="status">
								{{ status }}
							</option>
						</select>
					</div>
					<div class="col">
						<select
							name=""
							id="">
							<option value="">All IDs</option>
							<option
								v-for="userId in userIds"
								:key="userId"
								:value="userId">
								{{ userId }}
							</option>
						</select>
					</div>
					<div class="col">
						<input
							type="text"
							name=""
							placeholder="Search"
							id="" />
					</div>
				</div>
				<div v-if="todosLoading">Loading...</div>
				<div
					v-else
					class="todos">
					<div
						v-for="todo in todos"
						:key="todo.id"
						class="todo">
						<p v-for="(el, _idx) in todo">{{ _idx }} => {{ el }};</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
	name: 'UserView',
	data() {
		return {
			todosLoading: false,
		}
	},
	computed: {
		...mapState({
			loggedUser: (s) => s.loggedUser,
			todos: (s) => s.todos,
			todoStatuses: (s) => s.todoStatuses,
		}),
		...mapGetters(['userIds']),
	},
	methods: {
		...mapActions({
			getTodos: 'getTodos',
		}),
	},
	created() {
		console.log(this.todoStatuses)
	},
	async mounted() {
		this.todosLoading = true
		await this.getTodos()
		this.todosLoading = false
	},
}
</script>

<style lang="scss" scoped>
select {
	background: #fff;
	padding: 10px;
	width: 100%;
	border-radius: 5px;
	min-height: 40px;
}

.todos {
	display: flex;
	flex-direction: column;
	margin-top: 10px;
}
.todo {
	width: 100%;
	max-width: 600px;
	margin-inline: auto;
	padding: 10px 30px;
	border-radius: 5px;
	background: #919191;
	&:not(:last-child) {
		margin-bottom: 5px;
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
		&__filters {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.col {
				width: 100%;
				max-width: 33%;
			}
		}
		h2 {
			text-align: center;
			margin-bottom: 30px;
		}
	}
}
</style>
