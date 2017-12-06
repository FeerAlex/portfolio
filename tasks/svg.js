module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-sprite-loader'
            },
            {
              loader: 'svgo-loader',
              options: {
                plugins: [
                  { removeNonInheritableGroupAttrs: true },
                  { collapseGroups: true },
                  { removeAttrs: { attrs: '(fill|stroke)' } },
                ],
              },
            },
          ],
        },
      ],
    },
  };
};