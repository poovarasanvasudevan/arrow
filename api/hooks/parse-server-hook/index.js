//const ParseServer = require('parse-server').ParseServer;
const express = require('express');


// const server = new ParseServer({
//   databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
//   cloud: 'cloud/main.js', // Absolute path to your Cloud Code
//   appId: 'myAppId',
//   masterKey: 'myMasterKey', // Keep this key secret!
//   fileKey: 'optionalFileKey',
//   serverURL: 'http://localhost:1337/parse' // Don't forget to change to https if needed
// });

const app = express();
//app.use('/parse', server);

module.exports = (sails) => {
  return {
    configure: function () {
      // Custom middleware should be added before `session` middleware to avoid error:
      // 'TypeError: req.session.touch is not a function'
      sails.config.http.middleware.order.unshift('parseServer');

      sails.config.http.middleware['parseServer'] = (function () {
        return app;
      })();

    }
  };
}
