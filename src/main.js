import Router from './routes/router';

function bind() {
  const router = this;
  getMsg().then(res => {
    let ele = '';
    res.list.map(k => {
      ele += `<li>姓名：${k.name} 年龄：${k.age}</li>`;
    });
    router.render(`<ul>${ele}</ul>`);
  });
  //TODO 事件绑定无法销毁，引起冲突，vue-router是如何解决（事件代理么）
  // document.querySelector('body').addEventListener('click', e => {
  //   if (e.target.tagName.toLowerCase() === 'li') {
  //     console.log(e.target.innerText);
  //   }
  // });
}

function getMsg() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        msg: 'success',
        list: [{
          name: 'nuo',
          age: 28
        }, {
          name: 'lulu',
          age: 27
        }]
      };
      resolve(data);
    }, 1500);
    // const xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function() {
    //   if (xhr.readyState == 4) {
    //     resolve(JSON.parse(xhr.responseText));
    //   }
    // };
    // xhr.open('GET', "http://rap2api.taobao.org/app/mock/19359/test");
    // xhr.send();
  });
}

const routerArr = [
  {
    path: '/',
    name: 'index',
    title: '主页',
    // template: `<div>主页</div>`,
    // beforeRender: function() {
    //   this.template = `<div>哈哈哈</div>`;
    // }
    beforeBind: function() {
      const router = this;
      router.render(`<div>加载中</div>`);
    },
    bind: bind
  },
  {
    path: '/list',
    name: 'list',
    title: '列表',
    bind: function() {
      const router = this;
      router.render(`<ul><li>list1</li><li>list2</li></ul>`);
    }
    // template: `<div>列表页</div>`,
    // beforeRender: () => {console.log('render list');}
  },
  {
    redirect: '/504',
    name: '504',
    bind: () => {}
    // template: `<div>504 not found</div>`,
    // beforeRender: () => {console.log('504 NOT FOUND');}
  }];

const router = new Router(routerArr);