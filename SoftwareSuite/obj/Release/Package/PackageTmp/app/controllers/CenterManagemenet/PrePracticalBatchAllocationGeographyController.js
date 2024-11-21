define(['app'], function (app) {
    app.controller("PrePracticalBatchAllocationGeographyController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService, BasicExamService, BasicCourseService) {
        $scope.PrePracticalBatchAllocation = {};
        $("#LoadImg").attr("src", AppSettings.LoadingImage);
        $scope.LoadImg = false;
        $scope.PrePracticalBatchAllocation.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PrePracticalBatchAllocationRightsdata = [];
        PrePracticalBatchAllocationRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PrePracticalBatchAllocationRightsdata.length; i++) {
            if (PrePracticalBatchAllocationRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PrePracticalBatchAllocation.OtherCenterID == 0) {
                    if (PrePracticalBatchAllocationRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PrePracticalBatchAllocationRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PrePracticalBatchAllocationRightsdata[i].isdeletable == 'Y') {
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
            $scope.PrePracticalBatchAllocation.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
            $scope.PrePracticalBatchAllocation.CourseID = "1";
            $scope.GetExamList($scope.PrePracticalBatchAllocation.CourseID);
        }, function (ExamData, status, headers, config) {
            alert(error);
        })

        $scope.GetExamList = function (CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                BasicExamList.then(function (ExamData, status, headers, config, error) {
                    $scope.BasicExamList = ExamData;
                    $scope.PrePracticalBatchAllocation.ExamID = "2";
                }, function (ExamData, status, headers, config) {
                    alert(error);
                })
            }
        }

        $scope.PracticalBatchAllocatuionProcess = function () {
            $scope.isupdatableDisable = true;
            $scope.LoadImg = true;
            if (CheckValidation() == true) {
                $scope.PrePracticalBatchAllocation.ExamID = $scope.PrePracticalBatchAllocation.ExamID;
                $scope.PrePracticalBatchAllocation.DistrictID = $scope.PrePracticalBatchAllocation.DistrictID;
                $scope.PrePracticalBatchAllocation.ExamInstID = AppSettings.ExamInstID;
                $scope.PrePracticalBatchAllocation.UpdLoginID = AppSettings.LoggedUserId;
                var getPromise = PreZoneCenterService.PostProcessCenterPractBatchGeography($scope.PrePracticalBatchAllocation);
                getPromise.then(function (msg) {
                    $scope.LoadImg = false;
                    alert("Process Done successfully!!");
                    RedirectToListPage();
                }, function (error) {
                    $scope.LoadImg = false;
                    $scope.isupdatableDisable = false;
                    alert(error);
                });
            } else {
                $scope.LoadImg = false;
                $scope.isupdatableDisable = false;
            }
        }
        function CheckValidation() {
            if (($scope.PrePracticalBatchAllocation.DistrictID == undefined) || ($scope.PrePracticalBatchAllocation.DistrictID == "")) {
                //alert("Select District");
                //return false;
                $scope.PrePracticalBatchAllocation.DistrictID = 0;
            }
            if (($scope.PrePracticalBatchAllocation.CourseID == undefined) || ($scope.PrePracticalBatchAllocation.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.PrePracticalBatchAllocation.ExamID == undefined) || ($scope.PrePracticalBatchAllocation.ExamID == "")) {
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
            $state.go('CenterManagemnet.PrePracticalBatchAllocationGeography');
        }
    });
});
