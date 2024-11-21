define(['app'], function (app) {
    app.controller("CreateUser1Controller", function ($scope, SystemUserService, MasterSettingsService, $localStorage, $crypto, $state, $uibModal) {
        var authData = $localStorage.authorizationData;
        $scope.UserTypeID = authData.UserTypeID

        const $ctrl = this
        $ctrl.$onInit = () => {
            $scope.getUserTypes();
            $scope.getActiveUserTypes();
        }

        var ExpiryDate='12-12-2030'
        $scope.ExpiryDate = ExpiryDate;
        $scope.tab1 = function () {
            $scope.UserTypeName = null;
        }
        $scope.tab2 = function () {
            $scope.UserType = null;
            $scope.ModuleName = null;
            $scope.ModuleID = null;
        }

        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.UserEKey = res;
            sessionStorage.Ekey = res;

        });

        $scope.clearDefaults = function () {

            $scope.UserTypeName = null;


            //$scope.UserType = null;
            $scope.NewUserName = null;
            $scope.CreatePass = null;
            $scope.ConfirmPass = null;
            $scope.NameofUser = null;
            $scope.MobileNumber = null;
            $scope.Email = null;


        }

        $scope.getUserTypes = function () {
            var DataType = 1;
            var getusertype = MasterSettingsService.GetUserTypes(DataType,'','');
            getusertype.then(function (resp) {
                //try {
                //    var res = JSON.parse(resp);
                //}
                //catch (err) { }

                if (resp.length > 0) {
                    $scope.UserTypesDataTable = resp;

                }
                else {
                    $scope.UserTypesDataTable = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });

        }

        $scope.getActiveUserTypes = function () {
            var DataType = 3;
            var getusertype = MasterSettingsService.GetActiveUserTypes(DataType,'',true);
            getusertype.then(function (resp) {
                //try {
                //    var res = JSON.parse(resp);
                //}
                //catch (err) { }

                if (resp.length > 0) {
                    $scope.UserTypesActiveData = resp;

                }
                else {
                    $scope.UserTypesActiveData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });

        }


        $scope.addUserTypes = function () {
            if ($scope.UserTypeName == null || $scope.UserTypeName == undefined || $scope.UserTypeName == "") {
                alert('Please Enter UserTypeName');
                return;
            }
            if ($scope.Purpose == null || $scope.Purpose == undefined || $scope.Purpose == "") {
                alert('Please Enter Purpose');
                return;
            }
            $scope.loading = true;
            var paramObject = {
                "DataType": 1,
                "UserTypeID": 0,
                "UserTypeName": $scope.UserTypeName,
                "Purpose": $scope.Purpose,
                "Active": true,
                "UserName": authData.userName
            }
            $scope.UserTypesDataTable = [];
            $scope.usertypeName = true;
            var SetUserTypes = MasterSettingsService.AddUserTypes(paramObject);
            SetUserTypes.then(function (response) {
                //try {
                //    var res = JSON.parse(response);
                //}
                //catch (err) { }

                if (response[0].ResponseCode == '200') {
                    $scope.loading = false;
                    //$scope.UserTypeID = res[0].UserTypeID;
                    alert(response[0].ResponseDescription);
                    $scope.getUserTypes();
                    $scope.getActiveUserTypes();
                    $scope.clearDefaults();
                    $scope.loading = false;
                    $scope.usertypeName = false;


                } else if (response[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(response[0].ResponseDescription);
                    $scope.getUserTypes();
                    $scope.getActiveUserTypes();
                    $scope.loading = false;
                    $scope.usertypeName = false;


                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }

        $scope.Edit = function (UserTypeID) {
            var DataType = 2;
            var editusertypes = MasterSettingsService.EditUserTypes(DataType,UserTypeID,'');
            editusertypes.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.length > 0) {
                    $scope.EditData = response;
                }
                else {
                    $scope.EditData = [];
                }


            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });



            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditUserTypesPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
                backdrop: false,
            });

        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }

        $scope.updateUserTypes = function (data) {
            //$scope.loading = true;
            var paramObject = {
                "DataType": 2,
                "UserTypeID": data[0].UserTypeID,
                "UserTypeName": data[0].UserTypeName,
                "Purpose": data[0].Purpose,
                "Active": data[0].Active,
                "UserName": authData.userName
            }
            var SetUserTypes = MasterSettingsService.UpdateUserTypes(paramObject);
            SetUserTypes.then(function (response) {
                //try {
                //    var res = JSON.parse(response);
                //}
                //catch (err) { }

                if (response[0].ResponseCode == '200') {
                    $scope.loading = false;
                    alert(response[0].ResponseDescription);
                    $scope.getUserTypes();
                    $scope.getActiveUserTypes();
                    $scope.loading = false;
                    $scope.modalInstance.close();
                    $scope.clearDefaults();



                } else if (response[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(response[0].ResponseDescription);
                    $scope.getUserTypes();
                    $scope.getActiveUserTypes();
                    $scope.modalInstance.close();

                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.getUsers = function (UserType) {
            $scope.loading = true;

            //if ($scope.UserType == null || $scope.UserType == undefined || $scope.UserType == "") {
            //    return;

            //}
            var DataType = 2;
            var getusers = MasterSettingsService.GetUsers(DataType,$scope.UserType,'','');
            getusers.then(function (response) {

                //try {
                //    var res = JSON.parse(response);
                //}

                //catch (err){}
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.UserData = response;
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


        $scope.CheckPassword = function () {
            if ($scope.CreatePass !== $scope.ConfirmPass) {
                alert("Password and Confirm Password Not Matched")
                return;
            }
        }


        $scope.addUser = function () {
            //$scope.loading = true;
            var DataType = 1;
            var EncriptedPassword = $crypto.encrypt($crypto.encrypt($scope.CreatePass, 'HBSBP9214EDU00TS'), $scope.UserEKey) + '$$@@$$' + $scope.UserEKey;
            var paramObject = {
                "DataType": DataType,
                "UserID": '',
                "UserTypeID": $scope.UserType,
                "NewUserName": $scope.NewUserName,
                "UserPassword": EncriptedPassword,
                "ExpiryDate": $scope.ExpiryDate,
                "Active": 1,
                "NameofUser": $scope.NameofUser,
                "LastName": '',
                "Address": $scope.Address,
                "Email": $scope.Email,
                "MobileNumber": $scope.MobileNumber,
                "CollegeID": '',
                "BranchID": '',
                "UserName": authData.userName
            }
            var SetUsers = MasterSettingsService.AddUser(paramObject);
            SetUsers.then(function (response) {
                //try {
                //    var res = JSON.parse(response);
                //}
                //catch (err) { }

                if (response[0].ResponseCode == '200') {
                    $scope.loading = false;
                    //$scope.UserTypeID = res[0].UserTypeID;
                    alert(response[0].ResponseDescription);
                    $scope.getUsers();
                    $scope.clearDefaults();



                } else if (response[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(response[0].ResponseDescription);
                    $scope.getUsers();
                    $scope.loading = false;


                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.editUserDetails = function (Id) {

            var DataType = 2;
            var edituser = MasterSettingsService.EditUsers(DataType, Id,'');
            edituser.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.length > 0) {
                    $scope.EditData = response;
                    //$scope.getUserTypes($scope.EditData[0].UserTypeID);
                }
                else {
                    $scope.EditData = [];
                }


            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });



            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditUserPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });

        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }

        $scope.updateUser = function (data) {
            //$scope.loading = true;
            var DataType = 2;
            var paramObject = {
                "DataType": DataType,
                "UserID": data.Id,
                "UserTypeID": data.UserTypeId,
                "NewUserName": data.UserName,
                "UserPassword": '',
                "ExpiryDate": data.ExpiryDate,
                "Active": data.IsActive,
                "NameofUser": data.FirstName,
                "LastName": data.LastName,
                "Address": data.Address1,
                "Email": data.EmailId,
                "MobileNumber": data.CellNo,
                "CollegeID": data.CollegeId,
                "BranchID": data.BranchId,
                "UserName": authData.userName
            }
            var updateuser = MasterSettingsService.UpdateUser(paramObject);
            updateuser.then(function (newRes) {
                //try {
                //    var res = JSON.parse(newRes);
                //}
                //catch (err) { }

                if (newRes[0].StatusCode == '200') {
                    alert(newRes[0].StatusDescription);
                    $scope.loading = false;
                    $scope.modalInstance.close();
                    $scope.getUsers();
                    $scope.clearDefaults();
                    $scope.loading = false;


                } else if (newRes[0].StatusCode == '400') {
                    $scope.loading = false;
                    alert(newRes[0].StatusDescription);
                    $scope.modalInstance.close();
                    $scope.getUsers();
                    $scope.loading = false;
                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }

    })
})