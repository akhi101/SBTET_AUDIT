define(['app'], function (app) {
    app.controller("NRCorrectionApprovalListStudController", function ($scope, $state, $localStorage, $stateParams, AppSettings, NRCorrectionApprovalListService) {
        $scope.NRCorrectionApprovalListStud = { PRNNo: $stateParams.PRNNo, CollegeID: $stateParams.CollegeID };
        var authData = $localStorage.authorizationData;
        $scope.ShowCandidate = {};
        $scope.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.DistrictIDs = authData.DistrictIDs;
        $scope.LoggedCollegeID = AppSettings.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID;
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].ListFormName == PageNm) {
                var obj = {};
                obj.isaddable = UsersRightsdata[i].isaddable;
                RightForCurrentPage.push(obj);
            }
        }
       

       
        $scope.GetCandidates = function (obj, ReqStatus) {
            $scope.CandidateListForApproval = [];
            var TotalRecorddata = NRCorrectionApprovalListService.GetCandidateByCatType(obj.CollegeID, AppSettings.DistrictIDs, ReqStatus, AppSettings.SysUsrGrpID);
            TotalRecorddata.then(function (data) {
                if (data.length > 0) {
                    $scope.CandidateListForApproval = data;
                    $scope.CandidateListForApproval.ColName = data[0].ColCode + ' - ' + data[0].ColName;
                    for (var i = 0; i < $scope.AcademicYearList.length; i++) {
                        if ($scope.AcademicYearList[i].AcdYrID == $scope.AcdYrID) {
                            $scope.AcdYrName = $scope.AcademicYearList[i].AcdYrName;
                        }
                    }
                } else {
                    alert("Data Not Found.");
                    $('#exampleModal').modal('hide');
                    $scope.CandidateListForApproval = [];
                }
            }, function (error) {
                alert(error);
            });
        }

        //$scope.GetShowCandidate = function (obj) {
        //    $scope.ShowCandidate = [];
        //    var ShowCandidate = NRCorrectionApprovalListService.GetCandidateDetails(obj.ExmFrmIDCorrection, obj.CollegeID);
        //    ShowCandidate.then(function (data) {
        //        if (data.length > 0) {
        //            $scope.ShowCandidate = data[0];
        //            if (data[0].ReqStatus1 != 'P') {
        //                $scope.ApproverRemarks1 = true;
        //                $scope.CandidateName = true;
        //                $scope.FatherName = true;
        //                $scope.MotherName = true;
        //            }
        //            else {
        //                $scope.ApproverRemarks1 = false;
        //                $scope.CandidateName = true;
        //                $scope.FatherName = true;
        //                $scope.MotherName = true;
        //            }
        //            $scope.CandidateName = true;
        //            $scope.FatherName = true;
        //            $scope.MotherName = true;
        //        } else {
        //            alert("Data Not Found.");
        //            $('#exampleModal').modal('hide');
        //            $scope.ShowCandidate = [];
        //            $scope.CandidateListForApproval = [];
        //        }
        //    }, function (error) {
        //        alert(error);
        //        $scope.ShowCandidate = [];
        //    });
        //}

        //$scope.SaveNRCorrectionStatus = function () {
        //    $scope.RollEditDisable = true;
        //    $scope.ShowCandidate.ProcessbyID = AppSettings.LoggedUserId;
        //    //$scope.ShowCandidate.ExmFrmID = $scope.ShowCandidate.ExmFrmID;
        //    //if (AppSettings.SysUsrGrpID == 4) {
        //        //if (($scope.MigrCertApp.ReqStatus == undefined) || ($scope.MigrCertApp.ReqStatus == "") || ($scope.MigrCertApp.ReqStatus == 0)) {
        //        //    alert("Select Accept/Reject At Level 1");
        //        //    $scope.RollEditDisable = false;
        //        //    return;
        //        //}
        //        //if (($scope.MigrCertApp.ProcessRemark == undefined) || ($scope.MigrCertApp.ProcessRemark == "")) {
        //        //    alert("Enter Process Remark at Level 1");
        //        //    $scope.RollEditDisable = false;
        //        //    return;
        //        //}
        //        //else {
        //            var getPromise = NRCorrectionApprovalListService.UpdateNRCorrectionStatus($scope.ShowCandidate);
        //            getPromise.then(function (data) {
        //                alert("Submitted Successfully.");
        //                $('#exampleModalDetail').modal('hide');
        //                $('#exampleModal').modal('hide');
        //                $scope.CandidateListForApproval = [];
        //                $scope.ShowCandidate = [];
        //            });
        //        //}
        //    //}
        //    //else if (AppSettings.SysUsrGrpID == 11) {
        //    //    if (($scope.MigrCertApp.ReqStatus1 == undefined) || ($scope.MigrCertApp.ReqStatus1 == "") || ($scope.MigrCertApp.ReqStatus1 == 0)) {
        //    //        alert("Select  Accept/Reject At Level 2");
        //    //        $scope.RollEditDisable = false;
        //    //        return;
        //    //    }
        //    //    if (($scope.MigrCertApp.ProcessRemark1 == undefined) || ($scope.MigrCertApp.ProcessRemark1 == "")) {
        //    //        alert("Enter Process Remark at level 2");
        //    //        $scope.RollEditDisable = false;
        //    //        return;
        //    //    }
        //    //    if ($scope.MigrCertApp.ReqStatus1 == 'A') {
        //    //        $scope.MigrCertApp.UserGrp = UserGrp;
        //    //        var getPromise = MigrCertAppService.UpdateMigrCertApp($scope.MigrCertApp);
        //    //        getPromise.then(function (data) {
        //    //            $scope.PrintShow = true;
        //    //            alert("Submitted Successfully, You Can Proceed With Digital Sign.");
        //    //        });
        //    //    }
        //    //    else if ($scope.MigrCertApp.ReqStatus1 == 'R') {
        //    //        $scope.MigrCertApp.UserGrp = UserGrp;
        //    //        var getPromise = MigrCertAppService.UpdateMigrCertApp($scope.MigrCertApp);
        //    //        getPromise.then(function (data) {
        //    //            $scope.PrintShow = false;
        //    //            alert("Submitted Successfully.");
        //    //        });
        //    //    }
        //    //}

        //}

        //$scope.GetVerificationDetailsForApproval = function () {
        //    var VerifyCandidateDetails = NRCorrectionApprovalListService.GetCandidateDetails($scope.ShowCandidate.PRNNo);
        //    VerifyCandidateDetails.then(function (data) {
        //        if (data.length > 0) {
        //            $scope.StudData = data[0];
        //        } else {
        //            alert("Data Not Found.");
        //            $('#exampleModal').modal('hide');
        //            $scope.StudData = [];
        //        }
        //    }, function (error) {
        //        alert(error);
        //    });
        //}
        //$scope.ChangeTextArea = function (str, type) {
        //    if (type == "StudName") {
        //        if (str == 'A') { $scope.ShowCandidate.ReqRemark1StudName = "Approved"; }
        //        else if (str == 'R') { $scope.ShowCandidate.ReqRemark1StudName = "Rejected"; }
        //    }
        //    else if (type == "FatherName") {
        //        if (str == 'A') { $scope.ShowCandidate.ReqRemark1FatherName = "Approved"; }
        //        else if (str == 'R') { $scope.ShowCandidate.ReqRemark1FatherName = "Rejected"; }
        //    }
        //    else if (type == "MotherName") {
        //        if (str == 'A') { $scope.ShowCandidate.ReqRemark1MotherName = "Approved"; }
        //        else if (str == 'R') { $scope.ShowCandidate.ReqRemark1MotherName = "Rejected"; }
        //    }
        //};







        $scope.SendData = function (obj) {
            $('#exampleModal').modal('hide');
            $state.go('Exam.NRCorrectionApproval', { PRNNo: obj.PRNNo, CollegeID: obj.CollegeID });
        }
    });
});