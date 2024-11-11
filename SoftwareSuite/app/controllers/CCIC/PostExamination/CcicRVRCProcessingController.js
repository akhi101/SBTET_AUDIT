define(['app'], function (app) {
    app.controller("CcicRVRCProcessingController", function ($scope, $localStorage,CcicPreExaminationService) {


        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName
        const $ctrl = this;
        $ctrl.$onInit = () => {

        }


        var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicCurrentAcademicYear();
        getCcicCurrentAcademicYear.then(function (response) {

            $scope.GetCcicCurrentAcademicYear = response;

        },
            function (error) {
                alert("error while loading CurrentAcademicYear");
                var err = JSON.parse(error);

            });



        $scope.getAYBatchExamMonthYear = function (AcademicYearID, BaTch) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }

            if (BaTch == null || BaTch == undefined || BaTch == "") {
                return;

            }
            $scope.AcademicYearID = AcademicYearID;



            var getAYbatchexammonthyear = CcicPreExaminationService.GetAYBatchExamMonthYear(AcademicYearID, BaTch)
            getAYbatchexammonthyear.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetAYBatchExamMonthYearData = res.Table;
                }
                else {
                    $scope.GetAYBatchExamMonthYearData = [];
                }

            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });


        }

        $scope.GetCourseDurationBatchData = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }



            $scope.AcademicYearID = AcademicYearID;


            var GetCurrentBatchData = CcicPreExaminationService.GetCurrentBatch(AcademicYearID);
            GetCurrentBatchData.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetCurrentBatch = res.Table;
                }
                else {
                    $scope.GetCurrentBatch = [];
                }


            },

                function (error) {
                    alert("error while loading CurrentBatch");
                    var err = JSON.parse(error);

                });



            var getCcicAcademicYearBatch = CcicPreExaminationService.GetCcicAcademicYearBatches(AcademicYearID);
            getCcicAcademicYearBatch.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.GetCcicAcademicYearBatchesTable = res;
                }
                else {
                    $scope.GetCcicAcademicYearBatchesTable = [];
                }

            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });


        }

    })
})



