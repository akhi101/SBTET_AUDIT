define(['app'], function (app) {
    app.controller("CenterPracticalBatchCreationVocController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService, BasicExamService, BasicCourseService) {
        $scope.CenterPracticalBatchCreationVoc = {};
        $scope.CenterPracticalBatchCreationVoc.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var CenterPracticalBatchCreationVocRightsdata = [];
        CenterPracticalBatchCreationVocRightsdata = AppSettings.UserRights;
        for (var i = 0; i < CenterPracticalBatchCreationVocRightsdata.length; i++) {
            if (CenterPracticalBatchCreationVocRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.CenterPracticalBatchCreationVoc.OtherCenterID == 0) {
                    if (CenterPracticalBatchCreationVocRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (CenterPracticalBatchCreationVocRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (CenterPracticalBatchCreationVocRightsdata[i].isdeletable == 'Y') {
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
            $scope.CenterPracticalBatchCreationVoc.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
            $scope.CenterPracticalBatchCreationVoc.CourseID = "2";
            $scope.GetExamList($scope.CenterPracticalBatchCreationVoc.CourseID);
        }, function (ExamData, status, headers, config) {
            alert(error);
        })
        $scope.GetExamList = function (CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                BasicExamList.then(function (ExamData, status, headers, config, error) {
                    $scope.BasicExamList = ExamData;
                }, function (ExamData, status, headers, config) {
                    alert(error);
                })
            }
        }
        $scope.CenterPracticalBatchCreationVocProcess = function () {
            $scope.isupdatableDisable = true;
            if (CheckValidation() == true) {
                $scope.CenterPracticalBatchCreationVoc.DistrictID = $scope.CenterPracticalBatchCreationVoc.DistrictID;
                $scope.CenterPracticalBatchCreationVoc.ExamID = $scope.CenterPracticalBatchCreationVoc.ExamID;
                $scope.CenterPracticalBatchCreationVoc.ExamInstID = AppSettings.ExamInstID;
                $scope.CenterPracticalBatchCreationVoc.UpdLoginID = AppSettings.LoggedUserId;
                var getPromise = PreZoneCenterService.CenterPracticalBatchCreationVocProcess($scope.CenterPracticalBatchCreationVoc);
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
            if (($scope.CenterPracticalBatchCreationVoc.DistrictID == undefined) || ($scope.CenterPracticalBatchCreationVoc.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.CenterPracticalBatchCreationVoc.CourseID == undefined) || ($scope.CenterPracticalBatchCreationVoc.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.CenterPracticalBatchCreationVoc.ExamID == undefined) || ($scope.CenterPracticalBatchCreationVoc.ExamID == "")) {
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
            $state.go('CenterManagemnet.CenterPracticalBatchCreationVoc');
        }
    });
});
