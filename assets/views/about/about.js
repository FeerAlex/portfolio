import 'normalize.css';
import './about.scss';

/* FONTS */
import '../../fonts/Roboto-Regular.ttf';
import '../../fonts/Sansus-Webissimo-Regular.ttf';

/* ICONS */
import '../../img/icons/ellipse.svg';
import '../../img/icons/about_header.svg';
import '../../img/icons/about_bg.svg';

/* COMPONENTS */
import Preloader from '../../components/preloader';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Map    from '../../components/map';

/* MY JS */
import Skill from '../../components/skills';

let header = new Header();
let footer = new Footer();
let map   = new Map();

let wrapper = document.querySelector('#wrapper');
let main = document.querySelector('.main');

wrapper.insertBefore(header.elem, main);
main.appendChild(map.elem);
wrapper.appendChild(footer.elem);

let preloader = new Preloader();

function createListSkill(skill) {
  let skillContainer = document.createElement('li');
  skillContainer.classList.add('skills__row-item');
  
  let skillContent = `
    <div class="circular" data-percent="${skill.percents}">
      <svg class="circular__svg">
      <span class="circular__span">${skill.name}</span>
    </div>
  `;

  skillContainer.innerHTML = skillContent;
  return skillContainer;
}

function createSkill(title, skills) {
  let article = document.createElement('li');
  let row = document.createElement('div');
  let head = document.createElement('div');
  let list = document.createElement('ul');

  article.classList.add('skills__item');
  row.classList.add('skills__row');
  head.classList.add('skills__row-title');
  list.classList.add('skills__row-list');
  
  head.innerHTML = title;

  Array.from(skills).map((skill) => {
    list.appendChild(createListSkill(skill));
  });

  row.appendChild(head);
  row.appendChild(list);
  article.appendChild(row);
  return article;
}

function createSkills(skills, skillTypes) {
  let skillsContainer = document.querySelector('.skills__list');
  skillsContainer.innerHTML = '';

  

  Array.from(skillTypes).map((skillType) => {
    let oneSkills = skills.filter(item => item.skillType == skillType._id);  
    skillsContainer.appendChild(createSkill(skillType.title, oneSkills));
  });
}

let loadedSkills = $.Deferred();
let loadedSkillTypes = $.Deferred();

$.ajax({
  type: 'get',
  url: '/api/skillTypes',
  success: function(skillTypes) {
    loadedSkillTypes.resolve(skillTypes);
  },
});

loadedSkillTypes.done(function(skillTypes) {
  $.ajax({
    type: 'get',
    url: '/api/skills',
    success: function(skills) {
      createSkills(skills.skills, skillTypes.skillTypes);
      loadedSkills.resolve();
    },
  });
});

loadedSkills.done(function() {
  let ellipses = document.querySelectorAll('.circular');
  
  Array.from(ellipses).map((ellipse) => {
    let percent = ellipse.getAttribute('data-percent');
    let svg = ellipse.querySelector('svg');
    let circle  = new Skill(150, 150, svg, percent / 100);
  
    $(window).scroll(function() {
      let skills = document.querySelector('.about__right');
      
      if(skills.getBoundingClientRect().top <= 0) {
        if(!circle.animate) {
          circle.draw();
        }
      }
    });
  });

  $(document).ready(function() {
    preloader.init();
  });
});