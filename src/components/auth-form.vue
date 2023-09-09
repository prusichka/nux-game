<template>
	<div class="form">
		<h2>description</h2>
		<ValidationObserver v-slot="{ invalid }">
			<form @submit.prevent="onSubmit">
				<div class="form__field">
					<ValidationProvider
						rules="required|alpha_spaces"
						v-slot="{ errors }">
						<input
							v-model.lazy="user.name"
							type="text"
							name="username"
							id="username"
							placeholder="Username"
							autocomplete="off" />
						<span class="form__field__error">{{ errors[0] }}</span>
					</ValidationProvider>
				</div>
				<div class="form__field">
					<ValidationProvider
						:rules="{ regex: /^[0-9!@#\$%^&*()_+{}\[\]:;<>,.?~\\|\-=\/\s]*$/ }"
						v-slot="{ errors }">
						<input
							v-model.lazy="user.phone"
							type="text"
							name="phonenumber"
							id="phonenumber"
							placeholder="Phone Number"
							autocomplete="off" />
						<span class="form__field__error">{{ errors[0] }}</span>
					</ValidationProvider>
				</div>
				<button
					type="submit"
					:disabled="invalid">
					Login
				</button>
				<p
					v-if="authStatus"
					class="form__auth__error">
					{{ authStatus }}
				</p>
			</form>
		</ValidationObserver>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'auth-form',
	data() {
		return {
			user: {
				name: 'Kamren',
				phone: '(254)954-1289',
			},
			authStatus: '',
		}
	},
	methods: {
		...mapActions({
			logIn: 'logIn',
		}),

		async onSubmit() {
			let userData = {
				username: this.user.name,
				phone: this.user.phone,
			}
			this.authStatus = await this.logIn(userData)
		},
	},
}
</script>

<style lang="scss" scoped></style>
