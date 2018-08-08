defaultRedirect = {
  redirect: '/404',
  name: '404',
  template: `<div>404 not found</div>`,
  render: () => {console.log('404 NOT FOUND');}
};

class Router {
  constructor(routerArr) {
    this.routerArr = routerArr;
    this.pathArr = routerArr.map(k => k.path);
    this.redirect = routerArr.filter(k => (k.redirect));
    this.hashHistory = [];
    this.init();
  }

  init() {
    const url = spliceHash(location.href);
    this.hashFn(url);
    this.bindEvent();
  }

  hashFn(url) {
    let currentRoute, element;
    if (hasIndex(this.pathArr, url)) {
      currentRoute = this.routerArr[(this.pathArr.indexOf(url))];
    } else {
      // 重定向到默认
      currentRoute = this.redirect[0];
      if (!currentRoute) {
        currentRoute = defaultRedirect;
      }
      // todo 两次触发404 render的问题
      window.location.hash = currentRoute.redirect;
    }
    element = currentRoute.template;
    // 渲染dom
    document.querySelector('body').innerHTML = element;
    // 触发render钩子
    if (currentRoute.render) currentRoute.render();
  }

  bindEvent() {
    window.addEventListener('hashchange', (e) => {
      const url = spliceHash(e.newURL);
      this.hashFn(url);
      // let currentRoute, element;
      // if (hasIndex(this.pathArr, url)) {
      //   currentRoute = this.routerArr[(this.pathArr.indexOf(url))];
      // } else {
      //   // 重定向到默认
      //   currentRoute = this.redirect[0];
      //   if (!currentRoute) {
      //     currentRoute = defaultRedirect;
      //   }
      //   // todo 两次触发404 render的问题
      //   window.location.hash = currentRoute.redirect;
      // }
      // element = currentRoute.template;
      // // 渲染dom
      // document.querySelector('body').innerHTML = element;
      // // 触发render钩子
      // if (currentRoute.render) currentRoute.render();

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
  const hashIndex = url.indexOf('#');
  const str = url.substr(hashIndex + 1);
  return str;
}

function hasIndex(arr, index) {
  if (!Array.isArray(arr)) return;
  return arr.indexOf(index) >= 0;
}


module.exports = Router;