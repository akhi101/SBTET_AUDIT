define(['app'], function (app) {
    app.controller("TwshNRDownloadDatesController", function ($scope, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {

        var authdata = $localStorage.authorizationData;

        $scope.UserName = authdata.userName;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetNRDatesList();

        }

      

        $scope.EditTwshNRDate = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;

        }


        $scope.GetNRDatesList = function () {
            $scope.loading = true;
            $scope.array = [];
            var ExamDates = TwshStudentRegService.GetTwshNRDates();
            ExamDates.then(function (response) {

                if (response.Table.length > 0) {
                    $scope.loading = false;

                    for (var j = 1; j < response.Table.length + 1; j++) {

                        $scope['edit' + j] = true;
                        $scope.edit = false
                    }

                    $scope.TwshNRDates = response.Table;

                } else {

                    $scope.loading = false;
                    $scope.Data = false;
                }
            },
                function (error) {
                    $scope.Data = false;
                    $scope.loading = false;

                });
        }
        $scope.Cancel = function (ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }
        }

       

       


        

        var Exammonthyears = TwshStudentRegService.getTwshExamMonthYears();
        Exammonthyears.then(function (response) {
            if (response.Table.length > 0) {
                $scope.getExamYearMonth = response.Table;
            } else {
                $scope.loading = false;
                $scope.Data = false;
            }
        }, function (error) {
            $scope.Data = false;
            $scope.loading = false;
        });



        $scope.array = []

       


        $scope.Delete = function (id) {
            var id = id + 1
            $scope.array = removeItem($scope.array, id);
            $scope.Batch = $scope.array.length.toString();

        }


        const removeItem = (items, i) =>
            items.slice(0, i - 1).concat(items.slice(i, items.length))



        $scope.AddNrDates = function () {

            //if ($scope.RegPolycetYearID == null || $scope.RegPolycetYearID == undefined || $scope.RegPolycetYearID == "") {
            //    alert('Please select PolycetYear');
            //    return;
            //}
            if ($scope.NRStartDate == null || $scope.NRStartDate == undefined || $scope.NRStartDate == "") {
                alert('Please select  Start Date');
                return;
            }
            if ($scope.NREndDate == null || $scope.NREndDate == undefined || $scope.NREndDate == "") {
                alert('Please select  End Date');
                return;
            }
           
            //$scope.loading = true;
            var DataType = 1;
            var NRDatesID = 0;//Optional
            var startDate = moment($scope.NRStartDate).format("YYYY-MM-DD");
            var endDate = moment($scope.NREndDate).format("YYYY-MM-DD");

            var adddates = TwshStudentRegService.AddNRDates(DataType, $scope.ExamMonthYearId, NRDatesID,
                startDate, endDate, 1, $scope.UserName);
            adddates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res.Table[0].ResponseCode == '200') {
                    alert(res.Table[0].ResponseDescription);
                    $scope.GetNRDatesList();

                } else if (res.Table[0].ResponseCode == '400') {
                    alert(res.Table[0].ResponseDescription);
                    $scope.GetNRDatesList();
                }
            },
                function (error) {

                    var err = JSON.parse(error);
                })
        } 

        $scope.UpdateTwshNRDate = function (data, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }
            var DataType = 2;
            var updatedates = TwshStudentRegService.UpdateTwshNRDates(DataType, data.ExamMonthYearID, data.NRDatesID,
                data.NRStartDate, data.NREndDate, data.Active, $scope.UserName)
            updatedates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res.Table[0].ResponseCode == '200') {
                    alert(res.Table[0].ResponseDescription)
                    $scope.GetExamBatchesList();
                } else if (res.Table[0].ResponseCode == '400') {
                    alert(res.Table[0].ResponseDescription);
                    $scope.GetExamBatchesList();
                } else {
                    alert('Something Went Wrong')
                }
            },
                function (error) {
                    alert("something Went Wrong")


                });

        }




    })
})