import 'normalize.css';
import './works.scss';

/* COMPONENTS */
import Preloader from '../../components/preloader';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Slider from '../../components/slider';

/* FONTS */
import '../../fonts/Roboto-Medium.ttf';
import '../../fonts/Roboto-Italic.ttf';
import '../../fonts/Roboto-BoldItalic.ttf';
import '../../fonts/Sansus-Webissimo-Regular.ttf';

/* ICONS */
import '../../img/icons/works_header.svg';
import '../../img/icons/bg.svg';
import '../../img/icons/about_header.svg';
import '../../img/icons/quote.svg';
import '../../img/icons/arrow_down.svg';

let header = new Header();
let footer = new Footer();
let slider = new Slider();

let wrapper = document.querySelector('#wrapper');
let main = document.querySelector('.main');
let blurJs = document.querySelector('.blur');
let slideShow = document.querySelector('.work__slider');

wrapper.insertBefore(header.elem, main);
blurJs.appendChild(footer.elem);
slideShow.appendChild(slider.elem);
slider.download();

let blur = (function() {
  let wrapper = document.querySelector('.js-feedback'),
    form = document.querySelector('.js-feedback-bg');

  return {
    set: function() {
      let imgWidth = document.querySelector('.js-blur').offsetWidth,
        imgHeight = document.querySelector('.js-blur').offsetHeight,
        posLeft = -wrapper.offsetLeft,
        posTop = -wrapper.offsetTop,
        blurCSS = form.style;

      blurCSS.width = `${imgWidth}px`;
      blurCSS.height = `${imgHeight}px`;
      blurCSS.transform = `translate(${posLeft}px,${posTop}px)`;
    },
  };
}());

blur.set();

window.onresize = function() {
  blur.set();
};

let blurArrow = document.querySelector('.blur__arrow-link');
blurArrow.onclick = (e) => {
  e.preventDefault();
  $('html,body').stop().animate({ scrollTop: document.documentElement.clientHeight }, 1000);
};

let preloader = new Preloader();

$(document).ready(function() {
  preloader.init();
});

import Request from '../../components/modules/sendMessage';
let form = $('form');
let url = '/works/message';
let submit = new Request(form, url);
form.on('submit', function(e) {
  e.preventDefault();
  submit.request();
});