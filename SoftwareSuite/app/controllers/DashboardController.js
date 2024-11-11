define(['app'], function (app) {
    app.controller("DashboardController", function ($scope, $stateParams, $localStorage, $state, AppSettings, SystemUserService, AdminService) {
        $scope.$on('showLoading', function (evt, data) {
            $('.overlayCss').css('display', 'block');
        });

        $scope.$on('hideLoading', function (evt, data) {
            $('.overlayCss').css('display', 'none');
        });
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.WebsiteLogin');
        } else {
            $scope.userName = authData.userName;
            AppSettings.userName = authData.userName;
            AppSettings.LoggedUserId = authData.SysUserID;
           
            $scope.userType = authData.SystemUserTypeId;
            var getNotifications = AdminService.GetNotificationByUser($scope.userType);
            getNotifications.then(function (response) {
              
                $scope.Notification = response;
            },
                    function (error) {
                        alert("error while loading Notification");
                        var err = JSON.parse(error);
                    });

            //alert("College Id" + authData.CollegeID);
            AppSettings.CollegeID = authData.CollegeID;
            $scope.CollegeID = authData.CollegeID;
            AppSettings.AcdYrID = authData.AcdYrID;
            AppSettings.PrevAdmNo = authData.PrevAdmNo;
            AppSettings.TypeFlag = authData.TypeFlag;
            AppSettings.MngtTypID = authData.MngtTypID;
            AppSettings.SysUsrGrpID = authData.SysUsrGrpID,
                AppSettings.SeqNo = authData.SeqNo,
                AppSettings.UserRights = authData.UserRights,
                AppSettings.DistrictIDs = authData.DistrictIDs;
            AppSettings.College_Code = authData.College_Code;
            AppSettings.College_Name = authData.College_Name;
           /* alert("dashboard " + authData.SystemUserTypeId);*/
            $scope.College_Code = authData.College_Code == "" || authData.College_Code == null ? "" : authData.College_Code;
            $scope.College_Name = authData.College_Name == "" || authData.College_Name == null ? "" : authData.College_Name;
            var UserTypeId = parseInt($scope.userType);
            var UserRightsdata = SystemUserService.GetModulesbyRole(UserTypeId);
            UserRightsdata.then(function (Usersdata, status, headers, config, error) {
                UserRights = Usersdata;
                var modulesList = [];
                var moduleroutename = "";
                if (Usersdata.length > 0) {
                    for (var i = 0; i < Usersdata.length; i++) {
                        //  if (moduleroutename != Usersdata[i].ModuleRouteName) {
                        var obj = {};
                        obj.SysModName = Usersdata[i].ModuleName;
                        obj.SysModID = Usersdata[i].Id;
                        obj.ModuleRouteName = Usersdata[i].ModuleRouteName;
                        obj.ModuleImageClass = Usersdata[i].Class;
                        modulesList.push(obj);
                        //    moduleroutename = UsersRightsdata[i].ModuleRouteName;
                        //   }
                    }
                    $scope.modulesList = modulesList;
                } else {
                    $scope.modulesList = [];
                }

                //$localStorage.authorizationData = {
                //    token: response.data.access_token,
                //    SysUserID: response.data.SysUserID,
                //    userName: response.data.LoginName,
                //    CollegeID: AppSettings.CollegeID,
                //    UserRights: UserRights,
                //    PrevAdmNo: AppSettings.PrevAdmNo,
                //    AcdYrID: AppSettings.AcdYrID,
                //    TypeFlag: response.data.TypeFlag,
                //    MngtTypID: AppSettings.MngtTypID,
                //    SysUsrGrpID: AppSettings.SysUsrGrpID,
                //    SeqNo: AppSettings.SeqNo,
                //    DistrictIDs: AppSettings.DistrictIDs,
                //    ColCode: AppSettings.ColCode,
                //    ExamInstID: AppSettings.ExamInstID,
                //    College_Code: AppSettings.College_Code,
                //    College_Name: AppSettings.College_Name,
                //    SystemUserTypeId: AppSettings.SystemUserTypeId,
                //    BranchId: AppSettings.BranchId
                //};
                //alert(UserRights);
                //AppSettings.WebApiUrl = response.data.WebApiUrl;

                AppSettings.UserRights = UserRights;


            }, function (error) {
                $scope.modulesList = [];
            });


            var getNotifications = AdminService.GetNotificationByUser($scope.userType);
            getNotifications.then(function (response) {
               $scope.Notification = response;
                if (response.Table !== undefined) {
                    $scope.getNotification = response.Table[0].Notification;
                }
            },
                    function (error) {
                     //   alert("error while loading Notification");
                        var err = JSON.parse(error);
                    });



            $scope.SeatArrangGen = function () {
                var link = document.createElement("a");
                link.download = "test.pdf";
                link.target = "_blank";
                var c = authData.ColCode;
                link.href = "http://bie.telangana.gov.in/tsbieweb/pdf/" + c + "_SPREG.PDF";
                link.click();

            }
            $scope.SeatArrangVoc = function () {
                var link = document.createElement("a");
                link.download = "test.pdf";
                link.target = "_blank";
                var c = authData.ColCode;
                link.href = "http://bie.telangana.gov.in/tsbieweb/pdf/" + c + "_SPVOC.PDF";
                link.click();

            }

          

          

            $scope.ChangePassword = function () {
                $state.go('Dashboard.ChangePassword');
            }
            $scope.$on('onBeforeUnload', function (e, confirmation) {
                confirmation.message = "If you refresh or close browser, your session will expire and all data will be lost";
                e.preventDefault();
            });


            // used to discard the loaded data on browser refresh

            //$scope.$on('onUnload', function (e) {
            //   
            //    delete $localStorage.authorizationData;
            //    sessionStorage.loggedIn = "no";
            //});

            var UsersRightsdata = [];
            UsersRightsdata = AppSettings.UserRights;
            var moduleroutename = "";

            //var obj = {};
            //obj.SysModName = 'Admission';
            //obj.SysModID = '1';
            //obj.ModuleRouteName = 'Admission';
            //obj.ModuleImageClass = 'small-box bg-aqua';
            //modulesList.push(obj);
            //var obj = {};
            //obj.SysModName = 'Results';
            //obj.SysModID = '2';
            //obj.ModuleRouteName = 'Results';
            //obj.ModuleImageClass = 'small-box bg-green';
            //modulesList.push(obj);

            //         var obj = {};
            //         obj.SysModName = 'Assessment';
            //         obj.SysModID = '3';
            //         obj.ModuleRouteName = 'Assessment';
            //         obj.ModuleImageClass = 'small-box bg-yellow';
            //         modulesList.push(obj);



            //     if ($scope.userType == "2" ){
            //var obj = {};
            //         obj.SysModName = 'Academic';
            //         obj.SysModID = '4';
            //         obj.ModuleRouteName = 'Academic';
            //         obj.ModuleImageClass = 'small-box bg-blue';
            //         modulesList.push(obj);		

            //}          


            //if ($scope.userType == "1" && $scope.userType != "") {
            //    var obj = {};
            //    obj.SysModName = 'Circulars/Notices';
            //    obj.SysModID = '3';

            //    obj.ModuleRouteName = 'Circulars';
            //    obj.ModuleImageClass = 'small-box bg-maroon';
            //    modulesList.push(obj);
            //}


            $scope.adminuser = false;

            $scope.OpenModule = function (Module) {
                $localStorage.selectedModule = {
                    Id :Module.SysModID,
                    ModuleRouteName: Module.ModuleRouteName
                }
                $state.go("Dashboard." + Module.ModuleRouteName);
            }


            $scope.logOut = function () {
                sessionStorage.loggedIn = "no";
                delete $localStorage.authorizationData;

                $scope.authentication = {
                    isAuth: false,
                    UserId: 0,
                    userName: ""
                };
                $state.go('index.WebsiteLogin')
            }

        }

      
    });
});