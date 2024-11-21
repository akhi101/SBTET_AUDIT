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
    app.controller("PhotoCorrectionApprovalListController", function ($scope, $filter, $state, $localStorage, $stateParams, AppSettings, PhotoCorrectionApprovalListService) {
        var authData = $localStorage.authorizationData;
        $scope.dieouser = false;
        $scope.dsuser = false;
        $scope.RollEditDisable = false;
        $scope.AcademicYearList = {};
        $scope.LoadImg = false;
        $scope.dsuser = false;
        AppSettings.SysUserID = authData.SysUserID;
        if (AppSettings.SysUsrGrpID == "7") {
            $scope.dieouser = true;
        }
        if (AppSettings.SysUsrGrpID == "2") {
            $scope.dsuser = true;
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
        var AcademicYearList = PhotoCorrectionApprovalListService.GetAcademicYear();
        AcademicYearList.then(function (data) {
            $scope.AcademicYearList = data;
            $scope.GetApprovalListPhotoCorrection();
        }, function (error) {
            alert(error);
        });

        $scope.GetApprovalListPhotoCorrection = function () {
            $scope.LoadImg = true;
            var PhotoApprovalListData = PhotoCorrectionApprovalListService.GetPhotoCorrectionApprovalList($scope.AcdYrID, AppSettings.DistrictIDs, AppSettings.SysUserID);
            PhotoApprovalListData.then(function (data) {
                if (data.length > 0) {
                    $scope.ShowDIEODetail = true;
                    $scope.LoadImg = false;
                    $scope.PhotoApprovalListData = data;
                }
                else {
                    alert("No College(s) Data Found.");
                    $scope.ShowDIEODetail = false;
                    $scope.LoadImg = false;
                }
            }, function (error) {
                alert(error);
            });
        };
        $scope.GetStudentDetails = function (obj, TypeID) {
                $scope.ShowCandidatedata = [];
            var ShowCandidate = PhotoCorrectionApprovalListService.GetCandidateDetails(obj.CollegeID, TypeID, AppSettings.SysUserID);
            ShowCandidate.then(function (data) {
                if (data.length > 0) {
                    $scope.ShowCandidatedata = data;
                    if (TypeID == "P") {
                        $scope.btnShowfrsubmit = true;
                    }
                    else {
                        $scope.btnShowfrsubmit = false;
                        for (var i = 0; i < $scope.ShowCandidatedata.length; i++) {
                            $scope.ShowCandidatedata[i].RowDisable = true;
                        }
                    }
                }
            }, function (error) {
                alert(error);
                $scope.ShowCandidate = [];
            });
        }

        $scope.ChangeTextArea = function (str, index) {
            if (AppSettings.SysUsrGrpID == "7") {
                if (str == 'A') { $scope.ShowCandidatedata[index].ReqRemark1 = "May Be Approved"; }
                else if
                (str == 'R') { $scope.ShowCandidatedata[index].ReqRemark1 = ""; }
            }
            else {
                if (str == 'A') { $scope.ShowCandidatedata[index].ReqRemark1 = "Approved"; }
                else if
                (str == 'R') { $scope.ShowCandidatedata[index].ReqRemark1 = "Rejected"; }
            }
        }

        $scope.UpdateApprovalData = function () {
            for (var i = 0; i < $scope.ShowCandidatedata.length; i++) {
                if (($scope.ShowCandidatedata[i].ReqStatus1 == "") || ($scope.ShowCandidatedata[i].ReqStatus1 == undefined)) {
                    alert("Please Select Approve/Reject.");
                    return;
                }
                if (($scope.ShowCandidatedata[i].ReqRemark1 == "") || ($scope.ShowCandidatedata[i].ReqRemark1 == undefined)) {
                    alert("Please Enter Comments.");
                    return;
                }
                $scope.ShowCandidatedata[i].RowDisable = true;
                $scope.btndisable = true;
            }
            $scope.UpdatePhotoCorrectionStatus();
        }

        $scope.UpdatePhotoCorrectionStatus = function () {
            var NRDetails = [];
            $scope.RollEditDisable = true;
            if ($scope.ShowCandidatedata.length == 0) {
                alert("No data found");
                return;
            }
            for (var i = 0; i < $scope.ShowCandidatedata.length; i++) {
                if ($scope.ShowCandidatedata[i].RowDisable == true) {
                    var obj = {};
                    obj.NRPhotoCorrectionID = $scope.ShowCandidatedata[i].NRPhotoCorrectionID;
                    obj.ReqStatus1 = $scope.ShowCandidatedata[i].ReqStatus1;
                    obj.ReqRemark1 = $scope.ShowCandidatedata[i].ReqRemark1;
                    obj.PreStudRegID = $scope.ShowCandidatedata[i].PreStudRegID;
                    obj.ProcessbyID = AppSettings.LoggedUserId;
                    obj.SysUsrGrpID = AppSettings.SysUsrGrpID;
                    NRDetails.push(obj);
                }
            }
            
            var getPromise = PhotoCorrectionApprovalListService.UpdateNRCorrectionStatus(NRDetails);
            getPromise.then(function (data) {
                alert("Submitted Successfully.");
                RedirectToListPage();
            }, function (error) {




                $scope.RollEditDisable = false;
                alert(error);
                });
        }
        function RedirectToListPage() {
            location.reload(); 
        }
    });
});