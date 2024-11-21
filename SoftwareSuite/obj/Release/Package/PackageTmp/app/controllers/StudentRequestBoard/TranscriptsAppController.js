define(['app'], function (app) {
    app.controller("TranscriptsAppController", function ($http, $scope, $state, $stateParams, AppSettings, TranscriptsAppService) {
        $scope.TranscriptsApp = { TrnSrptID: $stateParams.TrnSrptID };
        //var PageNm = $state.current.name.split(".")[1] + "List";
        //var TranscriptsAppRightsdata = [];
        //TranscriptsAppRightsdata = AppSettings.UserRights;
        //for (var i = 0; i < TranscriptsAppRightsdata.length; i++) {
        //    if (TranscriptsAppRightsdata[i].GridFormToOpen == PageNm) {
        //        if (TranscriptsAppRightsdata[i].isaddable == 'Y') {
        //            $scope.RollEditDisable = false;
        //        } else {
        //            $scope.RollEditDisable = true;
        //        }
        //    }
        //}
        //alert(AppSettings.SysUsrGrpID);
        var UserGrp = "";
        if (AppSettings.SysUsrGrpID == 4) {
            UserGrp = "O";
            $scope.Approver2 = false;
            $scope.Approver1 = false;
        } else if (AppSettings.SysUsrGrpID == 2) {
            UserGrp = "A";
            $scope.Approver2 = false;
            $scope.Approver1 = true;
            $scope.FirstLoginStatus = true;
        }
        else if (AppSettings.SysUsrGrpID == 11) {
            UserGrp = "J";
            $scope.FirstLoginStatus = true;
            $scope.SecondLoginStatus = true;
            $scope.Approver2 = true;
            $scope.Approver1 = true;

        }

        $scope.UploadFiles = true;
        var TranscriptsAppddata = TranscriptsAppService.GetReqTranscriptsByID($scope.TranscriptsApp.TrnSrptID);
        TranscriptsAppddata.then(function (data) {
            $scope.TranscriptsApp = data[0];
            if (AppSettings.SysUsrGrpID == 4) {
                if (data[0].ReqStatus == 'P') { $scope.TranscriptsApp.ReqStatus = "0"; }
                if ((data[0].ReqStatus == 'A') || (data[0].ReqStatus == 'R')) {
                    $scope.SubmitTranscript = false;
                    $scope.Level1 = true;
                    $scope.ShowLevel2 = false;
                    $scope.FirstLoginStatus = true;
                }
                else {
                    $scope.SubmitTranscript = true;
                    $scope.ShowLevel1 = false;
                    $scope.ShowLevel2 = false;
                    $scope.FirstLoginStatus = false;
                }
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                if (data[0].ReqStatus1 == 'P') { $scope.TranscriptsApp.ReqStatus1 = "0"; }
                if ((data[0].ReqStatus1 == 'A') || (data[0].ReqStatus1 == 'R')) {
                    $scope.SubmitTranscript = false;
                    $scope.ShowLevel2 = true;
                    $scope.ShowLevel1 = true;
                    $scope.FirstLoginStatus = true;
                    $scope.SecondLoginStatus = true;
                    
                }
                else {
                    $scope.SubmitTranscript = true;
                    $scope.ShowLevel2 = false;
                    $scope.FirstLoginStatus = true;
                    $scope.SecondLoginStatus = false;
                }
            }
            if (AppSettings.SysUsrGrpID == 11) {
                if (data[0].ReqStatus2 == 'P') { $scope.TranscriptsApp.ReqStatus2 = "0"; }
                if ((data[0].ReqStatus2 == 'A') || (data[0].ReqStatus2 == 'R')) {
                    $scope.Status2Disable = true;
                    $scope.SubmitTranscript = false;
                    $scope.ShowLevel3 = true;
                    $scope.ShowLevel2 = true;
                    $scope.ShowLevel1 = true;
                    $scope.FirstLoginStatus = true;
                    $scope.SecondLoginStatus = true;
                    $scope.ThirdLoginStatus = true;
                }
                else {
                    $scope.Status2Disable = false;
                    $scope.SubmitTranscript = true;
                    $scope.ShowLevel2 = false;
                    $scope.ShowLevel1 = false;
                    $scope.FirstLoginStatus = true;
                    $scope.SecondLoginStatus = true;
                    $scope.ThirdLoginStatus = false;
                }
            }
        }, function (error) {
            alert(error);
            });
        $scope.ChangeTextArea = function (str, type) {
            if (type == "ReqStatus") {
                if (str == 'A') { $scope.TranscriptsApp.ProcessRemark = "Approved"; }
                else if (str == 'R') { $scope.TranscriptsApp.ProcessRemark = "Rejected"; }
            }
            else if (type == "ReqStatus1") {
                if (str == 'A') { $scope.TranscriptsApp.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.TranscriptsApp.ProcessRemark1 = "Rejected"; }
            }
            else if (type == "ReqStatus2") {
                if (str == 'A') { $scope.TranscriptsApp.ProcessRemark2 = "Approved"; }
                else if (str == 'R') { $scope.TranscriptsApp.ProcessRemark2 = "Rejected"; }
            }
        };
        $scope.SaveTranscriptsApp = function () {
            $scope.RollEditDisable = true;
            $scope.TranscriptsApp.ProcessbyID = AppSettings.LoggedUserId;
            if (AppSettings.SysUsrGrpID == 4) {
                if (($scope.TranscriptsApp.ReqStatus == undefined) || ($scope.TranscriptsApp.ReqStatus == "")) {
                    alert("Select Status");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
                if (($scope.TranscriptsApp.ProcessRemark == undefined) || ($scope.TranscriptsApp.ProcessRemark == "")) {
                    alert("Enter Process Remark");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                if (($scope.TranscriptsApp.ReqStatus1 == undefined) || ($scope.TranscriptsApp.ReqStatus1 == "")) {
                    alert("Select Status1");
                    $scope.RollEditDisable = false;
                    return;
                }
                if (($scope.TranscriptsApp.ProcessRemark1 == undefined) || ($scope.TranscriptsApp.ProcessRemark1 == "")) {
                    alert("Enter Process Remark1");
                    $scope.RollEditDisable = false;
                    return;
                }
            }
            else if (AppSettings.SysUsrGrpID == 11) {
                if (($scope.TranscriptsApp.ReqStatus2 == undefined) || ($scope.TranscriptsApp.ReqStatus2 == "")) {
                    alert("Select Status2");
                    $scope.RollEditDisable = false;
                    return;
                }
                if (($scope.TranscriptsApp.ProcessRemark2 == undefined) || ($scope.TranscriptsApp.ProcessRemark2 == "")) {
                    alert("Enter Process Remark2");
                    $scope.RollEditDisable = false;
                    return;
                }
            }

            $scope.TranscriptsApp.UserGrp = UserGrp;
            var getPromise = TranscriptsAppService.UpdateTranscriptsApp($scope.TranscriptsApp);
            getPromise.then(function (data) {
                alert("Submitted Successfully");
                RedirectToListPage();
            }, function (error) {
                $scope.RollEditDisable = false;
                $scope.UploadFiles = true;
                alert(error);
            });
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
           // $state.go('StudentRequestBoard.StudSerList', { ServiceID: '10', ServiceName: 'Transcripts' });
            $state.go('StudentRequestBoard.ServiceRequestDrillDownReport');
        }
    });
});

