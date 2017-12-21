import 'normalize.css';
import './about.scss';

/* FONTS */
import '../../fonts/Roboto-Regular.ttf';
import '../../fonts/Roboto-Medium.ttf';
import '../../fonts/Sansus-Webissimo-Regular.ttf';

/* ICONS */
import '../../img/icons/skype.svg';
import '../../img/icons/email.svg';
import '../../img/icons/map-marker.svg';
import '../../img/icons/phone.svg';
import '../../img/icons/ellipse.svg';
import '../../img/icons/about_header.svg';
import '../../img/icons/about_bg_left.svg';
import '../../img/icons/about_bg_right.svg';

/* COMPONENTS */
import Header from '../../components/header';
import Footer from '../../components/footer';

/* MY JS */
import Skill from '../../components/skills';

let header = new Header();
let footer = new Footer();

let ellipses = document.querySelectorAll('.circular');
let wrapper = document.querySelector('#wrapper');
let main = document.querySelector('.main');

wrapper.insertBefore(header.elem, main);
wrapper.appendChild(footer.elem);

Array.from(ellipses).map((ellipse) => {
  let percent = ellipse.getAttribute('data-percent');
  let svg = ellipse.querySelector('svg');
  let circle  = new Skill(150, 150, svg, percent / 100);

  circle.draw();
});

console.log('in about.js');