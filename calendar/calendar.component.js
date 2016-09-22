'use strict';
// angular.module('itemDetail').controller("calendarDemo", function($scope) {
//     $scope.day = moment();
//     $scope.events = [1,2,3,54,5,6,5];

// });

angular.module('App').directive("calendar", function() {
    return {
        restrict: "E",
        templateUrl: "calendar/calendar.template.html",
        scope: {
            selected: "=",
            booking: "="
        },
        link: function(scope, element, attributes) {
            
            console.log(scope.selected, scope.booking)

            scope.selected = _removeTime(scope.selected || moment());
            scope.month = scope.selected.clone();

            var start = scope.selected.clone();
            start.date(1);
            _removeTime(start.day(0));

            _buildMonth(scope, start, scope.month);

            scope.select = function(day) {
              scope.selected = day.date;  
            };

            scope.next = function() {
                var next = scope.month.clone();
                _removeTime(next.month(next.month()+1)).date(1);
                scope.month.month(scope.month.month()+1);
                _buildMonth(scope, next, scope.month);
            };

            scope.previous = function() {
                var previous = scope.month.clone();
                _removeTime(previous.month(previous.month()-1).date(1));
                scope.month.month(scope.month.month()-1);
                _buildMonth(scope, previous, scope.month);
            };

            scope.checkevents = function(day) {
                if (!scope.booking) { 
                    return false;
                }
                var tm = day.unix();
                var obj = scope.booking.filter(function (el) {
                    var a = moment(el.dateFrom, "DD/MM/YYYY").unix();
                    var b = moment(el.dateTo, "DD/MM/YYYY").unix();
                    return (a<=tm && tm<=b)?true:false;
                });
                if (obj.length > 0) {return true;}
                return false;
            };

            // scope.$watch("booking", function(value){
            //         console.log(value);
            //     if(value){
            //     }
            // });
        }
    };
    
    function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        while (!done) {
            scope.weeks.push({ days: _buildWeek(date.clone(), month) });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    function _buildWeek(date, month) {
        var days = [];
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date,
               // isEvent:true
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }
});