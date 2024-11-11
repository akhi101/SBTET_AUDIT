define(['app'], function (app) {
    app.controller("CenterToCollegeAllocationController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService) {
        $scope.CenterToCollegeAllocation = {};
        $scope.CenterToCollegeAllocation.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var CenterToCollegeAllocationRightsdata = [];
        CenterToCollegeAllocationRightsdata = AppSettings.UserRights;
        for (var i = 0; i < CenterToCollegeAllocationRightsdata.length; i++) {
            if (CenterToCollegeAllocationRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.CenterToCollegeAllocation.OtherCenterID == 0) {
                    if (CenterToCollegeAllocationRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (CenterToCollegeAllocationRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (CenterToCollegeAllocationRightsdata[i].isdeletable == 'Y') {
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
        $scope.CentertoCollegeAllocationProcess = function () {
            $scope.isupdatableDisable = true;
            if (CheckValidation() == true) {
                $scope.CenterToCollegeAllocation.DistrictID = $scope.CenterToCollegeAllocation.DistrictID;
                $scope.CenterToCollegeAllocation.ExamInstID = AppSettings.ExamInstID;
                $scope.CenterToCollegeAllocation.UpdLoginID = AppSettings.LoggedUserId;
                var getPromise = PreZoneCenterService.CentertoCollegeAllocationProcess($scope.CenterToCollegeAllocation);
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
            if (($scope.CenterToCollegeAllocation.DistrictID == undefined) || ($scope.CenterToCollegeAllocation.DistrictID == "")) {
                alert("Select District");
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
            $state.go('CenterManagemnet.CenterToCollegeAllocation');
        }
    });
});
