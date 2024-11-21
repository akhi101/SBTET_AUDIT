define(['app'], function (app) {
    app.controller("CcicDashboardController", function ($scope, $stateParams, $localStorage, $state, AppSettings, CcicSystemUserService, CcicAdminService) {
        $scope.$on('showLoading', function (evt, data) {
            $('.overlayCss').css('display', 'block');
        });

        $scope.$on('hideLoading', function (evt, data) {
            $('.overlayCss').css('display', 'none');
        });
        var authData = $localStorage.authorizationData;
        $scope.SessionID = $localStorage.SessionID;
        if (authData == undefined) {
            $state.go('index.WebsiteLogin');
        }
        else {
            $scope.UserName = authData.UserName;
            $scope.UserTypeID = authData.UserTypeID;
            $scope.InstitutionID = authData.InstitutionID;
          
        
            var GetCcicRecentNews = CcicAdminService.GetCcicRecentNews();
            GetCcicRecentNews.then(function (response) {

                $scope.GetCcicRecentNews = response;
            },
                function (error) {
                    alert("error while loading Recent News");
                    var err = JSON.parse(error);
                });


            if ($scope.UserTypeID == 2) {
                $scope.HideChangePassword = true;
            }
            else {
                $scope.HideChangePassword = false;

            }


            AppSettings.InstitutionCode = authData.InstitutionCode;
            AppSettings.InstitutionName = authData.InstitutionName;
          
            $scope.InstitutionCode = authData.InstitutionCode == "" || authData.InstitutionCode == null ? "" : authData.InstitutionCode;
            $scope.InstitutionName = authData.InstitutionName == "" || authData.InstitutionName == null ? "" : authData.InstitutionName;
           


       
            var UserTypeID = parseInt($scope.UserTypeID);
            var UserRightsdata = CcicSystemUserService.GetCcicUserModules(UserTypeID);
            UserRightsdata.then(function (Usersdata, status, headers, config, error) {
                UserRights = Usersdata;
                var modulesList = [];
                var moduleroutename = "";
                if (Usersdata.length > 0) {
                    for (var i = 0; i < Usersdata.length; i++) {
                        //  if (moduleroutename != Usersdata[i].ModuleRouteName) {
                        var obj = {};
                        obj.SysModName = Usersdata[i].ModuleName;
                        obj.SysModID = Usersdata[i].ModuleID;
                        obj.ModuleRouteName = Usersdata[i].ModuleRouteName;
                        obj.ModuleImageClass = Usersdata[i].ModuleCardClassName;
                        modulesList.push(obj);
                        //    moduleroutename = UsersRightsdata[i].ModuleRouteName;
                        //   }
                    }
                    $scope.modulesList = modulesList;
                } else {
                    $scope.modulesList = [];
                }



                AppSettings.UserRights = UserRights;


            }, function (error) {
                $scope.modulesList = [];
            });



            var GetCcicRecentNews = CcicAdminService.GetCcicRecentNews();
            GetCcicRecentNews.then(function (response) {
                $scope.RecentNewsText = response;
                if (response.Table !== undefined) {
                    $scope.GetCcicRecentNews = response.Table[0].RecentNewsText;
                }
            },
                function (error) {
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





            $scope.CcicChangePassword = function () {
                $state.go('CcicDashboard.CcicChangePassword');
            }
            $scope.$on('onBeforeUnload', function (e, confirmation) {
                confirmation.message = "If you refresh or close browser, your session will expire and all data will be lost";
                e.preventDefault();
            });




            var UsersRightsdata = [];
            UsersRightsdata = AppSettings.UserRights;
            var moduleroutename = "";


            $scope.adminuser = false;

            $scope.OpenModule = function (Module) {
                $localStorage.selectedModule = {
                    ModuleID: Module.SysModID,
                    ModuleRouteName: Module.ModuleRouteName
                }
                $state.go("CcicDashboard." + Module.ModuleRouteName);
            }


            $scope.logOut = function () {


                sessionStorage.loggedIn = "no";
                var GetCcicUserLogout = CcicSystemUserService.PostCcicUserLogout($scope.UserName, $scope.SessionID);

                delete $localStorage.authorizationData;
                delete $localStorage.authToken;
                delete $scope.SessionID;

                $scope.authentication = {
                    isAuth: false,
                    UserID: 0,
                    UserName: ""

                };
                $state.go('CcicLogin')
            }

        }



    });
});