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

wrapper.insertBefore(header.elem, main);
wrapper.appendChild(footer.elem);

console.log('in works.js');