<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
	<header>
		<nav>
			<ul class="nav">
				<li>
					<router-link
						to="/incomes"
						:class="route.path === '/incomes' && 'active'"
					>
						Доходы
					</router-link>
				</li>
				<li>
					<router-link
						to="/stocks"
						:class="route.path === '/stocks' && 'active'"
					>
						Склады
					</router-link>
				</li>
				<li>
					<router-link to="/sales" :class="route.path === '/sales' && 'active'">
						Продажи
					</router-link>
				</li>
				<li>
					<router-link
						to="/orders"
						:class="route.path === '/orders' && 'active'"
					>
						Заказы
					</router-link>
				</li>
			</ul>
		</nav>
	</header>
	<router-view></router-view>
	<footer class="footer-nav">
		<ul class="footer-list">
			<h4>Навигация</h4>
			<li>
				<router-link to="/" :class="route.path === '/' && 'active'">
					Доходы
				</router-link>
			</li>
			<li>
				<router-link to="/stocks" :class="route.path === '/stocks' && 'active'">
					Склады
				</router-link>
			</li>
			<li>
				<router-link to="/sales" :class="route.path === '/sales' && 'active'">
					Продажи
				</router-link>
			</li>
			<li>
				<router-link to="/orders" :class="route.path === '/orders' && 'active'">
					Заказы
				</router-link>
			</li>
		</ul>
		<ul class="footer-list">
			<h4>Разработчик</h4>
			<li><a href="https://github.com/asxnah" target="_blank">GitHub</a></li>
			<li><a href="https://vk.com/id187555807" target="_blank">VK</a></li>
		</ul>
		<ul class="footer-list">
			<li><p>2025 All Rights Reserved</p></li>
			<li>
				<button class="inline-button" @click="scrollToTop">Наверх</button>
			</li>
		</ul>
	</footer>
</template>

<style scoped></style>
