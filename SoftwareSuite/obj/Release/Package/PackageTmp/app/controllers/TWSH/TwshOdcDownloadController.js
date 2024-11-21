define(['app'], function (app) {
    app.controller("TwshOdcDownloadController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {

    
        //$scope.ExamMonthYears = [];
      
        $scope.ExamMonthYear = "";
        $scope.StudentTypeId = "";
        $scope.AcademicYearId = "";
        $scope.examTypeId = "0";

        $scope.LoadImg = false;
        $scope.NrGenerating = false;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetExamMonthYearForTwshOdc();
        }


            
        $scope.GetExamMonthYearForTwshOdc = function () {
            TwshStudentRegService.GetExamMonthYearForTwshOdc().then(function (res) {
                if (res.length > 0) {
                    $scope.ExamMonthYears = res;
                } else {
                    alert("error while loading Exam Month Years");
                }
              
            },
                function (error) {
                    alert("error while loading Exam Month Years");
                    console.log(error);
                });
        }



        var authData = $localStorage.authorizationData;
        $scope.DetailsFound = false;
       

      


        $scope.downloadTwshOdcNr = function () {
            $scope.NrGenerating = true;
            if ($scope.ExamMonthYear == "") {
                $scope.NrGenerating = false;
                alert("Please Select All Details");
                return
            }
            var GetTwshPrinterOdcDownload = TwshStudentRegService.GetTwshPrinterOdcDownload($scope.ExamMonthYear);
            GetTwshPrinterOdcDownload.then(function (res) {
                $scope.NrGenerating = false;
                if (res.length > 10) {
                    window.location.href = "/Reports/TwshOdc/" + res;
                } else {
                    alert("Failed to generate Twsh Odc data.");
                }
            }, function (err) {
                $scope.NrGenerating = false;
            });
        };

       
        $scope.GetDetails = function () {

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

