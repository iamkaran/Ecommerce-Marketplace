var checkout = angular.module('checkout', []);

checkout.controller('checkout', function ($scope, $http, $window) {


    $http({
        method: "POST",
        url: '/shippingDetails'

    }).success(function (result) {

        $scope.shippingDetails = result[0].location;
        $scope.grandTotal = result[1].grandTotal;
        console.log($scope.grandTotal);

    }, function (err) {
        console.log(err);

    });


    $scope.payment = function () {
        $http({
            method: "POST",
            url: '/payment'

        }).success(function (result) {
            alert("Thank you for shopping with us.");
            $window.location.assign('/');
        }, function (err) {
            console.log(err);
            alert("Oooop! Something went wrong. Please try again");
        });


    };
});