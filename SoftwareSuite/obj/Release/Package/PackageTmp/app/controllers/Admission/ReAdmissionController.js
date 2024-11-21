define(['app'], function (app) {
    app.controller("ReAdmissionController", function ($http, $scope, $localStorage, $state, $stateParams, AppSettings, ReAdmissionService) {
       
        var authData = $localStorage.authorizationData;         
        $scope.userType = authData.SystemUserTypeId
        //$scope.College_Code = authData.College_Code;
        $scope.College_Code = authData.userName;
        $scope.LoadImg = false;
        $scope.showReAdmissionList = false;
        $scope.DisplayButton = true;
        $scope.responsedata = [];
        $scope.SemesterData = [];
        $scope.AcaYrData = [];
        $scope.SchemeData = [];
        if ($scope.userType == 2) {
            var data = {};
            $scope.$emit('showLoading', data);
            var ReAdmissionlistByCollege = ReAdmissionService.GetReAdmissionListByCollegeCode($scope.College_Code);
            ReAdmissionlistByCollege.then(function (response) {
                if (response.length > 0) {
                    $scope.$emit('hideLoading', data);
                    if (response[0].ResponseCode == '400') {
                        $scope.$emit('hideLoading', data);
                        $scope.LoadImg = false;
                        $scope.NoResult = true;
                        $scope.showReAdmissionList = false;
                        alert(response[0].ResponseDescription);
                        $scope.ErrorMsg = response[0].ResponseDescription 
                        $scope.LastDate = response[0].LastDate
                    } else {
                        $scope.$emit('hideLoading', data);
                        var SrNo = 1
                        $scope.NoResult = false;
                        $scope.responsedata = response;

                        console.log($scope.responsedata)

                        $scope.LoadImg = false;

                        $scope.showReAdmissionList = true;
                        for (var i = 0; i < response.length; i++) {
                            response[i].ReAdmitStudSrNo = SrNo;
                            SrNo = SrNo + 1;
                        }
                    }
                } 
                else {
                    $scope.$emit('hideLoading', data);
                    $scope.LoadImg = false;
                    $scope.NoResult = true;
                    $scope.showReAdmissionList = false;
                    alert("Data Not Found");
                    $scope.responsedata = [];
                    return;
                }

            }, function (error) {
                $scope.$emit('hideLoading', data);
                alert("error");
                $scope.NoResult = true;
                $scope.showReAdmissionList = false;
            });


        }
       
       
       

        $scope.AddDetainedStudent = function (AcademicYear, Deatainedscheme, DetainedSem, Pin) {
            var collegecode = $scope.College_Code;
            var AcademicYr = AcademicYear;
            var scheme = Deatainedscheme;
            var semid = DetainedSem;
            var pin =Pin;
            var AddDetainedStudent = ReAdmissionService.RegisterDetainedStudent(collegecode, AcademicYr, scheme, semid, pin);
            AddDetainedStudent.then(function (response) {
                var res = JSON.stringify(response)
               
               if (res == "{}" || res == null || res == "") {
                    alert("student Added Successfully");
                }else{
                   alert(res);
                }
                  $state.go($state.$current, null, { reload: true });
               
            }, function (error) {
                alert("error");
                console.log(error);

            });
        };

        $scope.showAddStudent = function () {
            $scope.AddStudent = true;
            $scope.DisplayButton = false;

            var ReAdmissionDisplayList = ReAdmissionService.GetReAdmissionDisplayListBYCollegeCode($scope.College_Code);
            ReAdmissionDisplayList.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.AcaYrData = response.Table;
                    $scope.SchemeData = response.Table1;
                    $scope.SemesterData = response.Table2;
                } else {
                    alert("dropdowndata not found");
                    $scope.SemesterData = [];
                    $scope.AcaYrData = [];
                    $scope.SchemeData = [];
                }
            }, function (error) {
                alert("error");
            });

        }
        //$scope.hasError = function (field, validation) {
        //    if (validation) {
        //        return ($scope.StudentDetainedForm[field].$dirty && $scope.StudentDetainedForm[field].$error[validation]) || ($scope.submitted && $scope.StudentDetainedForm[field].$error[validation]);
        //    }
        //    return ($scope.StudentDetainedForm[field].$dirty && $scope.StudentDetainedForm[field].$invalid) || ($scope.submitted && $scope.StudentDetainedForm[field].$invalid);
        //};

        $scope.showDetails = function (CollegeCode, BranchCode, semid, AcademicYear, Scheme) {
           
            AppSettings.College_Code = CollegeCode;
            AppSettings.BranchCode = BranchCode;
            AppSettings.Semid = semid;
            AppSettings.AcademicYear = AcademicYear;
            AppSettings.Scheme = Scheme;
            $state.go('Dashboard.AdmissionDashboard.ReAdmissionStudentList');

        }
    });
});