define(['app'], function (app) {
    app.controller("RecomendApprovalController", function ($scope, $http, $localStorage, $state, AppSettings, PreExaminationService, AssessmentService, MarksEntryService) {

        var authData = $localStorage.authorizationData;
        $scope.Student = {};
        $scope.Student.id = '';
        $scope.isShowResults = false;
        $scope.isPrincipalTable = false;
        $scope.isHodTable = false;
        $scope.isAllchecked = false;
        var PaymentStudentList = [];
        var PaymentStudent = [];
        Array.prototype.remByVal = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === val) {
                    this.splice(i, 1);
                    break;
                }
            }
            return this;
        }

        Array.prototype.remByValJosn = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i].Pin === val) {
                    this.splice(i, 1);
                    break;
                }
            }
            return this;
        }


        $scope.selectEntity = function (data) {
            $scope.isTopChecked = false;
            if (data != null) {
                if (!PaymentStudentList.includes(data)) {

                    var pinData = {};
                    pinData.Pin = data;

                    PaymentStudent.push(pinData);

                    PaymentStudentList.push(data);
                }
                else if (PaymentStudentList.includes(data)) {
                    PaymentStudentList.remByVal(data);
                    PaymentStudent.remByValJosn(data);
                }

            }

        };


        $scope.selectAll = function () {
            if ($scope.isAllchecked == true) {

                $scope.isAllchecked = false;
                PaymentStudentList = [];
                PaymentStudent = [];
            }
            else if ($scope.isAllchecked == false) {
                $scope.isAllchecked = true;
                PaymentStudentList = [];
                PaymentStudent = [];
                for (var i = 0; i < $scope.ExamPayment.length; i++) {
                    var pinData = {};
                    pinData.Pin = $scope.ExamPayment[i].Pin;

                    PaymentStudent.push(data.Pin)
                    PaymentStudentList.push($scope.ExamPayment[i].Pin);


                }
            }
            $scope.PaymentStudent = PaymentStudent; 
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

        var ApprovalData = $localStorage.authorizationData.onRoleDetails;

        var ApprovalList = PreExaminationService.getApprovalSingleList(authData.SystemUserTypeId, ApprovalData.CollegeCode, ApprovalData.BranchCode, ApprovalData.Semester, ApprovalData.StudentType);
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
                            for (var i = 0; i < Usersdata.length; i++) {
                                Usersdata[i].isChecked = false;
                            }
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


        $scope.approve = function () {
            if (PaymentStudentList.length > 0) {
                console.log(PaymentStudentList);
            } else
                alert("Select Fields to approve");
        };

        $scope.recommend = function () {
            if (PaymentStudentList.length > 0) {
                //console.log(PaymentStudentList);
                var UserTypeId = authData.SystemUserTypeId
                console.log(PaymentStudent);

                var ApprovalList = PreExaminationService.setApprovalSingleList(JSON.stringify(PaymentStudent), UserTypeId);
                ApprovalList.then(function (response) {
                    if (response.length > 0) {
                        if (response[0].ResponceCode == 200) {
                            alert(response[0].ResponceDescription);
                            $state.go("Dashboard.PreExamination.Condonation");
                        }
                    }

                },
                    function (error) {
                        alert("error while loading Academic Year");
                    });


            } else
                alert("Select Fields to Recommend");
        };

    })
})