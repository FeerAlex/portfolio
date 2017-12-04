module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(jpg|png)$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      ],
    },
  };
};