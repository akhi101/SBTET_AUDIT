define(['app'], function (app) {
    app.controller("ViewStdDetailsController", function ($scope, $uibModal, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var tempData3 = $localStorage.TempData3;
        //var tempData2 = $localStorage.TempData2;
        //$scope.ReportTypeID = tempData2.ReportTypeID;
        $scope.isSubmitted = tempData3.isSubmitted;
        $scope.ApplicationStatus = tempData3.ApplicationStatus;
        $scope.CourseID = tempData3.CourseID;
        //$scope.Submitted = tempData3.ApplicationStatus;
        const $ctrl = this;
        $ctrl.$onInit = () => {
            if (tempData3.ApplicationStatus == 'Pending') {
                var VerifyDate = CcicPreExaminationService.VerifyEnrollmentDate($scope.CourseID);
                VerifyDate.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    }
                    catch { err }
                    if (res[0].ResponseCode == '200') {
                        $scope.DatesFound = true;
                        if (($scope.isSubmitted==false && $scope.UserTypeID == 2 && $scope.DatesFound==true) || ($scope.isSubmitted==true && $scope.UserTypeID == 2 && (tempData3.ApplicationStatus == 'Revised'))) {
                            $scope.showmodifybutton = true;
                        }
                    }
                    else if (res[0].ResponseCode == '400') {
                        $scope.DatesNotFound = true;
                        if ($scope.isSubmitted == false && $scope.UserTypeID == 2 && $scope.DatesNotFound==true) {
                            $scope.showclosebutton = true;
                        }
                    }
                    else {
                        $scope.DatesFound = false;
                        $scope.showclosebutton = true;
                        return;
                    }

                },
                    function (error) {

                        var err = JSON.parse(error);
                    })

                if (($scope.isSubmitted == true && $scope.UserTypeID == 2 && (tempData3.ApplicationStatus == 'Approved' || tempData3.ApplicationStatus == 'Pending')) || ($scope.UserTypeID == 1 || $scope.UserTypeID == 6)) {
                    $scope.showcancelbutton = true;
                }
                //$scope.ApplicationStatus = 'Pending';

            }
            else if (($scope.isSubmitted == false && $scope.UserTypeID == 2 && $scope.DatesFound == true) || ($scope.isSubmitted == true && $scope.UserTypeID == 2 && (tempData3.ApplicationStatus == 'Revised'))) {
                $scope.showmodifybutton = true;
            }
            //else if (tempData3.ApplicationStatus == 'Approved') {
            //    $scope.ApplicationStatus = 'Approved';
            //}
            //else if (tempData3.ApplicationStatus == 'Revised') {
            //    $scope.ApplicationStatus = 'Revised';
            //}
            //else if (tempData3.ApplicationStatus == 'Rejected') {
            //    $scope.ApplicationStatus = 'Rejected';
            //}
            $scope.loading = true;
            var ViewStudentDetail = CcicPreExaminationService.GetViewStudentDetails(tempData3.ApplicationNumber, tempData3.StudentID, tempData3.ApplicationStatus);
            ViewStudentDetail.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                $scope.PreviewData = [];
                if (res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.PreviewData = res.Table[0];
                    $scope.imagesrc = res.Table[0].SSCCertificate;
                    $scope.imagesrc1 = res.Table[0].QualificationCertificate;
                    $scope.imagesrc2 = res.Table[0].ExperienceCertificate;
                    $scope.imagesrc3 = res.Table[0].BlindCertificate;
                    //console.log(PreviewData)
                    //$scope.Aadhaar = res[0].Password;
                    //$scope.maskedAadhaar = $scope.Aadhaar.slice(0, 8).replace(/[0-9]/g, "X") + $scope.Aadhaar.slice(-4);
                    //$scope.PreviewData1 = JSON.parse(PreviewData)
                    //$scope.PreviewData = $scope.PreviewData1.Table[0]
                    //console.log($scope.PreviewData)
                    //console.log(res[0].Data)
                    $scope.$emit('hideLoading', data);

                } else {
                    $scope.loading = false;
                    $scope.PreviewData = [];
                    $scope.$emit('hideLoading', data);

                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });


        }



        var data = {};
        $scope.$emit('showLoading', data);

        $scope.Close = function () {
            $state.go('CcicDashboard.Academic.EnrollmentReport')
        }

        $scope.Cancel = function () {
            $state.go('CcicDashboard.Academic.CcicEnrollmentReportData')
        }


        


       
        $scope.Modify = function (ApplicationNumber, StudentID) {
            var ApplicationNumber = tempData3.ApplicationNumber;
            var StudentID = tempData3.StudentID;
            $localStorage.TempData4 = {
                ApplicationNumber: ApplicationNumber,
                StudentID: StudentID
                


            };

            $state.go('CcicDashboard.Academic.EditStdDetails');
        }



        $scope.SubmitStdDetails = function () {
            var submitstddetails = CcicPreExaminationService.SubmitStdDetails(tempData3.ApplicationNumber, tempData3.StudentID);
            submitstddetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $state.go('CcicDashboard.Academic.EnrollmentReport');
   
                }

                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                }

                else {
                    alert('Something Went Wrong')
                }
            }, function (error) {
                var err = JSON.parse(error);
            });
        }



        $scope.openImage = function (imagesrc) {
            $scope.img = imagesrc;
            $scope.modalInstance = $uibModal.open({
                templateUrl: "app/views/CCIC/Popups/ViewDocument.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',

            });

        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        };




    });
});















