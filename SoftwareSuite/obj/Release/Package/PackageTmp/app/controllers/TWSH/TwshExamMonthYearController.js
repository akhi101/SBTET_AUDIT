define(['app'], function (app) {
    app.controller("TwshExamMonthYearController", function ($scope, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {
        
        const $ctrl = this;
        $ctrl.$onInit = () => {
            //$scope.GetExamYearMonth();
            $scope.ExamMonthYear = "";
        }

        var AcademicYearsActive = TwshStudentRegService.GetTwshAcademicYears();
        AcademicYearsActive.then(function (response) {

            //  $scope.years = response.Table[0];
            $scope.Acayears = response.Table;

        },
            function (error) {
                alert("error while loading Academic Year");
            });

        $scope.Submit = function () {
            var datatypeid = 1

            if ($scope.ExamMonthYear == null || $scope.ExamMonthYear == undefined || $scope.ExamMonthYear == "") {
                alert("Enter exam month and year.");
                return;
            }
            var ApprovalList = TwshStudentRegService.SetTwshExamMonthYear(datatypeid, $scope.year, $scope.ExamMonthYear, 0, 0);
            ApprovalList.then(function (res) {
                var response = JSON.parse(res)
                $scope.ExamMonthYear = "";
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription);
                    $scope.GetExamYearMonth($scope.year);
                } else if (response[0].ResponceCode == '400') {
                    alert(response[0].ResponceDescription);
                    $scope.GetExamYearMonth($scope.year);
                } else {
                    alert('Something Went Wrong')
                }
            },
        function (error) {
          
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

            if (data.ExamMonthYear == null || data.ExamMonthYear == undefined || data.ExamMonthYear == "") {
                alert("Enter exam month and year.");
                return;
            }
            if (data.SequenceId == null || data.SequenceId == undefined || data.SequenceId == "") {
                alert("Enter SequenceId.");
                return;
            }
            var SetSemester = TwshStudentRegService.SetTwshExamMonthYear(datatypeid,data.AcademicID, data.ExamMonthYear, parseInt(data.Id), parseInt(data.SequenceId))
            SetSemester.then(function (response) {
                var response = JSON.parse(response)
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription)
                    $scope.GetExamYearMonth($scope.year);
                } else if (response[0].ResponceCode == '400') {
                    alert(response[0].ResponceDescription);
                    $scope.GetExamYearMonth($scope.year);
                } else {
                    alert('Something Went Wrong')
                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }

        $scope.GetExamYearMonth = function () {
            var ApprovalLists = TwshStudentRegService.getTwshExamMonthYearsbyID($scope.year);
            ApprovalLists.then(function (response) {
                try {
                    var response = JSON.parse(response);
                }
                catch {error }
                $scope.getData = response.Table;
                for (var j = 1; j < response.Table.length + 1; j++) {
                    $scope['edit' + j] = true;
                }

          /*  //*/}, function (error) {
              
            });
        }



        $scope.setExamCentreStatus = function (Id, Status ) {
            if (Status == true) {
                Status = 1
            } else {
                Status = 0
            }
            var SetStatus = TwshStudentRegService.SetExamMonthYearStatus(Id, Status);
            SetStatus.then(function (res) {
                if (res[0].ResponceCode == '400') {
                    alert(res[0].ResponceDescription)

                    //$scope.clearDefaults();
                } else {
                    alert('Exam Centre Status Updated Successfully')
                    $scope.GetExamYearMonth($scope.year);

                    //$scope.clearDefaults();
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })


        }
    })
})