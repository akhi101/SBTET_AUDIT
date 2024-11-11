define(['app'], function (app) {
    app.controller("SubjectsFacultyController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MarksEntryService) {

        var SubjectsFaculty = MarksEntryService.getSubjectsFaculty();
        SubjectsFaculty.then(function (data) {
            console.log(data);

            $scope.FacultysubjectList = data;
        }, function (err) { });
      
    })
})