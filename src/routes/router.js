defaultRedirect = {
  redirect: '/404',
  name: '404',
  template: `<div>404 not found</div>`,
  render: () => {console.log('404 NOT FOUND');}
};

// 实现异步请求数据渲染模版，渲染方法的设计及与外部传入配置component的结合
// 路由渲染采用暴露接口给外部的方式，在bind钩子的回调内进行异步
// TODO 确定路由的页面缓存，避免每次重新请求数据渲染
// TODO router的跳转和回退方法重写
// TODO 实现beforeEnter afterEnter beforeLeave afterLeave钩子
// TODO 实现局部路由
class Router {
  constructor(routerArr) {
    this.url = spliceHash(location.href);
    this.routerArr = routerArr;
    this.pathArr = routerArr.map(k => k.path);
    this.redirect = routerArr.filter(k => (k.redirect)).length > 0 ? routerArr.filter(k => (k.redirect)) : [defaultRedirect];
    this.hashHistory = [];
    this.init();
  }

  init() {
    this.hashFn(this.url);
    this.bindEvent();
  }

  hashFn(url) {
    let currentRoute, element;
    const dom = document.querySelector('body');
    if (!hasIndex(this.pathArr, url) && !(this.redirect[0].redirect === url)) {
      window.location.hash = this.redirect[0].redirect;
      return;
    }
    if (hasIndex(this.pathArr, url)) {
      currentRoute = this.routerArr[(this.pathArr.indexOf(url))];
      // element = currentRoute.template;
    } else {
      currentRoute = this.redirect[0];
      // element = currentRoute.template;
    }
    try {
      currentRoute.bind.call(this, dom);
    } catch (e) {
      console.log(e);
    }
    // console.log('currentRoute==>>', currentRoute);

    // console.log('before routerArr', this.routerArr);
    // TODO 渲染和触发beforeRender的方法
    // if (element) {
    //   this.render(element);
    // }
    // if (currentRoute) {
    //   currentRoute.beforeRender();
    // }
    // console.log('after routerArr', this.routerArr);

  }

  render(element) {
    document.querySelector('body').innerHTML = element;
  }

  bindEvent() {
    window.addEventListener('hashchange', (e) => {
      const url = spliceHash(e.newURL);
      this.hashFn(url);
    });
  }

  // 跳转到路由
  push(url) {
    window.location.hash = url;
  }

  goBack() {
    window.history.back();
  }
}


function spliceHash(url) {
  let str;
  const hashIndex = url.indexOf('#');
  if (hashIndex >= 0) {
    str = url.substr(hashIndex + 1);
  } else {
    str = '/';
  }
  return str;
}

function hasIndex(arr, index) {
  if (!Array.isArray(arr)) return false;
  return arr.indexOf(index) >= 0;
}


module.exports = Router;