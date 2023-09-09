<template>
	<div class="personal">
		<div class="personal__block">
			<h2>
				{{ info.name }} <span>{{ info.username }}</span>
			</h2>
			<h3>Email: {{ info.email }}</h3>
			<h3>Phone: {{ info.phone }}</h3>
			<h3>Website: {{ info.website }}</h3>
		</div>
		<div class="personal__block">
			<h2>Address</h2>
			<h3>Street: {{ info.address.street }}</h3>
			<h3>Suite: {{ info.address.suite }}</h3>
			<h3>City: {{ info.address.city }}</h3>
			<h3>Zipcode: {{ info.address.zipcode }}</h3>
			<h3>
				Geo: <span>Lat: {{ info.address.geo.lat }}</span
				><span>Lng: {{ info.address.geo.lng }}</span>
			</h3>
		</div>
		<div class="personal__block">
			<h2>Company</h2>
			<h3>Company name: {{ info.company.name }}</h3>
			<h3>Catch phrase: {{ info.company.catchPhrase }}</h3>
			<h3>BS: {{ info.company.bs }}</h3>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'personal-info',
	computed: {
		...mapState({
			info: (s) => s.loggedUser,
		}),
	},
}
</script>

<style lang="scss" scoped>
.personal {
	background: #919191;
	width: 100%;
	border-radius: 5px;
	padding: 20px 10px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 10px;

	&__block {
		h2 {
			font-size: 22px;
			margin-bottom: 10px;
		}

		h3 {
			font-size: 16px;
			&:not(:last-child) {
				margin-bottom: 10px;
			}
		}

		span {
			font-size: 12px;
			padding-left: 10px;
		}
	}

	@media (max-width: 768px) {
		grid-template-columns: 1fr 1fr;

		&__block {
			&:nth-child(3) {
				grid-column: span 2;
			}
		}
	}

	@media (max-width: 480px) {
		grid-template-columns: 1fr;

		&__block {
			&:nth-child(3) {
				grid-column: 1;
			}
		}
	}
}
</style>
