<template>
	<div class="form">
		<ValidationObserver
			ref="observer"
			v-slot="{ invalid }">
			<form @submit.prevent="onSubmit">
				<div class="form__field">
					<ValidationProvider
						rules="required"
						v-slot="{ errors }">
						<select
							v-model="todo.userId"
							name="newids"
							id="newids">
							<option
								v-for="userId in userIds"
								:key="userId"
								:value="userId">
								{{ userId }}
							</option>
						</select>
						<span class="form__field__error">{{ errors[0] }}</span>
					</ValidationProvider>
				</div>
				<div class="form__field">
					<ValidationProvider
						rules="required"
						v-slot="{ errors }">
						<input
							v-model.lazy="todo.title"
							type="text"
							name="todoTitle"
							id="todoTitle"
							placeholder="Title"
							autocomplete="off" />
						<span class="form__field__error">{{ errors[0] }}</span>
					</ValidationProvider>
				</div>
				<button
					type="submit"
					:disabled="invalid">
					Add
				</button>
			</form>
		</ValidationObserver>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
	name: 'add-new-form',
	data() {
		return {
			todo: {
				userId: null,
				title: '',
			},
		}
	},
	computed: {
		...mapGetters(['userIds']),
	},
	methods: {
		...mapMutations({
			addNew: 'ADD_NEW_TODO',
		}),
		onSubmit() {
			this.addNew(this.todo)
			this.todo = {
				userId: null,
				title: '',
			}
			this.$refs.observer.reset()
		},
	},
}
</script>

<style lang="scss" scoped></style>
