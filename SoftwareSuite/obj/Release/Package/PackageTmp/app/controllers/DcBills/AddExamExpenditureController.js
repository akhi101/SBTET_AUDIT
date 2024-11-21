define(['app'], function (app) {
    app.controller("AddExamExpenditureController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {
        var authData = $localStorage.authorizationData;  
        $scope.College_Code = authData.College_Code
        $scope.AddTrue = true;
        $scope.UpdateTrue = false;
        var loadHallticket = PreExaminationService.GetExamMonthYears();
        loadHallticket.then(function (response) {
            var response = JSON.parse(response)
            if (response.Table.length>0) {
                $scope.GetExamMonthYear = [];
                $scope.GetExamMonthYear = response.Table;
            } else {
                $scope.GetExamMonthYear = [];
                alert("No Exam Month Year found");
            }
        },
            function (error) {
                alert("error while loading Exam Month Years");
                console.log(error);
            });

        var LoadExamTypeBysem = PreExaminationService.getStudentType();

        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Exam Types found.");
            }
        },
        function (error) {
            alert("error while loading Exam Types");
            console.log(error);
        });


        var GetExamExpenditures = PreExaminationService.GetCollegeWiseExpenditure();
        GetExamExpenditures.then(function (response) {
            var response = JSON.parse(response)
            if (response.Table.length > 0) {
                $scope.GetExpenditures = response.Table;
            } else {
                $scope.GetExpenditures = [];
                alert("No Expenditures Found ");
            }
        },
        function (error) {
            alert("error while loading Expenditures");
            console.log(error);
        });



        $scope.GetData = function () {
            $scope.LoadImg = true;
            var GetExamExpenditures = PreExaminationService.GetCollegeWiseExpenditure();
            GetExamExpenditures.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table.length > 0) {
                    $scope.LoadImg = false;
                    $scope.GetExpenditures = response.Table;
                } else {
                    $scope.LoadImg = false;
                    $scope.GetExpenditures = [];
                    alert("No Expenditures Found ");
                }
            },
            function (error) {
                $scope.LoadImg = false;
                alert("error while loading Expenditures");
                console.log(error);
            });
        }
        
        $scope.EditExpenditure = function (Id) {
          
            var loadDates = PreExaminationService.GetExpenditureById(Id);
            loadDates.then(function (response) {
                //console.log(response)
                var response = JSON.parse(response)
                if (response.length > 0) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    $scope.CollegeCode=response[0].CollegeCode;
                    $scope.ExaminationType=response[0].StudentType;
                    $scope.monthyear = response[0].ExamMonthYear;                 
                    $scope.Expenditure = response[0].ExpenditureAmount;
                    $scope.Description=response[0].Description;
                    $scope.ChangeExamMonthYear()
                    $scope.ExamDate = response[0].ExamDate;
                    $scope.Id = response[0].Id;
                    $scope.AddTrue = false;
                    $scope.UpdateTrue = true;;
                } else {
                    $scope.AddTrue = true;
                    $scope.UpdateTrue = false;;
                    $scope.Timetabledates = [];
                    alert("No Time Table Dates found");
                }
            },
            function (error) {

                $scope.AddTrue = true;
                $scope.UpdateTrue = false;;
                alert("error while loading Time Table Dates");
                console.log(error);
            });
        }

        $scope.DleteExpenditure = function (Id) {

            var loadDates = PreExaminationService.DleteExpenditure(Id);
            loadDates.then(function (response) {
                //console.log(response)
                var response = JSON.parse(response)
                if (response[0].ResponseCode=='200') {
                    alert(response[0].ResponseDescription)
                    $scope.GetData()
                } else {
                 
                    //$scope.Timetabledates = [];
                    alert("Something Went wrong");
                }
            },
            function (error) {
                $scope.AddTrue = true;
                $scope.UpdateTrue = false;;
                alert("Something Went wrong");
                console.log(error);
            });
        }

        $scope.ChangeExamMonthYear = function(){
            var loadDates = PreExaminationService.GetTimetableDatesByExamMonthYear($scope.ExaminationType, $scope.monthyear);
            loadDates.then(function (response) {
               
                if (response.Table.length > 0) {
                    $scope.Timetabledates = response.Table;
                    
                } else {
                    $scope.Timetabledates = [];
                    alert("No Time Table Dates found");
                }
            },
            function (error) {
                alert("error while loading Time Table Dates");
                console.log(error);
            });
        }

        $scope.SetExpenditureUpdateData = function () {
            var DataTypeId = 1
            var loadDates = PreExaminationService.AddExpenditureData($scope.College_Code, $scope.ExaminationType, $scope.monthyear, $scope.ExamDate, $scope.Expenditure, $scope.Description, DataTypeId);
            loadDates.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode =='200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.CollegeCode = null;
                    $scope.ExaminationType = null;
                    $scope.monthyear = null;
                    $scope.Expenditure = null;
                    $scope.Description = null;
                    //$scope.ChangeExamMonthYear()
                    $scope.ExamDate = null;
                    $scope.Id = null;
                    $scope.AddTrue = true;
                    $scope.UpdateTrue = false;;
                    $scope.GetData()
                }else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                } else {
                    //$scope.Timetabledates = [];
                    alert("Something Went Wrong");
                }
            },
            function (error) {
                alert("error while loading Data");
                console.log(error);
            });
        }

        $scope.UpdateExpenditure = function () {
           
            var loadDates = PreExaminationService.UpdateExpenditureData($scope.Expenditure, $scope.Description, $scope.Id);
            loadDates.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.CollegeCode = null;
                    $scope.ExaminationType = null;
                    $scope.monthyear = null;
                    $scope.Expenditure = null;
                    $scope.Description = null;
                    //$scope.ChangeExamMonthYear()
                    $scope.ExamDate = null;
                    $scope.Id = null;
                    $scope.AddTrue = true;
                    $scope.UpdateTrue = false;;
                    $scope.GetData()
                } else {
                    $scope.Timetabledates = [];
                    alert("Something Went Wrong");
                    $scope.AddTrue = false;
                    $scope.UpdateTrue = true;;
                }
            },
            function (error) {
                alert("error while loading Data");
                $scope.AddTrue = false;
                $scope.UpdateTrue = true;;
                console.log(error);
            });
        }
        
        
    })
})