const express      = require('express');
const app          = express();
const cors         = require('cors');
const path         = require('path');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const index        = require('./routers/index');
const indexApi     = require('./api/routes/index');
const config       = require('./config/config.json');

const mongoose     = require('mongoose');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);

const isAdmin = (req, res, next) => {
  if(req.session.isAdmin) {
    return next();
  }
  
  res.redirect('/');
};

app.set('views', [__dirname + '/build', '../admin']);
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

require('./api/models/db');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('build'));
app.use(express.static('public'));
app.use(express.static(path.resolve(__dirname, '../admin')));

app.use(session({
  secret: 'loftschool',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: null,
  },
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
}));

app.use('/', index);
app.use('/api', indexApi);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(config.server.port, () => {
  console.log('Server start on port ' + config.server.port);
});