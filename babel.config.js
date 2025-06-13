/* To help jest test better with newer Javascript */
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};