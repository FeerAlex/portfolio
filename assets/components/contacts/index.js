import './contacts.scss';
import template from './contacts.pug';

/* FONTS */
import '../../fonts/Roboto-Medium.ttf';

/* ICONS */
import '../../img/icons/skype.svg';
import '../../img/icons/email.svg';
import '../../img/icons/map-marker.svg';
import '../../img/icons/phone.svg';

export default class Contacts {
  constructor(opt) {
    this.elem = document.createElement('div');
    this.elem.className = 'contacts';
    this.elem.innerHTML = template(opt);
  }
}