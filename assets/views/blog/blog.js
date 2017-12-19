import 'normalize.css';
import './blog.scss';

/* COMPONENTS */
import Header from '../../components/header';
import Footer from '../../components/footer';

/* FONTS */
import '../../fonts/Roboto-Regular.ttf';
import '../../fonts/Roboto-Bold.ttf';
import '../../fonts/Sansus-Webissimo-Regular.ttf';

/* ICONS */
import '../../img/icons/bg.svg';
import '../../img/icons/blog_header.svg';

let header = new Header();
let footer = new Footer();

let wrapper = document.querySelector('#wrapper');
let main = document.querySelector('.main');

wrapper.insertBefore(header.elem, main);
wrapper.appendChild(footer.elem);



console.log('in blog.js');