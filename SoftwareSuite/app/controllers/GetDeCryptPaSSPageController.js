define(['app'], function (app) {
    app.controller("GetDeCryptPaSSPageController", function ($scope, AdminService,SystemUserService, ForgetPasswordService, $crypto, $scope, $crypto) {
        const $ctrl = this;
        $ctrl.$onInit = () => {
           // $scope.getUsers();
        }

        var sessioneKey = SystemUserService.GetSessionEKey();
        sessioneKey.then(function (res) {
            $scope.LoginSessionEKey = res;
            sessionStorage.SessionEkey = res;

        });
        $scope.UserTypeID = 1;



        $scope.getUsers = function () {
            var getusers = AdminService.GetUsers();
            getusers.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.Table.length > 0) {
                    $scope.UsersData = response.Table;
                   
                    for (var i = 0; i < $scope.UsersData.length; i++) {
                        $scope.UserNames = $scope.UsersData[i].UserName;
                       // var UserNames = $scope.UsersData[i].UserName;
                        $scope.Submit()
                      
                    }
                    $scope.range = range;
                    console.log(range)
                    //$scope.Submit($scope.range);

                }
                else {

                    $scope.UsersData = [];

                }

            },
                function (error) {

                });
        }
        var range = [];
        $scope.Submit = function () {

            var obj = {}
            obj.UserName = $scope.UserNames

            var reqdata = $crypto.encrypt($scope.UserName,$scope.LoginSessionEKey) + "$$@@$$" + $scope.LoginSessionEKey;
            var getPromise = ForgetPasswordService.GetForgotPassword(reqdata);
            getPromise.then(function (data) {
                $scope.Password = data;
                alert($scope.Password);
                
                obj.Password = $scope.Password
                range.push(obj);
                console.log(range)
                $scope.UserNames = null;

            });
        }


        $scope.SetPasswords = function () {
            var setpassword = AdminService.AddUserPasswords($scope.UserName,$scope.UserPassword);
            setpassword.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) {
                }
                if (res.Table[0].ResponseCode == '200') {
                    //alert(res.Table[0].ResponseDescription);



                } else if (res.Table[0].ResponseCode == '400') {
                    //alert(res.Table[0].ResponseDescription);
                }

                else {
                    alert("Not Added")


                }
            },

                function (error) {
                    $scope.Loading = false;
                    var err = JSON.parse(error);
                })

        }


    })
})