define(['app'], function (app) {
    app.controller("TwshCoursesController", function ($scope, $state, $stateParams, AppSettings, AdminService) {

        $scope.CourseType = localStorage.getItem('CourseType');

        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }

        //alert($scope.CourseType)
        $scope.loading = true;
        var getcircular = AdminService.GetAllCourses();
        getcircular.then(function (response) {
            //var response = JSON.parse(res)
            if (response.Table.length > 0) {
                $scope.Courses = response.Table;
                $scope.TwshCourses = response.Table1;
                $scope.loading = false;
                $scope.data = true;
                $scope.error = false;

            } else {
                $scope.loading = false;
                $scope.data = false;
                $scope.error = true;
            }
        },
                function (error) {

                    console.log(error);
                    $scope.loading = false;
                    $scope.data = false;
                    $scope.error = true;
                });

  
    })
})
     