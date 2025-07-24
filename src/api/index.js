import axios from 'axios';

const api = axios.create({
	baseURL: '/api',
	headers: {
		accept: 'application/json',
	},
});

const apiKey = process.env.API_KEY;

export const getData = async (params) => {
	let url = `/api/${params.target}?key=${apiKey}&dateFrom=${params.dateFrom}&page=${params.page}`;
	if (params.dateTo) url += `&dateTo=${params.dateTo}`;

	const res = await api.get(url);
	return res.data.data;
};
