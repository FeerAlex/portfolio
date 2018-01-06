import 'normalize.css';
import './about.scss';

/* FONTS */
import '../../fonts/Roboto-Regular.ttf';
import '../../fonts/Sansus-Webissimo-Regular.ttf';

/* ICONS */
import '../../img/icons/ellipse.svg';
import '../../img/icons/about_header.svg';
import '../../img/icons/about_bg.svg';

/* COMPONENTS */
import Preloader from '../../components/preloader';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Map    from '../../components/map';

/* MY JS */
import Skill from '../../components/skills';

let header = new Header();
let footer = new Footer();
let map   = new Map();

let ellipses = document.querySelectorAll('.circular');
let wrapper = document.querySelector('#wrapper');
let main = document.querySelector('.main');

wrapper.insertBefore(header.elem, main);
main.appendChild(map.elem);
wrapper.appendChild(footer.elem);

Array.from(ellipses).map((ellipse) => {
  let percent = ellipse.getAttribute('data-percent');
  let svg = ellipse.querySelector('svg');
  let circle  = new Skill(150, 150, svg, percent / 100);

  circle.draw();
});

console.log('in about.js');

let preloader = new Preloader();

$(document).ready(function() {
  console.log('ready!');
  preloader.init();
});