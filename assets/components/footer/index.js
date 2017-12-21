'use strict';

import '../../fonts/Roboto-Light.ttf';
import '../../fonts/Roboto-LightItalic.ttf';
import '../../fonts/Roboto-Medium.ttf';
import './footer.scss';
import template from './footer.pug';

import Social from '../../components/socials';

let social = new Social();

export default class Footer {
  constructor(opt) {
    this.elem = document.createElement('footer');
    this.elem.className = 'footer';
    this.elem.innerHTML = template(opt);
    this.elem.querySelector('.footer__socials').appendChild(social.elem);
  }
}