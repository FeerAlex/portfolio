import 'normalize.css';
import './works.scss';

/* COMPONENTS */
import Header from '../../components/header';
import Footer from '../../components/footer';

/* FONTS */
import '../../fonts/Roboto-Medium.ttf';
import '../../fonts/Roboto-Italic.ttf';
import '../../fonts/Roboto-BoldItalic.ttf';
import '../../fonts/Sansus-Webissimo-Regular.ttf';

/* ICONS */
import '../../img/icons/works_header.svg';
import '../../img/icons/bg.svg';
import '../../img/icons/link.svg';
import '../../img/icons/portf_arrow_down.svg';
import '../../img/icons/portf_arrow_up.svg';
import '../../img/icons/about_header.svg';
import '../../img/icons/quote.svg';
import '../../img/icons/arrow_down.svg';

let header = new Header();
let footer = new Footer();

let wrapper = document.querySelector('#wrapper');
let main = document.querySelector('.main');
let blurJs = document.querySelector('.blur');

wrapper.insertBefore(header.elem, main);
blurJs.appendChild(footer.elem);

console.log('in works.js');


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