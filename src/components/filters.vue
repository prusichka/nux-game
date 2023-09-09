<template>
	<div class="user__body__filters">
		<div class="col">
			<select
				v-model="statuses"
				name="statuses"
				id="statuses">
				<option value="all">All Statuses</option>
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
				v-model="filterId"
				name="ids"
				id="ids">
				<option :value="-1">All IDs</option>
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
				v-model="search"
				type="text"
				name=""
				placeholder="Search"
				id="" />
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
	name: 'filters',
	data() {
		return {
			filterId: -1,
			statuses: 'all',
			search: '',
		}
	},
	watch: {
		filterId() {
			this.$emit('set-filters', { id: this.filterId })
		},
		statuses() {
			this.$emit('set-filters', { status: this.statuses })
		},
		search() {
			this.$emit('set-filters', { search: this.search })
		},
	},
	computed: {
		...mapState({
			loggedUser: (s) => s.loggedUser,
			todoStatuses: (s) => s.todoStatuses,
		}),
		...mapGetters(['userIds']),
	},
	methods: {},
}
</script>

<style lang="scss" scoped>
.user__body__filters {
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
	margin-bottom: 20px;

	@media (max-width: 480px) {
		grid-template-columns: 1fr;
	}

	select {
		background: #fff;
		padding: 10px;
		width: 100%;
		border-radius: 5px;
		min-height: 40px;
	}
}
</style>
