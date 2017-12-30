import './slider.scss';
import template from './slider.pug';

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
  }
}