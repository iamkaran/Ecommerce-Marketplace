var soldHistory = angular.module('soldHistory', []);

soldHistory.controller('soldhistory', function ($scope, $http, $window) {


    $http({
        method: "POST",
        url: '/soldHistory'

    }).success(function (result) {

        $scope.soldHistory = result;
        console.log(result);


    }, function (err) {


    });


});