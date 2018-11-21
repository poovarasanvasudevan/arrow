const express = require('express');
const helmet = require('helmet')
const compression = require('compression')
var minify = require('express-minify');

const securityWrapper = express();
securityWrapper.use(helmet())
securityWrapper.use(compression())
//securityWrapper.use(minify());
module.exports = (sails) => {
  return {
    configure: function () {
      // Custom middleware should be added before `session` middleware to avoid error:
      // 'TypeError: req.session.touch is not a function'
      sails.config.http.middleware.order.unshift('securityWrapper');

      sails.config.http.middleware['securityWrapper'] = (function (){
        return securityWrapper;
      })();

    }
  };
}
