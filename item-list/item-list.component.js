'use strict';

angular.
  module('App').
  controller('ItemListCtrl', ['thingsList', function(list) {
  	    var vm = this;
        vm.items = list;
//        console.log(vm, vm.items, vm.hello);
      }
    ]
  );