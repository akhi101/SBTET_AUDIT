define(['app'], function (app) {
    app.controller("BacklogResultsController", function ($scope, $http, $localStorage, $state, AppSettings, BacklogResultsService) {
           $scope.isShowResults1 = false;
           $scope.isShowResults = false;
           $scope.getBackLogdata = {};
           $scope.result = false;
           $scope.getBacklogStudent = [];
           
         
        const $ctrl = this;

        $ctrl.$onInit = () => {
            localStorage.getItem("StudentPin")
            localStorage.removeItem("StudentPin");
        }
    
            if (localStorage.getItem("StudentPin")) {
                $scope.studentPin = localStorage.getItem("StudentPin")
                var SearchstudentBacklogs = BacklogResultsService.GetStudentByPin($scope.studentPin);
                SearchstudentBacklogs.then(function (response) {
                    if (response.length > 66) {
                        response = JSON.parse(response);
                        console.log(response);
                        $scope.getBackLogdata = response.Table;

                        $scope.getBacklogStudent = response.Table1;

                        $scope.Pin = response.Table[0].pin;
                        $scope.isShowResults1 = true;
                        $scope.isShowResults = true;
                        $scope.result = false;
                    } else {
                        $scope.result = true;
                        $scope.response = "Data Not Found";

                    }


                },
                     function (error) {
                         alert("while error geting data");
                         $scope.result = true;


                         var err = JSON.parse(error);
                         console.log(err.Message);

                     });

            }
        

        $scope.get = function () {
          
            $scope.isShowResults1 = false;
            $scope.isShowResults = false;
        }



        $scope.getDetails = function () {
          
                localStorage.setItem("StudentPin", $scope.studentPin)
                var SearchstudentBacklogs = BacklogResultsService.GetStudentByPin($scope.studentPin);
                SearchstudentBacklogs.then(function (response) {
                    if (response.length > 0) {
                        response = JSON.parse(response);
                        if (response.Table2 === undefined) {
                            $scope.getBackLogdata = response.Table;

                            $scope.getBacklogStudent = response.Table1;

                            $scope.Pin = response.Table[0].pin;
                            $scope.isShowResults1 = true;
                            $scope.isShowResults = true;
                            $scope.result = false;
                        }
                        else if (response.Table2 !== undefined && response.Table2[0].ResponceCode == '400') {
                            $scope.isShowResults1 = false;
                            $scope.isShowResults = false;
                            $scope.result = true;
                            $scope.response = response.Table2[0].ResponceDescription;
                        }
                    } else {
                        $scope.result = true;
                        $scope.response = "Data Not Found";
                        $scope.result = false;

                    }


                },
                     function (error) {
                         alert("while error geting data");
                         $scope.result = true;


                         var err = JSON.parse(error);
                         console.log(err.Message);

                     });
            


        }
        $scope.getbacklogHistory = function (subcode, result) {
            if (result != "F") {
                return;
            }
            $localStorage.Results = {};
            var Results = {
                subcode: subcode,              
                pin: $scope.Pin,
                 
            }
            $localStorage.Results = Results;

            $state.go('Dashboard.Results.BackLogDetailes');     

           

         
        }

        

    });

});