var cart = angular.module('cart', []);

cart.controller('addToCart', function ($scope, $http, $window) {

    $scope.addCart = function () {

        console.log($scope.quantity);
        console.log($scope.unitprice);

        var totalPrice = $scope.quantity * $scope.unitprice;
        console.log(totalPrice);

        $http({
            method: "POST",
            url: '/addCart',
            params: {
                quantity: $scope.quantity,
                totalPrice: totalPrice,
                productId: $scope.productId


            }
        }).success(function (result) {
            alert("Product successfully added to cart. Press OK to continue shopping!");
            $window.location.assign('/');
        }, function (err) {
            console.log(err);
            alert("Oooop! Something went wrong. Please try again");
        });


    };
    $scope.updateBasePrice = function () {


        $http({
            method: "POST",
            url: '/updateBasePrice',
            params: {

                productId: $scope.productId,
                bidAmount: $scope.bidAmount

            }
        }).success(function (result) {
            alert("Thank you for bidding.Press OK to continue shopping.");
            $window.location.assign('/');
        }, function (err) {
            console.log(err);
            alert("Oooop! Something went wrong. Please try again");
        });


    };


});