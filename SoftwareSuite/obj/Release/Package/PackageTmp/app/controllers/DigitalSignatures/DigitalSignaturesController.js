define(['app'], function (app) {
    app.controller("DigitalSignaturesController", function ($scope, $rootScope, $http, $localStorage, $state, AppSettings, SystemUserService, DigitalSignatureService, $uibModal) {
        var authdata = $localStorage.authorizationData;
        $scope.userType = authdata.SystemUserTypeId;
        var ModuleId = parseInt($localStorage.selectedModule.Id);
        var usertypeId = parseInt($scope.userType);
        $scope.UserCertificates = [];
        $scope.modalInstance = null;

        $scope.GetAvailableCertificates = function () {
            $rootScope.availableCerts = null;
            var certReq = DigitalSignatureService.GetAvailableCertificates();
            certReq.then(
                function (res) {
                    var data = [];
                    for (var i = 0; i < res.length; i++) {
                        var c = 0;
                        for (var j = 0; j < $scope.UserCertificates.length; j++) {
                            if (res[i].SerialNumber == $scope.UserCertificates[j].SerialNumber) {
                                c++;
                            }
                        }
                        if (c == 0) {
                            data.push(res[i]);
                        }
                    }
                    $rootScope.availableCerts = data;
                    if (res.length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }, function (error) {
                    console.log(error);
                    $scope.data = false;
                    $scope.error = true;
                });
        };
        $scope.linkNewCert = function () {
            $scope.GetAvailableCertificates();
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/DigitalSignatures/LinkDigitalSignature.html",
                size: 'lg'
            }).closed.then(function () {
                $scope.modalInstance = null;
                $scope.modalInstance = undefined;
            });
        };

        $scope.linkCertificate = function (certSerial, Subject, NotBefore, NotAfter) {

            DigitalSignatureService.VerifyCertificateForUser(certSerial).then(function (res) {
                if (res == "true" || res == true) {
                    DigitalSignatureService.LinkUserCertificate(certSerial, Subject, NotBefore, NotAfter).then(function (res) {
                        alert(res);
                        window.location.reload();
                    });
                } else {
                    alert("Certification Verification Failed");
                }
            });
        };

        DigitalSignatureService.GetUserCertificates().then(
            function (res) {
                $scope.UserCertificates = res;
            }, function (error) {
                console.log(error);
                $scope.data = false;
                $scope.error = true;
            });
    });
});
