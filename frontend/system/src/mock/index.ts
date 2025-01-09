import Mock from 'mockjs';

Mock.mock('/api/login', 'post', {
  code: 200,
  msg: 'sucess',
  data: {}
});
Mock.setup({
  timeout: '600-1000'
});
