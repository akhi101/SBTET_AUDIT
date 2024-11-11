define(['app'], function (app) {
    app.controller("StudentFeedbackFormController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService) {

        $scope.changeRadio = function (id) {
            alert(id)
        }
        $scope.question = {
            questionText: "Please rate your college.",
            choices: [{
                id: 1,
                text: "Very Good",
                isUserAnswer: false
            }, {
                id: 2,
                text: "Good",
                isUserAnswer: true
            }, {
                id: 3,
                text: "Average",
                isUserAnswer: false
            }, {
                id: 4,
                text: "Bad",
                isUserAnswer: false
            }]

        };
        $scope.question1 = {
            questionText: "How was the Theoritical Class.",
            choices: [{
                id: 1,
                text: "Very '=plGood",
                isUserAnswer: false
            }, {
                id: 2,
                text: "Good",
                isUserAnswer: true
            }, {
                id: 3,
                text: "Average",
                isUserAnswer: false
            }, {
                id: 4,
                text: "Bad",
                isUserAnswer: false
            }]

        };
        $scope.question2 = {
            questionText: "How was the practical lab.",
            choices: [{
                id: 1,
                text: "Very Good",
                isUserAnswer: false
            }, {
                id: 2,
                text: "Good",
                isUserAnswer: true
            }, {
                id: 3,
                text: "Average",
                isUserAnswer: false
            }, {
                id: 4,
                text: "Bad",
                isUserAnswer: false
            }]

        };
        $scope.question3 = {
            questionText: "Please rate the subject faculty.",
            choices: [{
                id: 1,
                text: "Very Good",
                isUserAnswer: false
            }, {
                id: 2,
                text: "Good",
                isUserAnswer: true
            }, {
                id: 3,
                text: "Average",
                isUserAnswer: false
            }, {
                id: 4,
                text: "Bad",
                isUserAnswer: false
            }]

        };
    })
})