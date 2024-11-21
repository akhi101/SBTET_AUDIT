define(['app'], function (app) {
    app.controller("HallticketController", function ($scope, $http, $timeout, $localStorage, $state, TwshStudentRegService) {
        $scope.studentInfo = [];
        $scope.loading = false;
        $scope.getHallTkt = function (ApplicationNo, dob) {
            $scope.loading = true;
            var reg = "[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}";
            // if ($scope.dateOfBirth != null && $scope.dateOfBirth !== undefined && !$scope.dateOfBirthFound && !(reg == $scope.dateOfBirthFound)) {
            //     var datechange = moment($scope.dateOfBirth).format("DD/MM/YYYY HH:mm:ss");
            //     var d = datechange.slice(0, 10).split('/');
            //     if (d[2].length === 4) {
            //         $scope.CandidateDob = d[0] + "/" + d[1] + "/" + d[2];
            //     }
            // }
            $scope.CandidateDob = "01/01/2001";
            //var datechange = moment(CandidateDOB).format("DD/MM/YYYY HH:mm:ss");
            //var d = datechange.slice(0, 10).split('/');
            //if (d[2].length === 4) {
            //    var CandidateDOBchange = d[0] + "/" + d[1] + "/" + d[2];
            //}

            var hallTicketInfo = TwshStudentRegService.GetStudentHallticket(ApplicationNo, $scope.CandidateDob);

            hallTicketInfo.then(function (res) {
                if (res) {
                    if (res.Table.length > 0) {
                        if (res.Table[0].ResponceCode == '200') {
                            $scope.studentInfo = [];
                            $scope.studentInfo = res.Table[0];
                            $scope.loading = false;
                            $scope.studentData = true;
                            $scope.showStatus = false;
                        } else if (res.Table[0].ResponceCode == '401') {
                            $scope.studentInfo = [];
                            $scope.loading = false;
                            $scope.StatusMessage = res.Table[0].ResponceDescription;
                            $scope.showStatus = true;
                            $scope.statusclass = "alert-danger";
                            $scope.studentData = false;
                        } else if (res.Table[0].ResponceCode == "402") {
                            $scope.studentInfo = [];
                            $scope.loading = false;
                            $scope.StatusMessage = res.Table[0].ResponceDescription;
                            $scope.showStatus = true;
                            $scope.statusclass = "alert-danger";
                            $scope.studentData = false;
                        } else if (res.Table[0].ResponceCode == "404") {
                            $scope.studentInfo = [];
                            $scope.loading = false;
                            $scope.StatusMessage = res.Table[0].ResponceDescription;
                            $scope.showStatus = true;
                            $scope.statusclass = "alert-danger";
                            $scope.studentData = false;
                        } else if (res.Table[0].ResponceCode == "406") {
                            $scope.studentInfo = [];
                            $scope.loading = false;
                            $scope.StatusMessage = res.Table[0].ResponceDescription;
                            $scope.showStatus = true;
                            $scope.statusclass = "alert-danger";
                            $scope.studentData = false;
                        } else {
                            $scope.studentInfo = [];
                            $scope.loading = false;
                            $scope.StatusMessage = "No data found!";
                            $scope.showStatus = true;
                            $scope.statusclass = "alert-danger";
                            $scope.studentData = false;
                        }
                    } else {
                        $scope.studentInfo = [];
                        $scope.loading = false;
                        $scope.studentData = false;
                        $scope.StatusMessage = "No data found!";
                        $scope.showStatus = true;
                        $scope.statusclass = "alert-danger";
                    }

                }

            }, function (err) {
                $scope.loading = false;
                $scope.studentData = false;
                $scope.StatusMessage = "No data found!";
                $scope.showStatus = true;
                $scope.statusclass = "alert-danger";
            })
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

            window.print();


        }

        $scope.getDetails = function () {
            var GetApplicationData = TwshStudentRegService.getApplicationData($scope.ApplicationNo, $scope.dateOfBirth);
            GetApplicationData.then(function (response) {

                if (response.length > 0) {
                    $scope.getData = true;
                    $scope.showStatus = false;
                    var ApplicationDetails = response;

                    //$scope.Name = ApplicationDetails[0].StudentName;
                    //$scope.FatherName = ApplicationDetails[0].FatherName;
                    //$scope.DateOfBirth = ApplicationDetails[0].DateOfBirth;
                    //$scope.Gender = ApplicationDetails[0].Gender;
                    //$scope.ApplicationNumber = ApplicationDetails[0].ApplicationNumber;
                    //$scope.GradeName = ApplicationDetails[0].GradeName;
                    //$scope.IsBlind = ApplicationDetails[0].IsBlind;
                    //$scope.EmailId = ApplicationDetails[0].EmailId;
                    //$scope.HnoStreet = ApplicationDetails[0].HnoStreet;
                    //$scope.DistrictName = ApplicationDetails[0].DistrictName;
                    //$scope.CategoryCode = ApplicationDetails[0].CategoryCode;
                    //$scope.StudentPhoneNumber = ApplicationDetails[0].StudentPhoneNumber;
                    //$scope.ExamDate = ApplicationDetails[0].ExamDate;
                    //$scope.ExamBatch = ApplicationDetails[0].ExamBatch;
                    //$scope.UserUploadPhoto = ApplicationDetails[0].Photo;
                    //$scope.ExaminationCenterName = ApplicationDetails[0].ExaminationCenterName;
                    //$scope.DistrictName = ApplicationDetails[0].DistrictName;
                    //$scope.LanguageName = ApplicationDetails[0].LanguageName;
                    //$scope.IsEligible = ApplicationDetails[0].IsEligible;
                    //$scope.IsFeePaid = ApplicationDetails[0].IsFeePaid;
                } else {
                    $scope.getData = false;
                    $scope.StatusMessage = "No data found!";
                    $scope.showStatus = true;
                    $scope.statusclass = "alert-danger";
                    ApplicationDetails[0] = [];
                }

            },
                function (error) {
                    $scope.getData = false;
                    $scope.StatusMessage = "No data found!";
                    $scope.showStatus = true;
                    $scope.statusclass = "alert-danger";
                    ApplicationDetails[0] = [];
                });
        }
    })
})