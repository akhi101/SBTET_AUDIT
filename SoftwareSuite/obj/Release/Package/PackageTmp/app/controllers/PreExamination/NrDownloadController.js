define(['app'], function (app) {
    app.controller("NrDownloadController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService) {

        $scope.ArrayBarimg = [];
        $scope.ArrayBarcode = [];
        $scope.BarcodeElements = [];
        $scope.ExamMonthYears = [];
        $scope.selectedEmy = "";
        $scope.StudentTypeId = "";
        $scope.examTypeId = "0";
        //$scope.Exams = [
        //    { id: 1, exam: "Mid 1" },
        //    { id: 2, exam: "Mid 2" },
        //    { id: 5, exam: "Semester" }
        //];
        
        PreExaminationService.getExamTypesForExamCenters().then(function (res) {
            var response = JSON.parse(res)
            $scope.Exams = response.Table;
        },
            function (error) {
                alert("error while loading Exam Month Years");
                console.log(error);
            });


        PreExaminationService.GetExamMonthYears().then(function (res) {
            $scope.ExamMonthYears = res.Table;
        },
            function (error) {
                alert("error while loading Exam Month Years");
                console.log(error);
            });

        var authData = $localStorage.authorizationData;
        $scope.DetailsFound = false;
        var LoadExamTypeBysem = PreExaminationService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Student Types");
                console.log(error);
            });


        $scope.changedExamType = function () {
            $scope.DetailsFound = false;
            if ($scope.StudentTypeId != "" && $scope.selectedEmy != "") {
                var getCurrentExamDates = PreExaminationService.CurrentExamDatesForNr($scope.selectedEmy, $scope.StudentTypeId, $scope.examTypeId);
                getCurrentExamDates.then(function (response) {
                    if (response.Table.length > 0) {
                        $scope.ExamDates = response.Table;
                    } else {
                        $scope.ExamDates = [];
                        alert("No ExamDates Found.");
                    }
                },
                    function (error) {
                        alert("error while loading Exam Dates");
                        console.log(error);
                    });
            }
        }

        $scope.changedExamDates = function () {
            $scope.DetailsFound = false;
        };

        $scope.getNRStudentDetails = function (ExamMonthYearId, StudentType, ExamDate, ExamType) {
            $scope.LoadImg = true;
            var getNrReports = PreExaminationService.NrReports(ExamMonthYearId, StudentType, authData.College_Code.toString(), ExamDate, ExamType);
            getNrReports.then(function (res) {
                $scope.LoadImg = false;
                if (res.length > 0) {
                    if (res.length > 4) {
                        window.location.href = '/Reports/' + res + '.pdf';
                    } else {
                        alert("No NR Report Present");
                    }
                } else {
                    alert("No NR Report Present");
                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        };



        $scope.printMarksEntered = function () {

            $scope.printHead = true;
            var divName = "idtoDivPrint";
            var $markstable = document.createElement("div");
            $markstable.innerHTML = '';
            $markstable.className = "table";
            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;
            //    $("#markslist").hide();
            var domClone = divToPrint.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            if ($printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";


                document.body.appendChild($printSection);

                var $ele1 = document.createElement("div");
                $ele1.className = "row";

                var $ele2 = document.createElement("div");
                $ele2.className = "col-lg-2 col-md-12";

                var $ele3 = document.createElement("div");
                $ele3.className = "col-lg-10 col-md-12";


                $ele1.appendChild($ele3);

                $printSection.appendChild($ele1);

                $printSection.appendChild($ele1);
                $printSection.appendChild($markstable);

            }
            var tempTitle = document.title;
            var dateobj = new Date();
            //var B = dateobj.getDate();
            // var date = dateobj.getDate() + dateobj.getHours+":"+dateobj.getMinutes;
            //document.write(B);
            document.title = $scope.pinNumber;
            window.print();
            document.title = tempTitle;

        }
    })
})