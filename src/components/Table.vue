<script>
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
	props: ['data', 'headers'],
	setup(props) {
		const { data, headers } = toRefs(props);
		return { data, headers };
	},
});
</script>

<template>
	<div class="table" v-if="data.length">
		<table>
			<thead>
				<tr>
					<th v-for="header in headers" :key="header">{{ header }}</th>
				</tr>
			</thead>
			<tbody></tbody>
			<tbody>
				<tr v-for="(row, rowIndex) in data" :key="rowIndex">
					<td v-for="(item, itemIndex) in row" :key="itemIndex">
						{{
							item === null
								? 'Не указано'
								: item === true
								? 'Да'
								: item === false
								? 'Нет'
								: item
						}}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<p v-else>Ничего не найдено</p>
</template>
