define(['app'], function (app) {
    app.controller("BasicDocumentController", function ($scope, $state, $stateParams, AppSettings, BasicDocumentService) {
        $scope.BasicDocument = { DocID: $stateParams.DocID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicDocumentRightsdata = [];
        BasicDocumentRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicDocumentRightsdata.length; i++) {
            if (BasicDocumentRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicDocument.DocID == 0) {
                    if (BasicDocumentRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicDocumentRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicDocumentRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        if ($scope.BasicDocument.DocID > 0) {
            var BasicDocumentdata = BasicDocumentService.GetBasicDocumentById($scope.BasicDocument.DocID);
            BasicDocumentdata.then(function (data) {
                $scope.BasicDocument = data[0];
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveBasicDocument = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicDocument.DocID == undefined) { $scope.BasicDocument.DocID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicDocument.DocID == 0) {
                    $scope.BasicDocument.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicDocument.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicDocumentService.PostBasicDocumentInsert($scope.BasicDocument);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"DocName","Message":"Duplicate Document Name"},{"Id":"DocCode","Message":"Duplicate Document Name"}]') {
                            alert("Name and Code must be unique");
                            return
                        }
                        if (error == '[{"Id":"DocName","Message":"Duplicate Document Name"}]') {
                            alert("Name must be unique");
                            return
                        }
                        if (error == '[{"Id":"DocCode","Message":"Duplicate Document Name"}]') {
                            alert("Code must be unique");
                            return
                        }
                        else {
                            alert(error);
                        }
                    });
                }
                else {
                    $scope.BasicDocument.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicDocumentService.UpdateBasicDocument($scope.BasicDocument);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"DocName","Message":"Duplicate Document Name"},{"Id":"DocCode","Message":"Duplicate Document Name"}]') {
                            alert("Name and Code must be unique");
                            return
                        }
                        if (error == '[{"Id":"DocName","Message":"Duplicate Document Name"}]') {
                            alert("Name must be unique");
                            return
                        }
                        if (error == '[{"Id":"DocCode","Message":"Duplicate Document Name"}]') {
                            alert("Code must be unique");
                            return
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
        $scope.DeleteBasicDocument = function () {
            var getData = BasicDocumentService.DeleteBasicDocument($scope.BasicDocument.DocID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicDocument.DocName == undefined) || ($scope.BasicDocument.DocName == "")) {
                alert("Enter Document Name ");
                return false;
            }
            if (($scope.BasicDocument.DocCode == undefined) || ($scope.BasicDocument.DocCode == "")) {
                alert("Enter Document Code");
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
            $state.go('Masters.BasicDocumentList');
        }
    });
});
