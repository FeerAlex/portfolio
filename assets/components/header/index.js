'use strict';

import './header.scss';
import template from './header.pug';
import Social from '../../components/socials';
import User from '../../components/user';
import '../../img/icons/arrow_down.svg';
import '../../img/icons/hamburger.svg';

let social = new Social();
let user = new User();

social.elem.classList.add('socials--green');

export default class Header {
  constructor(opt) {
    this.elem = document.createElement('header');
    this.elem.className = 'header';
    this.elem.innerHTML = template(opt);

    this.elem.querySelector('.header__socials').appendChild(social.elem);
    this.elem.querySelector('.header__user').appendChild(user.elem);
  }
}