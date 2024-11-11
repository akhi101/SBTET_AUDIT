define(['app'], function (app) {
    app.controller("ReAdmissionSetDateController", function ($http, $scope, $localStorage, $state, $stateParams, AppSettings, ReAdmissionService) {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        var getAcademicYear = ReAdmissionService.getAcademicYears();
        getAcademicYear.then(function (response) {
            if (response.Table.length > 0) {

                $scope.getAcademicYears = response.Table;

            } else {

            }
        },
        function (error) {
            $scope.$emit('hideLoading', data);
        })

        today = dd + '-' + mm + '-'+ yyyy ;

        $scope.today = today;
        var today1 = new Date();
        $scope.today1 = today1.toISOString();;
        document.getElementById("datetimepicker1").setAttribute("min", today);
        $scope.submit = function () {
          
            var GetExamYearMonth = ReAdmissionService.SetReAdmissionDate($scope.StartDate, $scope.EndDate);
                GetExamYearMonth.then(function (response) {
                    if (response[0].ResponseCode == '200') {
                        alert(response[0].ResponseDescription)
                    } else {
                        alert('Something Went Wrong')
                    }
                    
                },
                        function (error) { 
                            var err = JSON.parse(error);
                            console.log(err.Message);
                            alert(err.Message)
                        });
            }
       
    })
})