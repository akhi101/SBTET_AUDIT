define(['app'], function (app) {
    app.controller("PracticalCenterAllocationVocController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService, BasicExamService, BasicCourseService) {
        $scope.PracticalCenterAllocationVoc = {};
        $("#LoadImg").attr("src", AppSettings.LoadingImage);
        $scope.LoadImg = false;
        $scope.PracticalCenterAllocationVoc.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PracticalCenterAllocationVocRightsdata = [];
        PracticalCenterAllocationVocRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PracticalCenterAllocationVocRightsdata.length; i++) {
            if (PracticalCenterAllocationVocRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PracticalCenterAllocationVoc.OtherCenterID == 0) {
                    if (PracticalCenterAllocationVocRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PracticalCenterAllocationVocRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PracticalCenterAllocationVocRightsdata[i].isdeletable == 'Y') {
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
            $scope.PracticalCenterAllocationVoc.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
            $scope.PracticalCenterAllocationVoc.CourseID = "2";
            $scope.GetExamList($scope.PracticalCenterAllocationVoc.CourseID);
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
        $scope.PracticalCenterAllocationVocProcess = function () {
            $scope.isupdatableDisable = true;
            $scope.LoadImg = true;
            if (CheckValidation() == true) {
                $scope.PracticalCenterAllocationVoc.DistrictID = $scope.PracticalCenterAllocationVoc.DistrictID;
                $scope.PracticalCenterAllocationVoc.ExamID = $scope.PracticalCenterAllocationVoc.ExamID;
                $scope.PracticalCenterAllocationVoc.ExamInstID = AppSettings.ExamInstID;
                $scope.PracticalCenterAllocationVoc.UpdLoginID = AppSettings.LoggedUserId;
                var getPromise = PreZoneCenterService.PracticalCenterAllocationVocProcess($scope.PracticalCenterAllocationVoc);
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
            if (($scope.PracticalCenterAllocationVoc.DistrictID == undefined) || ($scope.PracticalCenterAllocationVoc.DistrictID == "")) {
                //alert("Select District");
                //return false;
                $scope.PracticalCenterAllocationVoc.DistrictID = 0;
            }
            if (($scope.PracticalCenterAllocationVoc.CourseID == undefined) || ($scope.PracticalCenterAllocationVoc.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.PracticalCenterAllocationVoc.ExamID == undefined) || ($scope.PracticalCenterAllocationVoc.ExamID == "")) {
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
            $state.go('CenterManagemnet.PracticalCenterAllocationVoc');
        }
    });
});
