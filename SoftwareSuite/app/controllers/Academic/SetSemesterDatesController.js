define(['app'], function (app) {
    app.controller("SetSemesterDatesController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MarksEntryService, MenuService, AssessmentService, AcademicService) {

        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.CollegeID = authData.CollegeID;
        $scope.CollegeID = authData.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.PrevAdmNo = authData.PrevAdmNo;
        AppSettings.TypeFlag = authData.TypeFlag;
        AppSettings.MngtTypID = authData.MngtTypID;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID;
        AppSettings.SeqNo = authData.SeqNo;
        AppSettings.DistrictIDs = authData.DistrictIDs;
        $scope.College_Code = authData.College_Code;
        $scope.College_Name = authData.College_Name;
        $scope.SystemUserTypeId = authData.SystemUserTypeId;
        $scope.BranchId = authData.BranchId;
        $scope.ShowSetDates = true;
        $scope.MarksEntryData = {};

        var AcademicYearsActive = AssessmentService.GetAcademicYearsActive();
        AcademicYearsActive.then(function (response) {

            // $scope.AcademicYearsActive = response.Table[0].AcademicYear;
            $scope.years = response.Table[0];

        },
        function (error) {
            alert("error while loading Academic Year");
        });


        var GetdSemdta = AcademicService.GetSetSemesterData()
        GetdSemdta.then(function (response) {
            $scope.MarksEntryData = response.Table;
        },
     function (error) {
         alert("error while Getting Semester Dates");
         var err = JSON.parse(error);
         console.log(err.Message);

     });


        $scope.LoadSemisters = function () {
            var LoadActiveSemesters = AcademicService.getActiveSemester();
            LoadActiveSemesters.then(function (response) {
                $scope.ActiveSemesters = response.Table;
            },
            function (error) {
                alert("error while loading semesters");
                var err = JSON.parse(error);
                console.log(err.Message);
            });

        }


        $scope.SetDates = function () {

            $scope.ShowSetDates = true;

        }
        $scope.OpenDashboard = function () {
            $scope.homeDashBoard = true;
            $state.go("Dashboard");
        }


        var schemeStatus = AssessmentService.getSchemeStatus();
        schemeStatus.then(function (response) {
            $scope.schemeinfo = response.Table;



        }, function (error) {
            alert("error while loading semesters");
            var err = JSON.parse(error);
            console.log(err.Message);
        });




        $scope.submit = function (semesterId, schemeId, StartDate, EndDate) {
           
                var Academicid = $scope.years.AcademicID;
                var Semid = semesterId;
                var Scheamid = schemeId;
                var fromdate = StartDate;
                var todate = EndDate;
                fromdate = moment(fromdate, "DD-MM-YYYY").add(1, 'days');
                todate = moment(todate, "DD-MM-YYYY").add(1, 'days');
               
                var PostSetDates = AcademicService.PostSetDates(Scheamid, Semid, fromdate, todate, Academicid);
                PostSetDates.then(function (response) {
                    alert("data  insertd")

                    $scope.semesterId = '';
                    $scope.schemeId = '';
                    $scope.StartDate = '';
                    $scope.EndDate = '';
                    $scope.Academicid = '';

                    var GetdSemdta = AcademicService.GetSetSemesterData()
                    GetdSemdta.then(function (response) {

                        $scope.MarksEntryData = response.Table;
                    },

                 function (error) {
                     alert("error while Getting Semester Dates");
                     var err = JSON.parse(error);
                     console.log(err.Message);

                 });
                
                
                },

               
                    function (error) {
                        let err = JSON.parse(error);
                        console.log(err.Message);
                    });



            

        }

        $scope.logOut = function () {
            $scope.$emit("logout", authData.userName);
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;

            var InsertLoginList = MenuService.GetUpdateLogoutInfo(AppSettings.LoggedUserId, $scope.userName);
            InsertLoginList.then(function (Districtdata, status, headers, config, error) {
            }, function (error) {
                alert(error);
            });
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };

        }
    });



});
