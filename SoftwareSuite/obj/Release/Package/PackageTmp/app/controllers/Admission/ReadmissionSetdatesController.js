define(['app'], function (app) {
    app.controller("ReadmissionSetdatesController", function ($scope, $http, $localStorage, $state, AppSettings, PreExaminationService, MarksEntryService, AssessmentService, AdmissionService) {

      
        var AcademicYearsActive = AssessmentService.GetAcademicYearsActive();
        AcademicYearsActive.then(function (response) {
            $scope.years = response.Table[0];
            if ($scope.years.AcademicID !== null && $scope.years.AcademicID !== 'undefined') {
                let academicId = $scope.years.AcademicID;


            } else {
                $scope.MarksEntryData = [];

            }
        },
        function (error) {
            alert("error");
        });

        $scope.setAcademicYears = function (years) {
            $scope.years = years;
        }


        var LoadActiveSemesters = AssessmentService.getActiveSemester();
        LoadActiveSemesters.then(function (response) {
            $scope.ActiveSemesters = response.Table;
        },
        function (error) {
            alert("error while loading semesters");
            var err = JSON.parse(error);
            console.log(err.Message);
        });


            var GetReadmissionSetSate = AdmissionService.GetReadmissionSetSate();
            GetReadmissionSetSate.then(function (response) {
                $scope.GetReadmission = response.Table;
            },
            function (error) {

                alert("error while loading");
                var err = JSON.parse(error);
                console.log(err.Message);

            });



            $scope.Savedate = function () {

                if ($scope.ReadmissionSetdates.$valid) {
               

                    var Acadamicid = 6;
                    //let Acadamicid = parseInt($scope.years.AcademicYear);
                    let Semster = parseInt($scope.current_schemeid);
                    var fromdate = moment($scope.StartDate).format("DD-MM-YYYY");
                    var Todate = moment($scope.EndDate).format("DD-MM-YYYY");
                    var fineamount = $scope.fineAmount;
                    var variableData = AdmissionService.SaveReadmisssiondata(Acadamicid, Semster, fromdate, Todate, fineamount);
                    variableData.then(function (response) {
                        alert("data saved successful");

                        $scope.current_schemeid = "";
                        $scope.StartDate = "";
                        $scope.EndDate = "";
                        $scope.fineAmount = "";

                        
                            var ReadmissionSetSate = AdmissionService.GetReadmissionSetSate();
                            ReadmissionSetSate.then(function (response) {
                                $scope.GetReadmission = response.Table;
                            },
                            function (error) {

                                alert("error while loading");
                                var err = JSON.parse(error);
                                console.log(err.Message);

                            });


                        },


                        function (error) {

                            alert("Something went wrong");
                            var err = JSON.parse(error);
                            console.log(err.Message);

                        });
                    }
                    else {
                    alert("Please Fill the All input Filedss")
                }
            

            
        }

    });
});