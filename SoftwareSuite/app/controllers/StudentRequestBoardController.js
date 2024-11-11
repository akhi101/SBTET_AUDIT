define(['app'], function (app) {
	app.controller("StudentRequestBoardController", function ($scope, $http, $localStorage, $state, AppSettings, MenuService) {
		var authData = $localStorage.authorizationData;
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID;
        if (AppSettings.UserRights.length == 0) { AppSettings.UserRights = authData.UserRights; }
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        
        for (var i = 0; i < UsersRightsdata.length; i++) {
			if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
				$scope[UsersRightsdata[i].GridFormToOpen] = false;
			}
			else {
				$scope[UsersRightsdata[i].GridFormToOpen] = true;
			}
			$scope[UsersRightsdata[i].GridFormToOpen + 'Name'] = UsersRightsdata[i].SysProgName;
        }

        $scope.Myrequest = function () {
            if (AppSettings.TypeFlag == 'B') {
                $state.go('StudentRequestBoard.StudReqList');
            }
            else {
                alert("This is not Board user");
                return;
            }
        }
        $scope.GoToHome = function () {
            $state.go('StudentRequestBoard');
        }
		$scope.OpenDashboard = function () {
			$state.go('Dashboard')
		}
        $scope.logOut = function () {
            delete $localStorage.authorizationData;
            var InsertLoginList = MenuService.GetUpdateLogoutInfo(AppSettings.LoggedUserId, $scope.userName);
            InsertLoginList.then(function (Districtdata, status, headers, config, error) {
            }, function (error) {
                alert(error);
            });
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };
			$state.go('login')
        }
    });
});







