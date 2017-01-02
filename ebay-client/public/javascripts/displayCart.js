var cart = angular.module('Cart', []);

cart.controller('CartController', function ($scope, $http, $window) {


    $scope.subTotal = 0;
    $scope.finalPrice = 0;
    $http({
        method: "GET",
        url: '/CartData'
    }).success(function (result) {

        $scope.cartData = result;
        console.log($scope.cartData);
        if ($scope.cartData.length > 0) {
            $scope.available = true;
        } else {
            $scope.available = false;
            $scope.available2 = true;
        }
        var i;
        for (i = 0; i < result.length; i++) {
            $scope.subTotal = $scope.subTotal + result[i].total;

        }

        $scope.finalPrice = $scope.subTotal + 2;

    }, function (err) {
        console.log("error occurred: " + err);
    });


    $scope.updateCart = function (quantity, price, productId) {

        $http({
            method: "POST",
            url: '/updateCart',
            params: {
                pid: productId,
                quantity: quantity,
                price: price
            }
        }).success(function (result) {

            $window.location.assign('/renderCartPage');

        }, function (err) {
            console.log(err);

        });

    };


    $scope.deleteFromCart = function (cartId) {

        $http({
            method: "POST",
            url: '/deleteCartItem',
            params: {
                cartid: cartId

            }
        }).success(function (result) {

            $window.location.assign('/renderCartPage');

        }, function (err) {
            console.log(err);

        });

    };

    $scope.checkOut = function () {

        $http({
            method: "POST",
            url: '/checkOutData',
            params: {
                grandTotal: $scope.finalPrice
            }
        }).success(function (result) {


            $window.location.assign('/checkout');

        }, function (err) {
            console.log(err);

        });


    };


});