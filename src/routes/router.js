defaultRedirect = {
  redirect: '/404',
  name: '404',
  template: `<div>404 not found</div>`,
  render: () => {console.log('404 NOT FOUND');}
};

// todo 不支持子路由、无法异步请求数据渲染模版
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
    if (!hasIndex(this.pathArr, url) && !(this.redirect[0].redirect === url)) {
      window.location.hash = this.redirect[0].redirect;
      return;
    }
    if (hasIndex(this.pathArr, url)) {
      currentRoute = this.routerArr[(this.pathArr.indexOf(url))];
      element = currentRoute.template;
    } else {
      currentRoute = this.redirect[0];
      element = currentRoute.template;
    }
    currentRoute.render && currentRoute.render();
    if (element) {
      this.render(element);
    }

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
  if (!Array.isArray(arr)) return;
  return arr.indexOf(index) >= 0;
}


module.exports = Router;