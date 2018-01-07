import './qtip.scss';
import template from './qtip.pug';

/* FONTS */
import '../../fonts/Roboto-Regular.ttf';

export default class Qtip {
  constructor(opt) {
    this.elem = document.createElement('div');
    this.elem.className = 'qtip';
    this.elem.innerHTML = template(opt);

    this.textBox = this.elem.querySelector('.qtip__text');
  }

  text(msg) {
    this.textBox.innerHTML = msg;
  }
}