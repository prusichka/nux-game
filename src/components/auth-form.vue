<template>
	<div class="form">
		<h2>description</h2>
		<form>
			<ValidationProvider
				rules="required|alpha"
				v-slot="{ errors }">
				<input
					v-model.lazy="user.name"
					type="text"
					name="username"
					id="username"
					placeholder="Username"
					autocomplete="off" />
				<span>{{ errors[0] }}</span>
			</ValidationProvider>
			<ValidationProvider
				:rules="{ regex: /^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\|/-]+$/i }"
				v-slot="{ errors }">
				<input
					v-model.lazy="user.phone"
					type="text"
					name="phonenumber"
					id="phonenumber"
					placeholder="Phone Number"
					autocomplete="off" />
				<span>{{ errors[0] }}</span>
			</ValidationProvider>
			<button
				type="button"
				@click="submit2">
				Register
			</button>
		</form>
	</div>
</template>

<script>
export default {
	name: 'auth-form',
	data() {
		return {
			user: {
				name: '',
				phone: '',
			},
		}
	},
	methods: {
		submit2() {},
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

	input {
		margin-bottom: 20px;
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
