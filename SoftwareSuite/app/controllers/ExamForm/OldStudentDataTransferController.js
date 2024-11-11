define(['app'], function (app) {
    app.controller("OldStudentDataTransferController", function ($scope, $state, AppSettings, OldStudentDataTransferService) {
        $scope.OldStudentData = {};
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        $scope.ShowStudDetails = false;
        $scope.ShowLoading = false;
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].GridFormToOpen == PageNm) {
                if (UsersRightsdata[i].isupdatable == 'Y') {
                    $scope.RollEditDisable = false;
                } else {
                    $scope.RollEditDisable = true;
                }
            }
        }
        // Checks validation on Submit
        function CheckValidation() {
            if ($scope.HTNO == undefined || $scope.HTNO == "") {
                alert("Please Enter The Hall Ticket Number.");
                return false;
            }
            
            else {
                return true;
            }
        }; 
        //Gets the student details
        $scope.GetOldStudentData = function () {
            if (CheckValidation() == true)
            {
                $scope.ShowLoading = true;
                var OldStudentDataList = OldStudentDataTransferService.GetOldStudentData($scope.HTNO, AppSettings.DistrictIDs);
                OldStudentDataList.then(function (OldStudentData, status, headers, config, error) {
                    if (OldStudentData.length > 0) {
                        if (OldStudentData[0].ErrMsg != undefined || OldStudentData[0].ErrMsg != null) {
                            alert(OldStudentData[0].ErrMsg);
                            $scope.ShowLoading = false;
                            return;
                        }
                        else {
                            $scope.ShowStudDetails = true;
                            $scope.TransferDisable = false;
                            $scope.ShowLoading = false;
                            $scope.OldStudentData = OldStudentData[0];
                            $scope.OldStudentData.HTNO = $scope.HTNO;
                            $scope.OldStudentData.NewColCode ="0";
                        }
                        var ColList = OldStudentDataTransferService.GetColList(AppSettings.DistrictIDs);
                        ColList.then(function (Collegedata, status, headers, config, error) {
                            $scope.ColList = Collegedata;
                        }, function (error) {
                            alert(error);
                        });
                    }
                    else {
                        $scope.ShowLoading = false;
                        alert("Student Data Not Found.");
                        $scope.OldStudentData = [];
                    }
                }, function (error) {
                    alert(error);
                    $scope.ShowStudDetails = false;
                    $scope.OldStudentData = [];
                    $scope.ShowLoading = false;
                });
            }
        };
        //Gets the student details
        $scope.TransferStudentData = function () {
            if (CheckValidation() == true)
                if ($scope.OldStudentData.NewColCode == undefined || $scope.OldStudentData.NewColCode == "" || $scope.OldStudentData.NewColCode == "0") {
                    alert("Please Select College.");
                    return false;
                }
            {
                $scope.ShowLoading = true;
                $scope.TransferDisable = true;
                var TransferStudentData = OldStudentDataTransferService.TransferStudentData($scope.OldStudentData);
                TransferStudentData.then(function (data, status, headers, config, error) {
                    if (data == -1) {
                        $scope.ShowLoading = false;
                        alert("Already Data Transfered.");
                    }
                    else if (data > 0) {
                        alert("Transfered Successfully.");
                        $scope.ShowLoading = false;
                        $scope.ShowStudDetails = false;
                        $scope.HTNO = "";
                        $scope.OldStudentData = [];
                    }
                    else {
                        alert("Transfer Failed.");
                        $scope.TransferDisable = false;
                        $scope.ShowLoading = false;
                    }   
                }, function (error) {
                    alert(error);
                    $scope.TransferDisable = false;
                    $scope.ShowLoading = false;
                });
            }
        };
        // Hide or Clear Details
        $scope.HideInfo = function () {
            $scope.ShowStudDetails = false;
            $scope.OldStudentData = [];
        };
    });
});