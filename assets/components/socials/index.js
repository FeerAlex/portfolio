'use strict';

import '../../img/icons/vk.svg';
import '../../img/icons/github.svg';
import '../../img/icons/in.svg';
import './socials.scss';
import template from './socials.pug';

export default class Socials {
  constructor(opt) {
    this.elem = document.createElement('div');
    this.elem.className = 'socials';
    this.elem.innerHTML = template(opt);
  }
}