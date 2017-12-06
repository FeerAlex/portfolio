const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (paths) {
  return {
    module: {
      rules: [
        {
          test: /^(?!.*\.generated\.ttf$).*\.ttf$/,
          include: paths,
          use: ExtractTextPlugin.extract({
            publicPath: '../',
            use: ['css-loader', 'fontface-loader']
          }),
        },
        {
          test: /\.generated.(ttf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts/',
                name: '[name].[ext]'
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('./css/[name].css'),
    ],
  };
};