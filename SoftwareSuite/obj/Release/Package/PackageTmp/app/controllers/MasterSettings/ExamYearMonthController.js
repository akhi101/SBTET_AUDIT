define(['app'], function (app) {
    app.controller("ExamYearMonthController", function ($scope, $http, $localStorage, $state, AppSettings, AdmissionService, PreExaminationService, AssessmentService, MarksEntryService,MasterSettingsService) {

        var getSchemes = AdmissionService.GetSchemes();
        getSchemes.then(function (response) {
         //   console.log(response);
            $scope.getSchemes = response.Table;
        },
                function (error) {
                    alert("error while loading Schemes");
                    var err = JSON.parse(error);                       
                });

        var GetExamYearMonth = PreExaminationService.getExamYearMonth(5);
        GetExamYearMonth.then(function (response) {
            if (response.Table.length > 0) {

      
            $scope.result = true;
            $scope.getExamYearMonth = response.Table;
            } else {
                $scope.result = false;
                $scope.ResultNotFound = true;
            }
           
        },
                function (error) {
                    $scope.result = false;
                    $scope.ResultNotFound = true;
                    alert("error while loading data");
                    var err = JSON.parse(error);
                    //    console.log(err.Message);          
                });



        var getAcademicYears = AdmissionService.GetAcademicYears();
        getAcademicYears.then(function (response) {
            console.log(response);
            $scope.getAcademicyears = response.Table;
        },
                function (error) {
                    alert("error while loading Academic years");
                    var err = JSON.parse(error);
                    //    console.log(err.Message);          
                });

        var LoadActiveSemesters = AssessmentService.getActiveSemester();
        LoadActiveSemesters.then(function (response) {
            $scope.ActiveSemesters = response.Table;
        },
        function (error) {
            alert("error while loading semesters");
            var err = JSON.parse(error);
            console.log(err.Message);
        });

        var LoadExamTypeBysem = MarksEntryService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
        function (error) {
            alert("error while loading Student Types");
            console.log(error);
        });


        $scope.Submit = function () {
        
                var LoadExamTypeBysem = MasterSettingsService.SetMonthYear($scope.current_semId, $scope.currentAcademicYear, $scope.current_schemeid, $scope.Student.id, $scope.currentYearMonth);
                LoadExamTypeBysem.then(function (response) {
                    console.log(response);
                    if (response.length > 0) {
                        //    $scope.StudentType = response[0].RespoceDescription;
                        alert("Data Inserted Sucessfully");

                        var GetExamYearMonth = PreExaminationService.getExamYearMonth(5);
                        GetExamYearMonth.then(function (response) {
                            console.log(response);

                            $scope.getExamYearMonth = response.Table;

                        },
                                function (error) {
                                    alert("error while loading data");
                                    //    $scope.result = false;

                                    //    console.log(err.Message);          
                                });
                    } else {

                        alert("Unable to Insert data");
                    }

                },
                function (error) {

                    //    alert("error while loading datas");
                    console.log('Error while Inserting Data');
                }

                );
         
          
        }

        $scope.SetCurrentMonth = function () {
            var currentMonth = MasterSettingsService.SetCurrentMonthYear($scope.StudentTypeId, $scope.activeMonthYear);
            currentMonth.then(function (response) {
                if (response.length > 0) {
                    alert('Month & Year Activated Successfully')
                }
            },
            function (error) {
                alert("error while Inserting Data");
               // console.log(error);
            });
        }
        $scope.changeMonthYear = function (StudentTypeId) {
            $scope.StudentTypeId = StudentTypeId
        }

    })
})
