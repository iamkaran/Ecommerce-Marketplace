var advertisement = angular.module('advertisement', []);

advertisement.controller('postAdvertisement', function ($scope, $http, $window) {


    $scope.sellItem = function () {

        if ($scope.quantity == undefined) {
            var bidQuantity = "1";
        } else {

            bidQuantity = $scope.quantity;
        }

        $http({
            method: "POST",
            url: '/sellItem',
            params: {
                productName: $scope.productName,
                description: $scope.description,
                location: $scope.shippingLocation,
                bidStatus: $scope.buttonValue,
                price: $scope.price,
                quantity: bidQuantity,
                fromPage: $scope.checkPage

            }
        }).success(function (result) {
            alert("Thank You!")
            $window.location.assign('/');
        }, function (err) {
            console.log(err);
            $window.location.assign('/displaySellItemPage');
        });


    };


});
