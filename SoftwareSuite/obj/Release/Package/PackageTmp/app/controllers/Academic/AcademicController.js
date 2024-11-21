define(['app'], function (app) {
    app.controller("AcademicController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, SystemUserService, MarksEntryService, ElectivesService,  AssessmentService) {
        var authData = $localStorage.authorizationData;
        $scope.userType = authData.SystemUserTypeId;
        $scope.userName = authData.userName;
        $scope.College_Code = authData.College_Code;
        AppSettings.College_Name = authData.College_Name;
        $scope.College_Name = authData.College_Name;
        AppSettings.userName = authData.userName;
        $scope.BranchId = authData.BranchId;
        $scope.CollegeID = authData.CollegeID;
        $scope.Electivesfound = false;
        $scope.LoadImgForSubject = false;
        var ModuleId = parseInt($localStorage.selectedModule.Id);
        var usertypeId = parseInt($scope.userType);
        var getAdmissionsubmod = SystemUserService.GetSubModulesbyRole(usertypeId, ModuleId);
        getAdmissionsubmod.then(function (Usersdata) {
            var modulesList = [];          
            if (Usersdata.length > 0) {
                for (var i = 0; i < Usersdata.length; i++) {                   
                    var obj = {};
                    obj.SysModName = Usersdata[i].SubModuleName;
                    obj.SysModID = Usersdata[i].id;
                    obj.ModuleRouteName = Usersdata[i].SubModuleRouteName;
                    obj.ModuleImageClass = Usersdata[i].Class;
                    modulesList.push(obj);                 
                }
                $scope.AcademicModules = modulesList;             
            } else {
                $scope.AcademicModules = [];
            }
        }, function (err) {
            console.log(err);
        });
       var SubmodulesList=[];

        var obj = {};
        obj.SysModName = 'Syllabus Coverage';
        obj.SysModID = '4';
        obj.ModuleRouteName = 'SyllabusCoverage';
        obj.ModuleImageClass = 'small-box bg-maroon';
        SubmodulesList.push(obj);

        var obj = {};
        obj.SysModName = 'Student Feedback';
        obj.SysModID = '4';
        obj.ModuleRouteName = 'StudentFeedback';
        obj.ModuleImageClass = 'small-box bg-blue';
        SubmodulesList.push(obj);

        var obj = {};
        obj.SysModName = 'Electives Selection';
        obj.SysModID = '3';
        obj.ModuleRouteName = 'ElectiveSelection';
        obj.ModuleImageClass = 'small-box bg-yellow';
        SubmodulesList.push(obj);
        $scope.SubmodulesList = SubmodulesList; 

        $scope.openElectives = function () {
            $localStorage.Academic = {};
            var academic = {
                branchName: "",
                AcademicYearsActiveResponse:"",
                scheme: "",
                selectedsem: "",
                subjectdata:""
            }
            $state.go("Dashboard.Academic.Electives");
        }
        $scope.OpenDashboard = function () {
            $scope.homeDashBoard = true;
            $state.go("Dashboard");
        }
        $scope.OpenSubModule = function (Module) {
            $localStorage.Academic = {};
            var academic = {
                branchName: "",
                AcademicYearsActiveResponse: "",
                scheme: "",
                selectedsem: "",
                subjectdata: ""
            }
            $localStorage.Academic = academic;
            $state.go("Dashboard.Academic." + Module.ModuleRouteName);
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
            $state.go('index.WebsiteLogin');
        }

    });
});