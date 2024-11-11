define(['app'], function (app) {
    app.controller("TimeTablePageController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService) {
        //$scope.TimeTable = [];

        $scope.TimeTable = [
            { 'DATE': '13/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic English', 'Time': '9.30 AM-11.30Am' },
              { 'DATE': '14/12/2019', 'Subjectcode': 'AA-102', 'subjectName': 'Basic Engineering Mathematics', 'Time': '9.30 AM-11.30Am' },
                { 'DATE': '15/12/2019', 'Subjectcode': 'AA-103', 'subjectName': 'Basic Physics ', 'Time': '9.30 AM-11.30Am' },
                  { 'DATE': '16/12/2019', 'Subjectcode': 'AA-104', 'subjectName': 'Basic Engineering Chemistry', 'Time': '9.30 AM-11.30Am'},
                { 'DATE': '17/12/2019', 'Subjectcode': 'AA-105', 'subjectName': 'Basic Materials', 'Time': '9.30 AM-11.30Am' },
                { 'DATE': '17/12/2019', 'Subjectcode': 'AA-106', 'subjectName': 'Basic Drawing', 'Time': '9.30 AM-11.30Am' },
                   { 'DATE': '17/12/2019', 'Subjectcode': 'AA-105', 'subjectName': 'Basic Materials', 'Time': '9.30 AM-11.30Am' },
                { 'DATE': '17/12/2019', 'Subjectcode': 'AA-106', 'subjectName': 'Basic Drawing', 'Time': '9.30 AM-11.30Am' },
               
           
        ];

        $scope.TimeTable1 = [

     { 'DATE': '18/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic English', 'Time': '9.30 AM-11.30Am' },
       { 'DATE': '19/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic Engineering Mathematics', 'Time': '9.30 AM-11.30Am' },
         { 'DATE': '20/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic Physics', 'Time': '9.30 AM-11.30Am' },
           { 'DATE': '21/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic Engineering Chemistry', 'Time': '9.30 AM-11.30Am' },
         { 'DATE': '22/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic Materials', 'Time': '9.30 AM-11.30Am' },
        { 'DATE': '20/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic Drawing', 'Time': '9.30 AM-11.30Am' },
           { 'DATE': '21/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic Materials', 'Time': '9.30 AM-11.30Am' },
         { 'DATE': '22/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic Drawing', 'Time': '9.30 AM-11.30Am', }


        ]
        $scope.TimeTable2 = [

 { 'DATE': '18/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic English', 'Time': '9.30 AM-11.30Am' },
   { 'DATE': '19/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic Engineering Mathematics', 'Time': '9.30 AM-11.30Am' },
     { 'DATE': '20/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic Physics', 'Time': '9.30 AM-11.30Am' },
       { 'DATE': '21/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic Engineering Chemistry', 'Time': '9.30 AM-11.30Am' },
     { 'DATE': '22/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic Materials', 'Time': '9.30 AM-11.30Am' },
    { 'DATE': '20/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic Drawing', 'Time': '9.30 AM-11.30Am' },
       { 'DATE': '21/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic Materials', 'Time': '9.30 AM-11.30Am' },
     { 'DATE': '22/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic Drawing', 'Time': '9.30 AM-11.30Am', }


        ]
        $scope.TimeTable3 = [

{ 'DATE': '18/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic English', 'Time': '9.30 AM-11.30Am' },
{ 'DATE': '19/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic Engineering Mathematics', 'Time': '9.30 AM-11.30Am' },
{ 'DATE': '20/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic English', 'Time': '9.30 AM-11.30Am' },
{ 'DATE': '21/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic English', 'Time': '9.30 AM-11.30Am' },
{ 'DATE': '22/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic English', 'Time': '9.30 AM-11.30Am' },
{ 'DATE': '20/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic English', 'Time': '9.30 AM-11.30Am' },
{ 'DATE': '21/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic English', 'Time': '9.30 AM-11.30Am' },
 { 'DATE': '22/12/2019', 'Subjectcode': 'AA-101', 'subjectName': 'Basic English', 'Time': '9.30 AM-11.30Am' }


        ]
    })
});