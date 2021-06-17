import Vue from 'vue';
import Router from 'vue-router';
import Customers from './components/Customers.vue';
import AddCustomer from './components/AddCustomer.vue';
import CustomerDetail from './components/CustomerDetail.vue';
import AddAddress from './components/AddAddress.vue';

Vue.use(Router);

let router = new Router({
	routes: [
		{
			path: '/customers',
			name: 'customers',
			component: Customers,
		},
    {
			path: '/customers/add',
			name: 'customers_add',
			component: AddCustomer,
		},
    {
			path: '/customer/:id',
			name: 'customer_detail',
			component: CustomerDetail,
		},
    {
			path: '/customer/:id/address/add',
			name: 'address_add',
			component: AddAddress,
		},
    {
      path: '*',
      redirect: '/customers'
    }
	]
});

export default router;
