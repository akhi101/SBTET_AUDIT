define(['app'], function (app) {
    app.controller("CcicMarksEntryController", function ($scope, $window, $localStorage, $state, CcicPreExaminationService, CcicAssessmentService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        $scope.InstitutionID = authData.InstitutionID;

        var AcademicYearID = sessionStorage.getItem("AcademicYearID");
        var ExamMonthYearID = sessionStorage.getItem("ExamMonthYearID");
        var CourseID = sessionStorage.getItem("CourseID");

        const $ctrl = this;

        $ctrl.$onInit = () => {
            $scope.GetAssessmentInstitutionCourses($scope.InstitutionID);
        }


        $scope.clearSessionStorage = function () {
            sessionStorage.removeItem("AcademicYearID");
            sessionStorage.removeItem("ExamMonthYearID");
            sessionStorage.removeItem("CourseID");
        };

        // Function to detect browser refresh
        $scope.detectRefresh = function () {
            if (!performance.navigation.type || performance.navigation.type === 1) {
                // Browser refresh detected, clear session storage
                $scope.clearSessionStorage();
            }
        };

        // Call detectRefresh on page load
        $scope.detectRefresh();


        if (AcademicYearID != null || AcademicYearID != undefined || AcademicYearID != '') {
                $scope.academicYear = AcademicYearID;
                $scope.ExamMonthYear = ExamMonthYearID;
                $scope.Course = CourseID;

                var getexammonthyrdata = CcicPreExaminationService.GetExamMonthYears($scope.academicYear);
                getexammonthyrdata.then(function (response) {

                    try {
                        var res = JSON.parse(response);
                    }
                    catch (err) { }

                    if (res.Table.length > 0) {
                        $scope.ExamMonthYrData = res.Table;
                        $scope.NoData = false;
                    }
                    else {
                        $scope.ExamMonthYrData = [];
                        $scope.NoData = true;
                    }


                },

                    function (error) {
                        //alert("error while loading CurrentBatch");
                        var err = JSON.parse(error);

                    });
                var VerifyDate = CcicAssessmentService.VerifyAssesmentEntryDate(AcademicYearID, ExamMonthYearID);
                VerifyDate.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    }
                    catch { err }
                    if (res[0].ResponseCode == '200') {
                        $scope.getexamTypes();

                    } else {
                        alert('Entry Date Not Found')
                        return;
                    }

                },
                    function (error) {

                        var err = JSON.parse(error);
                    })
            

        }
            $scope.getexamTypes = function () {
                var examtypes = CcicAssessmentService.getExamTypes();
                examtypes.then(function (response) {
                    if (response.length > 0) {
                        var modulesList = [];
                        if (response.length > 0) {
                            for (var i = 0; i < response.length; i++) {
                                var obj = {};
                                obj.SysModName = response[i].ExamType;
                                obj.SysModID = response[i].Examtypeid;
                                obj.ModuleRouteName = response[i].ModuleRouteName;
                                obj.ModuleImageClass = response[i].ModuleImageClass;
                                modulesList.push(obj);

                            }
                            $scope.ExamTypes = modulesList;
                        } else {
                            $scope.ExamTypes = [];
                        }
                    }
                    else {
                        $scope.ExamTypes = [];
                        alert("Marks entry Not Available for this semester");
                    }
                }, function (error) {
                    $scope.ExamTypes = [];
                    alert("error while getting data");
                });
            }

            var GetCcicAcademicYears = CcicPreExaminationService.GetCcicCurrentAcademicYear()
            GetCcicAcademicYears.then(function (response) {
                $scope.loading = false;
                $scope.GetCcicAcademicYears = response;
                //$scope.$emit('hideLoading', data);

            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });

        $scope.GetAssessmentInstitutionCourses = function (InstitutionID) {

            var getcourses = CcicAssessmentService.GetAssessmentInstitutionCourses(InstitutionID);
            getcourses.then(function (response) {

                    try {
                        var res = JSON.parse(response);
                    }
                    catch (err) { }

                    if (res.length > 0) {
                        $scope.CoursesData = res;
                    }
                    else {
                        $scope.GetCcicCoursesByInstitution = [];
                    }

                    $scope.AffiliatedInsttitutionCourses = res;


                },
                    function (error) {
                        alert("error while loading Courses");
                        var err = JSON.parse(error);

                    });
            }

            $scope.GetExamMonthYearData = function (academicYear) {
                if (academicYear == null || academicYear == undefined || academicYear == "") {
                    return;

                }
                $scope.academicYear = academicYear;
                var getexammonthyrdata = CcicPreExaminationService.GetExamMonthYears(academicYear);
                getexammonthyrdata.then(function (response) {

                    try {
                        var res = JSON.parse(response);
                    }
                    catch (err) { }

                    if (res.Table.length > 0) {
                        $scope.ExamMonthYrData = res.Table;
                        $scope.NoData = false;
                    }
                    else {
                        $scope.ExamMonthYrData = [];
                        $scope.NoData = true;
                    }


                },

                    function (error) {
                        alert("error while loading CurrentBatch");
                        var err = JSON.parse(error);

                    });


            }


            $scope.verifyDates = function () {
                var VerifyDate = CcicAssessmentService.VerifyAssesmentEntryDate($scope.academicYear, $scope.ExamMonthYear);
                VerifyDate.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    }
                    catch { err }
                    if (res[0].ResponseCode == '200') {
                        $scope.getexamTypes();

                    } else {
                        alert('Entry Date Not Found')
                        return;
                    }

                },
                    function (error) {

                        var err = JSON.parse(error);
                    })
            }




            $scope.OpenAssessmentModule = function (RouteName) {

                if (RouteName.ModuleRouteName == "Internals" || RouteName.ModuleRouteName == "Practicals") {
                    $localStorage.TempData = {
                        AcademicYearID: $scope.academicYear,
                        ExamMonthYearID: $scope.ExamMonthYear,
                        InstitutionID: authData.InstitutionID,
                        CourseID: $scope.Course,
                        ExamTypeID: RouteName.SysModID,
                        ExamType: RouteName.ModuleRouteName

                    };
                    $state.go('CcicDashboard.Assessment.SubjectList')
                }


            }

        
        $scope.logOut = function () {
            //$scope.$emit("logout", authData.UserName);
            sessionStorage.loggedIn = "no";
            var GetCcicUserLogout = CcicSystemUserService.PostCcicUserLogout($scope.UserName, $scope.SessionID);

            delete $localStorage.authorizationData;
            delete $localStorage.authToken;
            delete $scope.SessionID;

            $scope.authentication = {
                isAuth: false,
                UserID: 0,
                UserName: ""
            };
            $state.go('CcicLogin');
        }

    });
});

