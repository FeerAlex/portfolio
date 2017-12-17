import 'normalize.css';
import './about.scss';
import Footer from '../../components/footer';
import Social from '../../components/socials';

let footer = new Footer();
let social = new Social();

console.log(footer);
console.log(social);

document.body.appendChild(footer.elem);
document.querySelector('#socials').appendChild(social.elem);

console.log('in about.js');