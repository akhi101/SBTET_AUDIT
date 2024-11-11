define(['app'], function (app) {
    app.controller("MarksMemoFinalController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService) {

        $scope.getDate = new Date()
        $scope.Name = "Koppula Parameshwari";
        $scope.father = "Koppula Bala Chandra Maha Raju";
        //$scope.year = "3 Years full-time";
        $scope.College = "Jagruthi Institute of Engg & Technology-Ibrahimpatnam,Ranga Reddy";
        $scope.branch = "Electrical and Electronics Engineering";
        $scope.MonthYear = "MAR/APR 2018";
        $scope.pin = "15497-EE-037";
        $scope.class = "First Class(Distin)";
        $scope.mydate = "thirtyfirst";
        $scope.myMonth = "May";
        $scope.Result = "PASS";

        $scope.Marks = [
           { "Exam": "Subject 1", "max_marks": "1000", "marks_secured": "914", "figures": "228 (25%)", "words": "TWO TWO Eight" },
           { "Exam": "Subject 2", "max_marks": "1000", "marks_secured": "914", "figures": "914 (100%)", "words": "Nine One Four" },
           { "Exam": "Subject 3", "max_marks": "1000", "marks_secured": "882", "figures": "882 (100%)", "words": "Eight Eight TWO " },
           { "Exam": "Subject 4", "max_marks": "1000", "marks_secured": "914", "figures": "940 (100%)", "words": "Nine Four Zero" },
               { "Exam": "Subject 5", "max_marks": "1000", "marks_secured": "914", "figures": "940 (100%)", "words": "Nine Four Zero" },
           { "Exam": "Subject 6", "max_marks": "1000", "marks_secured": "915", "figures": "915 (100%)", "words": "Nine One Five" },
        ]
        //$scope.Name = 'Akhil';
    })
})