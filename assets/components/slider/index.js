import './slider.scss';
import template from './slider.pug';

import appSlider from '../modules/slider';
let slider = new appSlider();

/* FONTS */
import '../../fonts/Roboto-Medium.ttf';

/* ICONS */
import '../../img/icons/link.svg';
import '../../img/icons/portf_arrow_down.svg';
import '../../img/icons/portf_arrow_up.svg';

export default class Slider {
  constructor(opt) {
    this.elem = document.createElement('div');
    this.elem.className = 'slider';
    this.elem.innerHTML = template(opt);

    this.slideUp = this.elem.querySelector('.slider__switch-link--up');
    this.slideDown = this.elem.querySelector('.slider__switch-link--down');
    this.slideDown.onclick = (e) => slider.slideDown(e);
    this.slideUp.onclick = (e) => slider.slideUp(e);
  }
}