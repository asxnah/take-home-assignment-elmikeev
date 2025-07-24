<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Table from '../components/Table.vue';
import { getData } from '../api/index';

const route = useRoute();
const router = useRouter();

const sales = ref([]);
const waiting = ref(true);
const dateFrom = ref('2000-01-01');
const dateTo = ref('2025-12-31');
const searchPage = ref('1');
const headers = [
	'Номер',
	'Дата',
	'Дата последнего изменения',
	'Артикул поставщика',
	'Технический размер',
	'Штрихкод',
	'Общая цена',
	'Процент скидки',
	'Является поставкой',
	'Является реализацией',
	'Скидка по промокоду',
	'Название склада',
	'Название страны',
	'Название округа',
	'Название региона',
	'ID дохода',
	'ID продажи',
	'Один ID',
	'СПП',
	'К оплате',
	'Финальная цена',
	'Цена со скидкой',
	'ID товара',
	'Тема',
	'Категория',
	'Бренд',
	'Отменен',
];

const load = async () => {
	waiting.value = true;
	try {
		const data = await getData({
			target: 'sales',
			dateFrom: dateFrom.value,
			dateTo: dateTo.value,
			page: searchPage.value,
		});
		sales.value = data;
	} catch (e) {
		console.error(e);
	} finally {
		waiting.value = false;
	}
};

const reset = () => {
	dateFrom.value = '2000-01-01';
	dateTo.value = '2025-12-31';
	searchPage.value = '1';
	load();
};

const search = async () => {
	searchPage.value = '1';
	await load();
};

const update = async (page) => {
	if (searchPage.value === page) return;
	router.push({ path: '/sales', query: { page } });
	searchPage.value = page;
	await load();
};

onMounted(async () => {
	searchPage.value = route.query.page || '1';
	await load();
});
</script>

<template>
	<main>
		<h1>Продажи</h1>

		<form class="search" @submit.prevent="search">
			<div>
				<input type="date" name="dateFrom" v-model="dateFrom" />
			</div>
			<div>
				<input type="date" name="dateTo" v-model="dateTo" />
			</div>
			<button type="submit" :disabled="waiting">
				{{ waiting ? '...' : 'Найти' }}
			</button>
			<button @click.prevent="reset" class="inline-button">↺</button>
		</form>

		<div v-if="waiting">Загрузка...</div>
		<Table v-else :data="sales" :headers="headers" />

		<menu>
			<ul class="menu">
				<li>
					<button :class="{ active: searchPage === '1' }" @click="update('1')">
						1
					</button>
				</li>
				<li>
					<button :class="{ active: searchPage === '2' }" @click="update('2')">
						2
					</button>
				</li>
				<li>
					<button :class="{ active: searchPage === '3' }" @click="update('3')">
						3
					</button>
				</li>
			</ul>
		</menu>
	</main>
</template>

<style scoped></style>
