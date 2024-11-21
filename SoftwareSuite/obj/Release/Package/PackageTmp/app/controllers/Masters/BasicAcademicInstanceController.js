define(['app'], function (app) {
    app.controller("BasicAcademicInstanceController", function ($scope, $state, $stateParams, AppSettings, BasicAcademicInstanceService) {
        $scope.BasicAcademicInstance = { AcdInstID: $stateParams.AcdInstID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicAcademicInstanceRightsdata = [];
        BasicAcademicInstanceRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicAcademicInstanceRightsdata.length; i++) {
            if (BasicAcademicInstanceRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicAcademicInstance.AcdInstID == 0) {
                    if (BasicAcademicInstanceRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicAcademicInstanceRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicAcademicInstanceRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        //$("#FromDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        //$("#ToDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });

        if ($scope.BasicAcademicInstance.AcdInstID > 0) {
            var BasicAcademicInstancedata = BasicAcademicInstanceService.GetBasicAcademicInstanceListByID($scope.BasicAcademicInstance.AcdInstID);
            BasicAcademicInstancedata.then(function (data) {
                $scope.BasicAcademicInstance = data[0];
                if ($scope.BasicAcademicInstance.InstFlag == 'O') {
                    $scope.BasicAcademicInstance.InstFlag = true
                }
                else {
                    $scope.BasicAcademicInstance.InstFlag = false
                }

            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicAcademicInstance = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicAcademicInstance.InstFlag == true) {
                $scope.BasicAcademicInstance.InstFlag = 'O'
            }
            else {
                $scope.BasicAcademicInstance.InstFlag = 'C'
            }
           //$("#FromDate").ejDatePicker({ value: $scope.BasicAcademicInstance.FromDate });
           //$('#FromDate').val($scope.BasicAcademicInstance.FromDate);

            $scope.BasicAcademicInstance.FromDate = $("#FromDate").val()
            $scope.BasicAcademicInstance.ToDate = $("#ToDate").val()
            if ($scope.BasicAcademicInstance.AcdInstID == undefined) { $scope.BasicAcademicInstance.AcdInstID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicAcademicInstance.AcdInstID == 0) {
                    $scope.BasicAcademicInstance.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicAcademicInstance.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicAcademicInstanceService.AddBasicAcademicInstance($scope.BasicAcademicInstance);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.BasicAcademicInstance.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicAcademicInstanceService.UpdateBasicAcademicInstance($scope.BasicAcademicInstance);
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
        $scope.DeleteBasicAcademicInstance = function () {
            var getData = BasicAcademicInstanceService.DeleteBasicAcademicInstance($scope.BasicAcademicInstance.AcdInstID);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            //if (($scope.BasicAcademicInstance.CasteName == undefined) || ($scope.BasicAcademicInstance.CasteName == "")) {
            //    alert("Enter Name");
            //    return false;
            //}
            //if (($scope.BasicAcademicInstance.CasteCode == undefined) || ($scope.BasicAcademicInstance.CasteCode == "")) {
            //    alert("Enter Code");
            //    return false;
            //}
            //else {           
                return true;
           // }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Masters.BasicAcademicInstanceList');
        }
        //$scope.openCalendarFromDate = function () {
        //    $scope.BasicAcademicInstance.FromDateIsOpen = true;
        //}
    });
});
