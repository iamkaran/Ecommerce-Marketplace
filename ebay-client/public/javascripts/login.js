var login = angular.module('login', []);


login.controller('loginregister', function ($scope, $http, $window) {
    $scope.invalid = true;
    $scope.loginstatus = true;

    function randString(x) {
        var s = "";
        while (s.length < x && x > 0) {
            var r = Math.random();
            s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
        }
        return s;
    }

    $scope.register = function () {
        var ebayHandle = $scope.fn + $scope.ln + randString(5);
        console.log(ebayHandle);

        $http({
            method: "POST",
            url: '/register',
            params: {
                fn: $scope.fn,
                ln: $scope.ln,
                email: $scope.email,
                password: $scope.password,
                handle: ebayHandle
            }
        }).success(function (result) {
            $window.location.assign('/loginSignUp');
        }, function (err) {
            console.log(err);
            $window.location.assign('/loginSignUp');
        });

    };


    $scope.login = function () {

        $http({
            method: "POST",
            url: '/login',
            params: {
                email: $scope.email,
                password: $scope.password,
            }
        }).success(function (result) {
            if (result == "invalid") {
                $scope.loginstatus = false;
            }
            else {
                $window.location.assign('/');
            }
        }, function (err) {
            console.log(err);
            $window.location.assign('/loginSignUp');
        });

    };
    $scope.checkEmail = function () {


        $http({
            method: "POST",
            url: '/checkEmail',
            params: {
                email: $scope.email

            }
        }).success(function (result) {

            $scope.emailStatus = result;
            if ($scope.emailStatus == 0) {
                $scope.invalid = false;
            } else {
                $scope.invalid = true;
            }

        }, function (err) {
            console.log(err);
            $window.location.assign('/loginSignUp');
        });

    };


});