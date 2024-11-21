define(['app'], function (app) {
    app.controller("CcicAcademicYearSettingsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, CcicSettingsService, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName

        $scope.finalList = [];
        //console.log(authData)
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getcciccurrentAcademicYear();
            $scope.GetCurrentAcademicYearData();
            $scope.GetCurrentBatchData();
            //$scope.GetCourseDurationBatchData();


        }
        $scope.loading = false;
        $scope.UpdateAcaYear = function (StartYear) {
            var tempyr = (parseInt(StartYear) + 1).toString();
            var yr = StartYear + '-' + tempyr.substring(2, 4);
            $scope.AcademicYear = yr;
        }


        $scope.Add_AcademicYear = function () {

            //$scope.AcademicStartYear = null;
            //$scope.AcademicYear = null;
            //$scope.CurrentAcademicYear = null;
            //$scope.AcademicYearStartDate = null;
            //$scope.AcademicYearEndDate = null;
        }
        $scope.Add_CurrentBatch = function () {
            //$scope.academicyear = null;
            //$scope.currentbatch = null;
            //$scope.batch = null;

        }
        $scope.Add_CourseDurBatches = function () {
            //$scope.academicYear = null;
            //$scope.BaTch = null;
            //$scope.courseduration = null;
            //$scope.AYBatchStartDate = null;
            //$scope.AYBatchEndDate = null;

        }
        $scope.clearDefaults = function () {
            $scope.AcademicStartYear = null;
            $scope.AcademicYear = null;
            $scope.CurrentAcademicYear = null;
            $scope.AcademicYearStartDate = null;
            $scope.AcademicYearEndDate = null;


            $scope.academicyear = null;
            $scope.currentbatch = null;
            $scope.batch = null;

            $scope.academicYear = null;
            $scope.BaTch = null;
            $scope.courseduration = null;
            $scope.AYBatchStartDate = null;
            $scope.AYBatchEndDate = null;


        }


        $scope.AddAcademicYear = function () {


            if ($scope.AcademicStartYear == null || $scope.AcademicStartYear == undefined || $scope.AcademicStartYear == "") {
                alert("Select Start of Academic Year");
                return;
            }
            if ($scope.AcademicYearStartDate == null || $scope.AcademicYearStartDate == undefined || $scope.AcademicYearStartDate == "") {
                alert("Select Start Date");
                return;
            }
            if ($scope.AcademicYearEndDate == null || $scope.AcademicYearEndDate == undefined || $scope.AcademicYearEndDate == "") {
                alert("Select End Date");
                return;
            }
            if ($scope.CurrentAcademicYear == null || $scope.CurrentAcademicYear == undefined || $scope.CurrentAcademicYear == "") {
                alert("Select Current AcademicYear");
                return;
            }

            var CurrentAca = $scope.CurrentAcademicYear == "0" ? false : true;


            $scope.loading = true;
            var SetAcademicYear = CcicPreExaminationService.AddAcademicYear($scope.AcademicStartYear, $scope.AcademicYear, moment($scope.AcademicYearStartDate).format("YYYY-MM-DD"), moment($scope.AcademicYearEndDate).format("YYYY-MM-DD"), CurrentAca, $scope.UserName);
            SetAcademicYear.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);
                    $scope.loading = false;
                    $scope.getcciccurrentAcademicYear();
                    //$scope.clearDefaults();
                } else {
                    $scope.loading = false;
                    alert('AcademicYear Added Succesfully');
                    $scope.loading = false;
                    $scope.getcciccurrentAcademicYear();
                    //$scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        $scope.changeActive = function (data, Active, index) {
            for (let i = 0; i < $scope.finalList.length; i++) {
                if ($scope.finalList[i].CurrentAcademicYear == data.CurrentAcademicYear) {
                    $scope.finalList.remByVal(data.CurrentAcademicYear);
                    break;
                }
            }
            $scope.finalList.push(data);

            for (let i = 0; i < $scope.GetCcicAcademicYears.length; i++) {
                if ($scope.GetCcicAcademicYears[i].CurrentAcademicYear == data.CurrentAcademicYear) {
                    if (i != index) {
                        $scope.GetCcicAcademicYears[i].CurrentAcademicYear = false;
                    }
                }
            }
            console.log($scope.finalList);
        }

        $scope.EditAcademicYear = function (data, ind) {
            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;

        }


        $scope.UpdateAcademicYear = function (dat, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }



            var srtdate = dat.AcademicYearStartDate == undefined || dat.AcademicYearStartDate == null || dat.AcademicYearStartDate == "" ? " " : moment(dat.AcademicYearStartDate).format("YYYY-MM-DD");
            var enddate = dat.AcademicYearEndDate == undefined || dat.AcademicYearEndDate == null || dat.AcademicYearEndDate == "" ? " " : moment(dat.AcademicYearEndDate).format("YYYY-MM-DD");
            var updateacademicyear = CcicPreExaminationService.UpdateAcademicYear(parseInt(dat.AcademicYearID), srtdate, enddate, dat.CurrentAcademicYear, $scope.UserName);
            updateacademicyear.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }


                if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription)
                    $scope.GetCurrentAcademicYearData();
                    //$scope.clearDefaults();
                } else {
                    alert('Updated Successfully')
                }
                $scope.GetCurrentAcademicYearData();
                //$scope.clearDefaults();
            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }
        Array.prototype.remByVal = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i].ElectiveSet === val) {
                    this.splice(i, 1);
                    break;
                }
            }
            return this;
        }

        $scope.AddAcademicYearCurrentBatch = function () {

            if ($scope.batch == null || $scope.batch == undefined || $scope.batch == "") {
                alert("Select Batch");
                return;
            }

            if ($scope.currentbatch == null || $scope.currentbatch == undefined || $scope.currentbatch == "") {
                alert("Select Current Batch");
                return;
            }





            var SetAcademicYearCurrentBatch = CcicPreExaminationService.AddAcademicYearCurrentBatch($scope.academicyear, $scope.batch, $scope.currentbatch, $scope.UserName);
            SetAcademicYearCurrentBatch.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription)
                    $scope.GetCurrentBatchData();
                    //$scope.clearDefaults();
                } else {
                    alert('Academic Year Batch Added Successfully')
                    $scope.GetCurrentBatchData();
                    //$scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })
        };


        $scope.GetCurrentBatchData = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;
            }

            $scope.AcademicYearID = AcademicYearID;
            $scope.loading = true;
            var getCcicAcademicYearBatch = CcicPreExaminationService.GetCcicAcademicYearCurrentBatch(AcademicYearID)
            getCcicAcademicYearBatch.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.loading = false;
                    $scope.GetCcicAcademicYearCurrentBatchTable = res;
                    $scope.NoData = false;
                }
                else {
                    $scope.loading = false;
                    $scope.GetCcicAcademicYearCurrentBatchTable = [];
                    $scope.NoData = true;

                }

            },
                function (error) {
                    $scope.loading = false;
                    $scope.NoData = true;
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });
           
        }

        $scope.ModifyStatus = function (data, ind) {
            if ($scope.academicyear == null || $scope.academicyear == undefined || $scope.academicyear == "") {
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




        $scope.UpdateStatus = function (dat, ind) {


            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }


            var updateacademicyearcurrentbatch = CcicPreExaminationService.UpdateAcademicYearCurrentBatch(parseInt(dat.AcademicYearCurrentBatchID), dat.CurrentBatch, $scope.UserName);
            updateacademicyearcurrentbatch.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription)
                    $scope.GetCurrentBatchData();
                    //$scope.clearDefaults();
                } else {
                    alert('Academic Year Current Batch Updated Successfully')
                    $scope.GetCurrentBatchData();
                    //$scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        $scope.AddAYCourseDurationBatches = function () {



            if ($scope.AYBatchStartDate == null || $scope.AYBatchStartDate == undefined || $scope.AYBatchStartDate == "") {
                alert("Select AcademicYear Batch Start Date");
                return;
            }
            if ($scope.AYBatchEndDate == null || $scope.AYBatchEndDate == undefined || $scope.AYBatchEndDate == "") {
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




            var SetAYCourseDurationBatches = CcicPreExaminationService.AddAYCourseDurationBatches($scope.academicYear, $scope.courseduration, $scope.BaTch, moment($scope.AYBatchStartDate).format("YYYY-MM-DD"), moment($scope.AYBatchEndDate).format("YYYY-MM-DD"), $scope.UserName);
            SetAYCourseDurationBatches.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription)
                    $scope.GetCourseDurationBatchData($scope.AcademicYearID);
                    //$scope.clearDefaults();
                } else {
                    alert('AcademicYearBatch Added Succesfully')
                    $scope.GetCourseDurationBatchData($scope.AcademicYearID);
                    //$scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }

      





        $scope.GetCourseDurationBatchData = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }
            $scope.AcademicYearID = AcademicYearID;
            $scope.loading = true;
            var GetCurrentBatchData = CcicPreExaminationService.GetCurrentBatch(AcademicYearID);
            GetCurrentBatchData.then(function (response) {
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


        $scope.getCcicCourseDurations = function (BaTch) {

            if (BaTch == null || BaTch == undefined || BaTch == "") {
                return
            }
            $scope.BaTch = BaTch;
            var getCcicCourseDurations = CcicPreExaminationService.GetCcicCourseDurations(BaTch);
            getCcicCourseDurations.then(function (response) {

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



        $scope.getcciccurrentAcademicYear = function () {
            var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicCurrentAcademicYear();
            getCcicCurrentAcademicYear.then(function (response) {

                $scope.CurrentAcademicYearData = response;

            },
                function (error) {
                    alert("error while loading CurrentAcademicYear");
                    var err = JSON.parse(error);

                });
        }
      

        var getbatches = CcicPreExaminationService.GetBatches();
        getbatches.then(function (response) {

            $scope.GetBatchesData = response;

        },
            function (error) {
                alert("error while loading Batches");
                var err = JSON.parse(error);

            });








        $scope.GetCurrentAcademicYearData = function () {
            $scope.loading = true;
            var getacayrs = CcicPreExaminationService.GetCcicAcademicYears()
            getacayrs.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.loading = false;
                    $scope.GetCcicAcademicYears = response.Table;
                    $scope.NoData = false;
                }
                else {
                    $scope.loading = false;
                    $scope.NoData = true;

                }
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

            var srtdate = dat.AYBatchStartDate == undefined || dat.AYBatchStartDate == null || dat.AYBatchStartDate == "" ? " " : moment(dat.AYBatchStartDate).format("YYYY-MM-DD");
            var enddate = dat.AYBatchEndDate == undefined || dat.AYBatchEndDate == null || dat.AYBatchEndDate == "" ? " " : moment(dat.AYBatchEndDate).format("YYYY-MM-DD");
            var updateacademicyearbatches = CcicPreExaminationService.UpdateAYCourseDurationBatchDates(2, $scope.UserName, parseInt(dat.AcademicYearBatchID), true, srtdate, enddate);
            updateacademicyearbatches.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription)
                    $scope.GetCourseDurationBatchData($scope.AcademicYearID);
                    //$scope.clearDefaults();
                } else {
                    alert('Academic Year Batch Updated Successfully')
                    $scope.GetCourseDurationBatchData($scope.AcademicYearID);
                    //$scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        $scope.SetAYCourseDurationBatchStatus = function (AcademicYearBatchID, Active) {
            if ($scope.academicYear == null || $scope.academicYear == undefined || $scope.academicYear == "") {
                alert("Please Select AcademicYear to use the Operation");
                return
            }

            var SetStatus = CcicPreExaminationService.SetAYCourseDurationBatchStatus(1, $scope.UserName, AcademicYearBatchID, Active);
            SetStatus.then(function (res) {
                if (res[0].ResponceCode == '400') {
                    alert(res[0].ResponceDescription)

                    //$scope.clearDefaults();
                } else {
                    alert('AcademicYear Batch Status Updated Successfully')
                    $scope.GetCourseDurationBatchData($scope.AcademicYearID);

                    //$scope.clearDefaults();
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })


        }




    })
})