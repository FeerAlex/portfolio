import './message.scss';
import template from './message.pug';

/* FONTS */
import '../../fonts/Roboto-Regular.ttf';

export default class Message {
  constructor(opt) {
    this.elem = document.createElement('div');
    this.elem.className = 'message';
    this.elem.innerHTML = template(opt);

    this.textBox = this.elem.querySelector('.message__text');
    this.close = this.elem.querySelector('.button');

    this.close.onclick = () => {
      this.elem.classList.remove('message--show');
    };
  }

  text(msg) {
    this.textBox.innerHTML = msg;
  }

  show() {
    this.elem.classList.add('message--show');
  }
}