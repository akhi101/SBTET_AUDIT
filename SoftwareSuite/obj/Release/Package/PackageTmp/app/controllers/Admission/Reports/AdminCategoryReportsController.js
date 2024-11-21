define(['app'], function (app) {
    app.controller("AdminCategoryReportsController", function ($scope, $http, $localStorage, $state, AppSettings, AdmissionService, AcademicService, $timeout) {
        $scope.loading = false;
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.academicYear = 14;

            $scope.getadmincategory()
        }
        
        var AcademicYears = AcademicService.getAcademicYears()
        AcademicYears.then(function (response) {
            $scope.loading = false;
            $scope.GetAcademicYears = response.Table;
            //$scope.$emit('hideLoading', data);

        },
            function (error) {
                alert("data is not loaded");
                var err = JSON.parse(error);
                console.log(err.Message);
            });


        $scope.getadmincategory = function () {

            var data = {};
            $scope.$emit('showLoading', data);
            var getActiveList = AdmissionService.getAdminStudentCategory($scope.academicYear);
            getActiveList.then(function (response) {
            //console.log(response)
            $scope.CollegeCategories = response.Table;
            //  $scope.loading = false;
            $scope.$emit('hideLoading', data);
            $scope.Noresult = false;
            $scope.result = true;
            var onroll = 0
            var Sc_M = 0;
            var Sc_F = 0;
            var St_M = 0;
            var St_F = 0;
            var BC_A_M = 0;
            var BC_A_F = 0;
            var BC_B_M = 0;
            var BC_B_F = 0;
            var BC_C_M = 0;
            var BC_C_F = 0;
            var BC_D_M = 0;
            var BC_D_F = 0;
            var BC_E_M = 0;
            var BC_E_F = 0;
            var Oc_M = 0;
            var Oc_F= 0;
            var NA_M = 0;
            var NA_F = 0;

            for (var i = 0; i < response.Table.length; i++) {
                if (response.Table[i].onroll != null)
                    onroll = onroll + response.Table[i].onroll;

                if (response.Table[i].Sc_M != null)
                    Sc_M = Sc_M + response.Table[i].Sc_M;

                if (response.Table[i].Sc_M != null)
                    Sc_F = Sc_F + response.Table[i].Sc_F;

                if (response.Table[i].St_M != null)
                    St_M = St_M + response.Table[i].St_M;

                if (response.Table[i].St_F != null)
                    St_F = St_F + response.Table[i].St_F;

                if (response.Table[i].BC_A_M != null)
                    BC_A_M = BC_A_M + response.Table[i].BC_A_M;

                if (response.Table[i].BC_A_F != null)
                    BC_A_F = BC_A_F + response.Table[i].BC_A_F;

                if (response.Table[i].BC_B_M != null)
                    BC_B_M = BC_B_M + response.Table[i].BC_B_M;

                if (response.Table[i].BC_B_F != null)
                    BC_B_F = BC_B_F + response.Table[i].BC_B_F;

                if (response.Table[i].BC_C_M != null)
                    BC_C_M = BC_C_M + response.Table[i].BC_C_M;

                if (response.Table[i].BC_C_F != null)
                    BC_C_F = BC_C_F + response.Table[i].BC_C_F;

                if (response.Table[i].BC_D_M != null)
                    BC_D_M = BC_D_M + response.Table[i].BC_D_M;

                if (response.Table[i].BC_D_F != null)
                    BC_D_F = BC_D_F + response.Table[i].BC_D_F;

                if (response.Table[i].BC_E_M != null)
                    BC_E_M = BC_E_M + response.Table[i].BC_E_M;

                if (response.Table[i].BC_E_F != null)
                    BC_E_F = BC_E_F + response.Table[i].BC_E_F;

                if (response.Table[i].Oc_M != null)
                    Oc_M = Oc_M + response.Table[i].Oc_M;

                if (response.Table[i].Oc_F != null)
                    Oc_F = Oc_M + response.Table[i].Oc_F;

                if (response.Table[i].NA_M != null)
                    NA_M = NA_M + response.Table[i].NA_M;

                if (response.Table[i].NA_F != null)
                    NA_F = NA_F + response.Table[i].NA_F;
            }
            $scope.onroll = onroll;
            $scope.Sc_M = Sc_M;
            $scope.Sc_F = Sc_F;
            $scope.St_M = St_M;
            $scope.St_F = St_F;
            $scope.BC_A_M = BC_A_M;
            $scope.BC_A_F = BC_A_F;
            $scope.BC_B_M = BC_B_M;
            $scope.BC_B_F = BC_B_F;
            $scope.BC_C_M = BC_C_M;
            $scope.BC_C_F = BC_C_F;
            $scope.BC_D_M = BC_D_M;
            $scope.BC_D_F = BC_D_F;
            $scope.BC_E_M = BC_E_M;
            $scope.BC_E_F = BC_E_F;
            $scope.Oc_M = Oc_M;
            $scope.Oc_F = Oc_F;
            $scope.NA_M = NA_M;
            $scope.NA_F = NA_F;


        },
        function (error) {
            $scope.$emit('hideLoading', data);
          //  $scope.loading = false;
            $scope.Noresult = true;
            $scope.result = false;
        })
        }
        $scope.openReport = function (collegeCode) {
            localStorage.setItem('collegeCode', collegeCode)
            $state.go('Dashboard.AdmissionDashboard.CategoryReports')
        }

        $scope.DownloadtoExcel = function (tableid) {
         
            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "CategoryReports.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }
    })

    app.factory('Excel', function ($window) {
        //alert("hello");
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
            format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
        return {
            tableToExcel: function (tableId, worksheetName) {
                var table = $(tableId);
                ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    });
})