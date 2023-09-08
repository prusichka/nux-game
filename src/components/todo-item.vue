<template>
	<div class="item">
		<h2>
			<span>{{ item.userId }}</span
			>{{ item.title }}
		</h2>
		<div class="item__actions">
			<label :for="`${item.id}complete`">
				Completed
				<input
					v-model="item.completed"
					@change="changeComplete"
					type="checkbox"
					name="complete"
					:id="`${item.id}complete`" />
			</label>
			<label :for="`${item.id}favorite`">
				Favorite
				<input
					v-model="item.favorite"
					@change="changeFavorite"
					type="checkbox"
					name="favorite"
					:id="`${item.id}favorite`" />
			</label>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
	name: 'todo-item',
	props: {
		item: {
			type: Object,
			required: true,
			default: () => {},
		},
	},
	methods: {
		...mapMutations(['CHANGE_COMPLETE', 'CHANGE_FAVORITE']),
		changeComplete(e) {
			let data = {
				todoId: this.item.id,
				completed: e.target.checked,
			}
			this.CHANGE_COMPLETE(data)
		},
		changeFavorite(e) {
			let data = {
				todoId: this.item.id,
				favorite: e.target.checked,
			}
			this.CHANGE_FAVORITE(data)
		},
	},
}
</script>

<style lang="scss" scoped>
.item {
	width: 100%;
	border-radius: 5px;
	background: #919191;
	padding: 20px 10px;
	display: flex;
	justify-content: space-between;
	align-items: stretch;

	&:not(:last-child) {
		margin-bottom: 10px;
	}

	h2 {
		span {
			padding-right: 10px;
		}
	}
}
</style>
