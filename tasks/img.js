module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]',
              },
            },
            {
              loader: 'img-loader',
            },
          ],
        },
      ],
    },
  };
};