define(['app'], function (app) {
    app.controller("BasicEvalTypesController", function ($scope, $state, $stateParams, AppSettings, BasicEvalTypesService) {
        $scope.BasicEvalTypes = { EvalTypID: $stateParams.EvalTypID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicEvalTypesRightsdata = [];
        BasicEvalTypesRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicEvalTypesRightsdata.length; i++) {
            if (BasicEvalTypesRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicEvalTypes.EvalTypID == 0) {
                    if (BasicEvalTypesRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicEvalTypesRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicEvalTypesRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        if ($scope.BasicEvalTypes.EvalTypID > 0) {
            var BasicEvalTypesdata = BasicEvalTypesService.GetBasicEvalTypesById($scope.BasicEvalTypes.EvalTypID);
            BasicEvalTypesdata.then(function (data) {
                $scope.BasicEvalTypes = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicEvalTypes = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicEvalTypes.EvalTypID == undefined) { $scope.BasicEvalTypes.EvalTypID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicEvalTypes.EvalTypID == 0) {
                    $scope.BasicEvalTypes.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicEvalTypes.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicEvalTypesService.PostBasicEvalTypesInsert($scope.BasicEvalTypes);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"EvalTypName","Message":"Duplicate Eval Type Name"},{"Id":"EvalTypCode","Message":"Duplicate Eval Type Code Name"}]') {
                            alert("Name and Code must be unique");
                            return
                        }
                        if (error == '[{"Id":"EvalTypName","Message":"Duplicate Eval Type Name"}]') {
                            alert("Name must be unique");
                            return
                        }
                        if (error == '[{"Id":"EvalTypCode","Message":"Duplicate Eval Type Code Name"}]') {
                            alert("Code must be unique");
                            return
                        }
                        else {
                            alert(error);
                        }
                    });
                }
                else {
                    $scope.BasicEvalTypes.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicEvalTypesService.UpdateBasicEvalTypes($scope.BasicEvalTypes);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"EvalTypName","Message":"Duplicate Eval Type Name"},{"Id":"EvalTypCode","Message":"Duplicate Eval Type Code Name"}]') {
                            alert("Name and Code must be unique");
                            return
                        }
                        if (error == '[{"Id":"EvalTypName","Message":"Duplicate Eval Type Name"}]') {
                            alert("Name must be unique");
                            return
                        } 
                        if (error == '[{"Id":"EvalTypCode","Message":"Duplicate Eval Type Code Name"}]') {
                            alert("Code must be unique");
                            return
                        }
                        else {
                        alert(error);}
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeleteBasicEvalTypes = function () {
            var getData = BasicEvalTypesService.DeleteBasicEvalTypes($scope.BasicEvalTypes.EvalTypID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicEvalTypes.EvalTypName == undefined) || ($scope.BasicEvalTypes.EvalTypName == "")) {
                alert("Enter Type Name ");
                return false;
            }
            if (($scope.BasicEvalTypes.EvalTypCode == undefined) || ($scope.BasicEvalTypes.EvalTypCode == "")) {
                alert("Enter Type Code");
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
            $state.go('Masters.BasicEvalTypesList');
        }
    });
});
