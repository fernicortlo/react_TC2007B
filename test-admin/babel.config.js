// module.exports = {
//   presets: [
//     '@babel/preset-env',
//     ['@babel/preset-react', {runtime: 'automatic'}],
//   ],
// };

module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    ['@babel/preset-react', {runtime: 'automatic'}],
  ],
};
