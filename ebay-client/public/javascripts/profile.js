var profile = angular.module('profile', []);

profile.controller('updateProfile', function ($scope, $http, $window) {


    $scope.update = function () {


        $http({
            method: "POST",
            url: '/updateProfile',
            params: {
                handle: $scope.handle,
                contactinfo: $scope.contactinfo,
                date: $scope.date,
                location: $scope.location

            }
        }).success(function (result) {
            $window.location.assign('/profile');
        }, function (err) {
            console.log(err);
            $window.location.assign('/profile');
        });


    };


});