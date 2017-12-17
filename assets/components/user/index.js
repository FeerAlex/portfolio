'use strict';

import '../../fonts/Roboto-Regular.ttf';
import '../../fonts/Roboto-Medium.ttf';
import './user.scss';
import template from './user.pug';

export default class Header {
  constructor(opt) {
    this.elem = document.createElement('div');
    this.elem.className = 'user';
    this.elem.innerHTML = template(opt);
  }
}