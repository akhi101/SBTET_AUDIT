define(['app'], function (app) {
    app.controller("CenterPracticalBatchCreationController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService, BasicExamService, BasicCourseService) {
        $scope.CenterPracticalBatchCreation = {};
        $scope.CenterPracticalBatchCreation.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var CenterPracticalBatchCreationRightsdata = [];
        CenterPracticalBatchCreationRightsdata = AppSettings.UserRights;
        for (var i = 0; i < CenterPracticalBatchCreationRightsdata.length; i++) {
            if (CenterPracticalBatchCreationRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.CenterPracticalBatchCreation.OtherCenterID == 0) {
                    if (CenterPracticalBatchCreationRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (CenterPracticalBatchCreationRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (CenterPracticalBatchCreationRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.isupdatableDisable = false;
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.CenterPracticalBatchCreation.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
            $scope.CenterPracticalBatchCreation.CourseID = "1";
            $scope.GetExamList($scope.CenterPracticalBatchCreation.CourseID);
        }, function (ExamData, status, headers, config) {
            alert(error);
        })
        $scope.GetExamList = function (CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                BasicExamList.then(function (ExamData, status, headers, config, error) {
                    $scope.BasicExamList = ExamData;
                    $scope.CenterPracticalBatchCreation.ExamID = "2";
                }, function (ExamData, status, headers, config) {
                    alert(error);
                })
            }
        }
        $scope.CenterPracticalBatchCreationProcess = function () {
            $scope.isupdatableDisable = true;
            if (CheckValidation() == true) {
                $scope.CenterPracticalBatchCreation.DistrictID = $scope.CenterPracticalBatchCreation.DistrictID;
                $scope.CenterPracticalBatchCreation.ExamID = $scope.CenterPracticalBatchCreation.ExamID;
                $scope.CenterPracticalBatchCreation.ExamInstID = AppSettings.ExamInstID;
                $scope.CenterPracticalBatchCreation.UpdLoginID = AppSettings.LoggedUserId;
                var getPromise = PreZoneCenterService.CenterPracticalBatchCreationProcess($scope.CenterPracticalBatchCreation);
                getPromise.then(function (msg) {
                    alert("Process Done successfully!!");
                    RedirectToListPage();
                }, function (error) {
                    $scope.isupdatableDisable = false;
                    alert(error);
                });
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        function CheckValidation() {
            if (($scope.CenterPracticalBatchCreation.DistrictID == undefined) || ($scope.CenterPracticalBatchCreation.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.CenterPracticalBatchCreation.CourseID == undefined) || ($scope.CenterPracticalBatchCreation.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.CenterPracticalBatchCreation.ExamID == undefined) || ($scope.CenterPracticalBatchCreation.ExamID == "")) {
                alert("Select Year");
                return false;
            }
            else {
                return true;
            }
        }
        $scope.Exit = function () {
            //RedirectToListPage();
            $state.go('CenterManagemnet'); 
        }
        function RedirectToListPage() {
            $scope.isupdatableDisable = false;
            $state.go('CenterManagemnet.CenterPracticalBatchCreation');
        }
    });
});
