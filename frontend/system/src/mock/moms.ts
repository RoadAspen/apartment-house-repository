import Mock from 'mockjs';

Mock.mock('/api/v1/audios', 'get', {
  code: 200,
  msg: 'sucess',
  data: {
    audios: [{ id: 1, name: 'audio1' }]
  }
});
export default Mock;
