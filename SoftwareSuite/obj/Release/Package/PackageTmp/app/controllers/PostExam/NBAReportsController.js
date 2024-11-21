define(['app'], function (app) {
    app.controller("NBAReportsController", function ($scope, $http, $localStorage, $state, $location, $window, $stateParams, AppSettings, PreExaminationService) {


        $scope.DownloadReport1 = function () {
            $scope.loading = true;
            $scope.Noresult = false
            var loadData1 = PreExaminationService.GetNBAReports1Excel()
            loadData1.then(function (res) {
                var data = JSON.parse(res)
                if (data[0].ResponceCode == '200') {
                    $scope.Noresult = false
                    $scope.loading = false;
                    var location = data[0].file;
                    window.location.href = location;

                } else
                    if (data[0].ResponceCode == '400') {
                        $scope.Noresult = true
                        $scope.loading = false;
                        alert(data[0].ResponceDescription);
                    }
                    else {
                        $scope.Noresult = true
                        $scope.loading = false;
                        alert('Something Went Wrong')
                    }

            }, function (error) {
                $scope.Noresult = true
                $scope.loading = false;
            });
        }

        $scope.DownloadReport2 = function () {
            $scope.loading2 = true;
            $scope.Noresult2 = false
            var loadData1 = PreExaminationService.GetNBAReports2Excel()
            loadData1.then(function (res) {
                var data = JSON.parse(res)
                if (data[0].ResponceCode == '200') {
                    $scope.Noresult2 = false
                    $scope.loading2 = false;
                    var location = data[0].file;
                    window.location.href = location;

                } else
                    if (data[0].ResponceCode == '400') {
                        $scope.Noresult2 = true
                        $scope.loading2 = false;
                        alert(data[0].ResponceDescription);
                    }
                    else {
                        $scope.Noresult2 = true
                        $scope.loading2 = false;
                        alert('Something Went Wrong')
                    }

            }, function (error) {
                $scope.Noresult2 = true
                $scope.loading2 = false;
            });
        }

        $scope.DownloadReport31 = function () {
            $scope.Noresult3 = true
            $scope.loading3 = true;
            var loadData1 = PreExaminationService.GetNBAReports31Excel()
            loadData1.then(function (res) {
                var data = JSON.parse(res)
                if (data[0].ResponceCode == '200') {
                    $scope.Noresult3 = false
                    $scope.loading3 = false;
                    var location = data[0].file;
                    window.location.href = location;

                } else
                    if (data[0].ResponceCode == '400') {
                        $scope.Noresult3 = true
                        $scope.loading3 = false;
                        alert(data[0].ResponceDescription);
                    }
                    else {
                        $scope.Noresult3 = true
                        $scope.loading3 = false;
                        alert('Something Went Wrong')
                    }

            }, function (error) {
                $scope.Noresult3 = true
                $scope.loading3 = false;
            });
        }

        $scope.DownloadReport32 = function () {
            $scope.loading3 = true;
            $scope.Noresult3 = false
            var loadData1 = PreExaminationService.GetNBAReports32Excel()
            loadData1.then(function (res) {
                var data = JSON.parse(res)
                if (data[0].ResponceCode == '200') {
                    $scope.Noresult3 = false
                    $scope.loading3 = false;
                    var location = data[0].file;
                    window.location.href = location;

                } else
                    if (data[0].ResponceCode == '400') {
                        $scope.Noresult3 = true
                        $scope.loading3 = false;
                        alert(data[0].ResponceDescription);
                    }
                    else {
                        $scope.Noresult3 = true
                        $scope.loading3 = false;
                        alert('Something Went Wrong')
                    }

            }, function (error) {
                $scope.Noresult3 = true
                $scope.loading3 = false;
            });
        }

        $scope.DownloadReport4 = function () {
            $scope.loading4 = true;
            $scope.Noresult4 = true
            var loadData1 = PreExaminationService.GetNBAReports4Excel()
            loadData1.then(function (res) {
                var data = JSON.parse(res)
                if (data[0].ResponceCode == '200') {
                    $scope.Noresult4 = false
                    $scope.loading4 = false;
                    var location = data[0].file;
                    window.location.href = location;

                } else
                    if (data[0].ResponceCode == '400') {
                        $scope.Noresult4 = true
                        $scope.loading4 = false;
                        alert(data[0].ResponceDescription);
                    }
                    else {
                        $scope.Noresult4 = true
                        $scope.loading4 = false;
                        alert('Something Went Wrong')
                    }

            }, function (error) {
                $scope.Noresult4 = true
                $scope.loading4 = false;
            });
        }
    })
})