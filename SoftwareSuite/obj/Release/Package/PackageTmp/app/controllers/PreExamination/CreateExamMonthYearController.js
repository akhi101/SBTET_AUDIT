define(['app'], function (app) {
    app.controller("CreateExamMonthYearController", function ($scope, $http, $localStorage, $state, AppSettings, PreExaminationService, $timeout) {


        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetExamYearMonth();  
            $scope.ExamMonthYear = "";
        }
        

        $scope.Submit = function () {
            var datatypeid = 1
          
            if ($scope.ExamMonthYear == null || $scope.ExamMonthYear == undefined || $scope.ExamMonthYear == "") {
                alert("Enter exam month and year.");
                return;
            }
            var ApprovalList = PreExaminationService.SetExamMonthYear(datatypeid,$scope.ExamMonthYear,0,0);
            ApprovalList.then(function (response) {  
                $scope.ExamMonthYear = "";
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription);
                    $scope.GetExamYearMonth();
                }else
                    if (response[0].ResponceCode == '400') {
                        alert(response[0].ResponceDescription);
                        $scope.GetExamYearMonth();
                } else {
                    alert('Something Went Wrong')
                }
            },
        function (error) {
            alert("error while loading Exam Month Year");
            $scope.$emit('hideLoading', data);
        });
        }

        $scope.Editsemesterdat = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";             
            }
            $scope['edit' + ind] = false;

        }

        $scope.Updatesemesterdat = function (data, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";              
            }
                      

            var datatypeid = 2;

            if (data.ExamYearMonth == null || data.ExamYearMonth == undefined || data.ExamYearMonth == "") {
                alert("Enter exam month and year.");
                return;
            }
            if (data.SequenceId == null || data.SequenceId == undefined || data.SequenceId == "") {
                alert("Enter SequenceId.");
                return;
            }
            var SetSemester = PreExaminationService.SetExamMonthYear(datatypeid, data.ExamYearMonth, parseInt(data.Id), parseInt(data.SequenceId))
            SetSemester.then(function (response) {
               // var response = JSON.parse(response)
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription)
                    $scope.GetExamYearMonth();
                }else if (response[0].ResponceCode == '400') {
                        alert(response[0].ResponceDescription);
                        $scope.GetExamYearMonth();
                } else {
                    alert('Something Went Wrong')
                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }

        $scope.GetExamYearMonth = function () {
            var ApprovalLists = PreExaminationService.getExamYearMonths();
            ApprovalLists.then(function (response) {             
                $scope.getData = response.Table;
                for (var j = 1; j < response.Table.length + 1; j++) {
                    $scope['edit' + j] = true;
                }

            },function (error) {
                    alert("error while loading Academic Year");

                });
        }
    })
})