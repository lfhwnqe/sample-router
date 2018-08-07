class Router {
  constructor(opt) {
    const { pathArr, redirect } = opt;
    this.redirect = redirect;
    this.pathArr = pathArr;
    this.hashHistory = [];
    this.init();
  }

  setOpts() {
    if (!this.redirect) {
      this.redirect = '/404';
    }
  }

  init() {
    this.setOpts();
    this.bindEvent();
  }

  bindEvent() {
    window.addEventListener('hashchange', (e) => {
      const url = spliceHash(e.newURL);
      if (!hasIndex(this.pathArr, url)) {
        if (this.redirect) {
          this.push(this.redirect);
        } else {
          console.log('has no such path');
        }
      }
      this.hashHistory.push(url);
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
  console.log('str==>>', str);
  return str;
}

function hasIndex(arr, index) {
  if (!Array.isArray(arr)) return;
  return arr.indexOf(index) >= 0;
}


module.exports = Router;