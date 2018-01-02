export default class Slider {
  constructor() {
    this.counter = 1;
    this.duration = 300;
    this.process = false;
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

    // Элементы слайдера, которые будут меняться
    let screen = $('.slider__screen-img');
    let title = $('.slider__title');
    let skills = $('.slider__skills');
    let link = $('.slider__link');

    // Значения, которые будут подставляться в слайдер
    let img     = items.eq(this.counter).find('img').attr('src');
    let project = items.eq(this.counter).attr('data-title');
    let tech    = items.eq(this.counter).attr('data-tech');
    let site    = items.eq(this.counter).attr('data-link');

    console.log(project);

    screen.fadeOut(function(){
      fadeOut.resolve();
    });

    fadeOut.done(function() {
      screen.attr('src', img).on('load', function(){
        loaded.resolve();
      });
    });

    loaded.done(function() {
      title.text(project);
      skills.text(tech);
      link.attr('href', site);
      screen.fadeIn();
      Slider.process = false;
    });
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