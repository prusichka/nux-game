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
			await this.logIn(userData)
		},
	},
}
</script>

<style lang="scss" scoped>
.form {
	width: 100%;

	h2 {
		color: #5f5f5f;
		font-size: 15px;
		line-height: 21px;
		letter-spacing: -0.375px;
		margin-bottom: 15px;
	}

	&__field {
		margin-bottom: 20px;
		position: relative;

		&__error {
			position: absolute;
			bottom: -18px;
			left: 0;
			color: red;
		}
	}

	button {
		border-radius: 5px;
		background: #519945;
		padding: 10px 30px;
		width: 100%;
		color: #fff;
		font-size: 17px;
		font-weight: 600;
		line-height: 21px;
		letter-spacing: -0.425px;
		transition: background-color 0.3s ease;

		&:hover {
			background: #66a75b;
		}
	}
}
</style>
