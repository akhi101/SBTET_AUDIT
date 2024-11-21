define(['app'], function (app) {
    app.controller("CertificateApprovalDetailsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService) {
        $scope.loading = true;
        $scope.Pin = localStorage.getItem('ApproveId')
       
        var details = PreExaminationService.getCertificateDetailsForApproval($scope.Pin);
        details.then(function (response) {
            var response = JSON.parse(response)
            //console.log(response);
            if (response.Table.length > 0) {
                $scope.Studentdata = response.Table[0];
                $scope.Files = response.Table[0].Files;
                var str_array = $scope.Files.split(',');
                $scope.array = []
                for (i = 0; i < str_array.length -1; i++) {
                    var obj = { "link": "https://exams.sbtet.telangana.gov.in/downloads/Cert/" + str_array[i] }
                    $scope.array.push(obj);
                }
                console.log($scope.array)
                $scope.loading = false;
                $scope.reports = true;
                $scope.Noreports = false;
            } else {

            }
        },
            function (error) {
                $scope.loading = false;
                $scope.reports = false;
                $scope.Noreports = true;
            });
        $scope.opendoc = function (link) {
            window.open(link);
        }

        //$scope.ApproveData = function () {
        //    $scope.ApproveId = 1;
        //    var Approvedetails = PreExaminationService.SetCertificateApproval($scope.Pin, $scope.ApproveId);
        //    Approvedetails.then(function (response) {
               
        //            try { var response = JSON.parse(response); } catch (err) { }
               
        //            if (response.Table[0].ResponseCode == '200') {
        //             alert('Status Updated Successfully')
        //             $state.go('Dashboard.PostExam.NoDataCertificateApproveList');
        //        } else {
        //             alert('Failed to Approve Status')
        //        }
        //    },
        //    function (error) {
        //        console.log(error)
        //        alert('Failed to Approve Status')
        //        $scope.loading = false;
        //        $scope.reports = false;
        //        $scope.Noreports = true;
        //    })
        //}

        $scope.Back1 = function () {
            $state.go('Dashboard.PostExam.NoDataCertificateApproveListDetails');
        }

        //$scope.Reject = function () {
        //    var Reject = 3;
        //    var Rejectdetails = PreExaminationService.SetCertificateApproval($scope.Pin, Reject);
        //    Rejectdetails.then(function (response) {
        //        try { var response = JSON.parse(response); } catch (err) { }

        //        if (response.Table[0].ResponseCode == '200') {
        //            alert('Status Updated Successfully')
        //            $state.go('Dashboard.PostExam.NoDataCertificateApproveList');
        //        } else {
        //            alert('Failed to Approve Status')
        //        }
        //    },
        //    function (error) {
        //        console.log(error)
        //        alert('Failed to Approve Status')
        //        $scope.loading = false;
        //        $scope.reports = false;
        //        $scope.Noreports = true;
        //    })
        //}

    })
})

