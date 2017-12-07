import 'normalize.css';
import '../../fonts/Roboto-Regular.ttf';
import '../../fonts/Roboto-Medium.ttf';
import '../../fonts/Roboto-Bold.ttf';
import '../../fonts/Sansus-Webissimo-Regular.ttf';
import './index.scss';

import '../../img/icons/vk.svg';
import '../../img/icons/github.svg';
import '../../img/icons/in.svg';
import '../../img/icons/check.svg';
import '../../img/icons/login.svg';
import '../../img/icons/password.svg';

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