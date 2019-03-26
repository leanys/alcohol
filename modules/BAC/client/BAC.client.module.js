(function (app) {
    'use strict';
  
    app.registerModule('BAC', ['core','zingchart-angularjs']);
    app.registerModule('BAC.routes', ['core.routes']);
    //app.registerModule('zingchart', ['zingchart-angularjs']);
  }(ApplicationConfiguration));