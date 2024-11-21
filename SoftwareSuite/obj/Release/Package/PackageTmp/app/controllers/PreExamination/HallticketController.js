define(['app'], function (app) {
    app.controller("HallticketController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MarksEntryService, $uibModal, PaymentService, PreExaminationService) {

        $scope.dateOfBirth = "";
        $scope.result = false;
        var LoadExamTypeBysem = PreExaminationService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = [];
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

        var loadHallticket = PreExaminationService.GetExamMonthYearForHallticketandFeepayment(2);
        loadHallticket.then(function (response) {
            if (response.Table[0].ResponceCode == '200') {
                $scope.GetExamMonthYear = [];
                $scope.GetExamMonthYear = response.Table1;
            } else {
                $scope.GetExamMonthYear = [];
                alert("No Exam Month Year found on this Record");
            }
        },
            function (error) {
                alert("error while loading Exam Month Years");
                console.log(error);
            });

        $scope.changedVal = function () {
            $scope.result = false;
        }

        $scope.Proceedtopayfine = function () {
            var College_Code = "admin";
            $scope.noteChallan = false;
            $scope.secondClick = false;
            //var marchantid = "TSSBTET"; // live
            var marchantid = "TSSBTET"; // test
            try {
                College_Code = authData.College_Code == null ? "admin" : authData.College_Code;
            } catch (err) {
            }
            var addInfo1 = College_Code;
            var addInfo3 = $scope.studPin;
            var addInfo4 = "NA"//$scope.loadedScheme.Scheme;
            var addInfo5 = "NA";//Semester;
            var addInfo6 = "SINGLE"//PaymentType;
            var addInfo7 = "LM_CONDONATION";
            var amount = "";
            if ($scope.Student.id == 1) {
                addInfo5 = "REGULAR";
                amount = $scope.FinalAmountDB.toFixed(2);
            }
            else if ($scope.Student.id == 2) {
                amount = $scope.FinalAmountDB.toFixed(2);
                addInfo5 = "BACKLOG";
                addInfo4 = $scope.Sems;
            }
            var subMarchantid = "TSDOFP";
            $localStorage.PaymentGatewayResponse = {};
            redirecturl = {
                redirecturl: "Dashboard"
            }
            $localStorage.PaymentGatewayResponse = redirecturl;

            var location = window.location.origin;

            PreExaminationService.RequestLog(marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.challan, amount, "studentType", "json");
            // $localStorage.assessment.redirecturl = 'Dashboard.AssessmentDashboard.Assessment.TheorySubjectList';
            //localhost:65321/Payment/BulkBillResponse
            //'sbtet.telangana.gov.in/API/Payment/BulkBillResponse'
            var proceedfinePayment = PaymentService.getHashValue(location + "/Payment/BulkBillResponse", marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.challan, amount);
            proceedfinePayment.then(function (resp) {
                if (resp != "" && resp != undefined) {
                    // var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg="
                    var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp   // live url
                    //var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg=KALYANTEST|429|NA|2|NA|NA|NA|INR|NA|R|kalyantest|NA|NA|F|8850062965|test-developer@candere.com|187|NA|NA|NA|NA|http://127.0.0.1/candere_repo/scheme/billdesk/response|9F4E06C08698DA6338428E2A36141826468E8E31C83F3B814F831AE6D6D27CFD";
                    //   var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp // test url
                    window.location.replace(req);
                }
            }, function (err) {
                $scope.noteChallan = false;
                $scope.secondClick = true;
                console.log(err);
            });
        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }

        $scope.getHallTkt = function () {
            //  $scope.PinNumber = PinNo;

            //var dob = '09-09-2002'
            //console.log(dob)
            //var reg = "[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}";
            //if ($scope.dateOfBirth != null && $scope.dateOfBirth !== undefined && !$scope.dateOfBirthFound && !(reg == $scope.dateOfBirthFound)) {
            //    var datechange = moment($scope.dateOfBirth).format("DD/MM/YYYY HH:mm:ss");
            //    var d = datechange.slice(0, 10).split('/');
            //    if (d[2].length === 4) {
            //        $scope.CandidateDob = d[0] + "-" + d[1] + "-" + d[2];
            //    }

            $scope.dob = '123';
            var getHallticket = PreExaminationService.getHallticket($scope.pinNumber, $scope.dob, $scope.Student.id, $scope.ExamMonthYear);
            getHallticket.then(function (resp) {

                var resp = JSON.parse(resp);
                if (resp.Table !== undefined) {
                    if ($scope.Student.id == 1) {
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
                            $scope.totalFeePaid = resp.Table1[0].TotalFeePaid;
                            $scope.actualAttendance = resp.Table1[0].Attendance;
                            $scope.examMonthYear = resp.Table1[0].ExamMonthYear;
                            $scope.studentSubData = resp.Table2;
                            $scope.loading = false;
                            $scope.Noresult = false;
                            $scope.result = true;
                            // if ($scope.Photo == '' || $scope.Photo == null) {
                            // alert("Photo is not available, please upload photo from your college and download Hall Ticket.")
                            // $scope.result = false;
                            // $scope.LoadImg = false;
                            // }

                            // alert("No Student found with this Record");
                        }
                        else if (resp.Table[0].ResponceCode == '201') {
                            $scope.result = false;
                            $scope.challan = resp.Table2[0].ChallanNumber;
                            $scope.DetailsFound = true;
                            var stu = {
                                Pin: resp.Table1[0].Pin,
                                Name: resp.Table1[0].Name,
                                StudentContact: '',
                                Amount: resp.Table2[0].TotalAmount
                            };
                            $scope.studPin = resp.Table1[0].Pin;
                            $scope.StudentVerData = [stu];
                            $scope.FinalAmountDB = resp.Table2[0].TotalAmount;
                            $scope.modalInstance = $uibModal.open({
                                templateUrl: "/app/views/DiplomaFeePaymentPopup.html",
                                size: 'xlg',
                                scope: $scope,
                                windowClass: 'modal-fit-att',
                            });
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
                    }
                    else if ($scope.Student.id == 2) {
                        if (resp.Table[0].ResponceCode == '200') {




                            //var newDataTable = [];
                            var SemesterList = [];
                            var newDataTable = [];
                            for (var i = 0; i < resp.Table2.length; i++) {
                                if (!SemesterList.includes(resp.Table2[i].yrsem)) {
                                    SemesterList.push(resp.Table2[i].yrsem);
                                    var temp = {};
                                    temp.Subjects = [];
                                    //var Subjects = {};

                                    temp.Semester = resp.Table2[i].yrsem;
                                    temp.scheme = resp.Table2[i].scheme;
                                    temp.oldscheme = resp.Table2[i].OriginalScheme;
                                    for (var j = 0; j < resp.Table2.length; j++) {
                                        var Subject = {};
                                        if (resp.Table2[j].yrsem == temp.Semester) {
                                            Subject.SubjectCode = resp.Table2[j].sub1;
                                            Subject.bacSubjectCode = resp.Table2[j].sub2;
                                            Subject.SubjectName = resp.Table2[j].subname;
                                            Subject.scheme = resp.Table2[j].scheme;
                                            Subject.ExamDate = resp.Table2[j].ExamDate;
                                            Subject.ExamTime = resp.Table2[j].ExamTime;
                                            temp.Subjects.push(Subject);
                                        }
                                    }

                                    newDataTable.push(temp);
                                }
                            }


                            $scope.result = true;
                            $scope.studPin = resp.Table1[0].Pin;
                           // $scope.Photo = resp.Table1[0].Photo;
                            $scope.studentScheme = resp.Table1[0].Scheme;
                            $scope.studentBranch = resp.Table1[0].Branch;
                            $scope.studentSem = resp.Table1[0].Semester;
                            $scope.studentName = resp.Table1[0].Name;
                            $scope.studentFatherName ='Ramesh Kumar';
                         //   $scope.studentFatherName = resp.Table1[0].FatherName;
                            $scope.studentattendance = resp.Table1[0].PresemptiveAttendance;
                            $scope.studentPaymentStatus = resp.Table1[0].Status;
                            $scope.studentTatkalFee = resp.Table1[0].TatkalFee;
                            $scope.studentCondonationFee = resp.Table1[0].Condonation;
                            $scope.studentLateFee = resp.Table1[0].LateFee;
                            $scope.studentExamFee = resp.Table1[0].ExamFee;
                            $scope.studentTotalFee = resp.Table1[0].TotalFee;
                            $scope.studentExamCenterName = resp.Table1[0].ExaminationCenter;
                            $scope.studentExamCenterCode = resp.Table1[0].ExaminationCenterCode;
                            $scope.studentSubData = newDataTable;
                            $scope.loading = false;
                            $scope.Noresult = false;
                            $scope.result = true;
                            if ($scope.Photo == '' || $scope.Photo == null) {
                                //alert("Photo is not available, please upload photo from your college and download Hall Ticket.")
                                //$scope.result = false;
                                //$scope.LoadImg = false;
                            }

                                 alert("No Student found with this Record");
                        } else   $scope.result = false;
                            alert(resp.Table[0].ResponceDescription);
                            //  $state.go('Dashboard.PreExamination.Hallticket')
                        } else if (resp.Table[0].ResponceCode == '400') {
                           if (resp.Table[0].ResponceCode == '201') {
                         e.result = false;
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
                    }
                }
                else {
                    alert("No Hallticket founded");
                }
                //else {
                //    alert("No data Pesent");
                //}
            },
                function (error) {

                    $scope.FeeDates = [];
                    $scope.result = false;
                    alert("Error while loading Student Types");
                    console.log(error);
                });
            //}
            //else if ($scope.dateOfBirth === undefined) {
            //    alert("change the formate to DD/MM/YYYY");
            //}
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