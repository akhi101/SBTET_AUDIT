define(['app'], function (app) {
    app.controller("CcicHallTicketController", function ($scope, $localStorage, CcicPreExaminationService) {
        var authData = $localStorage.authorizationData;
        //  var tmpData = $localStorage.TempData;
        var AcademicYearID = sessionStorage.getItem("AcademicYearID");
        var ExamMonthYearID = sessionStorage.getItem("ExamMonthYearID");
        var StudentID = sessionStorage.getItem("StudentID");
        var StudentType = sessionStorage.getItem("StudentType");

        const $ctrl = this;
        $ctrl.$onInit = () => {


            $scope.getHallTkt()
        }




        $scope.getHallTkt = function () {

            console.log(AcademicYearID, ExamMonthYearID, StudentType, StudentID)
            var getHallticket = CcicPreExaminationService.GetCandidateHallticket(AcademicYearID, ExamMonthYearID, StudentType, StudentID);
            getHallticket.then(function (resp) {
                var resp = JSON.parse(resp);
                if (resp.Table !== undefined) {
                    if (resp.Table[0].StatusCode == '200') {

                        $scope.result = true;
                        $scope.studPin = resp.Table1[0].PIN;
                        $scope.Photo = resp.Table1[0].StudentPhoto;
                        $scope.studentName = resp.Table1[0].StudentName;
                        $scope.studentFatherName = resp.Table1[0].FatherName;
                        $scope.studentCourse = resp.Table1[0].CourseName;
                        $scope.studentExamCenterName = resp.Table1[0].ExaminationCentreName;
                        $scope.studentExamCenterCode = resp.Table1[0].ExaminationCentreCode;
                        $scope.studentInsName = resp.Table1[0].InstitutionName;
                        $scope.examMonthYear = resp.Table1[0].ExamMonthYear;
                        $scope.studentSubData = resp.Table2;
                        $scope.loading = false;
                        $scope.Noresult = false;
                        $scope.result = true;
                        //if ($scope.Photo == '' || $scope.Photo == null) {
                        //    alert("Photo is not available, please upload photo from your college and download Hall Ticket.")
                        //    $scope.result = false;
                        //    $scope.LoadImg = false;
                        //}

                        // alert("No Student found with this Record");


                    } else if (resp.Table[0].ResponceCode == '400') {
                        $scope.result = false;
                        alert(resp.Table[0].ResponceDescription);
                    } else {
                        $scope.result = false;
                        $scope.LoadImg = false;
                        $scope.DetailsFound = false;
                        $scope.DetailsNotFound = true;

                    }
                }

                else {
                    alert("No Hallticket founded");
                }

            },
                function (error) {

                    $scope.FeeDates = [];
                    $scope.result = false;
                    alert("Error while loading Student Types");
                    console.log(error);
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
            //document.title = $scope.pinNumber;
            window.print();
            //document.title = tempTitle;

        }
    })
})