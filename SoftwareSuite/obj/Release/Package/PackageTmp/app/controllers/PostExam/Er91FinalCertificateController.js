define(['app'], function (app) {
    app.controller("Er91FinalCertificateController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {
        $scope.Name = "Koppula Parameshwari";
        $scope.father = "Koppula Bala Chandra Maha Raju";
        $scope.year = "3 Years full-time";
        $scope.College = "Jagruthi Institute of Engg & Technology-Ibrahimpatnam,Ranga Reddy";
        $scope.branch = "Electrical and Electronics Engineering";
        $scope.MonthYear = "MAR/APR 2018";
        $scope.pin = "15497-EE-037";
        $scope.class = "First Class(Distin)";
        $scope.mydate = "thirtyfirst";
        $scope.myMonth = "May";
        $scope.Result = "PASS";

        $scope.Marks = [
           { "Exam": "I Year", "max_marks": "1000", "marks_secured": "914", "figures": "228 (25%)", "words": "TWO TWO Eight" },
           { "Exam": "III Semester", "max_marks": "1000", "marks_secured": "914", "figures": "914 (100%)", "words": "Nine One Four" },
           { "Exam": "IV Semester", "max_marks": "1000", "marks_secured": "882", "figures": "882 (100%)", "words": "Eight Eight TWO " },
           { "Exam": "V Semester", "max_marks": "1000", "marks_secured": "914", "figures": "940 (100%)", "words": "Nine Four Zero" },
               { "Exam": "V Semester", "max_marks": "1000", "marks_secured": "914", "figures": "940 (100%)", "words": "Nine Four Zero" },
           { "Exam": "VI Semester", "max_marks": "1000", "marks_secured": "915", "figures": "915 (100%)", "words": "Nine One Five" },
        ]
    })
})

