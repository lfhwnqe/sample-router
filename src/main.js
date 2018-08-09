import Router from './routes/router';

const routerArr = [
  {
    path: '/',
    name: 'index',
    title: '主页',
    // template: `<div>主页</div>`,
    // beforeRender: function() {
    //   this.template = `<div>哈哈哈</div>`;
    // }
    component:()=>{}
  },
  {
    path: '/list',
    name: 'list',
    title: '列表',
    // template: `<div>列表页</div>`,
    // beforeRender: () => {console.log('render list');}
  },
  {
    redirect: '/504',
    name: '504',
    // template: `<div>504 not found</div>`,
    // beforeRender: () => {console.log('504 NOT FOUND');}
  }];

const router = new Router(routerArr);