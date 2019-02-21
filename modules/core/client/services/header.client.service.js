(function () {
    'use strict';
  
    angular
      .module('core')
      .factory('headerService', headerService);
  
    function headerService() {
      var _searchVar = {};
      return _searchVar;
  
    }
  }());
  