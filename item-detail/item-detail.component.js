'use strict';

// Register `itemDetail` component, along with its associated controller and template
angular.
  module('itemDetail').
  component('itemDetail', {
    templateUrl: 'item-detail/item-detail.template.html',
    controller: ['$routeParams', 'APIService',
      function ItemDetailController($routeParams, APIService) {
        this.item = null;
        this.booking = null;
        var self = this;
        var _item = APIService.getItemByID($routeParams.itemId);
        _item.then(function(value) {
          self.item = value;
        }).then(function() {
            APIService.getBookingByID($routeParams.itemId).then(function(value) {
              self.booking = value;
            });
        });



        /*self.item = ThingsSheetService.get({itemId: $routeParams.itemId}, function(item) {
          self.setImage(item.images[0]);
        });

        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = imageUrl;
        };*/
      }
    ]
  });
