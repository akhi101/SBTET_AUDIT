define(['app'], function (app) {
    app.controller("InterimCertificateController", function ($scope, $q, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService) {
        $scope.PIN = $localStorage.Interim.pin
   //     $scope.name = $localStorage.ApprovalData.Name
        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId
        //alert($scope.PIN)
       // alert($scope.UserTypeId)
        $scope.pin = '16047-aa-015'
        $scope.Data = false;
        //$scope.today = '01-05-2020';
        // $scope.name = "Banadari Santhosh";
        //$scope.father = "Srinivas";
        //$scope.pin = '19001-M-001';
        //$scope.Branch = "Mining Enginering"
        //$scope.Year = "MAR/APR-2017";
        //$scope.CollegeName = "SANA POLYTECHNIC, KODADA";
        //$scope.Class = "FirstClass";
        //$scope.passed = "Passed";
        //$scope.no = '3';
        //$scope.Duration = "Two Months";
        
        var ApproveList = PreExaminationService.getInterimPendingDetails($scope.PIN);
        ApproveList.then(function (response) {
            var response = JSON.parse(response)
            console.log(response);
            if (response.Table[0].ResponceCode == '200') {
                $scope.Data = true;
                $scope.Nodata = false;
                $scope.StudentData = response.Table1[0];
                $scope.markstable = response.Table2;
            } else if (response.Table[0].ResponceCode == '400') {
                $scope.Data = false;
                $scope.Nodata = true;
                alert(response.Table[0].ResponceDescription)
                $state.go('Dashboard.PostExam.StudentCertificateApproveList');
            } else {
                $scope.Data = false;
                $scope.Nodata = true;
                $state.go('Dashboard.PostExam.StudentCertificateApproveList');
            }
        },
        function (error) {
            //$scope.$emit('hideLoading', data);

            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
            $state.go('Dashboard.PostExam.StudentCertificateApproveList');
        });



        $scope.rectangles = [];

        $scope.printForm = function () {
         
            //$scope.today = "10/12/2019";
            //$scope.name = "Banadari Santhosh";
            //$scope.father = "Srinivas";
            //$scope.pin = '19001-M-001';
            //$scope.Branch = "Mining Enginering"
            //$scope.Year = "MAR/APR-2017";
            //$scope.CollegeName = "SANA POLYTECHNIC, KODADA";
            //$scope.Class = "FirstClass";
            //$scope.passed = "Passed";
            //$scope.no = '3';
            //$scope.Duration = "Two Months";
            setTimeout(function () {
                document.title = 'Interim_Certificate';
                window.print();
                document.title = tempTitle;
            });
        }


        $scope.Marks = [{
            'examnation':'1 YEAR','MaxMarks':"1000",'MarksSecured':"750",'Infigures':"185",'persantage':"25%",'Inwords':"ONE EIGHT FIVE"}, 
           { 'examnation': 'III semester','MaxMarks': "1000", 'MarksSecured': "750", 'Infigures': "185", 'persantage': "25%", 'Inwords': "SEVEN FIVE ZERO"},
            {'examnation': 'IV semester', 'MaxMarks': "1000", 'MarksSecured': "850", 'Infigures': "750", 'persantage': "100%",'Inwords': "EIGHT FIVE ZERO"},
            { 'examnation': 'V semester', 'MaxMarks': "1000", 'MarksSecured': "600", 'Infigures': "600", 'persantage': "100%", 'Inwords': "SIX ZERO ZERO" },
            { 'examnation': 'V semester', 'MaxMarks': "1000", 'MarksSecured': "853", 'Infigures': "853", 'persantage': "100%", 'Inwords': "EIGHT FIVE THREE" }
     
        ]
       
    });
});
