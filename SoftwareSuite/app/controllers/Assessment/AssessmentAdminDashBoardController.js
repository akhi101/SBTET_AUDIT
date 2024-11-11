define(['app'], function (app) {
    app.controller("AssessmentAdminController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MenuService, AssessmentService) {
        $scope.college = null;
        $scope.AcademicId = 0;
        $scope.Admission = {};
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.CollegeID = authData.CollegeID;
        $scope.CollegeID = authData.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.PrevAdmNo = authData.PrevAdmNo;
        AppSettings.TypeFlag = authData.TypeFlag;
        AppSettings.MngtTypID = authData.MngtTypID;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID;
        AppSettings.SeqNo = authData.SeqNo;
        AppSettings.DistrictIDs = authData.DistrictIDs;
        $scope.College_Code = authData.College_Code;
        $scope.College_Name = authData.College_Name;
        $scope.SystemUserTypeId = authData.SystemUserTypeId;
        $scope.BranchId = authData.BranchId;
       

     

        $scope.IsPrinciple = false;
        $scope.LoadImg = true;

        $scope.OpenDashboard = function () {
            $state.go("Dashboard");
        }
        $scope.Setdates = function () {
           
            $state.go("Assessment.SetDates");
        }


        $scope.logOut = function () {
            $scope.$emit("logout", authData.userName);
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;
           
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };
            $state.go('login')
        }

      
     


    });
});