define(['app'], function (app) {
    app.controller("CondonationListController", function ($scope, $http, $localStorage, $state, AppSettings, PreExaminationService, AssessmentService, MarksEntryService) {

        var authData = $localStorage.authorizationData;
        $scope.Student = {};
        $scope.Student.id = '';
        $scope.isShowResults = false;
        $scope.isPrincipalTable = false;
        $scope.isHodTable = false;
        $scope.isAllchecked = false;
        var PaymentStudentList = [];

        Array.prototype.remByVal = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === val) {
                    this.splice(i, 1);
                    i--;
                }
            }
            return this;
        }


        $scope.selectEntity = function (data) {
            $scope.isTopChecked = false;
            if (data != null) {
                if (!PaymentStudentList.includes(data)) {
                    PaymentStudentList.push(data);
                }
                else if (PaymentStudentList.includes(data)) {
                    PaymentStudentList.remByVal(data);
                }

            }

        };


        $scope.selectAll = function () {
            if ($scope.isAllchecked == true) {

                $scope.isAllchecked = false;
                PaymentStudentList = [];
            }
            else if ($scope.isAllchecked == false) {
                $scope.isAllchecked = true;
                PaymentStudentList = [];
                for (var i = 0; i < $scope.ExamPayment.length; i++) {
                    PaymentStudentList.push($scope.ExamPayment[i].Pin);
                }
            }
            $scope.PaymentStudentList = PaymentStudentList;

        };

        $scope.approve = function () {
            if (PaymentStudentList.length > 0) {
                console.log(PaymentStudentList);
            }
            else
                alert("Select any student to pay");
        }

        $scope.GetOnrole = function (data) {
            $localStorage.authorizationData.onROleDetails = data;
            $state.go("Dashboard")
        }
        var ApprovalData = $localStorage.authorizationData.onROleDetails;
        var ApprovalList = PreExaminationService.getCondonationApprovalList(authData.SystemUserTypeId, ApprovalData.CollegeCode, ApprovalData.BranchCode, ApprovalData.Semester);
        ApprovalList.then(function (response) {

            $scope.ExamPayment = response;
            if (response.length > 0) {
                $scope.isShowResults = true;
                if (authData.SystemUserTypeId == 2) {
                    $scope.isPrincipalTable = true;
                }
                else if (authData.SystemUserTypeId == 3) {
                    $scope.isHodTable = true;
                }
            }
            else {
                alert("No Data Found")
            }

        },
        function (error) {
            alert("error while loading Academic Year");
        });

        if (authData.SystemUserTypeId == 3 || authData.SystemUserTypeId == 2) {
            $scope.isShowTags = true;
            if (authData.SystemUserTypeId == 2) {
                $scope.isPrincipalTable = true;
            }
            else if (authData.SystemUserTypeId == 3) {
                $scope.isHodTable = true;
            }

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


            var AcademicYearsActive = AssessmentService.GetAcademicYearsActive();
            AcademicYearsActive.then(function (response) {
                $scope.years = response.Table[0];

            },
            function (error) {
                alert("error while loading Academic Year");
            });
            $scope.showPaymentDetails = function () {

                if ($scope.Student.id !== undefined && $scope.Student.id != '') {

                    var getAdmissionsubmod = PreExaminationService.getApproveExamFee(authData.SysUserID, $scope.Student.id);
                    getAdmissionsubmod.then(function (Usersdata) {


                        if (Usersdata.length > 0) {
                            $scope.isShowResults = true;
                            $scope.ExamPayment = Usersdata;
                        }
                        else {
                            $scope.isShowResults = false;
                            $scope.AcademicModules = [];
                            alert("No Data Found");
                        }

                    }, function (err) {
                        $scope.isShowResults = false;
                        console.log(err);
                    });
                }
                else {
                    alert("please select required fields");
                }

            }
        }

    })
})