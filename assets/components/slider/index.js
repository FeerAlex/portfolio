import './slider.scss';
import template from './slider.pug';

/* FONTS */
import '../../fonts/Roboto-Medium.ttf';

/* ICONS */
import '../../img/icons/link.svg';
import '../../img/icons/portf_arrow_down.svg';
import '../../img/icons/portf_arrow_up.svg';

export default class Slider {
  constructor(opt) {
    this.elem = document.createElement('div');
    this.elem.className = 'slider';
    this.elem.innerHTML = template(opt);

    this.sliderScreen = this.elem.querySelector('.slider__screen-img');
    this.sliderTitle = this.elem.querySelector('.slider__title');
    this.sliderSkills = this.elem.querySelector('.slider__skills');
    this.sliderLink = this.elem.querySelector('.slider__link');
    this.switchLeft = this.elem.querySelector('.slider__switch-col--left');
    this.switchRight = this.elem.querySelector('.slider__switch-col--right');

    this.counter = 1;
    this.duration = 300;
    this.process = false;

    this.btnUp = this.elem.querySelector('.slider__switch-link--up');
    this.btnDown = this.elem.querySelector('.slider__switch-link--down');
    this.btnDown.onclick = (e) => this.slideDown(e);
    this.btnUp.onclick = (e) => this.slideUp(e);
  }

  moveSlide(container, direction) {
    let items = container.find('.slider__switch-item'),
      activeItem = items.filter('.slider__switch-item--active'),
      direct = direction == 'down' ? 100 : -100;

    if(this.counter >= items.length) this.counter = 0;

    let eq = (direct > 0) ? this.counter - 1 : this.counter + 1;

    if (eq >= items.length) eq = 0;
    if (eq < 0) eq = items.length - 1;

    let reqItem = items.eq(eq);

    activeItem.animate({
      'top' : direct + '%',
    }, this.duration);

    reqItem.animate({
      'top' : '0',
    }, this.duration, function() {
      activeItem.removeClass('slider__switch-item--active').css('top', -direct + '%');
      $(this).addClass('slider__switch-item--active');
    });
  }

  slideShow(container) {
    let items = container.find('.slider__switch-item');
    let fadeOut = $.Deferred();
    let loaded = $.Deferred();
    let Slider = this;

    // Значения, которые будут подставляться в слайдер
    let img     = items.eq(this.counter).find('img').attr('src');
    let project = items.eq(this.counter).attr('data-title');
    let tech    = items.eq(this.counter).attr('data-tech');
    let site    = items.eq(this.counter).attr('data-link');

    $(Slider.sliderScreen).fadeOut(function(){
      fadeOut.resolve();
    });

    fadeOut.done(function() {
      $(Slider.sliderScreen).attr('src', img).on('load', function(){
        loaded.resolve();
      });
    });

    loaded.done(function() {
      Slider.wordAnimation(Slider.sliderTitle, project); // Анимация названия
      Slider.wordAnimation(Slider.sliderSkills, tech);   // Анимация скилов
      $(Slider.sliderLink).attr('href', site);
      $(Slider.sliderScreen).fadeIn();
    });
  }

  wordAnimation(container, text) {
    let string = text.trim();           // убираем пробелы слева и справа
    let stringArray = string.split(''); // разбиваем слово на массив
    let word = '';
    let animationState = $.Deferred();  // определение окончания анимации
    let Slider = this;

    Array.from(stringArray).map((letter) => { // проходим по каждой букве
      let letterHtml = '';

      if(letter != ' ') {
        letterHtml = '<span class="letter-span">' + letter + '</span>';
      } else {
        letterHtml = '<span class="letter-span--space">' + letter + '</span>';
      }

      word += letterHtml;
    });

    container.innerHTML = word;

    let letter = container.querySelectorAll('.letter-span'),
      count = 0,
      timer,
      duration = 600 / stringArray.length;
    
    function showLetters () {
      let currentLetter = $(letter).eq(count);

      currentLetter.addClass('letter-span--show');

      if (count == stringArray.length) {
        animationState.resolve();
        clearTimeout(timer);
        count = 0;
      } else {
        count++;
        timer = setTimeout(showLetters, duration);
      }
    }

    showLetters();

    animationState.done(function() {
      Slider.process = false;
    });
  }

  download() {
    let Slider = this;
    
    $.ajax({
      type: 'get',
      url: '/api/works',
      success: function(data){
        let works = data.works;

        $(Slider.sliderScreen).attr('src', works[0].picture);
        $(Slider.sliderTitle).text(works[0].name);
        $(Slider.sliderSkills).text(works[0].tech);
        $(Slider.sliderLink).attr('href', works[0].link);

        createItems(Slider.switchLeft, works, works.length - 1);
        createItems(Slider.switchRight, works, 1);
      },
    });

    function createItems(container, works, indexActive) {
      let list = container.querySelector('.slider__switch-list');
      list.innerHTML = '';

      Array.from(works).map((work, index) => {
        let item = document.createElement('li');
        item.classList.add('slider__switch-item');

        if(index == indexActive) {
          item.classList.add('slider__switch-item--active');
        }

        item.setAttribute('data-title', work.name);
        item.setAttribute('data-tech', work.tech);
        item.setAttribute('data-link', work.link);

        item.innerHTML = `<img class="slider__switch-img" src="${work.picture}">`;

        list.appendChild(item);
      });
    }
  }

  slideUp(e) {
    e.preventDefault();
    if(!this.process) {
      this.process = true;
      this.moveSlide($('.slider__switch-col--left'), 'down');
      this.moveSlide($('.slider__switch-col--right'), 'up');  
      this.slideShow($('.slider__switch-col--left'));
      this.counter++;
    }
  }

  slideDown(e) {
    e.preventDefault();
    if(!this.process) {
      this.process = true;
      this.moveSlide($('.slider__switch-col--left'), 'down');
      this.moveSlide($('.slider__switch-col--right'), 'up');   
      this.slideShow($('.slider__switch-col--left'));
      this.counter++;
    }
  }
}