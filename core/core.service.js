'use strict';

angular.
  module('App').
  factory('APIService', ['$http', '$q',
    function($http, $q) {

      //////////////////////////////////////////////////////////////////////////////////////////////////
      var LocalStorageManager = {
        setValue: function(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
      },
        getValue: function(key) {
          try {
              return JSON.parse(window.localStorage.getItem(key));
          } catch (e) {

          }
        }
      };


      //////////////////////////////////////////////////////////////////////////////////////////////////
      var getAll = function(p1, p2){

        var deferred = $q.defer();
        var reload = true;
          var cache = LocalStorageManager.getValue("alllist");
          if (cache) {
            var time = LocalStorageManager.getValue("alllisttime");
             if (new Date().getTime() - (time || 0) > 60*60*1000) {
                LocalStorageManager.setValue("alllisttime", null);
              }
              else
              {
                reload = false;
              }
          }
          
          if (reload) {
              $http({
          method: 'GET',
          url:"https://www.googleapis.com/fusiontables/v1/query?sql=SELECT * FROM 10tRbAVU7Dkl9AHIl4a3qiCDtrsGnSy-IpMgGQ51f&key=AIzaSyDHmvI6JgLoxCX9IXyKpvN-7EeqEOyJkj4",
          //url: 'https://www.googleapis.com/fusiontables/v2/tables/:tableId/columns?key=:key',
          params: {
            key: 'AIzaSyDHmvI6JgLoxCX9IXyKpvN-7EeqEOyJkj4', 
            tableId:'10tRbAVU7Dkl9AHIl4a3qiCDtrsGnSy-IpMgGQ51f'
          }
         })
        .success(function(data){
          var list = [];
          data.rows.forEach(function(arr) {
            var item = {
              id:arr[0],
              price:arr[1],
              name:arr[2],
              phone:arr[3],
              description:arr[4],
              title:arr[5],
              timeframe:arr[6]
            };
            list.push(item);
          });
          LocalStorageManager.setValue("alllisttime", new Date().getTime());
          LocalStorageManager.setValue("alllist", list);
          deferred.resolve(list);
        })
        .error(function(err){
          deferred.reject(err);
        });
        

          }
          else
          {
             setTimeout(function() {
                  deferred.resolve(cache);
              }, 100);
          }
        
        return deferred.promise;
        
      }


      //////////////////////////////////////////////////////////////////////////////////////////////////
        var getItemByID = function(itemId){
          var deferred = $q.defer();
          var cache = LocalStorageManager.getValue("alllist");
          if (!cache) {

          }
          else  
          {
              var obj = cache.filter(function (el) {
               return el.id == itemId;
              });
              setTimeout(function() {
                  deferred.resolve(obj[0]);
              }, 100);
          }

          return deferred.promise;
        }

      //////////////////////////////////////////////////////////////////////////////////////////////////
var getBookingByID = function(itemId){

        var deferred = $q.defer();
        var reload = true;
          /*
          var cache = LocalStorageManager.getValue("alllist");
          if (cache) {
            var time = LocalStorageManager.getValue("alllisttime");
             if (new Date().getTime() - (time || 0) > 60*60*1000) {
                LocalStorageManager.setValue("alllisttime", null);
              }
              else
              {
                reload = false;
              }
          }
          */
          if (reload) {
              $http({
          method: 'GET',
          url:"https://www.googleapis.com/fusiontables/v1/query?sql=SELECT * FROM 1Qzx23sfRkavhcc9NyepijiNrtSjql4o6n7dpM3ED where Id='"+itemId+"'",
          //url: 'https://www.googleapis.com/fusiontables/v2/tables/:tableId/columns?key=:key',
          params: {
            key: 'AIzaSyDHmvI6JgLoxCX9IXyKpvN-7EeqEOyJkj4'
          }
         })
        .success(function(data){
          var list = [];
          if (data.rows) {
          data.rows.forEach(function(arr) {
            var item = {
              id:arr[0],
              phone:arr[1],
              dateFrom:arr[2],
              dateTo:arr[3],
              price:arr[4],
              name:arr[5],
              description:arr[6],
              dateCreate:arr[7]
            };
            list.push(item);
          });
          }
          deferred.resolve(list);
        })
        .error(function(err){
          deferred.reject(err);
        });
        

          }
          else
          {
             setTimeout(function() {
                  deferred.resolve(cache);
              }, 100);
          }
        
        return deferred.promise;
        
      }
//////////////////////////////////////////////////////////////////////////////////////////////////

      return {
        getAll: getAll,
        getItemByID:getItemByID,
        getBookingByID:getBookingByID
      }
    }
  ]);

// angular.module('core.application', [])
//   .value('debug', true)
//   .constant('ENVIRONMENT', 'development')
//   .config({...})