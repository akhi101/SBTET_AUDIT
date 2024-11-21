define(['app'], function (app) {
    app.controller("Transcript_StudentDetailsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {



        $scope.rectangles = [];

        $scope.Name = "Koppula Parameshwari";
        $scope.father = "Koppula Bala Chandra Maha Raju";
        $scope.year = "3 Years full-time";
        $scope.College = "Jagruthi Institute of Engg & Technology-Ibrahimpatnam,Ranga Reddy";
        $scope.branch = "Electrical and Electronics Engineering";
        $scope.Name = "MAR/APR 2018";
        $scope.pin = "15497-EE-037";
        $scope.calss = "First Class(Distin)";
        $scope.mydate = "thirtyfirst";
        $scope.myMonth = "May";

        $scope.Name = "Akhil Kumar Bejjenki";
        $scope.PIN = "16001-M-001";
        $scope.Scheme = "C16";
        $scope.CollegeCode = "001";
        $scope.Mobile = '9123456789';

        $scope.Marks = [
            { "Exam": "I Year", "max_marks": "1000", "marks_secured": "914", "figures": "228 (25%)", "words": "TWO TWO Eight" },
            { "Exam": "III Semester", "max_marks": "1000", "marks_secured": "914", "figures": "914 (100%)", "words": "Nine One Four" },
            { "Exam": "IV Semester", "max_marks": "1000", "marks_secured": "882", "figures": "882 (100%)", "words": "Eight Eight TWO " },
            { "Exam": "V Semester", "max_marks": "1000", "marks_secured": "914", "figures": "940 (100%)", "words": "Nine Four Zero" },
                { "Exam": "V Semester", "max_marks": "1000", "marks_secured": "914", "figures": "940 (100%)", "words": "Nine Four Zero" },
            { "Exam": "VI Semester", "max_marks": "1000", "marks_secured": "915", "figures": "915 (100%)", "words": "Nine One Five" },
        ]
        if ($scope.Marks.length == 5) {
            $scope.topSpace = true;
            $scope.topSpace1 = false;
        } else {
            $scope.topSpace = false;
            $scope.topSpace1 = true;
        }


        $scope.pin = $localStorage.certData.pin
        $scope.Certificate = $localStorage.certData.Certificate
        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId;
        //getOdcdetails
        //var pin = '16001-M-001'
        var ApproveList = PreExaminationService.getTranscriptsdetails($scope.pin);
        ApproveList.then(function (response) {

            var response = JSON.parse(response)
            console.log(response);

            $scope.StudentDetails = response.Table[0];
            var wes = response.Table[0].Memos
            var str_array = wes.split(',');
            console.log(str_array)
            $scope.array = []

            for(var i = 0; i < str_array.length; i++) {
                // Trim the excess whitespace.
                str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
                // Add additional code here, such as:
                var obj = {};
                //alert(str_array[i]);
                obj.memo = str_array[i]
                $scope.array.push(obj);
            }
            console.log($scope.array)
        },
        function (error) {
            //$scope.$emit('hideLoading', data);

            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
        });


        $scope.Approve = function () {
            var ApproveStatus = 1
            var Approve = PreExaminationService.TranscriptSetApproveStatus($scope.pin, $scope.UserTypeId, ApproveStatus);
            Approve.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $state.go('Dashboard.PostExam.TranscriptApproval');
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $state.go('Dashboard.PostExam.TranscriptApproval');
                }
                else {
                    //$scope.$emit('hideLoading', data);
                    $scope.Data = false;
                    $scope.Nodata = true;
                }
                //alert("Success")

            },
            function (error) {
                //$scope.$emit('hideLoading', data);

                $scope.Data = false;
                $scope.Nodata = true;
                alert("error while loading data");
            });

        }

        $scope.Reject = function () {
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/Controllers/PostExam/RejectPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }

        $scope.Submit = function (remarks) {
            var ApproveStatus = 2

            var Approve = PreExaminationService.TranscriptSetApproveStatusReject($scope.pin, $scope.UserTypeId, ApproveStatus, remarks);
            Approve.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $state.go('Dashboard.PostExam.TranscriptApproval');
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $state.go('Dashboard.PostExam.TranscriptApproval');
                }
                else {
                    //$scope.$emit('hideLoading', data);
                    $scope.Data = false;
                    $scope.Nodata = true;
                }
                //alert("Success")

            },
            function (error) {
                //$scope.$emit('hideLoading', data);

                $scope.Data = false;
                $scope.Nodata = true;
                alert("error while loading data");
            });

        }

    })
})