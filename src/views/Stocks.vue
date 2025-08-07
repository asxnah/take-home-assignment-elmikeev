<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Table from '../components/Table.vue';
import { getData } from '../api/index';

const route = useRoute();
const router = useRouter();

const stocks = ref([]);
const waiting = ref(true);
const supplierArticle = ref('');
const isSupply = ref(false);
const searchPage = ref('1');
const headers = [
	'Дата',
	'Дата последнего изменения',
	'Артикул поставщика',
	'Технический размер',
	'Штрихкод',
	'Количество',
	'Поставка',
	'Реализация',
	'Полное количество',
	'Название склада',
	'В пути к клиенту',
	'В пути от клиента',
	'ID товара',
	'Тема',
	'Категория',
	'Бренд',
	'Код SC',
	'Цена',
	'Скидка',
];
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const todayDate = `${year}-${month}-${day}`;

const load = async () => {
	waiting.value = true;
	try {
		const data = await getData({
			target: 'stocks',
			dateFrom: todayDate,
			page: searchPage.value,
		});
		stocks.value = data;
	} catch (e) {
		console.error(e);
	} finally {
		waiting.value = false;
	}
};

const search = async () => {
	if (!supplierArticle.value) return;

	waiting.value = true;

	try {
		const data = await getData({
			target: 'stocks',
			dateFrom: todayDate,
			page: searchPage.value,
		});

		stocks.value = data.filter((item) => {
			const supplierMatch = item.supplier_article === supplierArticle.value;
			const isSupplyMatch = isSupply.value ? item.is_supply === true : true;
			return supplierMatch && isSupplyMatch;
		});
	} catch (e) {
		console.error(e);
	} finally {
		waiting.value = false;
	}
};

const reset = async () => {
	supplierArticle.value = '';
	isSupply.value = false;
	searchPage.value = '1';
	await load();
};

const update = async (page) => {
	if (searchPage.value === page) return;
	router.push({ path: '/stocks', query: { page } });
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
		<h1>Склады</h1>

		<form class="search" @submit.prevent="search">
			<div>
				<input
					type="text"
					name="supplierArticle"
					placeholder="Артикул поставщика"
					v-model="supplierArticle"
				/>
			</div>
			<div class="checkbox">
				<input type="checkbox" name="isSupply" v-model="isSupply" />
				<label for="isSupply">Поставка</label>
			</div>
			<button type="submit" :disabled="waiting">
				{{ waiting ? '...' : 'Найти' }}
			</button>
			<button @click.prevent="reset" class="inlineButton">↺</button>
		</form>

		<div v-if="waiting">Загрузка...</div>
		<Table v-else :data="stocks" :headers="headers" />

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

<style scoped>
form div:first-of-type {
	flex: 1;
}
form div:last-of-type {
	flex: 0;
}
</style>
