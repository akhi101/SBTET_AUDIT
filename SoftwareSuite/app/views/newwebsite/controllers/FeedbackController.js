define(['app'], function (app) {
    app.controller("FeedbackController", function ($scope, $state, $stateParams, AppSettings, PreExaminationService) {

        $scope.Submit = function () {
            if ($scope.Name == "" || $scope.Name == undefined) {
                alert('Please enter name.');
                return;
            }
            if (!isNaN($scope.Name)) {
                alert('Please enter valid name.');
                return;
            }
            if ($scope.Email == "" || $scope.Email == undefined) {
                alert('Please enter emailid.');
                return;
            }
            if ($scope.Mobile == "" || $scope.Mobile == undefined) {
                alert('Please enter mobile number.');
                return;
            }
                if (isNaN($scope.Mobile) || $scope.Mobile.length != 10) {
                    alert('Please enter valid mobile number.');
                return;
            }
            if ($scope.Message == "" || $scope.Message == undefined) {
                alert('Please enter feedback message.');
                return;
            }
            var Feedback = PreExaminationService.SubmitFeedback($scope.Name,$scope.Email,$scope.Mobile,$scope.Message);
            Feedback.then(function (response) {
                var res = JSON.parse(response)
                if (res.Table.length > 0) {
                    console.log(res.Table)
                    alert(res.Table[0].ResponseDescrption)
                    $scope.Name = '';
                    $scope.Email = '';
                    $scope.Mobile = '';
                    $scope.Message = '';
                    //$scope.StudentType = response.Table;
                } else {
                    $scope.StudentType = [];
                    alert("No Student found on this Record");
                }
            },
                function (error) {
                    alert("error while loading Student Types");
                    console.log(error);
                });

        }

    });
});
