'use strict';

angular.module('App', [
  'ngAnimate',
  'ngRoute',
  'core',
  'itemDetail',
  'itemList'
])
.constant('CONFIG', {
    'APP_NAME' : 'My Awesome App',
    'APP_VERSION' : '0.0.0',
    'GOOGLE_ANALYTICS_ID' : '',
    'BASE_URL' : 'https://www.googleapis.com/fusiontables/v2/tables/',
    'KEY' : 'AIzaSyDHmvI6JgLoxCX9IXyKpvN-7EeqEOyJkj4',
    'DATASOURCE' : '10tRbAVU7Dkl9AHIl4a3qiCDtrsGnSy-IpMgGQ51f',
    'url' : function(){
      return this.BASE_URL+this.DATASOURCE+'?key='+this.KEY;
    }
})
.directive('checkImage', function() {
   return {
     //restrict : 'E',
      link: function(scope, element, attrs) {
         element.bind('error', function() {
            element.attr('src', 'img/no-image-available.png');
         });
       }
   }
})
.directive('backButton', ['$window', function($window) {
        return {
            //restrict: 'E',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }]);