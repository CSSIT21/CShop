const path = require('path');

module.exports = function({ env }) {
    return {
      webpack: {
        alias: { 
          '@': path.resolve(__dirname, './src'),
          '~': path.resolve(__dirname, './src'),
        },
      },
    };
}