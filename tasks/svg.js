module.exports = function (paths) {
  return {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
          include: paths,
          options: {
            extract: true,
            spriteFilename: 'images/icons-sprite.svg',
          },
        },
      ],
    },
  };
};