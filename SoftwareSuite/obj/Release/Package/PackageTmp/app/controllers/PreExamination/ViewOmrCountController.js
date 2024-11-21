define(['app'], function (app) {
    app.controller("ViewOmrCountController", function ($scope, $http, $localStorage, $state, AppSettings, PreExaminationService) {

        var countDetails = $localStorage.CountDetails
        
        $scope.SchemeId = countDetails.SchemeId
        $scope.semId = countDetails.semId;
        

        var getOmrCount = PreExaminationService.getOmrBranchCount($scope.SchemeId,$scope.semId);
        getOmrCount.then(function (response) {
            if (response.length > 0) {
                $scope.getOmrBranchCount = response;
              
                var Count = 0
                var NoOfPracticals = 0;
                var NoOfStudents = 0;
                var NoOfTheory = 0;
              

                for (var i = 0; i < response.length; i++) {
                    if (response[i].Count != null)
                        Count = Count + response[i].Count;
                    if (response[i].NoOfPracticals != null)
                        NoOfPracticals = NoOfPracticals + response[i].NoOfPracticals;

                    if (response[i].NoOfStudents != null)
                        NoOfStudents = NoOfStudents + response[i].NoOfStudents;

                    if (response[i].NoOfTheory != null)
                        NoOfTheory = NoOfTheory + response[i].NoOfTheory;

                  

                }
                $scope.Count = Count;
                $scope.NoOfPracticals = NoOfPracticals;
                $scope.NoOfStudents = NoOfStudents;
                $scope.NoOfTheory = NoOfTheory;
            
                $scope.result = true;
                $scope.NoData = false;

            } else {
                $scope.getOmrBranchCount = [];
                $scope.result = false;
                $scope.NoData = true;
            }
        },
        function (error) {
            alert("error while Data");
            $scope.result = false;
            $scope.NoData = true;
            console.log(error);
        });

    })
})
