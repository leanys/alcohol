(function (app) {
    'use strict';
  
    app.registerModule('drinks', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
    app.registerModule('drinks.admin', ['core.admin']);
    app.registerModule('drinks.admin.routes', ['core.admin.routes']);
    app.registerModule('drinks.services');
    app.registerModule('drinks.routes', ['ui.router', 'core.routes', 'drinks.services']);
  }(ApplicationConfiguration));
  