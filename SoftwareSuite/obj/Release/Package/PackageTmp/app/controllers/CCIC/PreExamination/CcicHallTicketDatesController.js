define(['app'], function (app) {
    app.controller("CcicHallTicketDatesController", function ($scope, $localStorage, CcicPreExaminationService) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        var UserTypeID = parseInt(authData.UserTypeID);
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;
        $scope.InstitutionID = authData.InstitutionID;
        $scope.allItemsSelected = false;
        $scope.btndisable = false;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getCcicCurrentAcademicYear();
            $scope.getdatesdata();
        }

        $scope.getCcicCurrentAcademicYear = function () {
            var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicCurrentAcademicYear();
            getCcicCurrentAcademicYear.then(function (response) {

                $scope.GetCcicCurrentAcademicYear = response;

            },
                function (error) {
                    alert("error while loading CurrentAcademicYear");
                    var err = JSON.parse(error);

                });
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


        

        $scope.AddDates = function () {

            var datatypeid = 1


            if ($scope.AcademicYear == null || $scope.AcademicYear == undefined || $scope.AcademicYear == "") {
                alert("Please Select Academic Year");
                return;
            }
            if ($scope.ExamMonthYear == null || $scope.ExamMonthYear == undefined || $scope.ExamMonthYear == "") {
                alert("Please Select Exam Month Year");
                return;
            }

            if ($scope.StartDate == null || $scope.StartDate == undefined || $scope.StartDate == "") {
                    alert("Please Select Start Date");
                    return;
             }
             if ($scope.EndDate == null || $scope.EndDate == undefined || $scope.EndDate == "") {
                    alert("Please Select End Date");
                    return;
             }

                var datatypeid = 1
                var AddDates = CcicPreExaminationService.AddHallTicketDates(datatypeid, 0, $scope.AcademicYear, $scope.ExamMonthYear, moment($scope.StartDate).format("YYYY-MM-DD"), moment($scope.EndDate).format("YYYY-MM-DD"),1, $scope.UserName)
                AddDates.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    } catch (err) { }
                    if (res[0].StatusCode == '200') {
                        alert(res[0].StatusDescription);
                        $scope.getdatesdata();
                    }
                    else if (res[0].StatusCode == '400') {
                        alert(res[0].StatusDescription);
                        $scope.getdatesdata();
                    } else {
                        alert('Something Went Wrong')
                        $scope.getdatesdata();
                    }
                },
                    function (error) {
                        alert("something Went Wrong")
                        $scope.getdatesdata();

                    });
            }


        


            $scope.getdatesdata = function () {
                var DataTypeID = 1
                $scope.loading = true;
                var getcourdurs = CcicPreExaminationService.GetHallTicketDates(DataTypeID, 0);
                getcourdurs.then(function (response) {

                    try {
                        var res = JSON.parse(response);
                    }
                    catch (err) { }
                    //$scope.edit = true;
                    if (res.length > 0) {
                        $scope.HallTicketDatesData = res;
                        $scope.loading = false;
                        $scope.NoData = false;
                        for (var j = 1; j < $scope.HallTicketDatesData.length + 1; j++) {
                            $scope['edit' + j] = true;
                        }

                    }
                    else {
                        $scope.HallTicketDatesData = [];
                        $scope.NoData = true;
                        $scope.loading = false;
                    }


                },

                    function (error) {
                        alert("error while loading CourseDuration");
                        var err = JSON.parse(error);

                    });
            }

        $scope.ChangeStatus = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }


            $scope['edit' + ind] = false;
        }




        $scope.UpdationStatus = function (data, ind) {
                $scope['edit' + ind] = true;

                var ele2 = document.getElementsByClassName("enabletable" + ind);
                for (var j = 0; j < ele2.length; j++) {
                    ele2[j].style['pointer-events'] = "none";
                    ele2[j].style.border = "0";
                    ele2[j].style['-webkit-appearance'] = "none";
                    ele2[j].style['-moz-appearance'] = "none";
                }





            if (data.StartDate == null || data.StartDate == undefined || data.StartDate == "") {
                    alert("Please Select Start Date");
                    return;
            }

            if (data.EndDate == null || data.EndDate == undefined || data.EndDate == "") {
                    alert("Please Select End Date");
                    return;
            }

                var datatypeid = 2
            var UpdateDates = CcicPreExaminationService.UpdateHallTicketDates(datatypeid, data.HallTicketDateID, '','', moment(data.StartDate).format("YYYY-MM-DD"), moment(data.EndDate).format("YYYY-MM-DD"), data.Active, $scope.UserName)
            UpdateDates.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    } catch (err) { }
                if (res[0].StatusCode == '200') {
                        alert(res[0].StatusDescription);
                    $scope.getdatesdata();
                    }
                    else if (res[0].StatusCode == '400') {
                        alert(res[0].StatusDescription);
                    $scope.getdatesdata();
                    } else {
                        alert('Something Went Wrong')
                    $scope.getdatesdata();
                    }
                },
                    function (error) {
                        alert("something Went Wrong")
                        $scope.getdatesdata();

                    });
            }



        

    })
})