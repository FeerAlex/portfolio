'use strict';

import '../../fonts/Roboto-Light.ttf';
import '../../fonts/Roboto-LightItalic.ttf';
import './footer.scss';
import template from './footer.pug';

export default class Footer {
  constructor(opt) {
    this.elem = document.createElement('footer');
    this.elem.className = 'footer';
    this.elem.innerHTML = template(opt);
  }
}