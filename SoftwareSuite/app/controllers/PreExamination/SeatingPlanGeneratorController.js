define(['app'], function (app) {
    app.controller("SeatingPlanGeneratorController", function ($scope, $http, $localStorage, $state, AppSettings, PreExaminationService) {
        $scope.ExamMonthYears = [];
        $scope.StudentType = [];
        $scope.ExamDates = [];
        $scope.selectedEmy = "";
        $scope.studentTypeId = "";
        $scope.selectedExamDate = "";
        $scope.timeSlot = "";
        $scope.LoadImg = false;
        $scope.seatingPerBench = "";
      
        var authData = $localStorage.authorizationData;       
        $scope.CollegeCode = authData.College_Code

        $scope.Exams = [
            { id: 1, exam: "Mid 1" },
            { id: 2, exam: "Mid 2" },
            { id: 5, exam: "Semester" }
        ];

      
        $scope.studentperbench = [{ val: 1, Id: 1 }, { val: 2, Id: 2 }, { val: 3, Id: 3 }, { val: 4, Id: 4 }];
      
        var expanded = false;
        $scope.Hallinfo = [];
        $scope.hallarr = [];
        $scope.Examsessions = [];
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetHallDetails();
            $scope.GetExamMonthYears();
        }  

        $scope.GetHallDetails = function () {
            $scope.Hallinfo = [];
          
            var GetExaminationHallData = PreExaminationService.GetExaminationHallData($scope.CollegeCode);
            GetExaminationHallData.then(function (data) {
                try { var data = JSON.parse(data) } catch (err) { }
                if (data.Table.length > 0) {                 
                    $scope.Hallinfo = data.Table;                   
                } else {
                    alert("Examination Halls Data not available.");
                }
            }, function (error) {
                    $scope.Hallinfo = [];              
            });


        }

        $scope.GetExamMonthYears = function () {
            PreExaminationService.GetExamMonthYears().then(function (res) {
                $scope.ExamMonthYears = res.Table;
            }, function (error) {
                alert("error while loading Exam Month Years");
                console.log(error);
            });
        }

        $scope.DetailsFound = false;
        var LoadExamTypeBysem = PreExaminationService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        }, function (error) {
            alert("error while loading Student Types");
            console.log(error);
        });

        $scope.getexamdates = function () {
            $scope.DetailsFound = false;
            if ($scope.studentTypeId == "" || $scope.studentTypeId == null || $scope.studentTypeId== undefined) {
                return;
            }
            if ($scope.examtype =="" || $scope.examtype==null || $scope.examtype== undefined) {
                return;
            }
            if ($scope.selectedEmy == "" || $scope.selectedEmy == null || $scope.selectedEmy == undefined) {
                return;
            }
            if ($scope.StudentTypeId != "" && $scope.selectedEmy != "") {
                var getCurrentExamDates = PreExaminationService.CurrentExamDatesForNr(parseInt($scope.selectedEmy), parseInt($scope.studentTypeId), $scope.examtype);
                getCurrentExamDates.then(function (response) {
                    if (response.Table.length > 0) {
                        $scope.ExamDates = response.Table;
                    } else {
                        $scope.ExamDates = [];
                        alert("No ExamDates Found.");
                    }
                }, function (error) {
                    alert("error while loading Exam Dates");
                    console.log(error);
                });
            }
        }

        $scope.GetExamSessionByExamDate = function () {
          
            if ($scope.studentTypeId == "" || $scope.studentTypeId == null || $scope.studentTypeId == undefined) {
                return;
            }
            if ($scope.selectedExamDate == "" || $scope.selectedExamDate == null || $scope.selectedExamDate == undefined) {
                return;
            }
          
            if ($scope.StudentTypeId != "" && $scope.selectedExamDate != "") {
                var GetExamSessionByExamDate = PreExaminationService.GetExamSessionByExamDate($scope.selectedExamDate, parseInt($scope.studentTypeId));
                GetExamSessionByExamDate.then(function (response) {
                    if (response.Table.length > 0) {
                        $scope.Examsessions = response.Table;
                    } else {
                        $scope.Examsessions = [];
                        alert("No exam Slots Found.");
                    }
                }, function (error) {
                    alert("error while loading Exam sessions");
                    console.log(error);
                });
            }
        }

        //---------------------------------
        $scope.toggleAll = function () {
            var toggleStatus = $scope.isAllSelected;
            angular.forEach($scope.Hallinfo, function (itm) { itm.selected = toggleStatus; });
            $scope.hallarr = [];
            angular.forEach($scope.Hallinfo, function (value, key) {
                if (value.selected === true) {
                    $scope.hallarr.push({ "Id": value.Id, "ExamHall": value.ExamHall, "Rows": value.Rows, "Colums": value.Columns, "NoOfStudentsPerBeanch": 1 })
                }
            });
        }
        $scope.res = function (val1, val2,id) {
            if (val1 > 6 && val2 > 1) {
                alert("no of students per bench can't exceed 1.")
                angular.forEach($scope.hallarr, function (value, key) {
                    if (angular.equals(value.Id, id)) { value.NoOfStudentsPerBeanch =1};
                });
            }
            else if ( (val1 == 6 || val1 ==5)  && val2 >2) {
                alert("no of students per bench can't exceed 2.")
                angular.forEach($scope.hallarr, function (value, key) {
                    if (angular.equals(value.Id, id)) { value.NoOfStudentsPerBeanch = 1 };
                });
            } else if (val1 == 4 && val2 > 3) {
                alert("no of students per bench can't exceed 3.")
                angular.forEach($scope.hallarr, function (value, key) {
                    if (angular.equals(value.Id, id)) { value.NoOfStudentsPerBeanch = 1 };
                });
            } 
           

            console.log($scope.hallarr);
        }


        $scope.showCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxes");
            if (!expanded) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.closeCheckbox = function () {
            var checkboxes = document.getElementById("checkboxes");
            if (!expanded) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.optionToggled = function () {
            $scope.isAllSelected = $scope.Hallinfo.every(function (itm) { return itm.selected; })
            $scope.hallarr = [];
            angular.forEach($scope.Hallinfo, function (value, key) {
                if (value.selected === true) {
                    $scope.hallarr.push({
                        "Id": value.Id, "ExamHall": value.ExamHall, "Rows": value.Rows, "Colums": value.Columns, "NoOfStudentsPerBeanch": 1})
                }
            });
        }

        //-------------------------------------------

        $scope.RemoveHall = function (Id,index) {
            var name = $scope.hallarr[index].HallName;
            if (window.confirm("Do you want to remove ExamHall: " + name)) {
                $scope.hallarr.splice(index, 1);
                angular.forEach($scope.Hallinfo, function (value, key) {
                    if (value.Id === Id) {
                        value.selected = false;
                    }
                });
            }
        }


        $scope.getSeatingData = function () {
          
            if ($scope.examtype == null || $scope.examtype == undefined || $scope.examtype == "") {
                alert("Select Exam Type.");
                return;
            }
            if ($scope.studentTypeId == null || $scope.studentTypeId == undefined || $scope.studentTypeId == "") {
                alert("Select Student Type.");
                return;
            }
            if ($scope.selectedExamDate == null || $scope.selectedExamDate == undefined || $scope.selectedExamDate == "") {
                alert("Select Exam date.");
                return;
            }
            if ($scope.timeSlot == null || $scope.timeSlot == undefined || $scope.timeSlot == "") {
                alert("Select Time Slot.");
                return;
            }
            if ($scope.selectedEmy == null || $scope.selectedEmy == undefined || $scope.selectedEmy == "") {
                alert("Select Exam Month and Year.");
                return;
            }

            if ($scope.hallarr.length <= 0) {
                alert("Please select Examination halls.");
                return;
            }


            var hallparmobj = { "datatypeid": 1, "StudentTypeId": parseInt($scope.studentTypeId), "CollegeCode": $scope.CollegeCode, "ExamMonthYearId": parseInt($scope.selectedEmy), "ExamTypeId": $scope.examtype, "Json": $scope.hallarr } 
           
            $scope.LoadImg = true;
            var SetSeatingExaminationHallData = PreExaminationService.SetSeatingExaminationHallData(hallparmobj);
            SetSeatingExaminationHallData.then(function (res) {
                try { var res = JSON.parse(res) } catch (err) { }
                if (res.Table[0].ResponceCode == '200') {
                    alert(res.Table[0].ResponceDescription);
                    $scope.generateSeatingPlan();
                } else {
                    alert("something went wrong, while adding exam halls");
                    $scope.LoadImg = false;
                }
               
              
            }, function (err) {
                $scope.LoadImg = false;
            });
        }
     
        $scope.generateSeatingPlan = function () {
            $scope.LoadImg = true;
            var seatingparmobj = { "StudentTypeId": parseInt($scope.studentTypeId), "CollegeCode": $scope.CollegeCode, "ExamDate": $scope.selectedExamDate, "timeSlot": $scope.timeSlot, "ExamMonthYearId": parseInt($scope.selectedEmy), "ExamTypeId": $scope.examtype} 
            var seatingparmobj = PreExaminationService.SeatingPlanPdf(seatingparmobj);
            seatingparmobj.then(function (res) {               
                if (res.length > 0) {
                    if (res.length > 4) {
                        try {
                            var resp = JSON.parse(JSON.parse(res));
                        } catch (err) { }
                        if (resp.Status == 200) {
                           /* alert(resp.ResponseDescription);*/
                            $scope.LoadImg = false;
                            $scope.ResultFound = true;
                            $scope.seatingpdf = window.location.origin + '/Reports/' + resp.seatingpdf + '.pdf';
                            $scope.seatingexcel = window.location.origin + resp.excelpath;
                        } else if (resp.Status == 400) {
                            $scope.LoadImg = false;
                            $scope.ResultFound = false;
                            alert(resp.ResponseDescription);
                        } else {
                            $scope.LoadImg = false;
                            $scope.ResultFound = false;
                            alert("Seating Plan not Present");
                        }
                       

                    } else {
                        $scope.LoadImg = false;
                        $scope.ResultFound = false;
                        alert("Seating Plan not Present");
                    }
                } else {
                    $scope.LoadImg = false;
                    $scope.ResultFound = false;
                    alert("Seating Plan not Present");
                }
                $scope.LoadImg = false;

            }, function (err) {
                    $scope.LoadImg = false;
                    $scope.ResultFound = false;
            });
        }
    })
})