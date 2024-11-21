define(['app'], function (app) {
    app.controller("NRCorrectionApprovalController", function ($scope, $state, $localStorage, $stateParams, AppSettings, NRCorrectionApprovalListService) {
        $scope.NRCorrectionApproval = { PRNNo: $stateParams.PRNNo, CollegeID: $stateParams.CollegeID, ExamID: $stateParams.ExamID };
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
            var ShowCandidate = NRCorrectionApprovalListService.GetCandidateDetails($scope.NRCorrectionApproval.PRNNo, $scope.NRCorrectionApproval.CollegeID, AppSettings.SysUsrGrpID);
            ShowCandidate.then(function (data) {
                if (data.length > 0) {
                    $scope.ShowCandidatedata = data;
                    $scope.ShowDIEODetail = true;
                } else {
                    alert("Data Not Found.");
                    $('#exampleModal').modal('hide');
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
            var MasterStudData = NRCorrectionApprovalListService.GetMasterData($scope.NRCorrectionApproval.PRNNo, $scope.NRCorrectionApproval.ExamID);
            MasterStudData.then(function (data) {
                if (data.length > 0) {
                    $scope.MasterData = data[0];
                } else {
                    alert("Data Not Found.");
                    $scope.MasterData = [];
                    $('#exampleModal').modal('hide');
                }
            }, function (error) {
                alert(error);
                $scope.ShowCandidate = [];
            });
        }

        $scope.UpdateNRCorrectionStatus = function (obj,index) {
            $scope.RollEditDisable = true;
            if ((obj.ReqStatus1 == undefined) || (obj.ReqStatus1 == "")) {
                alert("Please Select Accept / Reject");
                $scope.RollEditDisable = false;
                return;

            }
            else if ((obj.ReqRemark1 == undefined) || (obj.ReqRemark1 == "")) {
                alert("Please Enter Comments");
                $scope.RollEditDisable = false;
                return;
            }
            obj.SysUsrGrpID = AppSettings.SysUsrGrpID;
            obj.ProcessbyID = AppSettings.LoggedUserId;
            var getPromise = NRCorrectionApprovalListService.UpdateNRCorrectionStatus(obj);
            getPromise.then(function (data) {
                alert("Submitted Successfully.");
                $scope.ShowCandidatedata[index].RollEditDisable = true;
                $scope.CandidateListForApproval = [];
                $scope.ShowCandidate = [];
            });
        }

        $scope.GetVerificationDetailsForApproval = function () {
            var VerifyCandidateDetails = NRCorrectionApprovalListService.GetCandidateDetails($scope.ShowCandidate.PRNNo);
            VerifyCandidateDetails.then(function (data) {
                if (data.length > 0) {
                    $scope.StudData = data[0];
                } else {
                    alert("Data Not Found.");
                    $('#exampleModal').modal('hide');
                    $scope.StudData = [];
                }
            }, function (error) {
                alert(error);
            });
        }

        $scope.ChangeTextArea = function (str, index) {
            if (str == 'A') { $scope.ShowCandidatedata[index].ReqRemark1 = "Approved"; }
            else if
            (str == 'R') { $scope.ShowCandidatedata[index].ReqRemark1 = "Rejected"; }
        };

        $scope.doTheBack = function () {
            window.history.back();
        };

        ///Button
        $scope.GetCheckStudent = function (obj) {
            if ((obj.ReqStatus1 == "") || (obj.ReqStatus1 == undefined) || (obj.ReqStatus1 == "N")) {
                alert("Please Select Accept/Reject.");
                obj.CheckExmFrm = false;
                return;
            }
            if ((obj.ReqRemark1 == "") || (obj.ReqRemark1 == undefined) || (obj.ReqRemark1 == "N")) {
                alert("Please Enter Comments.");
                obj.CheckExmFrm = false;
                return;
            }
            if (obj.CheckExmFrm == false) {
                if ($scope.headercheck == true) { $scope.headercheck = false; }
            }

            //for (var i = 0; i < $scope.ExamFormsApprovalData.length; i++) {
            //    if ($scope.ExamFormsApprovalData[i].CheckExmFrm == true) {
            //        tot = tot + 1;
            //        totAmount = totAmount + $scope.ExamFormsApprovalData[i].FormFees;
            //    }
            //}
            //$('#TotalCondidate').val(tot);
            //$('#TotalFeeAmountSelected').val(totAmount);
            //$scope.ExamFormsApprovalList.TotalCondidate = tot;
            //$scope.ExamFormsApprovalList.TotalFeeAmountSelected = totAmount;
            //if ($scope.ExamFormsApprovalList.TotalCondidate == $scope.ExamFormsApprovalList.TotalCondidateCount) {
            //    $scope.headercheck = true;
            //}
        }

        $scope.GetCheckStudentHeader = function (headercheck) {
            //if (headercheck == true) {
            //    for (var i = 0; i < $scope.ShowCandidatedata.length; i++) {
            //        if (($scope.ShowCandidatedata.ReqStatus1 == "") || ($scope.ShowCandidatedata.ReqStatus1 == undefined)) {
            //            alert("Please Select Accept/Reject.");
            //            $scope.ShowCandidatedata.CheckExmFrm = false;
            //            return;
            //        }
            //        if (($scope.ShowCandidatedata.ReqRemark1 == "") || ($scope.ShowCandidatedata.ReqRemark1 == undefined)) {
            //            alert("Please Enter Comments.");
            //            $scope.ShowCandidatedata.CheckExmFrm = false;
            //            return;
            //        }
            //    }
            //}
            for (var i = 0; i < $scope.ShowCandidatedata.length; i++) {
                if (headercheck == true) {
                    if (($scope.ShowCandidatedata[i].ReqStatus1 == "") || ($scope.ShowCandidatedata[i].ReqStatus1 == undefined)) {
                        alert("Please Select Accept/Reject.");
                        $scope.headercheck = false;
                        return;
                    }
                    if (($scope.ShowCandidatedata[i].ReqRemark1 == "") || ($scope.ShowCandidatedata[i].ReqRemark1 == undefined)) {
                        alert("Please Enter Comments.");
                        $scope.headercheck = false;
                        return;
                    }
                    $scope.ShowCandidatedata[i].CheckExmFrm = true;
                }
                else {
                    $scope.ShowCandidatedata[i].CheckExmFrm = false;

                }
            }
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
            var getPromise = NRCorrectionApprovalListService.UpdateNRCorrectionStatus(NRDetails);
            getPromise.then(function (data) {
                alert("Submitted Successfully.");
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