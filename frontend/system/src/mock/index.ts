import Mock from 'mockjs';

Mock.mock('/api/user', 'get', {
	code: 200,
	message: 'success',
	data: {
		name: 'Arco',
		age: 20,
	},
});
Mock.setup({
	timeout: '600-1000',
});
