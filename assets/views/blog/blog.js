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

let preloader = new Preloader();

function createArticle(data) {
  let date = new Date(data.date);

  let formatter = new Intl.DateTimeFormat('ru', {year: 'numeric', month: 'long', day: 'numeric'});

  let article = document.createElement('li');
  article.classList.add('article__item');
  
  let articleContent = `
    <h3 class="article__title">${data.title}</h3>
    <span class="article__date">${formatter.format(date)}</span>
    <div class="article__desc">
      <p>${data.desc}</p>
    </div>
  `;

  article.innerHTML = articleContent;
  return article;
}

function createLink(data, index) {
  let link = document.createElement('li');
  link.classList.add('sidebar__item');
  if(index == 0) {
    link.classList.add('sidebar__item--active');
  }

  let linkContent = `
    <a class="sidebar__link" href="#0">${data}</a>
  `;
  link.innerHTML = linkContent;
  return link;
}

function createArticles(data) {
  let articles = document.querySelector('.article__list');
  let links = document.querySelector('.sidebar__list');
  articles.innerHTML = '';
  links.innerHTML = '';
  Array.from(data).map((article, index) => {
    articles.appendChild(createArticle(article));
    links.appendChild(createLink(article.title, index));
  });
}

let loaded = $.Deferred();

$.ajax({
  type: 'get',
  url: '/api/blog',
  success: function(data){
    createArticles(data.articles);
    loaded.resolve();
  },
});

loaded.done(function() {
  let sidebar = document.querySelector('.sidebar');
  let toggle = document.querySelector('.sidebar__toggle');
  let articles = $('.article__item');
  let links = $('.sidebar__item');

  links.on('click', function(e) {
    e.preventDefault();
  
    let index = $(this).index();
    let article = articles.eq(index);
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
  
    articles.each(function(index) {
      let $this = $(this);
  
      if(checkDistance(scrollTop, $this)) {
        let link = links.eq(index);
        
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
});

$(document).ready(function() {
  preloader.init();
});