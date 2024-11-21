define(['app'], function (app) {
    app.service('authInterceptorService', function ($q, $location, $localStorage) {
        var authInterceptorServiceFactory = {};
        var _request = function (config) {
            config.headers = config.headers || {};
            var authData = $localStorage.authToken;
            if (authData) {
                config.headers.token = authData;
            }
            return config;
        }

        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                $location.path('/login');
            }
            return $q.reject(rejection);

            transition.catch(angular.noop);
            return transition;

        }
        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;
        return authInterceptorServiceFactory;
    })
})