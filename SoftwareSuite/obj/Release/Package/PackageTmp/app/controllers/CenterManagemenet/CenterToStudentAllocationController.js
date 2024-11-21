define(['app'], function (app) {
    app.controller("CenterToStudentAllocationController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService) {
        $scope.CenterToStudentAllocation = {};
        $scope.CenterToStudentAllocation.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var CenterToStudentAllocationRightsdata = [];
        CenterToStudentAllocationRightsdata = AppSettings.UserRights;
        for (var i = 0; i < CenterToStudentAllocationRightsdata.length; i++) {
            if (CenterToStudentAllocationRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.CenterToStudentAllocation.OtherCenterID == 0) {
                    if (CenterToStudentAllocationRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (CenterToStudentAllocationRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (CenterToStudentAllocationRightsdata[i].isdeletable == 'Y') {
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
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        $scope.CenterToStudentAllocationProcess = function () {
            $scope.isupdatableDisable = true;
            if (CheckValidation() == true) {
                $scope.CenterToStudentAllocation.DistrictID = $scope.CenterToStudentAllocation.DistrictID;
                $scope.CenterToStudentAllocation.ExamInstID = AppSettings.ExamInstID;
                $scope.CenterToStudentAllocation.UpdLoginID = AppSettings.LoggedUserId;
                var getPromise = PreZoneCenterService.CenterToStudentAllocationProcess($scope.CenterToStudentAllocation);
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
            if (($scope.CenterToStudentAllocation.DistrictID == undefined) || ($scope.CenterToStudentAllocation.DistrictID == "")) {
                alert("Select District");
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
            $scope.isupdatableDisable = false;
            $state.go('CenterManagemnet');
        }
    });
});
