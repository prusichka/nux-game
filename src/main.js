import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/reset.css'
import '@/assets/css/main.css'
import { ValidationProvider, extend } from 'vee-validate'
import { required, alpha, regex } from 'vee-validate/dist/rules'
extend('required', {
	...required,
	message: 'This field is required',
})
extend('alpha', {
	...alpha,
	message: 'This field may only contain alphabetic characters.',
})

extend('regex', {
	...regex,
	message: 'This field may only contain numeric and symbols',
})

Vue.config.productionTip = false
Vue.component('ValidationProvider', ValidationProvider)

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
