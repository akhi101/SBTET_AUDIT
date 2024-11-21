define(['app'], function (app) {
    app.controller("GenuineOdcController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {
        var data = {};
        $scope.$emit('showLoading', data);
        $scope.Pin = localStorage.getItem('GenuinePin')
        $scope.PinId =localStorage.getItem('PinId')
        $scope.ApproveType = $localStorage.CertificateData.ApproveType;
        
        $scope.OdcCertificate = localStorage.getItem('OdcCertificate')
        var authData = $localStorage.authorizationData;
        // console.log(authData)
        $scope.UserTypeId = authData.SystemUserTypeId;

        if (($scope.Pin == undefined) || ($scope.Pin == null) || ($scope.Pin == "")) {
            alert("Enter PIN");
            return;
        } else {
            //$scope.LoadImg = true;
            $scope.ResultFound = false;
            $scope.ResultNotFound1 = false;
            var Certificate = 8;
            var ApproveList = PreExaminationService.getGenuinenessCheckdetails($scope.Pin, $scope.PinId);
            ApproveList.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
               
                var data = response.Table1[0];
                $scope.StudentDetails = data;
                $scope.Data = true;
                localStorage.setItem('OdcCertificate', $scope.StudentDetails.ODC)
                $scope.ODC = "https://exams.sbtet.telangana.gov.in/downloads/Cert/" + data.ODC
                $scope.$emit('hideLoading', data);
            },
            function (error) {
                //$scope.$emit('hideLoading', data);

                $scope.Data = false;
                $scope.ResultNotFound1 = true;
                alert("error while loading data");
                $scope.$emit('hideLoading', data);
            });

            var getmemodetails = PreExaminationService.getTranscriptODCDetailsByPin($scope.Pin);
            getmemodetails.then(function (res) {
                try { var response = JSON.parse(res) } catch (err) { }

                if (response.Table[0].ResponceCode == '200') {
                    if (response.Table1.length > 0) {
                        $scope.ODCstudData = response.Table1[0];
                        $scope.Odcmarkstable = response.Table2;
                        $scope.ResultFound = true;
                        $scope.$emit('hideLoading', data);
                        $scope.ResultNotFound = false;
                    } else {
                        $scope.ODCstudData = [];
                        $scope.Odcmarkstable = [];
                        $scope.ResultFound = false;
                        $scope.$emit('hideLoading', data);
                        $scope.ResultNotFound = true;
                    }
                }
                else {
                    $scope.ODCstudData = [];
                    $scope.Odcmarkstable = [];
                    $scope.ResultFound = false;
                    $scope.$emit('hideLoading', data);
                    $scope.LoadImg = false;
                    $scope.ResultNotFound = true;

                }


            }, function (err) {
                $scope.ResultFound = false;
                $scope.$emit('hideLoading', data);
                $scope.LoadImg = false;
                $scope.ResultNotFound = true;

            })

        }

        $scope.closeModal = function () {
            $state.go('Dashboard.PostExam.GenuinenessApproveList');
        }
        $scope.Verify = function (Pin) {
            if (($scope.StudentDetails.Pin == null || $scope.StudentDetails.Pin == '') || ($scope.UserTypeId == null || $scope.UserTypeId == '')) {

                alert("Please Select All Fields")
                return;
            }
            if ($scope.IsGenuine == null || $scope.IsGenuine == '' || $scope.IsGenuine == undefined) {
                alert("Please Select Is Genuine?")
                return;
            }
            if ($scope.IsGenuine == 'No') {
                if ($scope.Remarks == null || $scope.Remarks == '' || $scope.Remarks == undefined) {
                    alert("Please Enter Remarks")
                    return;
                }
                var ApproveStatus = 1
                var Status = 2;
                var verify = PreExaminationService.Genuineness_SetVerifyStatusRemarks($scope.PinId,$scope.StudentDetails.Pin, $scope.UserTypeId, Status, $scope.Remarks);
            }else{
            var ApproveStatus = 1
            var Status = 1;
            var verify = PreExaminationService.Genuineness_SetVerifyStatus($scope.PinId,$scope.StudentDetails.Pin, $scope.UserTypeId, Status);
            }
            verify.then(function (response) {
                var response = JSON.parse(response)
                try { var response = JSON.parse(response); } catch (err) { }
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    //$scope.closeModal()

                    $state.go('Dashboard.PostExam.GenuinenessApproveList');
                   // $scope.ApproveListDetails()

                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                     $state.go('Dashboard.PostExam.GenuinenessApproveList');
                    //$scope.closeModal()
                   // $scope.ApproveListDetails()
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