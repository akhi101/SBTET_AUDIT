define(['app'], function (app) {
    app.controller("NRCorrectionApprovalListNewController", function ($scope, $state, $localStorage, $stateParams, AppSettings, NRCorrectionApprovalListService) {
        $scope.NRCorrectionApprovalNew = { CollegeID: $stateParams.CollegeID, ReqStatus: $stateParams.ReqStatus };
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

        if (($scope.NRCorrectionApprovalNew.CollegeID != 0) && ($scope.NRCorrectionApprovalNew.ReqStatus != 0)) {
           // $scope.GetCandidates = function (obj, ReqStatus) {
                $scope.CandidateListForApproval = [];
                var TotalRecorddata = NRCorrectionApprovalListService.GetCandidateByCatType($scope.NRCorrectionApprovalNew.CollegeID, AppSettings.DistrictIDs, $scope.NRCorrectionApprovalNew.ReqStatus, AppSettings.SysUsrGrpID);
                TotalRecorddata.then(function (data) {
                    if (data.length > 0) {
                        $scope.CandidateListForApproval = data;
                        $scope.CandidateListForApproval.ColName = data[0].ColCode + ' - ' + data[0].ColName;
                       
                    } else {
                        alert("Data Not Found.");
                        $('#exampleModal').modal('hide');
                        $scope.CandidateListForApproval = [];
                    }
                }, function (error) {
                    alert(error);
                });
            
          //  }

        }

        $scope.doTheBack = function () {
            window.history.back();
        };

        $scope.SendData = function (obj) {
            $('#exampleModal').modal('hide');
            if (AppSettings.SysUsrGrpID == '7') {
                $state.go('Exam.NRCorrectionApproval', { PRNNo: obj.PRNNo, CollegeID: obj.CollegeID, ExamID: obj.ExamID, ReqStatus: $scope.NRCorrectionApprovalNew.ReqStatus });
            }
            else if (AppSettings.SysUsrGrpID == '9') {
                $state.go('Exam.NRCorrectionApprovalLTSup', { PRNNo: obj.PRNNo, CollegeID: obj.CollegeID, ExamID: obj.ExamID, ReqStatus: $scope.NRCorrectionApprovalNew.ReqStatus });
            }
            else if  (AppSettings.SysUsrGrpID == '2') {
                $state.go('Exam.NRCorrectionApprovalLTDS', { PRNNo: obj.PRNNo, CollegeID: obj.CollegeID, ExamID: obj.ExamID, ReqStatus: $scope.NRCorrectionApprovalNew.ReqStatus });
            }
            else if  (AppSettings.SysUsrGrpID == '11') {
                $state.go('Exam.NRCorrectionApprovalLFJS', { PRNNo: obj.PRNNo, CollegeID: obj.CollegeID, ExamID: obj.ExamID, ReqStatus: $scope.NRCorrectionApprovalNew.ReqStatus });
            }
            else if  (AppSettings.SysUsrGrpID == '23') {
                $state.go('Exam.NRCorrectionApprovalLFCoe', { PRNNo: obj.PRNNo, CollegeID: obj.CollegeID, ExamID: obj.ExamID, ReqStatus: $scope.NRCorrectionApprovalNew.ReqStatus });
            }
        }
    });
});