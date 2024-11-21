define(['app'], function (app) {
    app.controller("NRCorrectionApprovalListDigiSignController", function ($scope, $state, $localStorage, $stateParams, AppSettings, NRCorrectionApprovalListService) {
        $scope.NRCorrectionApprovalDigiSign = { CollegeID: $stateParams.CollegeID, ReqStatus: $stateParams.ReqStatus };
        var authData = $localStorage.authorizationData;
        $scope.PreStudRegIDList=""; 
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

        if (($scope.NRCorrectionApprovalDigiSign.CollegeID != 0) && ($scope.NRCorrectionApprovalDigiSign.ReqStatus != 0)) {
            //$scope.GetCandidates = function (obj, ReqStatus) {
                //$scope.CollegeID = AppSettings.CollegeID;
                //$scope.ReqStatus = "A,R"
                $scope.CandidateListForApproval = [];
                var TotalRecorddata = NRCorrectionApprovalListService.GetCandidateByCatType($scope.NRCorrectionApprovalDigiSign.CollegeID, AppSettings.DistrictIDs, $scope.NRCorrectionApprovalDigiSign.ReqStatus, AppSettings.SysUsrGrpID);
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
        }

        $scope.doTheBack = function () {
            window.history.back();
        };

        /////Button
        //$scope.GetCheckStudent = function (obj) {
        //    //if ((obj.ReqStatus1 == "") || (obj.ReqStatus1 == undefined) || (obj.ReqStatus1 == "N")) {
        //    //    alert("Please Select Approve/Reject.");
        //    //    obj.CheckExmFrm = false;
        //    //    return;
        //    //}
        //    //if ((obj.ReqRemark1 == "") || (obj.ReqRemark1 == undefined) || (obj.ReqRemark1 == "N")) {
        //    //    alert("Please Enter Comments.");
        //    //    obj.CheckExmFrm = false;
        //    //    return;
        //    //}
        //    if (obj.CheckExmFrm == false) {
        //        if ($scope.headercheck == true) { $scope.headercheck = false; }
        //    }
        //}

        $scope.GetCheckStudentHeader = function (headercheck) {
            for (var i = 0; i < $scope.CandidateListForApproval.length; i++) {
                if (headercheck == true) {
                    $scope.CandidateListForApproval[i].CheckExmFrm = true;
                }
                else {
                    $scope.CandidateListForApproval[i].CheckExmFrm = false;

                }
            }
        }

        $scope.UpdateDigiSign = function () {
            var NRDetails = [];
            if ($scope.CandidateListForApproval.length == 0) {
                alert("No data found");
                return;
            }
            $scope.PreStudRegIDList = "";   
            for (var i = 0; i < $scope.CandidateListForApproval.length; i++) {
                if ($scope.CandidateListForApproval[i].CheckExmFrm == true) {
                    var obj = {};
                    if ($scope.PreStudRegIDList != "") {
                        $scope.PreStudRegIDList = $scope.PreStudRegIDList + "," + $scope.CandidateListForApproval[i].PreStudRegID;
                    }
                    else {
                        $scope.PreStudRegIDList = $scope.PreStudRegIDList + $scope.CandidateListForApproval[i].PreStudRegID;
                    }
                }
                //else {
                //    alert("For Digital Sign,Please Select Atleast One Row.")
                //}
            }
            if ($scope.PreStudRegIDList.length == 0) {
                alert("No Rows Selected");
                return;
            }
            var url = AppSettings.NRApproval + $scope.PreStudRegIDList + "&UrID=" + AppSettings.LoggedUserId;
            window.open(url, '_self');
        }
    });
});