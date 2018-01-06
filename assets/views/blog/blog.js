import 'normalize.css';
import './blog.scss';

/* COMPONENTS */
import Preloader from '../../components/preloader';
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

let preloader = new Preloader();

$(document).ready(function() {
  console.log('ready!');
  preloader.init();
});

let sidebar = document.querySelector('.sidebar');
let toggle = document.querySelector('.sidebar__toggle');
let articles = $('.article__item');
let links = $('.sidebar__item');

links.on('click', function(e) {
  let $this = $(this);
  let dataLink = $this.data('link');
  let article = articles.filter('[data-link="' + dataLink + '"]');
  e.preventDefault();
  $('html,body').stop().animate({ scrollTop: article.offset().top }, 1000);
});

toggle.addEventListener('click', function() {
  sidebar.classList.toggle('sidebar--show');
});

let checkDistance = (scrollTop, elem) => {
  let offset = elem.offset().top;
  let windowMargin = Math.ceil($(window).height() / 3);
  let topBorder = offset - scrollTop - windowMargin;
  let bottomEdge = elem.outerHeight(true) + offset;
  let bottomBorder = scrollTop + windowMargin - bottomEdge;

  return topBorder <= 0 && bottomBorder <=0;
};

$(window).scroll(function() {
  let scrollTop = $(window).scrollTop();
  let sidebarOffset = sidebar.getBoundingClientRect().top;

  articles.each(function() {
    let $this = $(this);

    if(checkDistance(scrollTop, $this)) {
      let dataLink = $this.data('link');
      let link = links.filter('[data-link="' + dataLink + '"]');
      
      links.removeClass('sidebar__item--active');
      link.addClass('sidebar__item--active');
    }
  });
  
  if(sidebarOffset < 0) {
    sidebar.classList.add('sidebar--fixed');
  } else {
    sidebar.classList.remove('sidebar--fixed');
  }
});