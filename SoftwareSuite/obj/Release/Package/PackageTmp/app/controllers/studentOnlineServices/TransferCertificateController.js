define(['app'], function (app) {
    app.controller("TransferCertificateController", function ($scope, $http, $localStorage, $state, $stateParams,PreExaminationService , AppSettings) {

        $scope.rectangles = [];
        $scope.Institution = "Vijay Rural Enng College";
        $scope.Name = "Akhil Kumar Bejjenki";
        $scope.PIN = "19001-M-001";
        $scope.FatherName = "Sampath kumar";
        $scope.DateOfBirth = "13/02/1993";
        $scope.class = "3rd Semster";
        $scope.Nationality = "Indain";
        $scope.Religion = "Hindu";
        $scope.Caste = "BC-D";
        $scope.Status = "Discontinued";
        $scope.FeeStatus = "Totaly Paid";
        $scope.Reasonforliving = "Discontinued";
        $scope.Dateforiving = "10/10/2019";
        $scope.DatewhenapplidforTc = "10/10/2019";
        $scope.Conduct = "Good";
        $scope.IdentificationMarks = "Amole on the left hand";
        $scope.IdentificationMarks1 = "Amole on the righthand";
        $scope.generatePdf = function () {
            $scope.Institution = "Vijay Rural Enng College";
            $scope.Name = "Akhil Kumar Bejjenki";
            $scope.PIN = "19001-M-001";
            $scope.FatherName = "Sampath kumar";
            $scope.DateOfBirth = "13/02/1993";
            $scope.class = "3rd Semster";
            $scope.Nationality = "Indain";
            $scope.Religion = "Hindu";
            $scope.Caste = "BC-D";
            $scope.Status = "Discontinued";
            $scope.FeeStatus = "Totaly Paid";
            $scope.Reasonforliving = "Discontinued";
            $scope.Dateforiving = "10/10/2019";
            $scope.DatewhenapplidforTc = "10/10/2019";
            $scope.Conduct = "Good";
            $scope.IdentificationMarks = "Amole on the left hand";
            $scope.IdentificationMarks1 = "Amole on the righthand";
            setTimeout(function () {
                document.title = 'Transfer_Certificate';
                window.print();
                document.title = tempTitle;
            }, 500);
        }

        $scope.pin = $localStorage.certData.pin;

        var ApproveList = PreExaminationService.getTcData($scope.pin);
        ApproveList.then(function (response) {
            var response = JSON.parse(response)
            console.log(response);
            if (response.Table[0].ResponceCode == '200') {
                //$scope.$emit('hideLoading', data);
                $scope.StudentData = response.Table1[0];
                $scope.markstable = response.Table2;

            } else if (response.Table[0].ResponceCode == '400') {
                //$scope.$emit('hideLoading', data);
                alert(response.Table[0].ResponceDescription)
                $state.go('Dashboard.PostExam.StudentCertificateApproveList');
            } else {
                //$scope.$emit('hideLoading', data);
                $state.go('Dashboard.PostExam.StudentCertificateApproveList');
            }
        },
        function (error) {
            //$scope.$emit('hideLoading', data);
            //$scope.$emit('hideLoading', data);
            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
            $state.go('Dashboard.PostExam.StudentCertificateApproveList');
        });
    });
});