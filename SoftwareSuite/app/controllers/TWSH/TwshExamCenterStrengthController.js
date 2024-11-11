define(['app'], function (app) {
    app.controller("TwshExamCenterStrengthController", function ($scope, $http, $localStorage, $state, AppSettings, TwshStudentRegService) {
        var authData = $localStorage.authorizationData;
        $scope.ExamTypes = [
            { Name: "Computer Based Test(CBT)", Id: 1 },
            { Name: "TypeMachine Based Test(TMBT)", Id: 2 }
        ];

        var GetExamYearMonth = TwshStudentRegService.getTwshExamMonthYears();
        GetExamYearMonth.then(function (response) {
            $scope.getExamYearMonth = response.Table;

        },
                function (error) {

                    var err = JSON.parse(error);
                });

        $scope.UserTypeId = authData.SystemUserTypeId;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.ExamMode = {
                Id: 2
            }
            //$scope.StrengthReport = [];
            $scope.submit();

        }

        var data = {};
        //$scope.$emit('showLoading', data);
        $scope.Data = false;
        $scope.Nodata = false;
        $scope.loading = false;
        $scope.submit = function () {
            if ($scope.ExamMode == null || $scope.ExamMode == undefined || $scope.ExamMode.Id == undefined || $scope.ExamMode.Id == null || $scope.ExamMode.Id == '') {
                alert('Select Exam mode.')
                return;
            }
            $scope.Data = false;
            $scope.loading = true;
            var getData = TwshStudentRegService.TwshExamCenterStrengthReport($scope.ExamMode.Id);
            getData.then(function (response) {

                if (response.length > 0) {
                    $scope.StrengthReport = response;
                    $scope.loading = false;
                    $scope.Data = true;
                    $scope.NoData = false;

                    $scope.TEL = 0;
                    $scope.TEH = 0;
                    $scope.TEHS = 0;
                    $scope.TTL = 0;
                    $scope.TTH = 0;
                    $scope.TTHS = 0;
                    $scope.THL = 0;
                    $scope.THH = 0;
                    $scope.TUL = 0;
                    $scope.TUH = 0;
                    $scope.SEL = 0;
                    $scope.SEI = 0;
                    $scope.SEH = 0;
                    $scope.SEHS150 = 0;
                    $scope.SEHS180 = 0;
                    $scope.SEHS200 = 0;
                    $scope.STL = 0;
                    $scope.STH = 0;
                    $scope.STHS80 = 0;
                    $scope.STHS100 = 0;
                    $scope.SUL = 0;
                    $scope.SUH = 0;
                    $scope.TEJ = 0;

                    for (var i = 0; i < response.length; i++) {
                        if (response[i].TEJ != null)
                            $scope.TEJ = $scope.TEJ + response[i].TEJ;
                        if (response[i].TEL != null)
                            $scope.TEL = $scope.TEL + response[i].TEL;
                        if (response[i].TEH != null)
                            $scope.TEH = $scope.TEH + response[i].TEH;
                        if (response[i].TEHS != null)
                            $scope.TEHS = $scope.TEHS + response[i].TEHS;
                        if (response[i].TTL != null)
                            $scope.TTL = $scope.TTL + response[i].TTL;
                        if (response[i].TTH != null)
                            $scope.TTH = $scope.TTH + response[i].TTH;
                        if (response[i].TTHS != null)
                            $scope.TTHS = $scope.TTHS + response[i].TTHS;
                        if (response[i].THL != null)
                            $scope.THL = $scope.THL + response[i].THL;
                        if (response[i].THH != null)
                            $scope.THH = $scope.THH + response[i].THH;
                        if (response[i].TUL != null)
                            $scope.TUL = $scope.TUL + response[i].TUL;
                        if (response[i].TUH != null)
                            $scope.TUH = $scope.TUH + response[i].TUH;
                        if (response[i].SEL != null)
                            $scope.SEL = $scope.SEL + response[i].SEL;
                        if (response[i].SEI != null)
                            $scope.SEI = $scope.SEI + response[i].SEI;
                        if (response[i].SEH != null)
                            $scope.SEH = $scope.SEH + response[i].SEH;
                        if (response[i].SEHS150 != null)
                            $scope.SEHS150 = $scope.SEHS150 + response[i].SEHS150;
                        if (response[i].SEHS180 != null)
                            $scope.SEHS180 = $scope.SEHS180 + response[i].SEHS180;
                        if (response[i].SEHS200 != null)
                            $scope.SEHS200 = $scope.SEHS200 + response[i].SEHS200;
                        if (response[i].STL != null)
                            $scope.STL = $scope.STL + response[i].STL;
                        if (response[i].STH != null)
                            $scope.STH = $scope.STH + response[i].STH;
                        if (response[i].STHS80 != null)
                            $scope.STHS80 = $scope.STHS80 + response[i].STHS80;
                        if (response[i].STHS100 != null)
                            $scope.STHS100 = $scope.STHS100 + response[i].STHS100;
                        if (response[i].SUL != null)
                            $scope.SUL = $scope.SUL + response[i].SUL;
                        if (response[i].SUH != null)
                            $scope.SUH = $scope.SUH + response[i].SUH;
                    }
                } else {
                    $scope.StrengthReport = [];
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.NoData = true;
                    alert("No Data Found");
                }

            },
                function (error) {
                    $scope.StrengthReport = [];
                    alert("error while loading Report");
                    var err = JSON.parse(error);

                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.NoData = true;
                });


        }

        $scope.DownloadExcel = function () {
            var getExcelDta = TwshStudentRegService.TwshExamCenterStrengthXlsxReport($scope.ExamMode.Id);
            getExcelDta.then(function (data) {
                $scope.gentmetbl = false;

                if (data.length > 0) {
                    if (data.length > 4) {
                        $scope.Result = true;
                        var location = data;
                        window.location.href = location;

                    } else {
                        alert("Report not Available");
                    }
                } else {
                    alert("Report not Available");
                }
                //$scope.ResultNotFound = false;
                //$scope.ResultFound = false;
                $scope.LoadImg = false;


            }, function (error) {
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }

    });
});