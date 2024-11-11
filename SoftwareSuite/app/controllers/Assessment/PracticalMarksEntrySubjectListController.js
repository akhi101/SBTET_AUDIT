define(['app'], function (app) {

    app.controller("PracticalMarksEntrySubjectListController", function ($scope, $http, $localStorage, $state, $uibModal, $stateParams, $location, AppSettings, PaymentService, PreExaminationService, MarksEntryService, MenuService, AssessmentService, PracticalsService) {

        var authData = $localStorage.authorizationData;
        $scope.BranchId = authData.BranchId;
        $scope.College_Code = authData.College_Code;
        $scope.CollegeId = authData.CollegeID
        $scope.subjectDetailsView = false;
        $scope.LoadImgForSubject = true;
        $scope.exams = [];

        $scope.AcademicYearsActiveResponse = $localStorage.assessment.AcademicYearsActiveResponse;
        $scope.SelectedsemId = $localStorage.assessment.selectedsem;

        $scope.SelectedScheme = $localStorage.assessment.Scheme;
        $scope.branch = $localStorage.assessment.branchName;
        var branchCode = $localStorage.assessment.branchCode;
        var StudentTypeId = $localStorage.assessment.StudentTypeId;
        $scope.StudentTypeId = $localStorage.assessment.StudentTypeId;
        $scope.payfine = false;
        var schemeid = parseInt($localStorage.assessment.Scheme);
        $scope.ExamMonthYear = $localStorage.assessment.ExamMonthYear;
        $scope.AcademicYearsActiveResponse = $localStorage.assessment.AcademicYearsActiveResponse;
        $scope.electedsem = $localStorage.assessment.selectedsem;
        $scope.branch = $localStorage.assessment.branchName;
        var AcademicId = $localStorage.assessment.AcademicYearsActiveResponse.AcademicID;
        var semId = $localStorage.assessment.selectedsem.semid;
        var examTypeid = $localStorage.assessment.entryListid;
        var branchcode = $localStorage.assessment.branchCode;
        var collegeName = authData.College_Name;
        var selectedScheme = $localStorage.assessment.Scheme;
        $localStorage.assessment.redirecturl = "";
        var subjectDetailsApi;



        var subType = $localStorage.assessment.SubjectTypeId;

        var getDatesAndPins = MarksEntryService.getDatesFineAmount(examTypeid, semId, AcademicId, $scope.ExamMonthYear);
        getDatesAndPins.then(function (response) {

            if (response.length > 0) {
                var format = 'DD/MM/YYYY HH:mm:ss'
                let startdate = response[0].fromdate;
                let enddate = response[0].todate;
                let finedate = response[0].finedate;
                $scope.fineAmount = response[0].fine_ammount;
                // var time = moment() gives you current time. no format required. HH:mm:ss
                var CurrentDate = moment();
                var beforeTime1 = moment(startdate, format);
                var beforeTime = beforeTime1.format('DD/MM/YYYY HH:mm:ss');
                var afterTime1 = moment(enddate, format);
                var afterTime = afterTime1.format('DD/MM/YYYY HH:mm:ss');

                // let fineTime = moment(afterTime).add(1, 'days');
                var endTime1 = moment(finedate, format);
                var endTime = endTime1.format('DD/MM/YYYY HH:mm:ss')
                //$scope.payFineAmount();
                if (CurrentDate.isBetween(beforeTime1, afterTime1)) {
                    var status = MarksEntryService.getSubmitStatus($scope.College_Code, branchCode, AcademicId, semId, examTypeid, $scope.ExamMonthYear);
                    status.then(function (res) {
                        if (res.Table.length > 0) {
                            if (res.Table[0].isFinePayed == false) {
                                $scope.payfine = false;
                            }

                        }

                    }, function (err) {
                        console.log(err);
                    });


                } else if (CurrentDate.isBetween(afterTime1, endTime1)) {

                    var status = MarksEntryService.getSubmitStatus($scope.College_Code, branchCode, AcademicId, semId, examTypeid, $scope.ExamMonthYear);
                    status.then(function (res) {
                        if (res.Table.length > 0) {
                            if (res.Table[0].isFinePayed == true) {
                                $scope.payfine = false;

                            } else {
                                $scope.payfine = true;
                            }

                        }
                        else {
                            alert("Fine payment not available");
                            $state.go('Dashboard.AssessmentDashboardAssessment.PracticalSubjectList');
                        }

                    }, function (err) {
                        console.log(err);
                    });

                } else {
                    $state.go('Dashboard.AssessmentDashboardAssessment.PracticalSubjectList');
                    $scope.payfine = false;
                }

            }


        }, function (error) {

        });


        $scope.payFineAmount = function () {
            var payfine = MarksEntryService.getPaymentDetails($scope.fineAmount, $scope.College_Code, branchcode, semId, selectedScheme, AcademicId, examTypeid, $scope.ExamMonthYear);
            payfine.then(function (req) {
                if (req.Table.length > 0) {
                    $scope.CollegeName = req.Table[0].CollegeName;
                    $scope.BranchCode = req.Table[0].BranchCode;
                    $scope.Semester = req.Table[0].Semester;
                    $scope.TransactionNo = req.Table[0].ChalanaNumber;
                    $scope.fineamount = req.Table[0].Amount;
                    $scope.payscheme = $scope.loadedScheme.scheme;
                    $scope.paysem = req.Table[0].Semester;
                    $scope.Examtype = "Practicals";
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: "/app/views/paymentPopup.html",
                        size: 'xlg',
                        scope: $scope,
                        windowClass: 'modal-fit-att',
                        //backdrop: 'static',

                    });
                }
            }, function (err) { });


        }
        $scope.closeModal = function () {

            $scope.modalInstance.close();
        }

        // For Getting Scheme for label
        var schemeStatus = AssessmentService.getSchemeStatus();
        schemeStatus.then(function (response) {
            var SchemesList = response.Table;
            SchemesList.forEach(function (scheme) {
                if (schemeid === scheme.SchemeID) {
                    $scope.loadedScheme = scheme;
                }
            });

        }, function (error) {
            alert("error");
        });


        $scope.getSemSubjectsResponse = [];
        $scope.loadedScheme = {};
        $scope.loadedScheme.SchemeID = $scope.SelectedScheme;
        $scope.LoadImgForSubject = true;
        $scope.subjectDetailsView = false;
        var getSemSubjectsService = PracticalsService.getSemSubjects(semId, branchCode, $scope.SelectedScheme, subType, examTypeid, $scope.College_Code, StudentTypeId, AcademicId, $scope.ExamMonthYear);
        getSemSubjectsService.then(function (response) {
            $scope.getSemSubjectsResponse = [];
            if (response.Table !== undefined && response.Table.length > 0) {
                $scope.LoadImgForSubject = false;
                $scope.subjectDetailsView = true;
                $scope.getSemSubjectsResponse = response.Table;
                $scope.DataSubmitted = 1
                for (var i = 0; $scope.getSemSubjectsResponse.length; i++) {
                    if ($scope.getSemSubjectsResponse[i].Submitted == 0) {
                        $scope.DataSubmitted = 0
                    } 
                }
            }
            else {
                $scope.LoadImgForSubject = false;
                $scope.subjectDetailsView = false;
                alert("no subjects");
                $state.go("Dashboard.AssessmentDashboard.practicals");
            }
        }, function (error) {
            alert("some thing went wrong");
        });

        $scope.Proceedtopayfine = function () {
            //var marchantid = "TSSBTET"; // live
            var marchantid = "TSSBTET"; // test
            var addInfo1 = $scope.College_Code;
            var addInfo3 = branchCode;
            var addInfo4 = $scope.loadedScheme.Scheme;
            var addInfo5 = $localStorage.assessment.selectedsem.sem;
            var addInfo6 = $scope.Examtype;
            var addInfo7 = "";
            var amount = $scope.fineamount.toFixed(2);
            var subMarchantid = "LATEFEE";
            $localStorage.assessment.redirecturl = 'Dashboard.AssessmentDashboard.PracticalSubjectList';
            var location = window.location.origin;
            var proceedfinePayment = PaymentService.getHashValue(location + "/Payment/BillResponse", marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.TransactionNo, amount);
            proceedfinePayment.then(function (resp) {

                if (resp != "" && resp != undefined) {
                    // var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg="
                    // var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp   // live url
                    // https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg=KALYANTEST|429|NA|2|NA|NA|NA|INR|NA|R|kalyantest|NA|NA|F|8850062965|test-developer@candere.com|187|NA|NA|NA|NA|http://127.0.0.1/candere_repo/scheme/billdesk/response|9F4E06C08698DA6338428E2A36141826468E8E31C83F3B814F831AE6D6D27CFD
                    var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp // test url
                    window.location.replace(req);

                }
            }, function (err) {
                console.log(err);
            });
        }

        $scope.OpenDashboard = function () {
            $scope.homeDashBoard = true;
            $state.go("Dashboard");
        }

        $scope.ReleaseButton = function (Submitted) {
            if (Submitted != 0) {
            alert("Release Option will be Availabe only once in Principal Login")
                return;
            }
           
        }


        $scope.selectSubjectDetails = function (subject) {
            if ($scope.payfine == true) {
                alert("Last date for Marks entry is completed, pay the fine amount to proceed with marks entry. ");
                return;
            }
            $localStorage.assessment.selectSubjectDetails = subject;
            $state.go("Dashboard.AssessmentDashboard.PracticalMarksEntryList");
        }


        $scope.logOut = function () {
            $scope.$emit("logout", authData.userName);
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;
            delete $localStorage.assessment;

            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };

        }

        $scope.GetReport = function () {
            if ($scope.DataSubmitted == 0) {
                alert("Please Submit All Subjects Marks to get Report")
                return;
            }
            $scope.loading = true;
            $scope.Noresult = false
           //  CollegeId, SchemeId, SemId, ExamTypeId, BranchId, ExamMonthYearId
            var loadData1 = AssessmentService.getSubjectsReport($scope.CollegeId, $scope.SelectedScheme, semId, examTypeid, $scope.BranchId, $scope.ExamMonthYear)
            loadData1.then(function (res) {
                var data = res;
                if (data.Table.length>0) {
                    $scope.Noresult = false
                    $scope.loading = false;
                    $scope.SubjectsList = [];
                    $scope.CollegeCode = data.Table1[0].CollegeCode;
                    $scope.CollegeName = data.Table1[0].CollegeName;
                    $scope.Scheme_Code = data.Table1[0].Scheme_Code
                    $scope.Semister = data.Table1[0].Semister
                    $scope.ExamType = data.Table1[0].ExamType
                    data.Table.forEach(function (student) {
                        if (!$scope.SubjectsList.includes(student.Subject_Code))
                            $scope.SubjectsList.push(student.Subject_Code);
                    });
                    $scope.StudentDetails = data.Table1;
                    $scope.AllStudentDetails = data.Table2;

                } else if (data[0].ResponceCode == '404') {
                    $scope.Noresult = true
                    $scope.loading = false;
                    alert(data[0].ResponceDescription);
                }
                else if (data[0].ResponceCode == '400') {
                    $scope.Noresult = true
                    $scope.loading = false;
                    alert(data[0].ResponceDescription);
                } else {
                    $scope.Noresult = true
                    $scope.loading = false;
                    alert('Something Went Wrong')
                }

            }, function (error) {
                $scope.Noresult = true
                $scope.loading = false;
            });
        }

        $scope.PrintStudentResult = function (divName) {

            //var printContents = document.getElementById(divName).innerHTML;
            //var originalContents = document.body.innerHTML;

            //document.body.innerHTML = printContents;

            window.print();

            //document.body.innerHTML = originalContents;

        };

        $scope.getOldChildren = function (student) {
            var Report = [];
            var arr = $scope.StudentDetails;
            var rem = [];
            var temparr = [];
            var temparr2 = [];
            var tempsub = [];
            var subjectcodes = $scope.SubjectsList;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].pin == student.pin) {
                    Report.push(arr[i]);
                    temparr.push(arr[i]);
                    //  tempsub.push(arr[i].code);
                }
            }
            console.log(Report)
            return Report;
        };
    });
});
