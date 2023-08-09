// webpack.config.js
const path = require('path');

module.exports = {
  entry: './public/script.js',  // Entry point of your application
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory for bundled files
  },
  // Add additional configuration options here
  watch:true
};
