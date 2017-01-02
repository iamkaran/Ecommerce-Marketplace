var orderHistory = angular.module('orderHistory', []);

orderHistory.controller('gethistory', function ($scope, $http, $window) {


    $http({
        method: "POST",
        url: '/orderhistory'

    }).success(function (result) {

        $scope.orderHistory = result;
        console.log(result);


    }, function (err) {


    });


});