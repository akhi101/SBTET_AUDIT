define(['app'], function (app) {
    app.controller("BasicEvalGradeController", function ($scope, $state, $stateParams, AppSettings, BasicEvalGradeService) {
        $scope.BasicEvalGrade = { EvalGrdID: $stateParams.EvalGrdID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicEvalGradeRightsdata = [];
        BasicEvalGradeRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicEvalGradeRightsdata.length; i++) {
            if (BasicEvalGradeRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicEvalGrade.EvalGrdID == 0) {
                    if (BasicEvalGradeRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicEvalGradeRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicEvalGradeRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        if ($scope.BasicEvalGrade.EvalGrdID > 0) {
            var BasicEvalGradedata = BasicEvalGradeService.GetBasicEvalGradeById($scope.BasicEvalGrade.EvalGrdID);
            BasicEvalGradedata.then(function (data) {
                $scope.BasicEvalGrade = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicEvalGrade = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicEvalGrade.EvalGrdID == undefined) { $scope.BasicEvalGrade.EvalGrdID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicEvalGrade.EvalGrdID == 0) {
                    $scope.BasicEvalGrade.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicEvalGrade.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicEvalGradeService.PostBasicEvalGradeInsert($scope.BasicEvalGrade);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"EvalGrdName","Message":"Duplicate Eval Grade Name"},{"Id":"EvalGrdCode","Message":"Duplicate Eval Grde Code"}]') {
                            alert("Name and Code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"EvalGrdName","Message":"Duplicate Eval Grade Name"}]') {
                            alert("Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"EvalGrdCode","Message":"Duplicate Eval Grde Code"}]') {
                            alert("Code must be unique");
                            return;
                        }
                        else {
                            alert(error);
                        }
                    });
                }
                else {
                    $scope.BasicEvalGrade.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicEvalGradeService.UpdateBasicEvalGrade($scope.BasicEvalGrade);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"EvalGrdName","Message":"Duplicate Eval Grade Name"},{"Id":"EvalGrdCode","Message":"Duplicate Eval Grde Code"}]') {
                            alert("Name and Code must be unique");
                            return;
                        }
                        if (error == '[{"Id":"EvalGrdName","Message":"Duplicate Eval Grade Name"}]') {
                            alert("Name must be unique");
                            return;
                        }
                        if (error == '[{"Id":"EvalGrdCode","Message":"Duplicate Eval Grde Code"}]') {
                            alert("Code must be unique");
                            return;
                        }
                        else {
                            alert(error);
                        }
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeleteBasicEvalGrade = function () {
            var getData = BasicEvalGradeService.DeleteBasicEvalGrade($scope.BasicEvalGrade.EvalGrdID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicEvalGrade.EvalGrdName == undefined) || ($scope.BasicEvalGrade.EvalGrdName == "")) {
                alert("Enter Grade Name ");
                return false;
            }
            if (($scope.BasicEvalGrade.EvalGrdCode == undefined) || ($scope.BasicEvalGrade.EvalGrdCode == "")) {
                alert("Enter Grade Code");
                return false;
            }
            if (($scope.BasicEvalGrade.Remark == undefined) || ($scope.BasicEvalGrade.Remark == "")) {
                alert("Enter Remark");
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
            $state.go('Masters.BasicEvalGradeList');
        }
    });
});
