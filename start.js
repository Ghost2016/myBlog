var register = require('babel-core/register');

register({
    //支持async和await
    presets: ['stage-3']
});

require('./app.js');