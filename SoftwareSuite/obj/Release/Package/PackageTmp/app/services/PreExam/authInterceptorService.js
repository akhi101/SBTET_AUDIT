$(function () {
    'use strict';
    angular.module('app')
        .factory('authInterceptorService', ['$q', '$location', 'localStorageService', '$injector',
            function ($q, $location, localStorageService, $injector) {

                var authInterceptorService = {};

                var _request = function (config) {

                    config.headers = config.headers || {};

                    var authData = localStorageService.get('authorizationData');
                    if (authData) {
                        config.headers.Authorization = 'bearer ' + authData.token;
                    }

                    return config;
                };

                var _responseError = function (rejection) {
                    //var reservedPaths = ['/', '/pages', '/layout', '/customControls'];

                    // if (rejection.status === 401 && _.contains(reservedPaths, $location.path().trim())) {
                    if (rejection.status === 401) {
                        var authService = $injector.get('authService');
                        var authData = localStorageService.get('authorizationData');

                        //if (authData) {
                        //    if (authData.useRefreshTokens) {
                        //        authService.refreshToken().then(function (response) {
                        //           // $scope.tokenRefreshed = true;
                        //           // $scope.tokenResponse = response;
                        //        },
                        //        function (err) {
                        //            $location.path('/login');
                        //        });
                        //        return $q.reject(rejection);
                        //    }
                        //}
                        authService.logOut();

                    }
                    return $q.reject(rejection);
                };

                authInterceptorService.request = _request;
                authInterceptorService.responseError = _responseError;

                return authInterceptorService;
            }]);
}());