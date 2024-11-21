define(['app'], function (app) {
    app.filter('total', function () {
        return function (input, property) {
            var i = input instanceof Array ? input.length : 0;
            if (typeof property === 'undefined' || i === 0) {
                return i;
            } else if (isNaN(input[0][property])) {
                throw 'filter total can count only numeric values';
            } else {
                var total = 0;
                while (i--)
                    total += input[i][property];
                return total;
            }
        };
    })
    app.controller("NRCorrectionApprovalListController", function ($scope, $filter,$state, $localStorage, $stateParams, AppSettings, NRCorrectionApprovalListService) {
        var authData = $localStorage.authorizationData;
        $scope.ShowCandidate = {};
        $scope.userName = authData.userName;
        $scope.dieouser = false;
        $scope.supuser = false;
        $scope.dsuser = false;
        $scope.jsuser = false;
        $scope.coeuser = false;
        AppSettings.DistrictIDs = authData.DistrictIDs;
        $scope.LoggedCollegeID = AppSettings.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.SysUsrGrpID = authData.SysUserID;
        if (authData.SysUsrGrpID == "7") {
            $scope.dieouser = true;
        }
        if (authData.SysUsrGrpID == "9") {
            $scope.supuser = true;
        }
        if (authData.SysUsrGrpID == "2") {
            $scope.dsuser = true;
        }
        if (authData.SysUsrGrpID == "11") {
            $scope.jsuser = true;
        }
        if (authData.SysUsrGrpID == "23") {
            $scope.coeuser = true;
        }
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
        $scope.AcdYrID = AppSettings.AcdYrID;
        var AcademicYearList = NRCorrectionApprovalListService.GetAcademicYear();
        AcademicYearList.then(function (data) {
            $scope.AcademicYearList = data;
            $scope.GetApprovalListNRCorrection();
        }, function (error) {
            alert(error);
        });

        $scope.GetApprovalListNRCorrection = function () {
            $scope.LoadImg = true;
            var NRApprovalListData = NRCorrectionApprovalListService.GetNRCorrectionApprovalList($scope.AcdYrID, AppSettings.DistrictIDs, AppSettings.SysUsrGrpID);
            NRApprovalListData.then(function (data) {
                if (data.length > 0) {
                    $scope.ShowDIEODetail = true;
                    $scope.LoadImg = false;
                    $scope.NRApprovalListData = data;
                }
                else {
                    alert("No College(s) Data Found.");
                    $scope.TCReportData = [];
                    $scope.ShowDIEODetail = false;
                    $scope.LoadImg = true;
                }
            }, function (error) {
                alert(error);
            });
        };
        $scope.GetShowCandidate = function (obj) {
            $scope.ShowCandidate = [];
            var ShowCandidate = NRCorrectionApprovalListService.GetCandidateDetails(obj.ExmFrmIDCorrection, obj.CollegeID);
            ShowCandidate.then(function (data) {
                if (data.length > 0) {
                    $scope.ShowCandidate = data[0];
                    if (data[0].ReqStatus1 != 'P') {
                        $scope.ApproverRemarks1 = true;
                        $scope.CandidateName = true;
                        $scope.FatherName = true;
                        $scope.MotherName = true;
                    }
                    else {
                        $scope.ApproverRemarks1 = false;
                        $scope.CandidateName = true;
                        $scope.FatherName = true;
                        $scope.MotherName = true;
                    }
                    $scope.CandidateName = true;
                    $scope.FatherName = true;
                    $scope.MotherName = true;
                } else {
                    alert("Data Not Found.");
                    $scope.ShowCandidate = [];
                    $scope.CandidateListForApproval = [];
                }
            }, function (error) {
                alert(error);
                $scope.ShowCandidate = [];
            });
        }
        
        $scope.GetCandidates = function (obj, ReqStatus) {
            $state.go('Exam.NRCorrectionApprovalListNew', { CollegeID: obj.CollegeID, ReqStatus: ReqStatus });
        }
        $scope.GetCandidatesDigiSign = function (obj, ReqStatus) {
            $state.go('Exam.NRCorrectionApprovalListDigiSign', { CollegeID: obj.CollegeID, ReqStatus: ReqStatus });
        }
    });
});