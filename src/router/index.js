import { createRouter, createWebHistory } from 'vue-router';
import Incomes from '../views/Incomes.vue';
import Orders from '../views/Orders.vue';
import Stocks from '../views/Stocks.vue';
import Sales from '../views/Sales.vue';

const routes = [
	{ path: '/', redirect: '/incomes' },
	{ path: '/incomes', component: Incomes },
	{ path: '/orders', component: Orders },
	{ path: '/stocks', component: Stocks },
	{ path: '/sales', component: Sales },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
