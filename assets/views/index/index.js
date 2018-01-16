import 'normalize.css';
import './index.scss';


let isMoblie = function() {
  return window.screen.width < 768;
};

if(!isMoblie()) {
  require.ensure(['../../components/water'], function(require) {
    require('../../components/water');
  });
}

/* COMPONENTS */
import Preloader from '../../components/preloader';
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

/* IMAGES */
import '../../img/water.jpg';
import '../../img/water-maps.jpg';

let user = new User();
let socials = new Socials();

user.elem.classList.add('user--intro');
socials.elem.classList.add('socials--opacity-green');

document.querySelector('.card__user').appendChild(user.elem);
document.querySelector('.card__socials').appendChild(socials.elem);

let btnFront1 = document.getElementById('front');
let btnFront2 = document.getElementById('front_btn');
let intro = document.querySelector('.intro');

intro.addEventListener('click', function(e) {
  let tar = e.target;
  
  if(tar.classList.contains('intro')) {
    this.classList.remove('intro--toggle');
  }
});

btnFront1.addEventListener('click', function(e) {
  reverseCard(e);
});

btnFront2.addEventListener('click', function(e) {
  reverseCard(e);
});

function reverseCard(e) {
  e.preventDefault();

  intro.classList.toggle('intro--toggle');
}

let preloader = new Preloader();

$(document).ready(function() {
  console.log('ready!');
  preloader.init();
});


import Request from '../../components/modules/sendAuth';
let form = $('form');
let url = '/login';
let submit = new Request(form, url);
form.on('submit', function(e) {
  e.preventDefault();
  submit.request();
});