define(['app'], function (app) {
    app.controller("NRCorrectionApprovalController", function ($scope, $state, $localStorage, $stateParams, AppSettings, NRCorrectionApprovalListService) {
        $scope.NRCorrectionApproval = { PRNNo: $stateParams.PRNNo, CollegeID: $stateParams.CollegeID, ExamID: $stateParams.ExamID, ReqStatus: $stateParams.ReqStatus };
        var authData = $localStorage.authorizationData;
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID;
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].ListFormName == PageNm) {
                var obj = {};
                obj.isaddable = UsersRightsdata[i].isaddable;
                RightForCurrentPage.push(obj);
            }
        }

        //Get Data on click on Previous page on each student
        if (($scope.NRCorrectionApproval.PRNNo != 0) && ($scope.NRCorrectionApproval.CollegeID != 0)) {
            $scope.ShowCandidatedata = [];
            var ShowCandidate = NRCorrectionApprovalListService.GetCandidateDetails($scope.NRCorrectionApproval.PRNNo, $scope.NRCorrectionApproval.CollegeID, AppSettings.SysUsrGrpID, $scope.NRCorrectionApproval.ReqStatus);
            ShowCandidate.then(function (data) {
                if (data.length > 0) {
                    $scope.ShowCandidatedata = data;
                    $scope.ShowDIEODetail = true;
                    if ($scope.ShowCandidatedata[0].ReqStatus1 == 'P') {
                        $scope.Submitbtn = true;
                    }
                    else {
                        $scope.Submitbtn = false;
                        for (var i = 0; i < $scope.ShowCandidatedata.length; i++) {
                            $scope.ShowCandidatedata[i].CheckExmFrm = true;
                        }
                    }
                } else {
                   // alert("Data Not Found.");
                    $scope.ShowCandidate = [];
                }
            }, function (error) {
                alert(error);
                $scope.ShowCandidate = [];
            });
        }
        
        //this page hyper link 
        $scope.GetMasterData = function () {
            $scope.MasterData = [];
            var MasterMarksSheetData = NRCorrectionApprovalListService.GetMasterData($scope.NRCorrectionApproval.PRNNo, $scope.NRCorrectionApproval.ExamID);
            MasterMarksSheetData.then(function (data) {
                if (data.length > 0) {
                    $scope.MasterData = data[0];
                    $scope.GetSubjectData();
                } else {
                    alert("Data Not Found.");
                    $scope.MasterData = [];
                }
            }, function (error) {
                alert(error);
                $scope.ShowCandidate = [];
            });
        }
        $scope.GetSubjectData = function () {
            $scope.SubjectData = [];
            var MasterSbjData = NRCorrectionApprovalListService.GetSubjectData($scope.MasterData.ExmFrmID);
            MasterSbjData.then(function (sbjdata) {
                if (sbjdata.length > 0) {
                    $scope.SubjectData = sbjdata;
                    $scope.ShowMarksSheet();
                } else {
                    alert("Data Not Found.");
                    $scope.SubjectData = [];
                }
            }, function (error) {
                alert(error);
                $scope.ShowCandidate = [];
            });
        }

        $scope.ShowMarksSheet = function () {
            $scope.MarksSheet = [];
            var MarksSheetData = NRCorrectionApprovalListService.ShowMarksSheet($scope.NRCorrectionApproval.PRNNo);
            MarksSheetData.then(function (dataMarksSheet) {
                if (dataMarksSheet.length > 0) {
                    $scope.MarksSheetData = dataMarksSheet[0];
                    if ($scope.MarksSheetData.FinalResult == "NA") {
                        $scope.GeneralMemo = false;
                        $scope.VocationalMemo = false;
                    }
                    else {
                        if ($scope.MarksSheetData.TblFlag == "GEN") {
                            $scope.GeneralMemo = true;
                            $scope.VocationalMemo = false;
                        }
                        else if ($scope.MarksSheetData.TblFlag == "VOC") {
                            $scope.GeneralMemo = false;
                            $scope.VocationalMemo = true;
                        }
                    }
                } else {
                    alert("Data Not Found.");
                    $scope.SubjectData = [];
                }
            }, function (error) {
                alert(error);
                $scope.ShowCandidate = [];
            });
        }

        $scope.UpdateNRCorrectionStatus = function (obj,index) {
            $scope.RollEditDisable = true;
            if ((obj.ReqStatus1 == undefined) || (obj.ReqStatus1 == "")) {
                alert("Please Select Approve / Reject");
                $scope.RollEditDisable = false;
                return;

            }
            else if ((obj.ReqRemark1 == undefined) || (obj.ReqRemark1 == "")) {
                alert("Please Enter Comments");
                $scope.RollEditDisable = false;
                return;
            }
            obj.ProcessbyID = AppSettings.LoggedUserId;
            obj.SysUsrGrpID = AppSettings.SysUsrGrpID;
            var getPromise = NRCorrectionApprovalListService.UpdateNRCorrectionStatus(obj);
            getPromise.then(function (data) {
                alert("Submitted Successfully.");
                $scope.ShowCandidatedata[index].RollEditDisable = true;
                $scope.CandidateListForApproval = [];
                $scope.ShowCandidate = [];
            }, function (error) {
                $scope.RollEditDisable = false;
                $scope.UploadFiles = true;
                alert(error);
            });
        }

        $scope.ChangeTextArea = function (str, index) {
            if (str == 'A') { $scope.ShowCandidatedata[index].ReqRemark1 = "May Be Approved"; }
            else if
            (str == 'R') { $scope.ShowCandidatedata[index].ReqRemark1 = ""; }
        }
        
        $scope.doTheBack = function () {
            window.history.back();
        }

        ///Button
        $scope.GetCheckStudent = function (obj) {
            if ((obj.ReqStatus1 == "") || (obj.ReqStatus1 == undefined)) {
                    alert("Please Select Approve/Reject.");
                    obj.CheckExmFrm = false;
                    return;
                }
             if ((obj.ReqRemark1 == "") || (obj.ReqRemark1 == undefined)) {
                    alert("Please Enter Comments.");
                    obj.CheckExmFrm = false;
                    return;
                }
             if (obj.CheckExmFrm == false) {
                if ($scope.headercheck == true) { $scope.headercheck = false; }
            }
        }

        $scope.GetCheckStudentHeader = function () {
            for (var i = 0; i < $scope.ShowCandidatedata.length; i++) {
                //if (headercheck == true) {
                    if (($scope.ShowCandidatedata[i].ReqStatus1 == "") || ($scope.ShowCandidatedata[i].ReqStatus1 == undefined)) {
                        alert("Please Select Approve/Reject.");
                        $scope.headercheck = false;
                        return;
                    }
                    if (($scope.ShowCandidatedata[i].ReqRemark1 == "") || ($scope.ShowCandidatedata[i].ReqRemark1 == undefined)) {
                        alert("Please Enter Comments.");
                        $scope.headercheck = false;
                        return;
                    }
                    $scope.ShowCandidatedata[i].CheckExmFrm = true;
                    $scope.btndisable = true;
                //}
                //else {
                //    $scope.ShowCandidatedata[i].CheckExmFrm = false;
                    
                //}
            }
            $scope.UpdateNRCorrectionStatus1();
        }

        $scope.UpdateNRCorrectionStatus1 = function () {
            var NRDetails = [];
            if ($scope.ShowCandidatedata.length == 0) {
                alert("No data found");
                return;
            }
            for (var i = 0; i < $scope.ShowCandidatedata.length; i++) {
                if ($scope.ShowCandidatedata[i].CheckExmFrm == true) {
                    var obj = {};
                    obj.PreExmFrmCorrectionID = $scope.ShowCandidatedata[i].PreExmFrmCorrectionID;
                    obj.ReqStatus1 = $scope.ShowCandidatedata[i].ReqStatus1;
                    obj.ReqRemark1 = $scope.ShowCandidatedata[i].ReqRemark1;
                    obj.ProcessbyID = AppSettings.LoggedUserId;
                    obj.SysUsrGrpID = AppSettings.SysUsrGrpID;
                    NRDetails.push(obj);
                }
            }

            //if (NRDetails.length == 0) {
            //    alert("Please Select Atleast One row");
            //    return;
            //}

            var getPromise = NRCorrectionApprovalListService.UpdateNRCorrectionStatus(NRDetails);
            getPromise.then(function (data) {
                alert("Submitted Successfully.");
                //$scope.Nheadercheck == true;
                window.history.back();
                // $scope.RollEditDisable = false;
                $scope.ShowCandidatedata[index].RollEditDisable = true;
                $scope.CandidateListForApproval = [];
                $scope.ShowCandidate = [];
            }, function (error) {
                $scope.RollEditDisable = false;
                $scope.UploadFiles = true;
                alert(error);
            });
        }

        
    });
});