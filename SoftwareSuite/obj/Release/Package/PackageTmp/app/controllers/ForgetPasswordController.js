define(['app'], function (app) {
    app.controller("ForgetPasswordController", function ($scope, $state, $filter, $stateParams, AppSettings, $crypto, ForgetPasswordService) {
        $scope.ForgetPassword = {};
        $scope.ShowLoading = false;
        $scope.SavePreDetails = function () {
            $scope.Smsbtndisable = true;
            if (($scope.ForgetPassword.LoginName == undefined) || ($scope.ForgetPassword.LoginName == "")) {
                alert("Enter Username");
                return false;
            }
           
            if (($scope.ForgetPassword.CellNo == undefined) || ($scope.ForgetPassword.CellNo == "")) {
                alert("Enter Mobile Number");
                return false;
            }
            if (($scope.ForgetPassword.CellNo.length < 10) || ($scope.ForgetPassword.CellNo.length > 10)) {
                alert("Invalid Mobile Number");
                return false;
            }
            $scope.SysUserID = 0;
            $scope.ShowLoading = true;
            let reqdata = $crypto.encrypt($scope.ForgetPassword.LoginName, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt($scope.ForgetPassword.CellNo, sessionStorage.Ekey) + "$$@@$$" + sessionStorage.Ekey;
            var getPromise = ForgetPasswordService.GetForgetPassword(reqdata);
            getPromise.then(function (data) {
                try {
                    var res = JSON.parse(data);

                } catch ( ex) {
                }
                if (res.status == "200") {
                    $scope.Smsbtndisable = false;
                    $scope.ShowLoading = false;

                    var Message = "Dear Sir//Madam, Your Login Credentials: UserName=" + $scope.ForgetPassword.LoginName + ", Password= " + data[0].LoginPassword + " SBTETTS";
                    //var Urlstring = "?User=sbtetts&Passwd=sbtet@1972&Sid=SBTETS&Mobilenumber=91" + data[0].CellNo + "&Message=" + Message + "&Mtype=N&DR`=Y";
                    //  var FinalURL= AppSettings.SMSApiUrl + Urlstring;

                    alert("Login Credentials sent to the registered mobile number. Please check.");
                    RedirectToListPage();
                } else {
                    alert(res.statusdesc);
                    $scope.Smsbtndisable = false;
                    $scope.ShowLoading = false;
                    $scope.RollEditDisable = false;
                }
               
            }, function (error) {
                    $scope.Smsbtndisable = false;
                $scope.ShowLoading = false;
                    $scope.RollEditDisable = false;
                    try {
                        var res = JSON.parse(error);

                    } catch (ex) {
                    }
                    alert(res.statusdesc);
               
            });
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('login');
        }
    });
});
