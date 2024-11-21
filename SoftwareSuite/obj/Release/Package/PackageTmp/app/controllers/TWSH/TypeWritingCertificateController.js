define(['app'], function (app) {
    app.controller("TypeWritingCertificateController", function ($scope, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {
        $scope.RegistrationNo=localStorage.getItem('RegistrationNo')
        var authData = $localStorage.Twsh;
        $scope.userType = authData.UserTypeId;
        var studData =$localStorage.TwshStudentData
        $scope.Result = studData.Result
        $scope.GradeId = studData.GradeId
        var GetInstituteReports = TwshStudentRegService.GetTwshCertificateData($scope.RegistrationNo);
        GetInstituteReports.then(function (response) {
            if (response.length > 0) {
                $scope.data = true;

                $scope.StudentDetails = response[0];
                
            } else {
                $scope.StatusMessage = "No Data Found";
                $scope.showStatus = true;
                $scope.statusclass = 'alert-danger';
                $scope.data = false;
            }
        },
            function (error) {
                $scope.StatusMessage = "No Data Found";
                $scope.showStatus = true;
                $scope.statusclass = 'alert-danger';
                $scope.data = false;

            });

        $scope.Name = "Ramu";
        $scope.FatherName = "Ramesh";
        $scope.RegNo = "TEH219090194";
        $scope.Course = "TYPEWRITING ENGLISH(45 WPH)";
        $scope.MonthYear = "September-2019";
        $scope.College = "AT GOVERNMENT POLYTECHNIC, WARANGAL";
        $scope.Class = "SECOND DIVISION";
        $scope.DOB = "01/11/1996";
        $scope.Today = new Date();
        $scope.Institute = "Laxmi Narayana Typpewriting Institute,Mayuri Mall Complex,Kishan Pura,Hanumakonda";
        $scope.paper1 = "56";
        $scope.paper2 = "50";

        $scope.PrintData = function () {
            var GetInstituteReports = TwshStudentRegService.UpdateCertificateData($scope.RegistrationNo);
            GetInstituteReports.then(function (response) {
            },
            function (error) {
               

            });
          
            window.print();
         
        }
    })
})