define(['app'], function (app) {
    app.controller("PracticalCenterAllocationBridgeController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService, BasicExamService, BasicCourseService) {
        $scope.PracticalCenterAllocation = {};
        $("#LoadImg").attr("src", AppSettings.LoadingImage);
        $scope.LoadImg = false;
        $scope.PracticalCenterAllocation.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PracticalCenterAllocationRightsdata = [];
        PracticalCenterAllocationRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PracticalCenterAllocationRightsdata.length; i++) {
            if (PracticalCenterAllocationRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PracticalCenterAllocation.OtherCenterID == 0) {
                    if (PracticalCenterAllocationRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PracticalCenterAllocationRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PracticalCenterAllocationRightsdata[i].isdeletable == 'Y') {
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
            $scope.PracticalCenterAllocation.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
            $scope.PracticalCenterAllocation.CourseID = "2";
            $scope.GetExamList($scope.PracticalCenterAllocation.CourseID);
        }, function (ExamData, status, headers, config) {
            alert(error);
        })
        $scope.GetExamList = function (CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                BasicExamList.then(function (ExamData, status, headers, config, error) {
                    $scope.BasicExamList = ExamData;
                    $scope.PracticalCenterAllocation.ExamID = "4";
                }, function (ExamData, status, headers, config) {
                    alert(error);
                })
            }
        }
        $scope.PracticalCenterAllocationProcessBridge = function () {
            $scope.isupdatableDisable = true;
            if (CheckValidation() == true) {
                $scope.LoadImg = true;
                $scope.PracticalCenterAllocation.DistrictID = $scope.PracticalCenterAllocation.DistrictID;
                $scope.PracticalCenterAllocation.ExamID = $scope.PracticalCenterAllocation.ExamID;
                $scope.PracticalCenterAllocation.ExamInstID = AppSettings.ExamInstID;
                $scope.PracticalCenterAllocation.UpdLoginID = AppSettings.LoggedUserId;
                var getPromise = PreZoneCenterService.PostPracticalCenterAllocationProcessBridge($scope.PracticalCenterAllocation);
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
            if (($scope.PracticalCenterAllocation.DistrictID == undefined) || ($scope.PracticalCenterAllocation.DistrictID == "")) {
                //alert("Select District");
                //return false;
                $scope.PracticalCenterAllocation.DistrictID = 0;
            }
            if (($scope.PracticalCenterAllocation.CourseID == undefined) || ($scope.PracticalCenterAllocation.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.PracticalCenterAllocation.ExamID == undefined) || ($scope.PracticalCenterAllocation.ExamID == "")) {
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
            $state.go('CenterManagemnet.PracticalCenterAllocationBridge');
        }
    });
});
