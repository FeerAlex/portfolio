import 'normalize.css';
import '../../fonts/Roboto-Regular.ttf';
import './welcome.scss';

import vkIcon from '../../img/icons/vk.svg';
import ghIcon from '../../img/icons/github.svg';
import inIcon from '../../img/icons/in.svg';
import checkIcon from '../../img/icons/check.svg';
import loginIcon from '../../img/icons/login.svg';
import passwordIcon from '../../img/icons/password.svg';

console.log(vkIcon);
console.log(ghIcon);
console.log(inIcon);
console.log(checkIcon);
console.log(loginIcon);
console.log(passwordIcon);

var btnFront1 = document.getElementById('front');
var btnFront2 = document.getElementById('front_btn');

btnFront1.addEventListener('click', function(e) {
  reverseCard(e);
});

btnFront2.addEventListener('click', function(e) {
  reverseCard(e);
});

function reverseCard(e) {

  e.preventDefault();

  var card = document.getElementById('intro_card');
  card.classList.toggle('intro__card--show');
}