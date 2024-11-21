define(['app'], function (app) {
    app.controller("OmrCountController", function ($scope, $http, $localStorage, $state, AppSettings, PreExaminationService) {

        

        var getSchemesList = PreExaminationService.getSchemes();
        getSchemesList.then(function (response) {
            console.log(JSON.parse(response));
            var response = JSON.parse(response)
            if (response.Table.length > 0) {
                $scope.getSchemes = response.Table;
            //    console.log(JSON.parse(response));
              
            } else {
                $scope.getSchemes = [];
                //    alert("No Data Found");
            }
        },
        function (error) {
            alert("error while Data");
            console.log(error);
        });

        $scope.getDetails = function () {
            var getSemCount= PreExaminationService.SemOmrCount($scope.SchemeId);
            getSemCount.then(function (response) {            
                if (response.length > 0) {
                    $scope.getSemCount = response;

                    var Count = 0;

                    for (var i = 0; i < response.length; i++) {
                        if (response[i].Count != null)
                            Count = Count + response[i].Count;

                    }
                    $scope.Count = Count;
                    $scope.result = true;
                    $scope.NoData = false;
               
                } else {
                    $scope.getSemCount = [];
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

        }

        $scope.openDetails = function (semId,SchemeId) {
            $localStorage.CountDetails = {
                semId: semId,
                SchemeId: SchemeId
            }
         
            $state.go('Dashboard.PreExamination.ViewOmrCount')
        }

    })
})