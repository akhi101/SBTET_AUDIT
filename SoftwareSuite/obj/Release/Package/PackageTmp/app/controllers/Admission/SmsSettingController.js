define(['app'], function (app) {
    app.controller("SmsSettingController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService, $timeout, MarksEntryService,$uibModal, AdmissionService) {
        $scope.Message = false;
        $scope.Popup = false;
        $scope.selectedSms = "";
      $scope.getMessagebox = function ()
        {
            if ($scope.selectedSms == '1') {
                $scope.Message = true;
                $scope.Popup = true;
            } else {
                $scope.selectedSms = "";
                $scope.Message = false;
                $scope.Popup = false;
                $scope.Percentage = "";
            }
        }

        $('#percent').keypress(function (e) {
            var regex = new RegExp("/[^\d.]/g, ''");
            var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
            if (regex.test(str)) {
                return true;
            }

            e.preventDefault();
            return false;
        });

        $scope.GetPopup = function () {
            var Admin = 1;
            if ($scope.Percentage) {
               
                var attancance = $scope.Percentage;
               
                if (confirm("Are you conform to send sms below " + $scope.Percentage + "% student")) {

                     var GetAttendance = AdmissionService.GetAttendance(attancance.toString(), Admin);
                     GetAttendance.then(function (response) {

                         if (response == '400') {
                             alert("Enter the valied Percentage");
                         }
                         else 
                             alert("Sms Not Sent Successfully");

                            $scope.Message = true;
                            $scope.Popup = true;
                            $scope.selectedSms = "";
                            $scope.Percentage = "";
                    },
                        function (err) {
                            console.log(err);
                        });

                } else {
                    $scope.selectedSms = "";
                    $scope.Message = false;
                    $scope.Popup = false;
                    $scope.Percentage = "";
                    return;
                }
            } else {
                alert("Please Enter Attandance %")
            }
            
            }
        


    })
})
