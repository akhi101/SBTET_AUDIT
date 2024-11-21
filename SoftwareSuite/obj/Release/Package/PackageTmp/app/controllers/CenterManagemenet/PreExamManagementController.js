define(['app'], function (app) {
    app.controller("PreExamManagementController", function ($scope, $state, $stateParams, AppSettings, PreExamManagementService, BasicCollegeService, BasicManagementService, BasicDistrictsService) {
        $scope.PreExamManagement = { ExamMgntID: $stateParams.ExamMgntID };
        var DistrictID = $stateParams.DistrictID;
        $scope.PreExamManagement.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PreExamManagementRightsdata = [];
        $scope.CollegeDisable = false;
        PreExamManagementRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreExamManagementRightsdata.length; i++) {
            if (PreExamManagementRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreExamManagement.ExamMgntID == 0) {
                    if (PreExamManagementRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PreExamManagementRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PreExamManagementRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
        }, function (DistrictData, status, headers, config) {
            alert(error);
            });
        var BasicManagementList = BasicManagementService.GetBasicManagementList();
        BasicManagementList.then(function (BasicManagementData, status, headers, config, error) {
            $scope.BasicManagementList = BasicManagementData;
        }, function (BasicManagementData, status, headers, config) {
            alert(error);
        });

        if ($scope.PreExamManagement.ExamMgntID > 0) {
            var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
            BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                $scope.BasicDistrictList = DistrictData;
                var BasicCollegeList = BasicCollegeService.GetCollegeListByDistrict(DistrictID);
                BasicCollegeList.then(function (BasicCollegeData, status, headers, config, error) {
                    $scope.BasicCollegeList = BasicCollegeData;
                    var BasicManagementList = BasicManagementService.GetBasicManagementList();
                    BasicManagementList.then(function (BasicManagementData, status, headers, config, error) {
                        $scope.BasicManagementList = BasicManagementData;
                        if ($scope.PreExamManagement.ExamMgntID > 0) {
                            $scope.CollegeDisable = true;
                            var PreExamManagementdata = PreExamManagementService.GetPreExamManagementById($scope.PreExamManagement.ExamMgntID);
                            PreExamManagementdata.then(function (data) {
                                $scope.PreExamManagement = data[0];
                                $scope.PreExamManagement.ExamInstID = $scope.PreExamManagement.ExamInstID;
                            }, function (error) {
                                alert(error);
                            });
                        }
                    }, function (BasicManagementData, status, headers, config) {
                        alert(error);
                    });
                }, function (BasicCollegeData, status, headers, config) {
                    alert(error);
                });
            }, function (DistrictData, status, headers, config) {
                alert(error);
            });
        }
        $scope.FillCollege = function (DistrictID) {
            $scope.CollegeDisable = false;
            GetCollage(DistrictID);
        }
        var GetCollage = function (DistrictID) {
            var BasicCollegeList = BasicCollegeService.GetCollegeListByDistrict(DistrictID);
            BasicCollegeList.then(function (BasicCollegeData, status, headers, config, error) {
                $scope.BasicCollegeList = BasicCollegeData;
            }, function (BasicCollegeData, status, headers, config) {
                alert(error);
            });
        }
        $scope.SavePreExamManagement = function () {
            $scope.isupdatableDisable = true;
            if ($scope.PreExamManagement.ExamMgntID == undefined) { $scope.PreExamManagement.ExamMgntID = 0; }
            if (CheckValidation() == true) {
                if ($scope.PreExamManagement.ExamMgntID == 0) {
                    $scope.PreExamManagement.CreLoginID = AppSettings.LoggedUserId;
                    $scope.PreExamManagement.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PreExamManagementService.AddPreExamManagement($scope.PreExamManagement);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.PreExamManagement.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PreExamManagementService.UpdatePreExamManagement($scope.PreExamManagement);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeletePreExamManagement = function () {
            var getData = PreExamManagementService.DeletePreExamManagement($scope.PreExamManagement.ExamMgntID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.PreExamManagement.DistrictID == undefined) || ($scope.PreExamManagement.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.PreExamManagement.CollegeID == undefined) || ($scope.PreExamManagement.CollegeID == "")) {
                alert("Select College");
                return false;
            }
            if (($scope.PreExamManagement.MngtID == undefined) || ($scope.PreExamManagement.MngtID == "")) {
                alert("Select Management");
                return false;
            }
            else {
                return true;
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('CenterManagemnet');
            //$state.go('CenterManagemnet.PreExamManagementList');
        }
    });
});
