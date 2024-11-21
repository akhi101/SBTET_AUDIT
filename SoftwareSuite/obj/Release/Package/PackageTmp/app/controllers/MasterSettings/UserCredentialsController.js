define(['app'], function (app) {
    app.controller("UserCredentialsController", function ($scope, $state, AdminService, ForgetPasswordService, $crypto, $filter, $localStorage, SystemUserService) {

        const $ctrl = this;
        $ctrl.$onInit = () => {
            var authData = $localStorage.authorizationData;
            $scope.authToken = $localStorage.authToken;
            $scope.AssessmentModules = [];
            $scope.UserTypeID = parseInt(authData.SystemUserTypeId);
            if ($scope.UserTypeID != 1) {
                alert("UnAuthorized Access")
                $state.go('Dashboard.MasterSettings');
            }
            $scope.Loading = true;
            
            //$scope.GetUsersList();
            $scope.getUsers();

        }
        var sessioneKey = SystemUserService.GetSessionEKey();
        sessioneKey.then(function (res) {
            $scope.LoginSessionEKey = res;
            sessionStorage.SessionEkey = res;

        });

        $scope.GoBack = function () {
            $state.go('Dashboard.Settings')
        }
        //$scope.GetUsersList = function () {
        //    $scope.Loading = true;
        //    var GetUsersList = AdminService.GetUsersForPasswordReset();
        //    GetUsersList.then(function (response) {
        //        try {
        //            var res = JSON.parse(response);
        //        }
        //        catch (err) { }
        //        $scope.Loading = false;
        //        $scope.GetUsersList = res.Table;


        //        //console.log($scope.GetFeedbackList)

        //    },
        //        function (error) {
        //            $scope.Loading = false;
        //            alert("error while loading Data");
        //            var err = JSON.parse(error);
        //            var err = JSON.parse(error);

        //        });
        //   // $scope.Loading = false;
        //}

        //$scope.getActiveUserTypes = function () {
        //    var DataType = 2;
        //    var getusertype = AdminService.GetActiveUserTypes(DataType);
        //    getusertype.then(function (resp) {
        //        try {
        //            var res = JSON.parse(resp);
        //        }
        //        catch (err) { }

        //        if (res.length > 0) {
        //            $scope.UserTypesActiveData = res;

        //        }
        //        else {
        //            $scope.UserTypesActiveData = [];
        //        }

        //    },
        //        function (error) {
        //            //alert("data is not loaded");
        //            //    var err = JSON.parse(error);
        //        });

        //}

        $scope.getUsers = function () {
            $scope.loading = true;

            //if ($scope.UserType == null || $scope.UserType == undefined || $scope.UserType == "") {
            //    return;

            //}

            var getusers = AdminService.GetAllUsers();
            getusers.then(function (response) {

                //try {
                //    var res = JSON.parse(response);
                //}

                //catch (err){}
                if (response.Table.length > 0) {
                    $scope.loading = false;
                    $scope.UserData = response.Table;
                    $scope.nodata = false;
                } else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    $scope.UserData = []
                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.NoData = true;
                    alert("error while loading Data");
                    console.log(error);
                });


        }


        $scope.ViewPassword = function (UserName) {

           

            var reqdata = $crypto.encrypt(UserName, $scope.LoginSessionEKey) + "$$@@$$" + $scope.LoginSessionEKey;
            var getPromise = ForgetPasswordService.GetForgotPassword(reqdata);
            getPromise.then(function (data) {

                $scope.Password = data;
                alert(UserName + " Password is " + $scope.Password);
                $scope.UserName = null;



            });
        }

        
        //$scope.ViewPassword = function (Id,Password,collegecode) {
        //    let reqdata = $crypto.encrypt(Password, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt(Id.toString(), sessionStorage.Ekey) + "$$@@$$" + sessionStorage.Ekey;
        //    var GetUsersList = ChangePasswordService.GetCheckOldPassword(reqdata);
        //    GetUsersList.then(function (res) {
        //        try {
        //            var res = JSON.parse(res);
        //        }
        //        catch (err) { }
        //       // "{\"status\":\"200\",\"statusdesc\": \"123\"}"
        //        if (res.status == '200') {
        //            $scope.Loading = false;
        //            alert(collegecode+" Password is "+res.statusdesc);
        //            //$scope.Logout()

        //        } else if (res.status == '400') {
        //            $scope.Loading = false;
        //            alert(res.statusdesc);
        //            $scope.ClearData()

        //        }
        //        //$scope.GetUsersList = res.Table;

        //        //console.log($scope.GetFeedbackList)

        //    },
        //        function (error) {
        //            alert("error while loading Data");
        //            var err = JSON.parse(error);
        //            var err = JSON.parse(error);

        //        });
        //}


        //$scope.ResetPassword = function (Id) {
        //    $scope.NewPassword = 'sbtetap'
        //    DataType = 1;

        //    let reqdata = $crypto.encrypt($scope.NewPassword, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt(Id.toString(), sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt(DataType.toString(), sessionStorage.Ekey) + "$$@@$$" + sessionStorage.Ekey;
        //    var GetUsersList = ChangePasswordService.ResetUserPassword(reqdata);
        //    GetUsersList.then(function (res) {
        //        try {
        //            var res = JSON.parse(res);
        //        }
        //        catch (err) { }
        //        if (res.ResponceCode == '200') {
        //            $scope.Loading = false;
        //            alert(res.ResponceDescription);
        //            //$scope.Logout()

        //        } else if (res.ResponseCode == '400') {
        //            $scope.Loading = false;
        //            alert(res.ResponseDescription);
        //            $scope.ClearData()

        //        }
        //        //$scope.GetUsersList = res.Table;

        //        //console.log($scope.GetFeedbackList)

        //    },
        //        function (error) {
        //            alert("error while loading Data");
        //            var err = JSON.parse(error);
        //            var err = JSON.parse(error);

        //        });
        //}

        //$scope.Reset = function (Id, UserName) {
        //    let text = "Are You Sure You want to Reset Password for " + UserName;
        //    if (confirm(text) == true) {
        //        text = "Yes";
        //        $scope.ResetPassword(Id)
        //    } else {
        //        text = "No";
        //    }
        //    //document.getElementById("demo").innerHTML = text;
        //}

    })
})