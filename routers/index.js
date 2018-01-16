const express = require('express');
const router = express.Router();

const welcome = require('../controllers/welcome');
const works = require('../controllers/works');
const about = require('../controllers/about');
const blog = require('../controllers/blog');
const admin = require('../controllers/admin');

const isAdmin = (req, res, next) => {
  if(req.session.isAdmin) {
    return next();
  }
  
  res.redirect('/');
};

router.get('/', welcome.getPage);
router.post('/login', welcome.auth);

router.get('/works', works.getPage);
router.post('/works/message', works.sendMail);

router.get('/about', about.getPage);

router.get('/blog', blog.getPage);

router.get('/admin', isAdmin, admin.getPage);

module.exports = router;