import './preloader.scss';

export default class Preloader {
  constructor() {
    this.percentsTotal = 0;
    this.percents = document.querySelector('.preloader__percents');
    this.elem = document.querySelector('.preloader');

    this.imgPath = $('*').map(function(ndx, el) {
      let bg = $(el).css('background-image'),
        img = $(el).is('img'),
        path = '';

      if(bg != 'none') path = bg.replace('url("', '').replace('")', '');

      if(img) path = $(el).attr('src');

      if(path) return path;
    });
  }

  setPercents(total, cur) {
    let percents = Math.ceil(cur / total * 100);

    $(this.percents).text(percents);

    if(percents >= 100) {
      $(this.elem).fadeOut();
    }
  }

  loadImages(images) {
    if(!images.length) $(this.elem).fadeOut();

    let Preloader = this;

    images.forEach(function(img, i, images){
      let fakeImg = $('<img>', {
        attr : {
          src : img,
        },
      });

      fakeImg.on('load error', function() {
        Preloader.percentsTotal++;
        Preloader.setPercents(images.length, Preloader.percentsTotal);
      });
    });
  }

  init() {
    let imgs = $(this.imgPath).toArray();
    this.loadImages(imgs);
  }
}