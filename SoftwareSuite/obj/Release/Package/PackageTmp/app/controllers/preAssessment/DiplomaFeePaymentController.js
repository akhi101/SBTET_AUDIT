define(['app'], function (app) {
    app.controller("DiplomaFeePaymentController", function ($scope, $http, $localStorage, $state, PreExaminationService, MarksEntryService) {

        var authData = $localStorage.authorizationData;
        $scope.LoadImg = false;
        $scope.DetailsFound = false;
        $scope.DetailsNotFound = false;

        var LoadExamTypeBysem = MarksEntryService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Student Types");
                console.log(error);
            });


        $scope.getStudentDetails = function (Pin, Studtype) {
            $scope.LoadImg = true;
            $scope.DetailsFound = false;
            var StudtypeId = parseInt(Studtype);
            var studentDetails = PreExaminationService.GetStudentFeePaymentDetails(Pin, StudtypeId)
            studentDetails.then(function (res) {
                if (res) {
                    $scope.LoadImg = false;                  
                    $scope.DetailsFound = true;
                    var resp = JSON.parse(res);
                    console.log(resp);
                    $scope.studPin = resp.Table[0].Pin;
                    $scope.studentScheme = resp.Table[0].Scheme;
                    $scope.studentBranch = resp.Table[0].BranchCode;
                    $scope.studentSem = resp.Table[0].Semester;
                    $scope.studentName = resp.Table[0].Name;
                    $scope.studentFatherName = resp.Table[0].FatherName;
                    $scope.studentattendance = resp.Table[0].ActualPercentage;
                    //$scope.studentSem = resp.Table[0].Status;
                    $scope.studentTatkalFee = resp.Table[0].TatkalFee;
                    $scope.studentCondonationFee = resp.Table[0].Condonation;
                    $scope.studentLateFee = resp.Table[0].LateFee;
                    $scope.studentExamFee = resp.Table[0].ExamFee;
                    $scope.studentTotalFee = resp.Table[0].Total;
                    $scope.studentExamCenterName = resp.Table[0].ExaminationCenterName;
                    $scope.studentExamCenterCode = resp.Table[0].ExaminationCenterCode;
                    $scope.studentSubData = resp.Table1;

                } else {
                    $scope.LoadImg = false;
                    $scope.DetailsFound = false;
                    $scope.DetailsNotFound = true;

                }

            }, function (err) {
                $scope.LoadImg = false;
                $scope.DetailsFound = false;
                $scope.DetailsNotFound = false;

            });
        }
    });
});