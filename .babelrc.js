module.exports = {
  presets: ['@babel/preset-env'],
  env: {
    production: {
      presets: ['minify'],
      comments: false,
    },
  },
  plugins: [
    '@babel/plugin-transform-strict-mode',
    [
      '@babel/plugin-transform-modules-umd',
      {
        globals: {
          jquery: '$',
        },
      },
    ],
  ],
};
