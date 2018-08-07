import Router from './routes/router';

const routerArr = [
  {
    path: '/',
    name: 'index',
    title: '主页',
    template: `<div>主页</div>`,
    render: () => {console.log('render index');}
  },
  {
    path: '/list',
    name: 'list',
    title: '列表',
    template: `<div>列表页</div>`,
    render: () => {console.log('render list');}
  }];

const router = new Router(routerArr);