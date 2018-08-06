class Router {
  constructor(opt) {
    const { pathArr, ...opts } = opt;
    this.opts = opts;
    this.pathArr = pathArr;
    this.init();
    console.log('pathArr==>>', this.pathArr, 'opts==>>', opts);
  }

  init() {
    this.bindEvent();
  }

  bindEvent() {
    window.addEventListener('hashchange', (e) => {
      console.log('e==>>', e);
    });

  }
}


export default Router;