define(['app'], function (app) {
    app.controller("WantingsReportController", function ($scope, $http, $localStorage, $state, AppSettings, AdmissionService) {
        $scope.loading = false
        $scope.WantingTypes = [
            { "Id": "1", "Name": "Over All Wantings"},
        { "Id": "2", "Name": "Exam Month year Wantings" },
         { "Id": "3", "Name": "Scheme Wise Wantings" },
          { "Id": "4", "Name": "Scheme and Exam Month Year Wise Wantings" },
        ]
    
        //$scope.$scope.WantingType = 1;


        var getActiveList = AdmissionService.GetExamMonthYear();
        getActiveList.then(function (response) {
            //console.log(response)
            if (response.Table.length > 0) {
                $scope.GetExamMonthYears = response.Table;
               // console.log($scope.GetExamMonthYears)
            }
            else {
              
            }

        },
            function (error) {
                alert("error while loading Reports");
                $scope.$emit('hideLoading', data);
                var err = JSON.parse(error);
                console.log(err.Message);
            });

        var getActiveList1 = AdmissionService.getSchemes();
        getActiveList1.then(function (response) {
            //console.log(response)
            if (response.Table.length > 0) {
                $scope.getSchemes = response.Table;     
            }
            else {
            }

        },
            function (error) {
                alert("error while loading Reports");
                $scope.$emit('hideLoading', data);
               
                var err = JSON.parse(error);
                console.log(err.Message);
            });
    


        $scope.GetWantingReport = function () {
            $scope.LoadImg = true;
            //if ($scope.WantingType == '3') {
            //    $scope.SelectExamMonthYear = 0;
            //} else if ($scope.WantingType == '1') {
            $scope.WantingType = 1;
                $scope.SelectExamMonthYear = 0;
                $scope.selectScheme = 0;
            //} else if ($scope.WantingType == '2') {
            //    $scope.selectScheme = 0;
            //}
            var getActiveList = AdmissionService.getWantingReport($scope.WantingType, $scope.SelectExamMonthYear, $scope.selectScheme);
            getActiveList.then(function (data) {
                if (data.length > 0) {
                    if (data.length > 4) {
                        $scope.LoadImg = false;
                        $scope.Result = true;
                        var location = data;
                        window.location.href = location;

                    } else {
                        $scope.LoadImg = false;
                        alert("No Data Found");
                    }
                } else {
                    $scope.LoadImg = false;
                    alert("No Data Found");
                }
                //$scope.ResultNotFound = false;
                //$scope.ResultFound = false;
                


            }, function (error) {
                alert("Something Went Wrong");
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }
    })

})