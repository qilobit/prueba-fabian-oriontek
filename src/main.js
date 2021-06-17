import Vue from 'vue'
import App from './App.vue'
import router from './router';
import Swal from 'sweetalert2';
import helpers from './commons/helpers';

window.Swal = Swal;

Vue.use({
	install() {
		Vue.prototype.$helpers = helpers;
	}
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
