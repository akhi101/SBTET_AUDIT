define(['app'], function (app) {
    app.controller("TheoryEventsController", function ($scope, $http, $localStorage, $location, $state, $stateParams, AppSettings, MenuService, AssessmentService) {
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.userName = authData.userName;
        AppSettings.CollegeID = authData.CollegeID;
        $scope.CollegeID = authData.CollegeID;
        $scope.College_Code = authData.College_Code;
        $scope.College_Name = authData.College_Name;
        $scope.BranchId = authData.BranchId;
        $scope.Loading = true
        $scope.Data = false;
        $scope.Noresult = false;
        $scope.exams = [];

        $scope.exams = [];
        $scope.ExamCategoryList = [];
        $scope.AcademicYearsActiveResponse = $localStorage.assessment.AcademicYearsActiveResponse;
        $scope.selectedsem = $localStorage.assessment.selectedsem;
        $scope.branch = $localStorage.assessment.branchName;
        var AcademicId = $localStorage.assessment.AcademicYearsActiveResponse.AcademicID;
        var semId = $localStorage.assessment.selectedsem.semid;
        $scope.ExamMonthYear = $localStorage.assessment.ExamMonthYear;
        var schemeid = $localStorage.assessment.SchemeId;
        $scope.Scheme = $localStorage.assessment.Scheme;
        var SubjectTypeId = $localStorage.assessment.SubjectTypeId;
        var StudentTypeId = $localStorage.assessment.StudentTypeId
        var branchcode = $localStorage.assessment.branchCode;
        var collegeName = authData.College_Name;
        var selectedScheme = $localStorage.assessment.Scheme;




        var getSchemeWiseExam = AssessmentService.getSchemeWiseExams(StudentTypeId, schemeid, semId, SubjectTypeId, $scope.ExamMonthYear);
        getSchemeWiseExam.then(function (response) {
            try {
                var response = JSON.parse(response);
            } catch (ex) { }
            if (response.Table[0].ResponceCode == '200') {
                $scope.Loading = false
                $scope.Data = true;
                $scope.Noresult = false;
                var modulesList = [];
                if (response.Table1.length > 0) {
                    for (var i = 0; i < response.Table1.length; i++) {
                        var obj = {};
                        obj.SysModName = response.Table1[i].ExamNames;
                        obj.SysModID = response.Table1[i].ExamTypeId;
                        obj.ModuleRouteName = response.Table1[i].ModuleRouteName;
                        obj.ModuleImageClass = response.Table1[i].ModuleImageClass;
                        modulesList.push(obj);

                    }
                    $scope.ExamCategoryList = modulesList;
                } else {
                    $scope.Loading = false
                    $scope.Noresult = true;
                    $scope.Data = false;
                    $scope.ExamCategoryList = [];
                    alert(response.Table[0].ResponceDesription);
                }

            } else {
                $scope.Loading = false
                $scope.Data = false;
                $scope.Noresult = true;
                $scope.ExamCategoryList = [];
                alert(response.Table[0].ResponceDesription);
            }


        }, function (error) {
            $scope.Noresult = true;
            $scope.Loading = false
            $scope.Data = false;
            alert("error");
        });


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

        $scope.AcademicYearsActiveResponse = $localStorage.assessment.AcademicYearsActiveResponse;
        $scope.selectedsem = $localStorage.assessment.selectedsem;
        $scope.branch = $localStorage.assessment.branchName;

             

        $scope.Showsubjects = function (exam) {
            $localStorage.assessment.entryListid = exam.SysModID;
            $state.go("Dashboard.AssessmentDashboard.TheoryReports");

        },

        $scope.OpenDashboard = function () {
            $state.go("Dashboard");
        },

        $scope.logOut = function () {
            $scope.$emit("logout", authData.userName);
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;
            delete $localStorage.assesment;

           
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };
            $state.go('login');
        }
    });
});
