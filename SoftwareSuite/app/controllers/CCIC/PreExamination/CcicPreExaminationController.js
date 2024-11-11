define(['app'], function (app) {
    app.controller("CcicPreExaminationController", function ($scope, $http, $localStorage, CcicPreExaminationService,$state, AppSettings, CcicSystemUserService) {

        var authData = $localStorage.authorizationData;
        $scope.userType = authData.SystemUserTypeID;
        $scope.hide = false;
        if ($scope.userType != 3) {
            $scope.hide = true;
        }

        var submodules = [];
        var UserTypeID = authData.UserTypeID;
        var ModuleID = parseInt($localStorage.selectedModule.ModuleID);

        var getAdmissionsubmod = CcicSystemUserService.GetCcicUserSubModules(UserTypeID, ModuleID);
        getAdmissionsubmod.then(function (Usersdata) {
            var modulesList = [];
            var moduleroutename = "";
            if (Usersdata.length > 0) {
                for (var i = 0; i < Usersdata.length; i++) {

                    var obj = {};
                    obj.SysModName = Usersdata[i].SubModuleName;
                    obj.SysModID = Usersdata[i].ModuleID;
                    obj.ModuleRouteName = Usersdata[i].SubModuleRouteName;
                    obj.ModuleImageClass = Usersdata[i].ModuleCardClassName;
                    modulesList.push(obj);

                }
                $scope.PreExamModules = modulesList;
                // $('.overlayCss').css('display', 'none');
            } else {
                $scope.PreExamModules = [];
            }
        }, function (err) {
            console.log(err);
        });

        $scope.$on('showLoading', function (evt, data) {
            $('.overlayCss').css('display', 'block');
        });

        $scope.$on('hideLoading', function (evt, data) {
            $('.overlayCss').css('display', 'none');
        });


        //if($scope.userType==1){

        //    var obj = {};
        //    obj.SysModName = 'Set Exam Dates';
        //    obj.SysModID = '4';
        //    obj.ModuleRouteName = 'SetDates';
        //    obj.ModuleImageClass = 'small-box bg-blue';
        //    submodules.push(obj);

        //   var obj = {};
        //    obj.SysModName = 'Set Exam Centers';
        //    obj.SysModID = '6';
        //    obj.ModuleRouteName = 'SetExamCenters';
        //    obj.ModuleImageClass = 'small-box bg-orange ';
        //    submodules.push(obj);

        //    var obj = {};
        //    obj.SysModName = 'Search Pin';
        //    obj.SysModID = '3';
        //    obj.ModuleRouteName = 'Search';
        //    obj.ModuleImageClass = 'small-box bg-navy';
        //    submodules.push(obj);      

        //    var obj = {};
        //    obj.SysModName = 'Sms Service';
        //    obj.SysModID = '2';
        //    obj.ModuleRouteName = 'SmsService';
        //    obj.ModuleImageClass = 'small-box bg-blue';
        //    submodules.push(obj);

        //}   
        //var obj = {};
        //obj.SysModName = 'Fee Payment';
        //obj.SysModID = '7';
        //obj.ModuleRouteName = 'PreExamFeePayment';
        //obj.ModuleImageClass = 'small-box bg-blue ';
        //submodules.push(obj);

        //var obj = {};
        //obj.SysModName = 'NR Download';
        //obj.SysModID = '5';
        //obj.ModuleRouteName = 'NrDownload';
        //obj.ModuleImageClass = 'small-box bg-orange ';
        //submodules.push(obj);

        //var obj = {};
        //obj.SysModName = 'Reports';
        //obj.SysModID = '5';
        //obj.ModuleRouteName = 'PreExamReports';
        //obj.ModuleImageClass = 'small-box bg-maroon ';
        //submodules.push(obj);


        $scope.submodules = submodules;




        //$scope.OpenSubModule = function (Module) {
        //    if (Module.ModuleRouteName == 'FeePayment') {
        //        alert('Fee Payment will be Resumed Soon');
        //        // $state.go("CcicDashboard.PreExamination");
        //        return;
        //    }
        //    else {
        //        $state.go("CcicDashboard.PreExamination" + Module.SubModuleRouteName);
        //    }
        //}



        $scope.OpenSubModule = function (Module) {
            if (Module.ModuleRouteName == 'FeeEligibleReports') {
                    $scope.loading = true;
                    var DataType = 1;
                    var feeEligibleReportExcel = CcicPreExaminationService.GetFeeEligibleReportExcel(DataType);
                 feeEligibleReportExcel.then(function (res) {
                        $scope.loading = false;
                        if (res.length > 0) {
                            if (res.length > 4) {
                                window.location.href = res;
                            } else {
                                alert("No FeeEligible Excel Report Present")
                            }
                        } else {
                            alert("No FeeEligible Report Present")
                        }
                    }, function (err) {
                        $scope.LoadImg = false;
                        alert("Error while loading");
                    });
            }
            else {
                $state.go("CcicDashboard.PreExamination" + Module.SubModuleRouteName);
            }
        }
        //$scope.OpenSubModule = function (Module) {

        //        $state.go("CcicDashboard.PreExamination" + Module.SubModuleRouteName);
            
        //}
    

        $scope.OpenCcicDashboard = function () {
            $state.go('CcicDashboard')
        }

        $scope.logOut = function () {
            //$scope.$emit("logout", authData.UserName);
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
            $state.go('CcicLogin');
        }


    })
})