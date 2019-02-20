(function (app) {
    'use strict';
  
    app.registerModule('BAC', ['core']);
    app.registerModule('BAC.routes', ['core.routes']);
  }(ApplicationConfiguration));