define(['app'], function (app) {
    app.controller("ExamFormsCorrectionApprovalController", function ($scope, $state, $stateParams, AppSettings, ExamFormsCorrectionService) {
        $scope.ExamFormsCorrectionApproval = { PreStudRegID: $stateParams.PreStudRegID, User: $stateParams.User };
        var PageNm = $state.current.name.split(".")[1];
        var ExamFormsCorrectionApprovalRightsdata = [];
        ExamFormsCorrectionApprovalRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ExamFormsCorrectionApprovalRightsdata.length; i++) {
            if (ExamFormsCorrectionApprovalRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ExamFormsCorrectionApproval.ExmFrmID == 0) {
                    if (ExamFormsCorrectionApprovalRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ExamFormsCorrectionApprovalRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ExamFormsCorrectionApprovalRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.ExamFormsCorrectionApproval.Status = "A";
        $scope.Updateddisable = false;
        var ExamFormList = ExamFormsCorrectionService.GetExamFormDataByPreStudRegIDForApproval($scope.ExamFormsCorrectionApproval.PreStudRegID, AppSettings.ExamInstID, AppSettings.CollegeID);
        ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
            if (ExamFormdata.length == 0) {
                alert("Data not found for this PRN No./HTNo");
                $scope.ExamFormsCorrectionApproval.StudName = "";
                $scope.ExamFormsCorrectionApproval.Gender = "";
                $scope.ExamFormsCorrectionApproval.MainGrpID = "";
                $scope.ExamFormsCorrectionApproval.PreStudRegID = "";
                $scope.ExamFormsCorrectionApproval.MediumID = "";
                $scope.ExamFormsCorrectionApproval.SecondLangID = "";
                $scope.Subjectdata = [];
                $scope.SubjectdataNew = [];
                return;
            }
            else {
                $scope.ExamFormsCorrectionApproval = ExamFormdata[0];
                if ($stateParams.User == "D") {
                    //$scope.ExamFormsCorrectionApproval.Status = ExamFormdata[0].CorrApprovalFlag;
                    //$scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag = "A";
                    //$scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag = "A";
                    //$scope.ExamFormsCorrectionApproval.CorrMedAppFlag = "A";
                    //$scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag = "A";
                    //$scope.ExamFormsCorrectionApproval.CorrSubAppFlag = "A";

                    $scope.ExamFormsCorrectionApproval.Remark = ExamFormdata[0].CorrApprovalRemark;
                    
                } else if ($stateParams.User == "B1") {
                    $scope.ExamFormsCorrectionApproval.Status = ExamFormdata[0].CorrApprovalFlag1;
                    $scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag = ExamFormdata[0].CorrMainGrpAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag = ExamFormdata[0].CorrSecLangAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrMedAppFlag = ExamFormdata[0].CorrMedAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag = ExamFormdata[0].CorrStudCatAppFlag;
                    $scope.ExamFormsCorrectionApproval.Remark = ExamFormdata[0].CorrApprovalRemark1;
                } else {
                    $scope.ExamFormsCorrectionApproval.Status = ExamFormdata[0].CorrApprovalFlag2;
                    $scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag = ExamFormdata[0].CorrMainGrpAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag = ExamFormdata[0].CorrSecLangAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrMedAppFlag = ExamFormdata[0].CorrMedAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag = ExamFormdata[0].CorrStudCatAppFlag;
                    $scope.ExamFormsCorrectionApproval.Remark = ExamFormdata[0].CorrApprovalRemark2;
                }
                if ((ExamFormdata[0].CorrApprovalFlag != "") && (ExamFormdata[0].CorrApprovalFlag != null)) {
                    $scope.ExamFormsCorrectionApproval.Status = ExamFormdata[0].CorrApprovalFlag;
                } else {
                    $scope.ExamFormsCorrectionApproval.Status = "A";
                }
                if ((ExamFormdata[0].CorrMainGrpAppFlag != "") && (ExamFormdata[0].CorrMainGrpAppFlag != null)) {
                    $scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag = ExamFormdata[0].CorrMainGrpAppFlag;
                } else {
                    $scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag = "A";
                }
                if ((ExamFormdata[0].CorrSecLangAppFlag != "") && (ExamFormdata[0].CorrSecLangAppFlag != null)) {
                    $scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag = ExamFormdata[0].CorrSecLangAppFlag;
                } else {
                    $scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag = "A";
                }
                if ((ExamFormdata[0].CorrMedAppFlag != "") && (ExamFormdata[0].CorrMedAppFlag != null)) {
                    $scope.ExamFormsCorrectionApproval.CorrMedAppFlag = ExamFormdata[0].CorrMedAppFlag;
                } else {
                    $scope.ExamFormsCorrectionApproval.CorrMedAppFlag = "A";
                }
                if ((ExamFormdata[0].CorrStudCatAppFlag != "") && (ExamFormdata[0].CorrStudCatAppFlag != null)) {
                    $scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag = ExamFormdata[0].CorrStudCatAppFlag;
                } else {
                    $scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag = "A";
                }
                if ((ExamFormdata[0].CorrSubAppFlag != "") && (ExamFormdata[0].CorrSubAppFlag != null)) {
                    $scope.ExamFormsCorrectionApproval.CorrSubAppFlag = ExamFormdata[0].CorrSubAppFlag;
                } else {
                    $scope.ExamFormsCorrectionApproval.CorrSubAppFlag = "A";
                }
                $scope.CorrMainGrpAppFlagShow = true;
                $scope.CorrSecLangAppFlagShow = true;
                $scope.CorrMedAppFlagShow = true;
                $scope.CorrStudCatAppFlagShow = true;
                if ($scope.ExamFormsCorrectionApproval.MainGrpID == $scope.ExamFormsCorrectionApproval.MainGrpIDNew)
                {
                    $scope.CorrMainGrpAppFlagShow = false;
                    $scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag = "";
                }
                if ($scope.ExamFormsCorrectionApproval.MediumID == $scope.ExamFormsCorrectionApproval.MediumIDNew) {
                    $scope.CorrMedAppFlagShow = false;
                    $scope.ExamFormsCorrectionApproval.CorrMedAppFlag = "";
                }
                if ($scope.ExamFormsCorrectionApproval.SecondLangID == $scope.ExamFormsCorrectionApproval.SecondLangIDNew) {
                    $scope.CorrSecLangAppFlagShow = false;
                    $scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag = "";
                }
                if ($scope.ExamFormsCorrectionApproval.StudCatID == $scope.ExamFormsCorrectionApproval.StudCatIDNew) {
                    $scope.CorrStudCatAppFlag = false;
                    $scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag = "";
                }
                $scope.Subjectdata = ExamFormdata[0].ExamFormsSubject;
                $scope.SubjectdataNew = ExamFormdata[0].ExamFormsSubjectNew;
                $scope.CorrSubAppFlagShow = true;
                   var sub = 1;
                for (var i = 0; i < $scope.Subjectdata.length; i++) {
                    for (var j = 0; j < $scope.SubjectdataNew.length; j++) {
                        if ($scope.Subjectdata[i].ExmSubID == $scope.SubjectdataNew[j].ExmSubID) {
                            sub = 0;
                        }
                    }
                }
                if (sub == 0) {
                    $scope.CorrSubAppFlagShow = false;
                    $scope.ExamFormsCorrectionApproval.CorrSubAppFlag = "";
                }
            }
        }, function (ExamFormdata, status, headers, config) {
            alert(error);
        });
        
        $scope.GetReqchange = function (Status) {
            if (Status == "R") {
                $scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag = "R";
                $scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag = "R";
                $scope.ExamFormsCorrectionApproval.CorrMedAppFlag = "R";
                $scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag = "R";
                $scope.ExamFormsCorrectionApproval.CorrSubAppFlag = "R";
            }
            
        }
        $scope.editvalue = false;
        $scope.SaveExamFormsCorrectionApproval = function () {
            if (CheckValidation() == true) {
                $scope.isupdatableDisable = true;
                $scope.ExamFormsCorrectionApproval.ExamFormsSubject = $scope.SubjectdataNew;
                $scope.ExamFormsCorrectionApproval.CreLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsCorrectionApproval.UpdLoginID = AppSettings.LoggedUserId;
                $scope.ExamFormsCorrectionApproval.AcdYrID = AppSettings.AcdYrID;
                $scope.ExamFormsCorrectionApproval.ExamInstID = AppSettings.ExamInstID;
                $scope.ExamFormsCorrectionApproval.User = $stateParams.User;
                if ($stateParams.User == "D") {
                    $scope.ExamFormsCorrectionApproval.CorrApprovalFlag = $scope.ExamFormsCorrectionApproval.Status;
                    $scope.ExamFormsCorrectionApproval.CorrApprovalRemark = $scope.ExamFormsCorrectionApproval.Remark;
                    $scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag = "D" + $scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag = "D" + $scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrMedAppFlag = "D" + $scope.ExamFormsCorrectionApproval.CorrMedAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag = "D" + $scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrSubAppFlag = "D" + $scope.ExamFormsCorrectionApproval.CorrSubAppFlag;
                } else if ($stateParams.User == "B1") {
                    $scope.ExamFormsCorrectionApproval.CorrApprovalFlag1 = $scope.ExamFormsCorrectionApproval.Status;
                    $scope.ExamFormsCorrectionApproval.CorrApprovalRemark1 = $scope.ExamFormsCorrectionApproval.Remark;
                    $scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag = "B1" + $scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag = "B1" + $scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrMedAppFlag = "B1" + $scope.ExamFormsCorrectionApproval.CorrMedAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag = "B1" + $scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrSubAppFlag = "B1" + $scope.ExamFormsCorrectionApproval.CorrSubAppFlag;
                } else {
                    $scope.ExamFormsCorrectionApproval.CorrApprovalFlag2 = $scope.ExamFormsCorrectionApproval.Status;
                    $scope.ExamFormsCorrectionApproval.CorrApprovalRemark2 = $scope.ExamFormsCorrectionApproval.Remark;
                    $scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag = $scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag = $scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrMedAppFlag = $scope.ExamFormsCorrectionApproval.CorrMedAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag = $scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag;
                    $scope.ExamFormsCorrectionApproval.CorrSubAppFlag = $scope.ExamFormsCorrectionApproval.CorrSubAppFlag;
                }
                if ($scope.ExamFormsCorrectionApproval.MainGrpID == $scope.ExamFormsCorrectionApproval.MainGrpIDNew) {
                    $scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag = "";
                }
                if ($scope.ExamFormsCorrectionApproval.MediumID == $scope.ExamFormsCorrectionApproval.MediumIDNew) {
                    $scope.ExamFormsCorrectionApproval.CorrMedAppFlag = "";
                }
                if ($scope.ExamFormsCorrectionApproval.SecondLangID == $scope.ExamFormsCorrectionApproval.SecondLangIDNew) {
                    $scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag = "";
                }
                if ($scope.ExamFormsCorrectionApproval.StudCatID == $scope.ExamFormsCorrectionApproval.StudCatIDNew) {
                    $scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag = "";
                }
                var sub = 1;
                for (var i = 0; i < $scope.Subjectdata.length; i++) {
                    for (var j = 0; j < $scope.SubjectdataNew.length; j++) {
                        if ($scope.Subjectdata[i].ExmSubID == $scope.SubjectdataNew[j].ExmSubID) {
                            sub = 0;
                        }
                    }
                }
                if (sub == 0) {
                    $scope.ExamFormsCorrectionApproval.CorrSubAppFlag = "";
                }
                var getPromise = ExamFormsCorrectionService.AddExamFormsCorrectionApproval($scope.ExamFormsCorrectionApproval);
                getPromise.then(function (msg) {
                    $scope.isupdatableDisable = false;
                    alert("Saved successfully!!");
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
            if (($scope.ExamFormsCorrectionApproval.PRNNo == undefined) || ($scope.ExamFormsCorrectionApproval.PRNNo == "")) {
                alert("Enter PRN No.");
                return false;
            }
            if (($scope.ExamFormsCorrectionApproval.StudName == undefined) || ($scope.ExamFormsCorrectionApproval.StudName == "")) {
                alert("Enter Student Name");
                return false;
            }
            if (($scope.ExamFormsCorrectionApproval.MainGrpIDNew == undefined) || ($scope.ExamFormsCorrectionApproval.MainGrpIDNew == "")) {
                alert("Blank New Main Group Not Allowed");
                return false;
            }
            if (($scope.ExamFormsCorrectionApproval.MediumIDNew == undefined) || ($scope.ExamFormsCorrectionApproval.MediumIDNew == "")) {
                alert("Blank New Medium Not Allowed");
                return false;
            }
            if (($scope.ExamFormsCorrectionApproval.SecondLangIDNew == undefined) || ($scope.ExamFormsCorrectionApproval.SecondLangIDNew == "")) {
                alert("Blank New Second Language Not Allowed");
                return false;
            }
            if (($scope.ExamFormsCorrectionApproval.StudCatIDNew == undefined) || ($scope.ExamFormsCorrectionApproval.StudCatIDNew == "")) {
                alert("Blank New Category Not Allowed");
                return false;
            }
            if (($scope.ExamFormsCorrectionApproval.Status == undefined) || ($scope.ExamFormsCorrectionApproval.Status == "")) {
                alert("Select Correction Request Status");
                return false;
            }
            if ($scope.ExamFormsCorrectionApproval.Status == "R") {
                if (($scope.ExamFormsCorrectionApproval.Remark == undefined) || ($scope.ExamFormsCorrectionApproval.Remark == "")) {
                    alert("Enter Remark");
                    return false;
                }
            } else {
                if (($scope.ExamFormsCorrectionApproval.Remark == undefined) || ($scope.ExamFormsCorrectionApproval.Remark == "")) {
                    $scope.ExamFormsCorrectionApproval.Remark = "";
                }
            }
            //var req = "";
            //if (($scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag == "") || ($scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag == "R")) {
            //    req = "1";
            //} else { req = ""; }
            //if (($scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag == "") || ($scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag == "R")) {
            //    req = "1";
            //} else { req = ""; }
            //if (($scope.ExamFormsCorrectionApproval.CorrMedAppFlag == "") || ($scope.ExamFormsCorrectionApproval.CorrMedAppFlag == "R")) {
            //    req = "1";
            //} else { req = ""; }
            //if (($scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag == "") || ($scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag == "R")) {
            //    req = "1";
            //} else { req = ""; }
            //if (($scope.ExamFormsCorrectionApproval.CorrSubAppFlag == "") || ($scope.ExamFormsCorrectionApproval.CorrSubAppFlag == "R")) {
            //    req = "1";
            //} else { req = ""; }
            //if (req =="1") {
            //    alert("No any Correction request approved");
            //    return false;
            //}
            if ((($scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag == "R") || ($scope.ExamFormsCorrectionApproval.CorrMainGrpAppFlag == ""))
                && (($scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag == "R") || ($scope.ExamFormsCorrectionApproval.CorrSecLangAppFlag == ""))
                && (($scope.ExamFormsCorrectionApproval.CorrMedAppFlag == "R") || ($scope.ExamFormsCorrectionApproval.CorrMedAppFlag == ""))
                && (($scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag == "R") || ($scope.ExamFormsCorrectionApproval.CorrStudCatAppFlag == ""))
                && (($scope.ExamFormsCorrectionApproval.CorrSubAppFlag == "R") || ($scope.ExamFormsCorrectionApproval.CorrSubAppFlag == "")))
            {
                alert("No any Correction request approved");
                return false;
            }
            if ($scope.SubjectdataNew.length == 0) {
                alert("No any subject selected");
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
            var lisnm = 'Exam';
            $state.go(lisnm);
        }
    });
});
