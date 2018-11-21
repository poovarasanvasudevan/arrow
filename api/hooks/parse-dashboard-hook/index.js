const parseDashboard = require('parse-dashboard');
const express = require('express');

const config = {
  apps: [
    {
      "serverURL": "http://localhost:1337/parse",
      "appId": "myAppId",
      "masterKey": "myMasterKey",
      "appName": "MyApp"
    }
  ],
  users: [
    {
      "user": "a",
      "pass": "b"
    }
  ],
  useEncryptedPasswords: false,
  trustProxy: true
};

const options = {
  allowInsecureHTTP: true
};

const dashboard = parseDashboard(config, options);

const dashboardAppWrapper = express();
dashboardAppWrapper.use('/dboard', dashboard);

module.exports = (sails) => {
  return {
    configure: function () {
      // Custom middleware should be added before `session` middleware to avoid error:
      // 'TypeError: req.session.touch is not a function'
      sails.config.http.middleware.order.unshift('parseDashboard');

      sails.config.http.middleware['parseDashboard'] = (function (){
        return dashboardAppWrapper;
      })();

    }
  };
}
