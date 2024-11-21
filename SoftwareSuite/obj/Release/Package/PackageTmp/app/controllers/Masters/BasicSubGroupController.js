define(['app'], function (app) {
    app.controller("BasicSubGroupController", function ($scope, $state, $stateParams, AppSettings, BasicSubGroupService, BasicExamService, BasicBranchService) {
        $scope.BasicSubGroup = { SubGrpID: $stateParams.SubGrpID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicSubGroupRightsdata = [];
        BasicSubGroupRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicSubGroupRightsdata.length; i++) {
            if (BasicSubGroupRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicSubGroup.SubGrpID == 0) {
                    if (BasicSubGroupRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicSubGroupRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicSubGroupRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        //var BasicMainGroupList = BasicSubGroupService.GetBasicMainGroupList();
        //BasicMainGroupList.then(function (MainGroupData, status, headers, config, error) {
        //    $scope.BasicMainGroupList = MainGroupData;
        //}, function (Castdata, status, headers, config) {
        //    alert(error);
        //});

        if ($scope.BasicSubGroup.SubGrpID > 0) {
            var BasicMainGroupList = BasicSubGroupService.GetBasicMainGroupList();
            BasicMainGroupList.then(function (MainGroupData, status, headers, config, error) {
                $scope.BasicMainGroupList = MainGroupData;
                var BasicSubGroupdata = BasicSubGroupService.GetBasicSubGroupByID($scope.BasicSubGroup.SubGrpID);
                BasicSubGroupdata.then(function (data) {
                    $scope.BasicSubGroup = data[0];
                }, function (error) {
                    alert(error);
                });

            }, function (Castdata, status, headers, config) {
                alert(error);
            });
        }


        //var BasicExamList = BasicExamService.GetBasicExamList();
        //BasicExamList.then(function (ExamData, status, headers, config, error) {
        //    $scope.BasicExamList = ExamData;    
        //    var BasicBranchList = BasicBranchService.GetBasicBranchList();
        //    BasicBranchList.then(function (BranchData, status, headers, config, error) {
        //        $scope.BasicBranchList = BranchData;    
        //        if ($scope.BasicSubGroup.SubGrpID > 0) {
        //            var BasicSubGroupdata = BasicSubGroupService.GetBasicSubGroupByID($scope.BasicSubGroup.SubGrpID);
        //            BasicSubGroupdata.then(function (data) {
        //                $scope.BasicSubGroup = data[0];
        //            }, function (error) {
        //                alert(error);
        //            });
        //        }      
        //    }, function (Branchdata, status, headers, config) {
        //        alert(error);
        //        })
        //            }, function (Examdata, status, headers, config) {
        //    alert(error);
        //    })        

        $scope.SaveBasicSubGroup = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicSubGroup.SubGrpID == undefined) { $scope.BasicSubGroup.SubGrpID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicSubGroup.SubGrpID == 0) {
                    $scope.BasicSubGroup.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicSubGroup.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicSubGroupService.PostBasicSubGroupInsert($scope.BasicSubGroup);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.BasicSubGroup.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicSubGroupService.UpdateBasicSubGroup($scope.BasicSubGroup);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        if (error == '[{"Id":"SubGrpName","Message":"Duplicate Sub Group Name"}]') {
                            alert("Subject Group must be unique");
                            return;
                        } else {
                            alert(error);
                        }
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeleteBasicSubGroup = function () {
            var getData = BasicSubGroupService.DeleteBasicSubGroup($scope.BasicSubGroup.SubGrpID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicSubGroup.MainGrpID == undefined) || ($scope.BasicSubGroup.MainGrpID == 0)) {
                alert("Select Main Group ");
                return false;
            }
            if (($scope.BasicSubGroup.MainGrpID == undefined) || ($scope.BasicSubGroup.MainGrpID == 0)) {
                alert("Select Main Group ");
                return false;
            }
            if (($scope.BasicSubGroup.MainGrpID == undefined) || ($scope.BasicSubGroup.MainGrpID == 0)) {
                alert("Select Main Group ");
                return false;
            }
            if (($scope.BasicSubGroup.SubGrpName == undefined) || ($scope.BasicSubGroup.SubGrpName == "")) {
                alert("Enter Subject Group Name");
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
            $state.go('Masters.BasicSubGroupList');
        }
    });
});
