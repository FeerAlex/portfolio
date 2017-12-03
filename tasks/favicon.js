const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = function() {
  return {
    plugins: [
      new FaviconsWebpackPlugin('./assets/favicon.png'),
    ],
  };
};