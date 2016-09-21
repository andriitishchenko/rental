'use strict';

angular.
  module('App').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $routeProvider.
        when('/list', {
          templateUrl: 'item-list/item-list.template.html',
          controller: 'ItemListCtrl',
          controllerAs: 'vm',
          resolve: {
            'thingsList': function(APIService) {
              return APIService.getAll();
            }
          }
        }).
        when('/list/:itemId', {
          template: '<item-detail></item-detail>'
        }).
        otherwise('/list');
    }
  ]);