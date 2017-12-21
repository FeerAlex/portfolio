import 'normalize.css';
import './index.scss';

/* COMPONENTS */
import User from '../../components/user';
import Socials from '../../components/socials';

/* FONTS */
import '../../fonts/Roboto-Regular.ttf';
import '../../fonts/Roboto-Medium.ttf';
import '../../fonts/Roboto-Bold.ttf';
import '../../fonts/Sansus-Webissimo-Regular.ttf';

/* ICONS */
import '../../img/icons/vk.svg';
import '../../img/icons/github.svg';
import '../../img/icons/in.svg';
import '../../img/icons/check.svg';
import '../../img/icons/login.svg';
import '../../img/icons/password.svg';

let user = new User();
let socials = new Socials();

user.elem.classList.add('user--intro');
socials.elem.classList.add('socials--opacity-green');

document.querySelector('.card__user').appendChild(user.elem);
document.querySelector('.card__socials').appendChild(socials.elem);

let btnFront1 = document.getElementById('front');
let btnFront2 = document.getElementById('front_btn');

btnFront1.addEventListener('click', function(e) {
  reverseCard(e);
});

btnFront2.addEventListener('click', function(e) {
  reverseCard(e);
});

function reverseCard(e) {

  e.preventDefault();

  let card = document.getElementById('intro_card');
  card.classList.toggle('intro__card--show');
}