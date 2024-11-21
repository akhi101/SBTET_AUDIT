define(['app'], function (app) {

    app.controller("TheoryMarksEntrySubjectListController", function ($scope, $http, $uibModal, $localStorage, $state, $stateParams, $location, MarksEntryService, PaymentService, AppSettings, MenuService, AssessmentService, SessionalsService) {
        var authData = $localStorage.authorizationData;
        $scope.BranchId = authData.BranchId;
        $scope.College_Code = authData.College_Code;
        $scope.subjectDetailsView = false;
        $scope.LoadImgForSubject = true;
        $scope.exams = [];

        $scope.AcademicYearsActiveResponse = $localStorage.assessment.AcademicYearsActiveResponse;
        $scope.selectedsem = $localStorage.assessment.selectedsem;
        $scope.branch = $localStorage.assessment.branchName;
        var branchCode = $localStorage.assessment.branchCode;
        $scope.payfine = false;
        $scope.ExamMonthYear = $localStorage.assessment.ExamMonthYear;
       
        $scope.AcademicYearsActiveResponse = $localStorage.assessment.AcademicYearsActiveResponse;
        $scope.selectedsem = $localStorage.assessment.selectedsem;
        $scope.branch = $localStorage.assessment.branchName;
        var AcademicId = $localStorage.assessment.AcademicYearsActiveResponse.AcademicID;
        var semId = $localStorage.assessment.selectedsem.semid;
        var schemeid = parseInt($localStorage.assessment.Scheme);
        var examTypeid = $localStorage.assessment.entryListid;
        var branchcode = $localStorage.assessment.branchCode;
        var collegeName = authData.College_Name;
        var selectedScheme = $localStorage.assessment.Scheme
        $scope.selectedScheme = $localStorage.assessment.Scheme;
        var StudentTypeId = $localStorage.assessment.StudentTypeId;
        var AcademicYearId = $localStorage.assessment.AcademicYearId
        $localStorage.assessment.redirecturl = "";

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
                            $state.go('Dashboard.AssessmentDashboard.TheorySubjectList');
                        }

                    }, function (err) {
                        console.log(err);
                    });

                } else {
                    $state.go('Dashboard.AssessmentDashboard.TheorySubjectList');
                    $scope.payfine = false;
                }

            }


        }, function (error) {

        });


        $scope.ReleaseButton = function (Submitted) {
            if (Submitted != 0) {
                alert("Release Option will be Availabe only once in Principal Login")
                return;
            }

        }

        $scope.payFineAmount = function () {
            var payfine = MarksEntryService.getPaymentDetails($scope.fineAmount, $scope.College_Code, branchcode, semId, $scope.selectedScheme, AcademicId, examTypeid, $scope.ExamMonthYear);
            payfine.then(function (req) {
                if (req.Table.length > 0) {
                    $scope.CollegeName = req.Table[0].CollegeName;
                    $scope.BranchCode = req.Table[0].BranchCode;
                    $scope.Semester = req.Table[0].Semester;
                    $scope.TransactionNo = req.Table[0].ChalanaNumber;
                    $scope.fineamount = req.Table[0].Amount;
                    $scope.payscheme = req.Table[0].Scheme;
                    $scope.paysem = req.Table[0].Semester;
                    $scope.Examtype = "Theory";
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

        $scope.Proceedtopayfine = function () {
            //var marchantid = "TSSBTET"; // live
            var marchantid = "TSSBTET"; // test
            var addInfo1 = $scope.College_Code;
            var addInfo3 = branchCode;
            var addInfo4 = $scope.loadedScheme.Scheme;
            var addInfo5 = $scope.selectedsem.sem;
            var addInfo6 = $scope.Examtype;
            var addInfo7 = "";
            var amount = $scope.fineamount.toFixed(2);
            var subMarchantid = "LATEFEE";
            $localStorage.assessment.redirecturl = 'Dashboard.AssessmentDashboard.Assessment.TheorySubjectList';
            var location = window.location.origin;
            var proceedfinePayment = PaymentService.getHashValue(location + "/Payment/BillResponse", marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.TransactionNo, amount);
            proceedfinePayment.then(function (resp) {
                if (resp != "" && resp != undefined) {
                    // var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg="
                    var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp   // live url
                    // https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg=KALYANTEST|429|NA|2|NA|NA|NA|INR|NA|R|kalyantest|NA|NA|F|8850062965|test-developer@candere.com|187|NA|NA|NA|NA|http://127.0.0.1/candere_repo/scheme/billdesk/response|9F4E06C08698DA6338428E2A36141826468E8E31C83F3B814F831AE6D6D27CFD
                    //   var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp // test url
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

        $scope.getSemSubjectsResponse = [];
        $scope.loadedScheme = {};
        $scope.loadedScheme = $scope.selectedScheme;
        $scope.LoadImgForSubject = true;
        $scope.subjectDetailsView = false;
        subType = 1;

        var getSemSubjectsService = SessionalsService.getSemSubjects(semId, branchCode, $scope.loadedScheme, subType, examTypeid, $scope.College_Code, StudentTypeId, AcademicId, $scope.ExamMonthYear);
        getSemSubjectsService.then(function (response) {
            $scope.getSemSubjectsResponse = [];
            if (response.Table !== undefined && response.Table.length > 0) {
                $scope.LoadImgForSubject = false;
                $scope.subjectDetailsView = true;
                $scope.getSemSubjectsResponse = response.Table;
            }
            else {
                $scope.LoadImgForSubject = false;
                $scope.subjectDetailsView = false;
                alert("no subjects");
                $state.go("Dashboard.AssessmentDashboard.Assessment.theory");
            }
        }, function (error) {
            $scope.LoadImgForSubject = false;
            $scope.subjectDetailsView = false;
            alert("some thing went wrong");
        });




        $scope.selectSubjectDetails = function (subject) {
            if ($scope.payfine == true) {
                alert("Last date for Marks entry is completed, pay the fine amount to proceed with marks entry. ");
                return;
            }
            $localStorage.assessment.selectSubjectDetails = subject;
            $state.go("Dashboard.AssessmentDashboard.TheoryMarksEntryList");
        }


        $scope.logOut = function () {
            $scope.$emit("logout", authData.userName);
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;

            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };

        }
    });
});
