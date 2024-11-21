define(['app'], function (app) {
    app.controller("ReleaseAadhaarController", function ($scope, $http, $localStorage, $state, AppSettings, AdmissionService) {
        $scope.loading = false;
        var authData = $localStorage.authorizationData;
        $scope.ExamCategory = [];
        $scope.userName = authData.userName;
       
        $scope.ReleaseAadhar = function () {

            if (confirm("Are you sure you want to Release Aadhar?") == true) {
                $scope.getDetails()
            } else {
                userPreference = "Save Canceled!";
               
            }


        }

        $scope.ReleaseAttendeeId = function () {

            if (confirm("Are you sure you want to Release AttendeeId?") == true) {
                $scope.ReleaseAttendee()
            } else {
                userPreference = "Save Canceled!";

            }
        }

        $scope.ReleaseAttendee = function () {
            $scope.loading = true;
            var getActiveList = AdmissionService.GetReleaseAttendeeIdBypin($scope.studentPin, $scope.userName);
            getActiveList.then(function (response) {
                if (response != "") {
                    if (response[0].ResponceCode == '200') {
                        $scope.response = response[0].ResponceDescription;
                        $scope.loading = false;
                        $scope.Noresult = false;
                        $scope.result = true;
                    } else {
                        $scope.failResponse = response[0].ResponceDescription;
                        $scope.loading = false;
                        $scope.Noresult = true;
                        $scope.result = false;
                    }

                } else {
                    $scope.failResponse = response[0].ResponceDescription;
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }
            },
                function (error) {
                    alert("error while loading Reports");
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                    $scope.failResponse = response[0].ResponceDescription;
                    $scope.StatisticalReports = [];
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }


        $scope.getDetails = function () {
            $scope.loading = true;       
            var getActiveList = AdmissionService.getReleaseAadharByPin($scope.studentPin, $scope.userName);
            getActiveList.then(function (response) {
                if (response != "") {
                    if (response[0].ResponceCode == '200') {
                        $scope.response = response[0].ResponceDescription;
                        $scope.loading = false;
                        $scope.Noresult = false;
                        $scope.result = true;
                    } else {
                        $scope.failResponse = response[0].ResponceDescription;
                        $scope.loading = false;
                        $scope.Noresult = true;
                        $scope.result = false;
                    }
                   
                } else {
                    $scope.failResponse = response[0].ResponceDescription;
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }
            },
            function (error) {
                alert("error while loading Reports");
                $scope.loading = false;
                $scope.Noresult = true;
                $scope.result = false;
                $scope.failResponse = response[0].ResponceDescription;
                $scope.StatisticalReports = [];
                var err = JSON.parse(error);
                console.log(err.Message);
            });
        }

        $scope.getAadharUpdationDetails = function () {
            var getdetails = AdmissionService.GetAadharUpdationDetails($scope.PolycetHtNumber, $scope.userName);
            getdetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (response.Table.length > 0) {
                    $scope.StudentData = response.Table;
                    $scope.StudentID = response.Table[0].StudentId;
                } else {
                    $scope.StudentData = [];
                    alert("No Data Found");
                }
            },
                function (error) {
                    alert("error while loading Data");
                    console.log(error);
                });
        }

        $scope.updateaadharnumber = function () {
            var getdetails = AdmissionService.SetAadharUpdationDetails($scope.PolycetHtNumber, $scope.StudentID, $scope.CorreectedAadhaarNumber, $scope.userName);
            getdetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (response.Table[0].ResponceCode == '200') {
                    alert(response.Table[0].ResponceDescription);
                    $scope.getAadharUpdationDetails($scope.PolycetHtNumber);
                } else {
                    alert('Not Updated / Error while Updating Data')
                    $scope.getAadharUpdationDetails($scope.PolycetHtNumber);

                }
            },
                function (error) {
                    alert("error while loading Data");
                    console.log(error);
                });
        }

        

    })
})