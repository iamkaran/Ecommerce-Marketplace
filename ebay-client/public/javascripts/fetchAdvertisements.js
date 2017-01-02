var fetchAdvertisements = angular.module('fetchAdvertisements', []);

fetchAdvertisements.controller('fetchProducts', function ($scope, $http) {

    $http({
        method: "GET",
        url: '/advertisements'

    }).success(function (result) {


        $scope.productList = result;

    }, function (err) {
        console.log(err);

    });


});