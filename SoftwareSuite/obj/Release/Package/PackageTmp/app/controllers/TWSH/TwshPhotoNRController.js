define(['app'], function (app) {
    app.controller("TwshPhotoNRController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {

        $scope.ArrayBarimg = [];
        $scope.ArrayBarcode = [];
        $scope.BarcodeElements = [];
        $scope.ExamMonthYears = [];
        $scope.Courseslist = [];
     
        $scope.StudentTypeId = "";
        $scope.examTypeId = "0";
        $scope.DetailsFound = false;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.selectedEmy = "";
            $scope.CourseId = "";
            $scope.BatchId = "";
            var authData = $localStorage.Twsh;
            $scope.userId = authData.UserId;
            $scope.userType = authData.UserTypeId;

            $scope.GetExamMonthYear();
            $scope.GetCourses();
        }

      


        $scope.GetExamMonthYear = function () {
            $scope.ExamMonthYears = [];
            TwshStudentRegService.getTwshExamMonthYears().then(function (res) {
                $scope.ExamMonthYears = res.Table;
            },function (error) {

                    console.log(error);
                });
        }


        $scope.GetCourses = function () {
            $scope.Courseslist = [];
            var getCourseslist = TwshStudentRegService.getCourses();
            getCourseslist.then(function (response) {
                if (response.length > 0) {
                    $scope.Courseslist = response;
                } else {
                    $scope.Courseslist = [];

                }
            }, function (error) {
                    $scope.Courseslist = [];
                    console.log(error);
                });
        }
      

        $scope.changeExamDates = function (selectedEmy, CourseId) {          
            if (selectedEmy != "" && CourseId != "") {
                var getCurrentExamDates = TwshStudentRegService.TwshExamDatesbyCourse(selectedEmy, CourseId);
                getCurrentExamDates.then(function (response) {
                    if (response.length > 0) {
                        $scope.ExamDates = response;
                    } else {
                        $scope.ExamDates = [];
                        alert("No ExamDates Found.");
                    }
                },function (error) {
                        alert("error while loading Exam Dates");
                        console.log(error);
                    });
            }
        };

        $scope.changedExamBatch = function (selectExamDate) {
            try { var selexamdateid = JSON.parse(selectExamDate) } catch (err) { }
         
            var getCurrentExamBatches = TwshStudentRegService.TwshExamBatchbyDate(selexamdateid.Id);
                getCurrentExamBatches.then(function (response) {
                    if (response.length > 0) {
                        $scope.ExamBatches = response;
                    } else {
                        $scope.ExamBatches = [];
                        alert("No ExamBatches Found.");
                    }
                },
                    function (error) {                       
                        console.log(error);
                    });
            }
    

        $scope.getNRStudentDetails = function (selectedEmy, CourseId, selectExamDate, BatchId) {
            if (selectedEmy == null  || selectedEmy == "" || selectedEmy == 0) {
                alert('Select Exam Month and Year.')
                return
            }
            if (CourseId == null || CourseId == "" || CourseId == 0) {
                alert('Select Course.')
                return
            }
            if (selectExamDate == null|| selectExamDate == "" || selectExamDate == 0) {
                alert('Select Exam Date.')
                return
            }
            if (BatchId == null  || BatchId == "" || BatchId == 0) {
                alert('Select Bactch.')
                return 
            }
            try { var selexamdate = JSON.parse(selectExamDate) } catch (err) { }
            $scope.LoadImg = true;
            var TwshNrReports = TwshStudentRegService.TwshNrReports(selectedEmy, $scope.userId, CourseId, selexamdate.ExamDate, BatchId);
            TwshNrReports.then(function (res) {
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

        $scope.getNRExcelDetails = function (selectedEmy, CourseId, selectExamDate, BatchId) {
            if (selectedEmy == null  || selectedEmy == "" || selectedEmy == 0) {
                alert('Select Exam Month and Year.')
                return
            }
            if (CourseId == null  || CourseId == "" || CourseId == 0) {
                alert('Select Course.')
                return
            }
            if (selectExamDate == null  || selectExamDate == "" || selectExamDate == 0) {
                alert('Select Exam Date.')
                return
            }
            if (BatchId == null|| BatchId == "" || BatchId == 0) {
                alert('Select Bactch.')
                return
            }
            try { var selexamdate = JSON.parse(selectExamDate) } catch (err) { }
            $scope.LoadImg = true;
            var TwshNrReports = TwshStudentRegService.TwshNrExcelReports(selectedEmy, $scope.userId, CourseId, selexamdate.ExamDate, BatchId);
            TwshNrReports.then(function (response) {
                $scope.LoadImg = false;
               
                if (response != null && response.length > 1) {
                    window.location.href = response;
                 
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