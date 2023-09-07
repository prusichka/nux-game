<template>
	<section class="auth">
		<div class="auth__card">
			<div class="auth__card__header">
				<h1>description</h1>
			</div>
			<div class="auth__card__body">
				<auth-form />
			</div>
		</div>
	</section>
</template>

<script>
import AuthForm from '@/components/auth-form.vue'
export default {
	name: 'AuthView',
	components: { AuthForm },
}
</script>

<style lang="scss" scoped>
.auth {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	background: #545454;

	&__card {
		border-radius: 5px;
		background: #c3c3c3;
		width: 100%;
		max-width: 450px;
		margin-inline: auto;

		&__header {
			background: #a5a5a5;
			padding: 15px 0;
			border-top-right-radius: 5px;
			border-top-left-radius: 5px;
			h1 {
				text-align: center;
				color: #5f5f5f;
				font-size: 17px;
				line-height: 21px;
				letter-spacing: -0.425px;
			}
		}
		&__body {
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
			background: #c3c3c3;
			padding: 15px 25px 30px;
		}
	}
}
</style>
