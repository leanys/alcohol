(function (app) {
    'use strict';
  
    app.registerModule('BAC', ['core']);
    app.registerModule('BAC.routes', ['ui.router', 'core.routes']);
  }(ApplicationConfiguration));