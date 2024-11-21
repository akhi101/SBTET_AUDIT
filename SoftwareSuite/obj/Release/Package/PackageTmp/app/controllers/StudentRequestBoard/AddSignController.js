define(['app'], function (app) {
    app.controller("AddSignController", function ($http, $scope, $state, $stateParams, AppSettings, AddSignService, $window) {
        $scope.AddSignPara = { PdfPath: $stateParams.PdfPath, PdfPhysicalPath: $stateParams.PdfPhysicalPath, FormNo: $stateParams.FormNo, ReqType: $stateParams.ReqType };
        //var str = $scope.AddSignPara.PdfPath;
        //var PdfPath = str.Replace('Approved', 'Signed');
        $("#viewpdf").attr("src", $scope.AddSignPara.PdfPath.replace('Approved', 'Signed'));
        $("#viewpdf").load("");
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('StudentRequestBoard.ServiceRequestDrillDownReport');
        }
        $scope.AddDigiSign = function () {
            var path1 = $scope.AddSignPara.PdfPhysicalPath;
            //var StudList = AddSignService.DigitalSign($stateParams.FormNo);
            //StudList.then(function (Studdata, status, headers, config, error) {
            //    alert("Sucess");
            //}, function (error) {
            //    alert(error);
            //});
            var url = AppSettings.DigiSign + $stateParams.FormNo;
            $window.open(url, '_blank');
        };
        $(document).ready(function () {
            $(window).focus(function () {
                $("#viewpdf").load("");
            });
        });
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('StudentRequestBoard.ServiceRequestDrillDownReport');
        }
    });
});