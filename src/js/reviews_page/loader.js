export class Loader {
  constructor() {
    this.refs = {
      loaderBackdrop: document.querySelector('.sk-cube-box'),
    };
    this.startLoading();
    this.stopLoading();
  }
  startLoading() {
    this.refs.loaderBackdrop.classList.remove('invisible');
  }
  stopLoading() {
    this.refs.loaderBackdrop.classList.add('invisible');
  }
}
new Loader();
