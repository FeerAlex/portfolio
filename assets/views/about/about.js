import 'normalize.css';
import './about.scss';
import Footer from '../../components/footer';

let footer = new Footer();

console.log(footer);
document.body.appendChild(footer.elem);

console.log('in about.js');