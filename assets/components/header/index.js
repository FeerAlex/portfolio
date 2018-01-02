'use strict';

import './header.scss';
import Parallax from '../parallax';

import template from './header.pug';

/* COMPONENTS */
import Social from '../../components/socials';
import User from '../../components/user';

/* ICONS */
import '../../img/icons/arrow_down.svg';
import '../../img/icons/hamburger.svg';
import '../../img/icons/portfolio_header.svg';

let social = new Social();
let user = new User();

social.elem.classList.add('socials--green');

export default class Header {
  constructor(opt) {
    this.elem = document.createElement('header');
    this.elem.className = 'header';
    this.elem.innerHTML = template(opt);

    let arrow = this.elem.querySelector('.header__arrow-link');
    arrow.onclick = (e) => {
      e.preventDefault();
      $('html,body').stop().animate({ scrollTop: this.elem.offsetHeight }, 1000);
    };

    const socials = this.elem.querySelector('.js-header__socials');
    const bg = this.elem.querySelector('.js-header__bg');
    const userBlock = this.elem.querySelector('.js-header__user');
    const sectionText = this.elem.querySelector('.js-header__portfolio-icon');

    userBlock.appendChild(user.elem);
    socials.appendChild(social.elem);

    window.onscroll = function() {
      let wScroll = window.pageYOffset;
      let parallaxBg = new Parallax(bg, wScroll, 90);
      let parallaxUser = new Parallax(userBlock, wScroll, 5);

      parallaxBg.move();
      parallaxUser.move();

      if(sectionText) {
        let parallaxsectionText = new Parallax(sectionText, wScroll, 25);
        parallaxsectionText.move();
      }
    };
  }
}