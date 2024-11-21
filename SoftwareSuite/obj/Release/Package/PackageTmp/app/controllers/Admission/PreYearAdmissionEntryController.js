define(['app'], function (app) {
    app.controller("PreYearAdmissionEntryController", function ($scope, $state, $stateParams, AppSettings, PreYearAdmissionEntryService) {
        $scope.PreYearAdmissionEntry = {};
        var PageNm = $state.current.name.split(".")[1];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].GridFormToOpen == PageNm) {
                if (UsersRightsdata[i].isaddable == 'Y') {
                    $scope.RollEditDisable = false;
                } else {
                    $scope.RollEditDisable = true;
                }
            }
        }
        if(AppSettings.PrevAdmNo != 0)
        {
            $state.go('Admission');
        }
        $scope.SavePreYearAdmissionEntry = function () {
            $scope.RollEditDisable = true;
            if (CheckValidation() == true) {
                $scope.PreYearAdmissionEntry.UpdLoginID = AppSettings.LoggedUserId;
                var getPromise = PreYearAdmissionEntryService.UpdatePreYearAdmissionNumber(AppSettings.CollegeID, $scope.PreYearAdmissionEntry.AdmNo, AppSettings.LoggedUserId);
                getPromise.then(function (msg) {
                    RedirectToListPage();
                }, function (error) {
                    $scope.RollEditDisable = false;
                    alert(error);
                });
            } else {
                $scope.RollEditDisable = false;
            }
        }
        var AdmNoList = PreYearAdmissionEntryService.GetCurrentAdminNo(AppSettings.CollegeID);
        AdmNoList.then(function (AdmNodata, status, headers, config, error) {
            if (AdmNodata == 0) {
                $scope.PreYearAdmissionEntry.AdmNo = "";
            }
            else { $scope.PreYearAdmissionEntry.AdmNo = AdmNodata;}
          
        }, function (error) {
            alert(error);
        });
        var AcedemicYearList = PreYearAdmissionEntryService.GetAcademicYearList();
        AcedemicYearList.then(function (AcdInstNamedata, status, headers, config, error) {
            $scope.PreYearAdmissionEntry.AcdYrName = AcdInstNamedata[0].AcdYrName;
        }, function (error) {
            alert(error);
        });
        function CheckValidation() {
            if (($scope.PreYearAdmissionEntry.AdmNo == undefined) || ($scope.PreYearAdmissionEntry.AdmNo == "")){
                alert("Enter Admission No");
                return false;
            }
            else {
                return true;
            }
        }
        function RedirectToListPage() {
            $state.go('Admission.RegisterAdmittedStudent');
        }
    });
});
