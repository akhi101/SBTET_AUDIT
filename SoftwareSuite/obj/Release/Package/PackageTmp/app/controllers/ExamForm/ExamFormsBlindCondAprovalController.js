define(['app'], function (app) {
    app.controller("ExamFormsBlindCondAprovalController", function ($scope, $state, $stateParams, AppSettings, ExamFormsBlindCondAprovalService, BasicCourseService, BasicBranchService, BasicMainGroupService, BasicExamService) {
        $scope.ExamFormsBlindCondAproval = { ExmFrmID: $stateParams.ExmFrmID, CourseID: $stateParams.CourseID, CollegeID: $stateParams.CollegeID, ExamID: $stateParams.ExamID, BranchID: $stateParams.BranchID };
        var CourseID = $stateParams.CourseID;
        var ExamID = $stateParams.ExamID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ExamFormsBlindCondAprovalRightsdata = [];
        ExamFormsBlindCondAprovalRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ExamFormsBlindCondAprovalRightsdata.length; i++) {
            if (ExamFormsBlindCondAprovalRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ExamFormsBlindCondAproval.ExmFrmID == 0) {
                    if (ExamFormsBlindCondAprovalRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ExamFormsBlindCondAprovalRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ExamFormsBlindCondAprovalRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        var MainGroupList = ExamFormsBlindCondAprovalService.GetMainGroupListByCollegeId($scope.ExamFormsBlindCondAproval.CollegeID, $scope.ExamFormsBlindCondAproval.CourseID, AppSettings.AcdYrID);
        MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
            $scope.MainGroupList = MainGroupListdata;
            var CourseList = BasicCourseService.GetBasicCourseList();
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
                var ExamList = BasicExamService.GetBasicExamList(0);
                ExamList.then(function (Examdata, status, headers, config, error) {
                    $scope.ExamList = Examdata;
                    var BasicBranchList = BasicBranchService.GetBasicBranchListByCourseID(0);
                    BasicBranchList.then(function (BasicBranchdata, status, headers, config, error) {
                        $scope.BasicBranchList = BasicBranchdata;
                        var ExamListdata = ExamFormsBlindCondAprovalService.GetExamFormsBlindCondAprovalById($scope.ExamFormsBlindCondAproval.ExmFrmID);
                        ExamListdata.then(function (data, status, headers, config, error) {
                            $scope.ExamFormsBlindCondAproval = data[0];
                            for (var i = 0; i < $scope.CourseList.length; i++) {
                                if ($scope.CourseList[i].CourseID == data[0].CourseID) {
                                    $scope.ExamFormsBlindCondAproval.CourseName = $scope.CourseList[i].CourseName;
                                }
                            }
                            for (var i = 0; i < $scope.ExamList.length; i++) {
                                if ($scope.ExamList[i].ExamID == data[0].ExamID) {
                                    $scope.ExamFormsBlindCondAproval.ExmName = $scope.ExamList[i].ExmName;
                                }
                            }
                            for (var i = 0; i < $scope.BasicBranchList.length; i++) {
                                if ($scope.BasicBranchList[i].BranchID == data[0].BranchID) {
                                    $scope.ExamFormsBlindCondAproval.BranchName = $scope.BasicBranchList[i].BranchName;
                                }
                            }
                            if ($scope.ExamFormsBlindCondAproval.StudCatID = 1) {   // main data
                                $scope.ExamFormsBlindCondAproval.StudCatID = "R";
                            } else if ($scope.ExamFormsBlindCondAproval.StudCatID = 2) {
                                $scope.ExamFormsBlindCondAproval.StudCatID = "P";
                            } else if ($scope.ExamFormsBlindCondAproval.StudCatID = 3) {
                                $scope.ExamFormsBlindCondAproval.StudCatID = "E";
                            }
                            $scope.ExamFormsBlindCondAproval.RegularFees = data[0].FormFees;
                            $scope.Subjectdata = data[0].ExamFormsSubject;
                            $scope.Updateddisable = true;
                        }, function (error) {
                            alert(error);
                        });
                    }, function (BasicBranchdata, status, headers, config) {
                        alert(error);
                    });
                }, function (BasicCoursedata, status, headers, config) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });

        }, function (error) {
            alert(error);
        });
        $("#ApplicationDate").ejDatePicker({ value: new Date(), allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#ApplicationDate").ejDatePicker("disable");
        $scope.Subjectdata = [];
        var gridColumns = [
            { field: "ExmSubID", headerText: "ExmSubID", textAlign: ej.TextAlign.Left, width: 0, visible: false },
            { field: "SubjectID", headerText: "SubjectID", textAlign: ej.TextAlign.Left, width: 0, visible: false },
            { field: "ExmSubCode", headerText: "Subject Code", textAlign: ej.TextAlign.Left, width: 100, allowEditing: false },
            { field: "ExmSubName", headerText: "Subject Name", textAlign: ej.TextAlign.Left, width: 300, allowEditing: false },
        ];
        $("#SubjectGrid").ejGrid({
            dataSource: $scope.Subjectdata,
            allowSearching: true,
            allowScrolling: true,
            editSettings: false,
            columns: gridColumns
        });
        $scope.SaveExamFormsBlindCondAproval = function () {
            $scope.isupdatableDisable = true;
            $scope.ExamFormsBlindCondAproval.UpdLoginID = AppSettings.LoggedUserId;
            if (($scope.ExamFormsBlindCondAproval.ExmFrmID == undefined) || ($scope.ExamFormsBlindCondAproval.ExmFrmID == "")) { $scope.ExamFormsBlindCondAproval.ExmFrmID = 0; }
            var getPromise = ExamFormsBlindCondAprovalService.GetUpdateExamFormsBlindCondAproval($scope.ExamFormsBlindCondAproval.ExmFrmID, $scope.ExamFormsBlindCondAproval.UpdLoginID);
            getPromise.then(function (msg) {
                alert("Approval successfully!!");
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Exam.ExamFormsBlindCondAprovalList');
        }
    });
});
