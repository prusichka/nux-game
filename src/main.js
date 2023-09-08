import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/reset.css'
import '@/assets/css/main.css'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, alpha_spaces, regex } from 'vee-validate/dist/rules'
import axios from 'axios'
import VueAxios from 'vue-axios'

extend('required', {
	...required,
	message: 'This field is required',
})
extend('alpha_spaces', {
	...alpha_spaces,
	message: 'This field may only contain alphabetic characters.',
})

extend('regex', {
	...regex,
	message: 'This field may only contain numeric and symbols',
})

Vue.config.productionTip = false
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.use(VueAxios, axios)

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
