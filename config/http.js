/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {

  trustProxy : true,

  /****************************************************************************
   *                                                                           *
   * Sails/Express middleware to run for every HTTP request.                   *
   * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
   *                                                                           *
   * https://sailsjs.com/documentation/concepts/middleware                     *
   *                                                                           *
   ****************************************************************************/

  middleware: {

    /***************************************************************************
     *                                                                          *
     * The order in which middleware should be run for HTTP requests.           *
     * (This Sails app's routes are handled by the "router" middleware below.)  *
     *                                                                          *
     ***************************************************************************/
    strictTransportSecurity: require('lusca').hsts({maxAge: 31536000}),
    disablePoweredBy: function (request, response, next) {
      var expressApp = sails.hooks.http.app
      response.set('X-Powered-By', 'Arrow')
      next()
    },
    p3p: require('lusca').p3p('ABCDEF'),
    xframe: require('lusca').xframe('SAMEORIGIN'),

    passportInit    : require('passport').initialize(),
    passportSession : require('passport').session(),

    order: [
      'startRequestTimer',
      'p3p',
      'strictTransportSecurity',
      'xframe',
      'cookieParser',
      'session',
      'passportInit' ,
      'passportSession',
      'bodyParser',
      'compress',
      'disablePoweredBy',
      'router',
      'www',
      'favicon',
    ],

    // parseServer: function () {
    //   var express = require('express');
    //   var ParseServer = require('parse-server').ParseServer;
    //   var app = express();
    //   var api = new ParseServer({
    //     databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
    //     cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
    //     appId: 'myAppId',
    //     masterKey: 'myMasterKey', // Keep this key secret!
    //     fileKey: 'optionalFileKey',
    //     serverURL: 'http://localhost:1337/parse' // Don't forget to change to https if needed
    //   });
    //
    //   app.use('/parse', api);
    //
    //   return app;
    // },
    //
    // parseDashboard: function () {
    //   var ParseDashboard = require('parse-dashboard');
    //   var express = require('express');
    //   var app = express();
    //
    //   var dashboard = new ParseDashboard({
    //     "apps": [
    //       {
    //         "serverURL": "http://localhost:1337/parse",
    //         "appId": "myAppId",
    //         "masterKey": "myMasterKey",
    //         "appName": "MyApp"
    //       }
    //     ]
    //   });
    //   app.use('/dashboard', dashboard);
    //
    //   return app;
    // }


    /***************************************************************************
     *                                                                          *
     * The body parser that will handle incoming multipart HTTP requests.       *
     *                                                                          *
     * https://sailsjs.com/config/http#?customizing-the-body-parser             *
     *                                                                          *
     ***************************************************************************/

    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),

  }
}
