define(['app'], function (app) {
    app.controller("CcicFeeEligibleReportsController", function ($scope, $uibModal, $localStorage, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName

        $scope.finalList = [];
        $scope.edit = true;
        $scope.update = false;
        var examCenters = [];
        const $ctrl = this;
        $ctrl.$onInit = () => {

        }






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

        $scope.getexamMonthYearData = function (AcademicYearID) {
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





        $scope.getExamCentresMappingData = function () {


            if (($scope.Academicyear == undefined) || ($scope.Academicyear == null) || ($scope.Academicyear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.Monthyear == undefined) || ($scope.Monthyear == null) || ($scope.Monthyear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }
            if (($scope.course == undefined) || ($scope.course == null) || ($scope.course == "")) {
                alert("Select Course");
                return false;
            }

            var DataType = 1;
            $scope.loading = true;
            $scope.result = false;
            var getadmexmcenters = CcicPreExaminationService.GetExamCentresMappingData(DataType, parseInt($scope.Academicyear), parseInt($scope.Monthyear), parseInt($scope.course), '')
            getadmexmcenters.then(function (response) {
                if (response.length > 0 && response[0].StatusCode != '400') {
                    $scope.GetMappingData2 = response;
                    $scope.NoResult = false;
                    $scope.result = true;
                    $scope.loading = false;

                }
                else if (response[0].StatusCode == '400') {
                    alert(response[0].StatusDescription);
                    $scope.loading = false;
                    $scope.NoResult = true;
                    $scope.result = false;
                }
                else {
                    alert("No Data Found");
                    $scope.loading = false;
                    $scope.NoResult = true;
                    $scope.result = false;
                }
            },
                function (error) {
                    var err = JSON.parse(error);
                    $scope.loading = false;
                    $scope.NoResult = true;
                    $scope.result = false;
                });


        }



        $scope.getExamCentres = function () {
            var DataType = 1;
            var ExaminationCentreID = 0;
            var getcentres = CcicPreExaminationService.GetExaminationCentres(DataType, ExaminationCentreID);
            getcentres.then(function (res) {
                try {
                    var Res = JSON.parse(res)
                }
                catch (error) {

                }
                $scope.GetExaminationCentresTable = Res.Table;

            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });
        }

        $scope.examCentreMappingExcel = function () {
            $scope.loading = true;
            var DataType = 3;
            if (($scope.academicyear == undefined) || ($scope.academicyear == null) || ($scope.academicyear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.MonthYear == undefined) || ($scope.MonthYear == null) || ($scope.MonthYear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }
            var mappingReportExcel = CcicPreExaminationService.GetExamCentreMappingExcel(DataType, parseInt($scope.academicyear), parseInt($scope.MonthYear), 0, 0);
            mappingReportExcel.then(function (res) {
                $scope.loading = false;
                if (res.length > 0) {
                    if (res.length > 4) {
                        window.location.href = res;
                    } else {
                        alert("No ExamCentre Mapping Excel Report Present")
                    }
                } else {
                    alert("No ExamCentre Mapping Report Present")
                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        };







    })
})