define(['app'], function (app) {
    app.controller("AbsenteesListController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService, AssessmentService) {

        var authdata = $localStorage.authorizationData;
        $scope.UserName = authdata.College_Code;
        $scope.UserTypeID = authdata.SystemUserTypeId;
        $scope.BranchID = authdata.BranchId;
        $scope.endDisable = true;

        var LoadSemesters = AssessmentService.getActiveSemester();
        LoadSemesters.then(function (response) {
            $scope.ActiveSemesters = response.Table;
        },
            function (error) {
                var err = JSON.parse(error);
                console.log(err.Message);
            });

        var LoadAcademicYears = AssessmentService.getFeeAcademicYearsActive();
        LoadAcademicYears.then(function (response) {
            $scope.GetAcademicYears = response.Table;
        },
            function (error) {
                var err = JSON.parse(error);
                console.log(err.Message);
            });

      

        //$scope.GetAbsentees = function () {
        //    var absentdates = AssessmentService.getAbsenteesDates($scope.AcademicID, $scope.SemesterID);
        //    absentdates.then(function (response) {
        //        $scope.AbsenteesDates = response;
        //        //$scope.StartDate = response[0].STARTDATE;
        //        $scope.StartDate = moment(response[0].STARTDATE).format("DD-MM-YYYY")
        //        $scope.EndDate = response[0].ENDDATE;
        //        //$scope.MinDate = moment(response[0].STARTDATE).format("DD-MM-YYYY");
        //        //$scope.getStartDate();
        //    },
        //        function (error) {
        //            var err = JSON.parse(error);
        //            console.log(err.Message);
        //        });
        //}


        $scope.Submit = function () {
            if ($scope.AcademicID == null || $scope.AcademicID == '' || $scope.AcademicID == undefined) {
                alert('Please select Academic Year');
                return;
            }
            if ($scope.SemesterID == null || $scope.SemesterID == '' || $scope.SemesterID == undefined) {
                alert('Please select Semester');
                return;
            }
            if ($scope.StartDate == null || $scope.StartDate == '' || $scope.StartDate == undefined) {
                alert('Please select Start Date');
                return;
            }
            if ($scope.EndDate == null || $scope.EndDate == '' || $scope.EndDate == undefined) {
                alert('Please select End Date');
                return;
            }
            $scope.loading = true;
            //$scope.loader1 = true;
            $scope.disablebutton = true;
            var StartDate = moment($scope.StartDate).format("YYYY-MM-DD")
            var EndDate = moment($scope.EndDate).format("YYYY-MM-DD")
            if ($scope.UserName == null) {
                $scope.UserName = '';
            }
            if ($scope.UserTypeID == 1 || $scope.UserTypeID == 1014) {
                var DataType=1
            }
            else if ($scope.UserTypeID == 2) {
                var DataType = 2
            }
            else if ($scope.UserTypeID == 3) {
                var DataType = 3
            }
            var exceldownload = AssessmentService.GetAbsenteesListExcel($scope.AcademicID, $scope.SemesterID, StartDate, EndDate,$scope.UserName,$scope.BranchID,DataType);
            exceldownload.then(function (res) {
                //var response = JSON.parse(res);
                if (res[0].ResponseCode == '200') {
                    $scope.loading = false;
                    //$scope.loader1 = false;
                    $scope.disablebutton = false;
                    var location = res[0].file;
                    window.location.href = location;
                    $scope.Error1 = false;
                    $scope.Noresult = false;
                } else if (res[0].ResponseCode == '400') {
                    $scope.loading = false;
                    //$scope.loader1 = false;
                    $scope.disablebutton = false;
                    $scope.Data = false;
                    $scope.Noresult = false;
                    $scope.Error1 = true;
                    $scope.ErrMsg1 = res[0].ResponseDescription;
                    alert($scope.ErrMsg1)
                } else {
                    $scope.loading = false;
                    //$scope.loader1 = false;
                    $scope.disablebutton = false;
                    $scope.Data = false
                    alert("No Data Found");
                    $scope.Noresult = true;
                    $scope.Error1 = false;

                }
            }, function (err) {
                $scope.LoadImg = false;
                $scope.loading = false;
                //$scope.loader1 = false;
                $scope.disablebutton = false;
                alert("Error while loading");
            });

        }

       


    })
})