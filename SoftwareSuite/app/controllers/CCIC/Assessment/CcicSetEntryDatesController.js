define(['app'], function (app) {
    app.controller("CcicSetEntryDatesController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, CcicAssessmentService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName

        $scope.finalList = [];
        //console.log(authData)
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetCurrentAcademicYearData();
            //$scope.GetEnrollementDatesData();


        }

        $scope.loading = false;
        $scope.clearDefaults = function () {

            $scope.academicYear = null;
            $scope.BaTch = null;
            $scope.courseduration = null;
            $scope.EnrollementStartDate = null;
            $scope.EnrollementEndDate = null;


        }

        $scope.AddAssesmentEntryDates = function () {

            if ($scope.academicYear == null || $scope.academicYear == undefined || $scope.academicYear == "") {
                alert("Select Academic Year");
                return;
            }
            if ($scope.ExamMonthYear == null || $scope.ExamMonthYear == undefined || $scope.ExamMonthYear == "") {
                alert("Select Exam Month Year");
                return;
            }

            if ($scope.StartDate == null || $scope.StartDate == undefined || $scope.StartDate == "") {
                alert("Select Assesment Entry Start Date");
                return;
            }
            if ($scope.EndDate == null || $scope.EndDate == undefined || $scope.EndDate == "") {
                alert("Select Assesment Entry End Date");
                return;
            }

            $scope.loading = true;
            var DataType = 1;
            var EntryDateID = 0; 
            var addassmentdates = CcicAssessmentService.AddAssesmentEntryDates(DataType,EntryDateID,$scope.academicYear, $scope.ExamMonthYear, moment($scope.StartDate).format("YYYY-MM-DD"), moment($scope.EndDate).format("YYYY-MM-DD"),1, $scope.UserName);
            addassmentdates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.loading = false;
                if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getAssesmentEntryDates($scope.academicYear);
                    $scope.loading = false;
                    $scope.clearDefaults();
                } else {
                    $scope.loading = false;
                    alert('Assesment Entry Dates Added Successfully');
                    $scope.loading = false;
                    $scope.getAssesmentEntryDates($scope.academicYear);
                    $scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }

        
        $scope.GetExamMonthYearData = function (academicYear) {
            if (academicYear == null || academicYear == undefined || academicYear == "") {
                return;

            }
            $scope.academicYear = academicYear;
            $scope.loading = true;
            var getexammonthyrdata = CcicAssessmentService.GetExamMonthYears(academicYear);
            getexammonthyrdata.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.ExamMonthYrData = res.Table;
                    $scope.NoData = false;
                }
                else {
                    $scope.loading = false;
                    $scope.ExamMonthYrData = [];
                    $scope.NoData = true;
                }


            },

                function (error) {
                    alert("error while loading CurrentBatch");
                    var err = JSON.parse(error);

                });


            $scope.getAssesmentEntryDates(academicYear);
            


        }


        $scope.getAssesmentEntryDates = function (academicYear) {
            var getdates = CcicAssessmentService.GetAssesmentEntryDates(academicYear);
            getdates.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.GetAssesmentEntryDatesTable = res;
                }
                else {
                    $scope.GetAssesmentEntryDatesTable = [];
                }

            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });
        }
        



        var getcuracayr = CcicAssessmentService.GetCcicCurrentAcademicYear();
        getcuracayr.then(function (response) {

            $scope.GetCcicCurrentAcademicYear = response;

        },
            function (error) {
                alert("error while loading CurrentAcademicYear");
                var err = JSON.parse(error);

            });



        

        $scope.GetCurrentAcademicYearData = function () {
            var getacayrs = CcicAssessmentService.GetCcicAcademicYears()
            getacayrs.then(function (response) {
                $scope.GetCcicAcademicYears = response.Table;

                for (let i = 0; i < $scope.GetCcicAcademicYears.length; i++) {
                    if ($scope.GetCcicAcademicYears[i].GetCcicAcademicYears == true) {
                        $scope.finalList.push($scope.GetCcicAcademicYears[i]);
                    }
                }

                var ele = document.getElementsByClassName("tableinpt");
                for (var j = 1; j < response.Table.length + 10000; j++) {
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

            var srtdate = dat.StartDate == undefined || dat.StartDate == null || dat.StartDate == "" ? " " : moment(dat.StartDate).format("YYYY-MM-DD");
            var enddate = dat.EndDate == undefined || dat.EndDate == null || dat.EndDate == "" ? " " : moment(dat.EndDate).format("YYYY-MM-DD");
            $scope.loading = true;
            var updassmententrydates = CcicAssessmentService.UpdateAssesmentEntryDates(2, dat.EntryDateID, dat.AcademicYearID, dat.ExamMonthYearID, srtdate, enddate, dat.Active,dat.UserName);
            updassmententrydates.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);
                    $scope.loading = false;
                    $scope.getAssesmentEntryDates($scope.academicYear);
                    $scope.clearDefaults();
                } else {
                    $scope.loading = false;
                    alert('Assesment Entry Dates Updated Successfully');
                    $scope.loading = false;
                    $scope.getAssesmentEntryDates($scope.academicYear);
                    $scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        $scope.SetAssesmentEntryDatesStatus = function (EntryDateID, Active) {
            if ($scope.academicYear == null || $scope.academicYear == undefined || $scope.academicYear == "") {
                alert("Please Select AcademicYear to use the Operation");
                return
        }
        //var strdate = moment(StartDate).format("YYYY-MM-DD")
        //var enddate = moment(EndDate).format("YYYY-MM-DD")
            $scope.loading = true;
            var DataType=3
            var setstatus = CcicAssessmentService.SetAssesmentEntryDatesStatus(DataType, EntryDateID,'','','','', Active, $scope.UserName);
            setstatus.then(function (res) {
                if (res[0].ResponceCode == '400') {
                    $scope.loading = false;
                    alert(res[0].ResponceDescription);
                    $scope.loading = false;
                    $scope.getAssesmentEntryDates($scope.academicYear);
                    $scope.clearDefaults();
                } else {
                    $scope.loading = false;
                    alert('Enrollement Dates Status Updated Successfully');
                    $scope.loading = false;
                    $scope.getAssesmentEntryDates($scope.academicYear);
                    $scope.clearDefaults();
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })


        }




    })
})