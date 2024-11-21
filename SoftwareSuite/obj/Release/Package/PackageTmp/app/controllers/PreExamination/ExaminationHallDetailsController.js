define(['app'], function (app) {
    app.controller("ExaminationHallDetailsController", function ($scope, $http, $localStorage, $state,  AppSettings, PreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.CollegeCode = authData.College_Code
        $scope.ReportFound = false;
        $scope.Noreports = false;
        $scope.Adddata = false;
        $scope.GetMasterHallData = [];
        $scope.maxcolumns = [{ "Id": 1 }, { "Id": 2 }, { "Id": 3 }, { "Id": 4 }, { "Id": 5 }, { "Id": 6 }, { "Id": 7 }, { "Id": 8 }]
        $scope.maxrows = [{ "Id": 1 }, { "Id": 2 }, { "Id": 3 }, { "Id": 4 }, { "Id": 5 }, { "Id": 6 }, { "Id": 7 }, { "Id": 8 }, { "Id": 9 }, { "Id": 10 }, { "Id": 11 }, { "Id": 12 }, { "Id": 13 }, { "Id": 14 }, { "Id": 15 }, { "Id": 16 }]

        const $ctrl = this;
        $ctrl.$onInit = () => {         
            $scope.GetDetails();
        }       


        $scope.addData = function () {
            $scope.Adddata = true;
        }

        $scope.genseating = function () {
            $state.go("Dashboard.PreExamination.GenerateSeatingPlan");
        }


        $scope.GetDetails = function () {          
            $scope.GetMasterHallData = [];
            $scope.ReportFound = false;
            $scope.Noreports = false;

            var GetExaminationHallData = PreExaminationService.GetExaminationHallData($scope.CollegeCode);
            GetExaminationHallData.then(function (data) {
                try { var data = JSON.parse(data) } catch (err) { }
                if (data.Table.length > 0) {
                    $scope.ReportFound = true;
                    $scope.Noreports = false;
                    $scope.GetMasterHallData = data.Table;
                    for (var j = 1; j < data.Table.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                } else {
                    $scope.ReportFound = false;
                    $scope.Noreports = true;
                }
            }, function (error) {
                    $scope.GetMasterHallData = [];
                $scope.ReportFound = false;
                $scope.Noreports = true;
            });


        }


        $scope.Editsemesterdat = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
                ele1[j].style['-webkit-appearance'] = "auto";
                ele1[j].style['-moz-appearance'] = "auto";
            }
            $scope['edit' + ind] = false;

        }

        $scope.Updatesemesterdat = function (data, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
                ele2[j].style['-webkit-appearance'] = "none";
                ele2[j].style['-moz-appearance'] = "none";
            }

            var datatypeid = 2;

            if (data.ExamHall == null || data.ExamHall == undefined || data.ExamHall == "") {
                alert("Enter Examinationn Hall Name.");
                return;
            }
            if (data.Rows == null || data.Rows == undefined || data.Rows == "" || data.Rows == '0') {
                alert("Enter number of rows in Examination Hall.");
                return;
            }
            if (isNaN(data.Rows)) {
                alert("number of rows in Examination Hall Entered is not valid.");
                return;
            }
            if (data.Columns == null || data.Columns == undefined || data.Columns == "" || data.Columns == '0') {
                alert("Enter number of rows in Examination Hall.");
                return;
            }
            if (isNaN(data.Columns)) {
                alert("number of Columns in Examination Hall Entered is not valid.");
                return;
            }

            var json = {
                "Id": data.Id, "ExamHall": data.ExamHall, "Rows": parseInt(data.Rows), "Columns": parseInt(data.Columns), "NoOfStudentsPerBeanch": 0, "IsActive": 1
            }
            var parmobj = { "datatypeid": datatypeid, "CollegeCode": $scope.CollegeCode, "Json": json }          

            var SetExaminationHallData = PreExaminationService.SetExaminationHallData(parmobj)
            SetExaminationHallData.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response.Table[0].ResponceCode == '200') {
                    alert(response.Table[0].ResponceDescription);

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }



        $scope.Submit = function () {

            var datatypeid = 1

            if ($scope.ExaminationHall == null || $scope.ExaminationHall == undefined || $scope.ExaminationHall == "") {
                alert("Enter Examinationn Hall Name.");
                return;
            }
            if ($scope.HallRows == null || $scope.HallRows == undefined || $scope.HallRows == "" || $scope.HallRows =='0') {
                alert("Enter number of rows in Examination Hall.");
                return;
            }
            if (isNaN($scope.HallRows)) {
                alert("number of rows in Examination Hall Entered is not valid.");
                return;
            }
            if ($scope.HallColumns == null || $scope.HallColumns == undefined || $scope.HallColumns == "" || $scope.HallColumns == '0') {
                alert("Enter number of rows in Examination Hall.");
                return;
            }
            if (isNaN($scope.HallColumns)) {
                alert("number of Columns in Examination Hall Entered is not valid.");
                return;
            }

            var json = {
                "Id": 0, "ExamHall": $scope.ExaminationHall, "Rows": parseInt($scope.HallRows), "Columns": parseInt($scope.HallColumns), "NoOfStudentsPerBeanch": 0, "IsActive": 1               
            }
            var parmobj = { "datatypeid": datatypeid, "CollegeCode": $scope.CollegeCode, "Json": json}
            var SetExaminationHallData = PreExaminationService.SetExaminationHallData(parmobj)
            SetExaminationHallData.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response.Table[0].ResponceCode == '200') {
                    alert(response.Table[0].ResponceDescription);
                    $scope.GetDetails();
                } else {
                    alert('Something Went Wrong');

                }
            },
                function (error) {
                    alert("something Went Wrong");


                });
        }


    })
})