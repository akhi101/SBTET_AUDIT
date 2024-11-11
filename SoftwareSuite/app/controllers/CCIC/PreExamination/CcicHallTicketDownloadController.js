define(['app'], function (app) {
    app.controller("CcicHallTicketDownloadController", function ($scope, $window, $localStorage, $state , CcicPreExaminationService) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        var UserTypeID = parseInt(authData.UserTypeID);
        $scope.SessionID = $localStorage.SessionID;
        $scope.InstitutionID = authData.InstitutionID;

        const $ctrl = this;
        $ctrl.$onInit = () => {
        }

        var getdata = CcicPreExaminationService.GetStudentType();
        getdata.then(function (res) {

            if (res.Table.length > 0) {
                $scope.StudentTypes = res.Table;
                $scope.loading = false;
            }
            else {
                $scope.StudentTypes = [];
                $scope.loading = false;
                $scope.NoData = true;
            }

        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading");
        });
        var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicFeePaymentAcademicYear();
        getCcicCurrentAcademicYear.then(function (response) {

            $scope.GetCcicCurrentAcademicYear = response;

        },
            function (error) {
                alert("error while loading CurrentAcademicYear");
                var err = JSON.parse(error);

            });



        $scope.GetExamMonthYearData = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }

            $scope.AcademicYearID = AcademicYearID;
            var getCcicAcademicYearBatch = CcicPreExaminationService.GetExamMonthYears(AcademicYearID)
            getCcicAcademicYearBatch.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetExamMonthYear = res.Table;
                }
                else {
                    $scope.GetExamMonthYear = [];
                }
                for (var j = 1; j < res.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });

        }




        $scope.getStudentPinList = function () {
            $scope.NoData = false;
            if (($scope.AcademicYear == undefined) || ($scope.AcademicYear == null) || ($scope.AcademicYear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.ExamMonthYear == undefined) || ($scope.ExamMonthYear == null) || ($scope.ExamMonthYear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }
            if (($scope.StudentType == undefined) || ($scope.StudentType == null) || ($scope.StudentType == "")) {
                alert("Select Student Type");
                return false;
            }
            $scope.loading = true;
            var getdata = CcicPreExaminationService.GetStudentPinList($scope.InstitutionID, $scope.AcademicYear, $scope.ExamMonthYear, $scope.StudentType, $scope.UserName);
            getdata.then(function (res) {
                try {
                    var Res = JSON.parse(res)
                }
                catch (error) {

                }
                if (Res.Table.length > 0) {
                    $scope.StudentPinList = Res.Table;
                    $scope.loading = false;
                    $scope.NoData = false;
                }
                else {
                    $scope.StudentPinList = [];
                    $scope.loading = false;
                    $scope.NoData = true;
                }

            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });
        }

        $scope.generateHallTicket = function (AcademicYearID, ExamMonthYearID, StudentID) {
            sessionStorage.setItem("ExamMonthYearID", ExamMonthYearID);
            sessionStorage.setItem("StudentID", StudentID);
            sessionStorage.setItem("AcademicYearID", AcademicYearID);
            sessionStorage.setItem("StudentType", $scope.StudentType);
     
            $window.open($state.href('CcicHallTicket'), '_blank');
        }



    })
})