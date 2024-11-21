define(['app'], function (app) {
    app.controller("TwshPrinterNrDownloadController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {


        $scope.ExamMonthYears = [];

        $scope.ExamMonthYear = "";
        $scope.StudentTypeId = "";
        $scope.AcademicYearId = "";
        $scope.examTypeId = "0";

        $scope.LoadImg = false;
        $scope.NrGenerating = false;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getTwshExamMonthYears();
        }



        $scope.getTwshExamMonthYears = function () {
            TwshStudentRegService.getTwshExamMonthYears().then(function (res) {
                if (res.Table.length > 0) {
                    $scope.ExamMonthYears = res.Table;
                } else {
                   
                }

            },
                function (error) {
                  
                    console.log(error);
                });
        }



        var authData = $localStorage.authorizationData;
        $scope.DetailsFound = false;





        $scope.GetTwshPrinterNRDownload = function () {
            $scope.NrGenerating = true;
            if ($scope.ExamMonthYearId == "" || $scope.ExamMonthYearId == 0 || $scope.ExamMonthYearId == null || $scope.ExamMonthYearId == undefined) {
                $scope.NrGenerating = false;
                alert("Please Select All Details");
                return
            }
            var GetTwshPrinterOdcDownload = TwshStudentRegService.GetTwshPrinterNrDownload($scope.ExamMonthYearId);
            GetTwshPrinterOdcDownload.then(function (res) {
                $scope.NrGenerating = false;
                if (res.length > 10) {
                    window.location.href = "/Reports/TwshPrinterNR/" + res;
                } else {
                    alert("Failed to generate Twsh Printer Nr data.");
                }
            }, function (err) {
                $scope.NrGenerating = false;
            });
        };

        $scope.GetTwshPrinterNRDownloadExcel = function () {
            if ($scope.ExamMonthYearId == "" || $scope.ExamMonthYearId == 0 || $scope.ExamMonthYearId == null || $scope.ExamMonthYearId == undefined) {
                alert("Please Select All Details");
                return
            }
            if ($scope.NrGenerating == false) {
                $scope.LoadImg = true;
            }
          
            var loadData1 = TwshStudentRegService.generateTwshNrExcel($scope.ExamMonthYearId)
            loadData1.then(function (data) {
                if (data.length > 4) {
                    $scope.LoadImg = false;
                    var location = data;
                    window.location.href = location;

                } else {
                    $scope.LoadImg = false;
                    alert("printer Nr data not Found");
                }

            }, function (error) {
                    $scope.LoadImg = false;
            });
        }





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