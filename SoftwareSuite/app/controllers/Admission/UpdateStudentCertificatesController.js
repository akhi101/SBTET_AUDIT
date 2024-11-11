define(['app'], function (app) {
    app.controller("UpdateStudentCertificatesController", function ($filter, $http, $scope, $state, $stateParams, AppSettings, StudentRegService) {
        $scope.UpdateStudentCertificates = { StudRegID: $stateParams.StudRegID };
        var PageNm = $state.current.name.split(".")[1] + "";
        var UpdateStudentCertificatesRightsdata = [];
        UpdateStudentCertificatesRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UpdateStudentCertificatesRightsdata.length; i++) {
            if (UpdateStudentCertificatesRightsdata[i].GridFormToOpen == PageNm) {
                if (UpdateStudentCertificatesRightsdata[i].isupdatable == 'Y') {
                    $scope.RollEditDisable = false;
                } else {
                    $scope.RollEditDisable = true;
                }
            }
        }
        $scope.SSCCertFlag = "Y";
        $scope.StudyCertFlag = "Y";
        $scope.TCCertFlag = "Y";
        
        //$("#TCCertSubDate").ejDatePicker({ allowEdit: true, dateFormat: "dd/MM/yyyy" });
        $("#TCCertSubDate").ejDatePicker({ allowEdit: true, dateFormat: "dd/MMM/yyyy" });

        var StudentRegdata = StudentRegService.GetStudentRegById($scope.UpdateStudentCertificates.StudRegID);
        StudentRegdata.then(function (data) {
            $scope.UpdateStudentCertificates = data[0];

            if ($scope.UpdateStudentCertificates.SSCCertFlag == null) {
                $scope.UpdateStudentCertificates.SSCCertFlag = "N"
            }

            if ($scope.UpdateStudentCertificates.StudyCertFlag == null) {
                $scope.UpdateStudentCertificates.StudyCertFlag = "N"
            }

            if ($scope.UpdateStudentCertificates.TCCertFlag == null) {
                $scope.UpdateStudentCertificates.TCCertFlag = "N"
            }



            $scope.SSCCertFlag = $scope.UpdateStudentCertificates.SSCCertFlag;
            $scope.StudyCertFlag = $scope.UpdateStudentCertificates.StudyCertFlag;
            $scope.TCCertFlag = $scope.UpdateStudentCertificates.TCCertFlag;


            if ($scope.SSCCertFlag != null) { $scope.UpdateStudentCertificates.SSCCertFlag = $scope.SSCCertFlag; }
            if ($scope.StudyCertFlag != null) { $scope.UpdateStudentCertificates.StudyCertFlag = $scope.StudyCertFlag; }
            if ($scope.TCCertFlag != null) { $scope.UpdateStudentCertificates.TCCertFlag = $scope.TCCertFlag; }
            if ($scope.UpdateStudentCertificates.TCNO == 0) { $scope.UpdateStudentCertificates.TCNO = ""; }
            if ($scope.UpdateStudentCertificates.TCNO != 0) { $("#TCCertSubDate").ejDatePicker({ value: $scope.UpdateStudentCertificates.TCCertSubDate }) }
            else {
                var todaydate = new Date;
                $("#TCCertSubDate").ejDatePicker({ value: todaydate });
            } 
        }, function (error) {
            alert(error);
        });
        $scope.SaveUpdateStudentCertificates = function () {
            if ($scope.TCCertFlag == "Y") {
                if (($scope.UpdateStudentCertificates.TCNO == undefined) || ($scope.UpdateStudentCertificates.TCNO == "")) {
                    alert("Enter TC No.");
                    return;
                }
                if ($("#TCCertSubDate").val() == "") {
                    alert("Enter TC Submitted Date");
                    return;
                }
                var todaydate = $filter('date')(new Date(), 'dd/MMM/yyyy');
                //var todaydateParts = $filter('date')(new Date(), 'dd/MMM/yyyy').split('/');
                //var todaydate = new Date(todaydateParts[2], todaydateParts[1] - 1, todaydateParts[0]);
                //var TcDateParts = $("#TCCertSubDate").val().split('/');
                //var TcDate = new Date(TcDateParts[2], TcDateParts[1] - 1, TcDateParts[0]);

                //if (TcDate > todaydate) {
                //    alert("Date should be less than or equal to todays date");
                //    return;
                //}
            }
            if (AppSettings.MngtTypID != 21) {
                //if ($scope.UpdateStudentCertificates.SecAadharVerify != 1) {
                //    alert("Aadhaar verification is pending for selected group.");
                //    return;
                //}
                //if ($scope.UpdateStudentCertificates.CourseID == 1) {
                //    if (!$scope.UpdateStudentCertificates.SubAadharVerify > 0) {
                //        alert("Aadhaar verification is pending for selected second language.");
                //        return;
                //    }
                //}
            }
            $scope.RollEditDisable = true;
            $scope.UpdateStudentCertificates.SSCCertFlag = $scope.SSCCertFlag;
            $scope.UpdateStudentCertificates.StudyCertFlag = $scope.StudyCertFlag;
            $scope.UpdateStudentCertificates.TCCertFlag = $scope.TCCertFlag;
          
            if ($("#TCCertSubDate").val() != "") {
                $scope.UpdateStudentCertificates.TCCertSubDate = $("#TCCertSubDate").val();
            }
            $scope.UpdateStudentCertificates.GapCertFlag = "N";
            if ($scope.UpdateStudentCertificates.StudRegID == undefined) { $scope.UpdateStudentCertificates.StudRegID = 0; }
            if ($scope.UpdateStudentCertificates.StudRegID != 0) {
                if ($scope.TCCertFlag == "Y") {
                    var getCheckDate = StudentRegService.GetCheckFromTodate($scope.UpdateStudentCertificates.TCCertSubDate, todaydate);  //Fromdate,Todate
                    getCheckDate.then(function (data) {
                        if (data == 1) {
                            alert("Date should be less than or equal to todays date");
                            return;
                        } else {
                            var getPromise = StudentRegService.UpdateStudentCertificates($scope.UpdateStudentCertificates);
                            getPromise.then(function (msg) {
                                $scope.RollEditDisable = true;
                                alert("Update Student Certificates Successfully");
                                RedirectToListPage();
                            }, function (error) {
                                $scope.RollEditDisable = false;
                                alert(error);
                            });
                        }
                    }, function (error) {
                        alert(error);
                    });
                } else {
                    var getPromise = StudentRegService.UpdateStudentCertificates($scope.UpdateStudentCertificates);
                    getPromise.then(function (msg) {
                        $scope.RollEditDisable = true;
                        alert("Update Student Certificates Successfully");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.RollEditDisable = false;
                        alert(error);
                    });
                }
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Admission.UpdateStudentCertificatesList');
        }
    });
});

