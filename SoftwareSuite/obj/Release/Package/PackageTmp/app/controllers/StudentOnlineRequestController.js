define(['app'], function (app) {
    app.controller("StudentOnlineRequestController", function ($scope, $http, $localStorage, $state, AppSettings, MenuService, SystemUserService) {
        var authData = $localStorage.authorizationData;
        var UserRightsdata = SystemUserService.GetUserRightsById(0, 2);
        UserRightsdata.then(function (Usersdata, status, headers, config, error) {
            UserRights = Usersdata;
            AppSettings.UserRights = UserRights;
        }, function (error) {
            $scope.authentication = {
                isAuth: false,
                userName: ""
            };
            alert(error);
            return;
            });
        var url = "//freegeoip.net/json/";
        $http.get(url).then(function (response) {
            AppSettings.IPAddress = response.data.ip;
            $localStorage.authorizationData = {
                IPAddress: response.data.ip
            };
        });

        //$scope.CompanyName = AppSettings.CompanyName;
        //$scope.userName = authData.userName;
        //AppSettings.LoggedUserId = authData.UserId;

        //if (AppSettings.UserRights.length == 0) { AppSettings.UserRights = authData.UserRights; }
        //var UsersRightsdata = [];
        //UsersRightsdata = AppSettings.UserRights;
        //for (var i = 0; i < UsersRightsdata.length; i++) {
        //    if ((UsersRightsdata[i].RollAdd != 'Y') && (UsersRightsdata[i].RollEdit != 'Y') && (UsersRightsdata[i].RollDelete != 'Y') && (UsersRightsdata[i].RollPrint != 'Y')) {
        //        $scope[UsersRightsdata[i].ListFormName] = false;
        //    }
        //    else {
        //        $scope[UsersRightsdata[i].ListFormName] = true;
        //    }
        //}
        $scope.OpenDashboard = function () {
            $state.go('login')
        }
        $scope.GoToHome = function () {
            $state.go('StudentOnlineRequest');
        }

        $scope.logOut = function () {
            delete $localStorage.authorizationData;
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };
            $state.go('Dashboard')
        }
        $('.dropdown-submenu a.test').on("click", function (e) {
            $(this).next('ul').toggle();
            e.stopPropagation();
            e.preventDefault();
        });
    });
});







