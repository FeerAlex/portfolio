const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge             = require('webpack-merge');

const pug               = require('./tasks/pug');
const devserver         = require('./tasks/devserver');
const sass              = require('./tasks/sass');
const uglify            = require('./tasks/uglify');
const jsLint            = require('./tasks/js.lint');
const sassLint          = require('./tasks/sass.lint');
const img               = require('./tasks/img');
// const favicon           = require('./tasks/favicon');

const PATHS = {
  source: path.join(__dirname, 'assets'),
  build: path.join(__dirname, 'build'),
};

const common = merge([
  {
    entry: {
      'index': PATHS.source + '/views/index/index.js',
      'blog': PATHS.source + '/views/blog/blog.js',
      'welcome': PATHS.source + '/views/welcome/welcome.js',
      'works': PATHS.source + '/views/works/works.js',
    },
    output: {
      path: PATHS.build,
      filename: './js/[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index', 'common'],
        template: PATHS.source + '/views/index/index.pug',
      }),
      new HtmlWebpackPlugin({
        filename: 'blog.html',
        chunks: ['blog', 'common'],
        template: PATHS.source + '/views/blog/blog.pug',
      }),
      new HtmlWebpackPlugin({
        filename: 'welcome.html',
        chunks: ['welcome', 'common'],
        template: PATHS.source + '/views/welcome/welcome.pug',
      }),
      new HtmlWebpackPlugin({
        filename: 'works.html',
        chunks: ['works', 'common'],
        template: PATHS.source + '/views/works/works.pug',
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
      }),
    ],
  },
  pug(),
  sass(),
  jsLint({paths: PATHS.source}),
  sassLint(),
  img(),
]);

module.exports = function (env) {
  if (env === 'prod') {
    console.log('RUN PRODUCTION');

    return merge([
      common,
      uglify({useSourceMap: true}),
      // favicon()
    ]);
  }

  if (env === 'dev') {
    console.log('RUN DEVELOPMENT');

    return merge([
      common,
      devserver(),
    ]);
  }

};

// hot module replacement