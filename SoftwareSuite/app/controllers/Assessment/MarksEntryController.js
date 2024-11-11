define(['app'], function (app) {

    app.controller("MarksEntryController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MenuService, MarksEntryService) {

        var authData = $localStorage.authorizationData;
     
        $scope.userType = authdata.SystemUserTypeId;
        $scope.userName = authData.userName;
        AppSettings.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.CollegeID = authData.CollegeID;
        $scope.CollegeID = authData.CollegeID;      
        $scope.College_Code = authData.College_Code;
        $scope.College_Name = authData.College_Name;       
        $scope.BranchId = authData.BranchId;  

        $scope.subjectDetailsView = false;
        $scope.LoadImgForPinList = true;      
       
        $scope.AcademicYearsActiveResponse = $localStorage.AcademicYearsActiveResponse;
        $scope.selectedsem = $localStorage.selectedsem;
        $scope.loadedScheme = $localStorage.loadedScheme;

        var exams = [];
        $scope.exams = [];
        $scope.branch = $localStorage.branchName;
        $scope.path = $localStorage.ModuleRouteName.replace(/[^a-zA-Z0-9]+/ig, "");
        $localStorage.modulesList.forEach(function (modules) {
            if (modules.ModuleRouteName == $scope.path) {
                $scope.examName = modules.ExamNames[0][0];
                $scope.exams = modules.ExamNames[0];
                
            }
        });

        $scope.submit = function (marks) {
            marks.forEach(function (mark) {
                if (mark.value != null) {
                    console.log(exams);
                }
            });
        }
        
      









        $scope.selectSubjectDetails = $localStorage.selectSubjectDetails;
        $scope.loadedScheme.SchemeID = 5;
        var subjectPinList = MarksEntryService.getSubjectPinList($scope.AcademicYearsActiveResponse.AcademicID, $scope.loadedScheme.SchemeID, $localStorage.authorizationData.College_Code, $scope.selectedsem.semid, $localStorage.authorizationData.BranchId, $scope.selectSubjectDetails.subid);
        subjectPinList.then(function (response) {
            if (response.length > 0) {
                $scope.subjectDetailsView = true;
                $scope.LoadImgForPinList = false;
                $scope.pinWise = response;

            }
        }, function (error) {
            $scope.pinWise = [];
            $scope.subjectDetailsView = false;
            $scope.LoadImgForPinList = false;
            let err = JSON.parse(error)
            console.log(err);
           
        })

        $scope.getExamStatus = function (exam) {
            $scope.examName = exam;
            $scope.homeDashBoard = false;
        }

        $scope.OpenDashboard = function () {
            $scope.homeDashBoard = true;
            $state.go("Dashboard");
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
            $state.go('login')
        }
        

    });
});