const express = require('express');
const router = express.Router();

const isAdmin = (req, res, next) => {
  if(req.session.isAdmin) {
    return next();
  }
  
  res.redirect('/');
};

const user       = require('../controllers/user');
const blog       = require('../controllers/blog');
const skills     = require('../controllers/skills');
const works      = require('../controllers/works');
const skillsType = require('../controllers/skillsType');

/* МОИ РАБОТЫ */
router.get('/works', works.getWorks);
router.post('/works', isAdmin, works.createWork);

/* БЛОГ */
router.get('/blog', blog.getArticles);
router.post('/blog', isAdmin, blog.createArticle);
// router.put('/blog/:id', isAdmin, blog.editArticle);
// router.delete('/blog/:id', isAdmin, blog.deleteArticle);

/* ОБО МНЕ */
router.get('/skillTypes', skillsType.getSkillTypes);
// router.post('/skillsType', skillsType.createSkillsType);
router.get('/skills', skills.getSkills);
router.put('/skills', isAdmin, skills.updateSkills);
// router.post('/skills', skills.createSkill);

/* АВТОРИЗАЦИЯ */
router.post('/user', user.auth);

module.exports = router;