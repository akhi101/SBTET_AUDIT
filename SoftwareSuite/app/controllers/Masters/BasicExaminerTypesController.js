define(['app'], function (app) {
    app.controller("BasicExaminerTypesController", function ($scope, $state, $stateParams, AppSettings, BasicExaminerTypesService, BasicEvalTypesService) {
        $scope.BasicExaminerTypes = { ExaminerTypID: $stateParams.ExaminerTypID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicExaminerTypesRightsdata = [];
        BasicExaminerTypesRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicExaminerTypesRightsdata.length; i++) {
            if (BasicExaminerTypesRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicExaminerTypes.ExaminerTypID == 0) {
                    if (BasicExaminerTypesRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicExaminerTypesRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicExaminerTypesRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        var BasicEvalTypeList = BasicEvalTypesService.GetBasicEvalTypesList();
        BasicEvalTypeList.then(function (EvalTypeData, status, headers, config, error) {
            $scope.BasicEvalTypeList = EvalTypeData;
        }, function (error) {
            alert(error);
        });

        if ($scope.BasicExaminerTypes.ExaminerTypID > 0) {
            var BasicExaminerTypesdata = BasicExaminerTypesService.GetBasicExaminerTypesListByID($scope.BasicExaminerTypes.ExaminerTypID);
            BasicExaminerTypesdata.then(function (data) {
                $scope.BasicExaminerTypes = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicExaminerTypes = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicExaminerTypes.ExaminerTypID == undefined) { $scope.BasicExaminerTypes.ExaminerTypID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicExaminerTypes.ExaminerTypID == 0) {
                    $scope.BasicExaminerTypes.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicExaminerTypes.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicExaminerTypesService.PostBasicExaminerTypes($scope.BasicExaminerTypes);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"ExmTypName","Message":"Duplicate Examiner Name"},{"Id":"ExmTypCode","Message":"Duplicate Examiner Type Code "}]') {
                            alert("Name and Code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"ExmTypName","Message":"Duplicate Examiner Name"}]') {
                            alert("Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"ExmTypCode","Message":"Duplicate Examiner Type Code "}]') {
                            alert("Code must be unique");
                            return;
                        }
                        else {
                            alert(error);
                        }
                    });
                }
                else {
                    $scope.BasicExaminerTypes.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicExaminerTypesService.UpdateBasicExaminerTypes($scope.BasicExaminerTypes);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"ExmTypName","Message":"Duplicate Examiner Name"},{"Id":"ExmTypCode","Message":"Duplicate Examiner Type Code "}]') {
                            alert("Name and Code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"ExmTypName","Message":"Duplicate Examiner Name"}]') {
                            alert("Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"ExmTypCode","Message":"Duplicate Examiner Type Code "}]') {
                            alert("Code must be unique");
                            return;
                        }
                        else { alert(error); }

                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeleteBasicExaminerTypes = function () {
            var getData = BasicExaminerTypesService.DeleteBasicExaminerTypes($scope.BasicExaminerTypes.ExaminerTypID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicExaminerTypes.ExmTypName == undefined) || ($scope.BasicExaminerTypes.ExmTypName == "")) {
                alert("Enter Examiner Type Name ");
                return false;
            }
            if (($scope.BasicExaminerTypes.ExmTypCode == undefined) || ($scope.BasicExaminerTypes.ExmTypCode == "")) {
                alert("Enter Examiner Type Code");
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
            $state.go('Masters.BasicExaminerTypesList');
        }
    });
});
