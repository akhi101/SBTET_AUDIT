define(['app'], function (app) {
    app.controller("BacklogHallticketController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MarksEntryService, PreExaminationService) {

        $scope.dateOfBirth = "";
        var LoadExamTypeBysem = MarksEntryService.getStudentType();
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
        $scope.getHallTkt = function () {
            //  $scope.PinNumber = PinNo;

            //var dob = '09-09-2002'
            //console.log(dob)
            var reg = "[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}";
            if ($scope.dateOfBirth != null && $scope.dateOfBirth !== undefined && !$scope.dateOfBirthFound && !(reg == $scope.dateOfBirthFound)) {
                var datechange = moment($scope.dateOfBirth).format("DD/MM/YYYY HH:mm:ss");
                var d = datechange.slice(0, 10).split('/');
                if (d[2].length === 4) {
                    $scope.CandidateDob = d[0] + "-" + d[1] + "-" + d[2];
                }

                var getHallticket = PreExaminationService.getHallticket($scope.pinNumber, $scope.CandidateDob, $scope.Student.id);
                getHallticket.then(function (resp) {

                    var resp = JSON.parse(resp);
                    console.log(resp);
                    if (resp.Table[0].ResponceCode == '200') {
                        $scope.result = true;
                        $scope.studPin = resp.Table1[0].Pin;
                        $scope.Photo = resp.Table1[0].Photo;
                        $scope.studentScheme = resp.Table1[0].Scheme;
                        $scope.studentBranch = resp.Table1[0].Branch;
                        $scope.studentSem = resp.Table1[0].Semester;
                        $scope.studentName = resp.Table1[0].Name;
                        console.log($scope.studentName)
                        $scope.studentFatherName = resp.Table1[0].FatherName;
                        $scope.studentattendance = resp.Table1[0].PresemptiveAttendance;
                        $scope.studentPaymentStatus = resp.Table1[0].Status;
                        $scope.studentTatkalFee = resp.Table1[0].TatkalFee;
                        $scope.studentCondonationFee = resp.Table1[0].Condonation;
                        $scope.studentLateFee = resp.Table1[0].LateFee;
                        $scope.studentExamFee = resp.Table1[0].ExamFee;
                        $scope.studentTotalFee = resp.Table1[0].TotalFee;
                        $scope.studentExamCenterName = resp.Table1[0].ExaminationCenter;
                        $scope.studentExamCenterCode = resp.Table1[0].ExaminationCenterCode;
                        $scope.studentSubData = resp.Table2;
                        $scope.loading = false;
                        $scope.Noresult = false;
                        $scope.result = true;
                        if ($scope.Photo == '' || $scope.Photo == null) {
                            alert("Photo is not available to display the Hall ticket")
                            $scope.result = false;
                            $scope.LoadImg = false;
                        }

                        //      alert("No Student found with this Record");
                    } else if (resp.Table[0].ResponceCode == '201') {
                        $scope.result = false;
                        alert(resp.Table[0].ResponceDescription);
                        //  $state.go('Dashboard.PreExamination.Hallticket')
                    } else if (resp.Table[0].ResponceCode == '400') {
                        $scope.result = false;
                        alert(resp.Table[0].ResponceDescription);

                    } else {
                        $scope.result = false;
                        $scope.LoadImg = false;
                        $scope.DetailsFound = false;
                        $scope.DetailsNotFound = true;

                        if (resp.Table[0].ResponceDescription == undefined || resp.Table[0].ResponceDescription == null) {
                            $scope.result = false;
                            alert("Something Went Wrong")
                        } else {
                            alert(resp.Table[0].ResponceDescription)
                        }
                    }
                },
                    function (error) {

                        $scope.FeeDates = [];
                        $scope.result = false;
                        alert("Error while loading Student Types");
                        console.log(error);
                    });
            }
            else if ($scope.dateOfBirth === undefined) {
                alert("change the formate to DD/MM/YYYY");
            }
            //  console.log($scope.CandidateDob);

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