define(['app'], function (app) {
    app.controller("CcicEnrollmentSettingsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, CcicSettingsService, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName

        $scope.finalList = [];
        //console.log(authData)
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetCurrentAcademicYearData();
            $scope.GetEnrollementDatesData();
        }

        $scope.loading = false;
        $scope.clearDefaults = function () {

            $scope.academicYear = null;
            $scope.BaTch = null;
            $scope.courseduration = null;
            $scope.EnrollementStartDate = null;
            $scope.EnrollementEndDate = null;


        }

        $scope.AddEnrollementDates = function () {



            if ($scope.EnrollementStartDate == null || $scope.EnrollementStartDate == undefined || $scope.EnrollementStartDate == "") {
                alert("Select AcademicYear Batch Start Date");
                return;
            }
            if ($scope.EnrollementEndDate == null || $scope.EnrollementEndDate == undefined || $scope.EnrollementEndDate == "") {
                alert("Select AcademicYear Batch End Date");
                return;
            }
            if ($scope.BaTch == null || $scope.BaTch == undefined || $scope.BaTch == "") {
                alert("Select Batch");
                return;
            }
            if ($scope.courseduration == null || $scope.courseduration == undefined || $scope.courseduration == "") {
                alert("Select Course Duration");
                return;
            }
            $scope.loading = true;
            var addenmtdates = CcicPreExaminationService.AddEnrollementDates($scope.academicYear, $scope.courseduration, $scope.BaTch, moment($scope.EnrollementStartDate).format("YYYY-MM-DD"), moment($scope.EnrollementEndDate).format("YYYY-MM-DD"), $scope.UserName);
            addenmtdates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.loading = false;
                if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetEnrollementDatesData($scope.AcademicYearID);
                    $scope.loading = false;
                    $scope.clearDefaults();
                } else {
                    $scope.loading = false;
                    alert('AcademicYearBatch Added Succesfully');
                    $scope.loading = false;
                    $scope.GetEnrollementDatesData($scope.AcademicYearID);
                    $scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }

        $scope.GetEnrollementDatesData = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }
            $scope.AcademicYearID = AcademicYearID;
            $scope.loading = true;
            var getcurrbtchdata = CcicPreExaminationService.GetCurrentBatch(AcademicYearID);
            getcurrbtchdata.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.GetCurrentBatch = res.Table;
                    $scope.NoData = false;
                }
                else {
                    $scope.loading = false;
                    $scope.GetCurrentBatch = [];
                    $scope.NoData = true;
                }


            },

                function (error) {
                    alert("error while loading CurrentBatch");
                    var err = JSON.parse(error);

                });



            var getenmtdates = CcicPreExaminationService.GetEnrollementDates(AcademicYearID);
            getenmtdates.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.GetEnrollementDatesTable = res;
                }
                else {
                    $scope.GetEnrollementDatesTable = [];
                }

            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });


        }


        $scope.getCcicCourseDurations = function (BaTch) {

            if (BaTch == null || BaTch == undefined || BaTch == "") {
                return
            }
            $scope.BaTch = BaTch;
            var getcourdurs = CcicPreExaminationService.GetCcicCourseDurations(BaTch);
            getcourdurs.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetCcicCourseDurationsData = res.Table;
                }
                else {
                    $scope.GetCcicCourseDurationsData = [];
                }


            },

                function (error) {
                    alert("error while loading CourseDuration");
                    var err = JSON.parse(error);

                });
        }




        var getcuracayr = CcicPreExaminationService.GetCcicCurrentAcademicYear();
        getcuracayr.then(function (response) {

            $scope.GetCcicCurrentAcademicYear = response;

        },
            function (error) {
                alert("error while loading CurrentAcademicYear");
                var err = JSON.parse(error);

            });



        var getbatches = CcicPreExaminationService.GetBatches();
        getbatches.then(function (response) {

            $scope.GetBatches = response;

        },
            function (error) {
                alert("error while loading Batches");
                var err = JSON.parse(error);

            });








        $scope.GetCurrentAcademicYearData = function () {
            var getacayrs = CcicPreExaminationService.GetCcicAcademicYears()
            getacayrs.then(function (response) {
                $scope.GetCcicAcademicYears = response.Table;

                for (let i = 0; i < $scope.GetCcicAcademicYears.length; i++) {
                    if ($scope.GetCcicAcademicYears[i].GetCcicAcademicYears == true) {
                        $scope.finalList.push($scope.GetCcicAcademicYears[i]);
                    }
                }

                  var ele = document.getElementsByClassName("tableinpt");
                for (var j = 1; j < response.Table.length +10000; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });

        }




        $scope.ChangeStatus = function (data, ind) {
            if ($scope.academicYear == null || $scope.academicYear == undefined || $scope.academicYear == "") {
                alert("Please Select AcademicYear to use the Operation");
                return
            }
            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }


            $scope['edit' + ind] = false;
           
        }


        $scope.UpdationStatus = function (dat, ind) {


            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }

            var srtdate = dat.EnrollementStartDate == undefined || dat.EnrollementStartDate == null || dat.EnrollementStartDate == "" ? " " : moment(dat.EnrollementStartDate).format("YYYY-MM-DD");
            var enddate = dat.EnrollementEndDate == undefined || dat.EnrollementEndDate == null || dat.EnrollementEndDate == "" ? " " : moment(dat.EnrollementEndDate).format("YYYY-MM-DD");
            $scope.loading = true;
            var updenroldatesdates = CcicPreExaminationService.UpdateEnrollementDates(2, $scope.UserName, parseInt(dat.EnrollementDatesID), true, srtdate, enddate);
            updenroldatesdates.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);
                    $scope.loading = false;
                    $scope.GetEnrollementDatesData($scope.AcademicYearID);
                    $scope.clearDefaults();
                } else {
                    $scope.loading = false;
                    alert('Enrollement Dates Updated Successfully');
                    $scope.loading = false;
                    $scope.GetEnrollementDatesData($scope.AcademicYearID);
                    $scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        $scope.SetEnrollementDatesStatus = function (EnrollementDatesID, Active) {
            if ($scope.academicYear == null || $scope.academicYear == undefined || $scope.academicYear == "") {
                alert("Please Select AcademicYear to use the Operation");
                return
            }
            $scope.loading = true;
            var setstatus = CcicPreExaminationService.SetEnrollementDatesStatus(1, $scope.UserName, EnrollementDatesID, Active);
            setstatus.then(function (res) {
                if (res[0].ResponceCode == '400') {
                    $scope.loading = false;
                    alert(res[0].ResponceDescription);
                    $scope.loading = false;
                    $scope.GetEnrollementDatesData($scope.AcademicYearID);
                    $scope.clearDefaults();
                } else {
                    $scope.loading = false;
                    alert('Enrollement Dates Status Updated Successfully');
                    $scope.loading = false;
                    $scope.GetEnrollementDatesData($scope.AcademicYearID);
                    $scope.clearDefaults();
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })


        }




    })
})