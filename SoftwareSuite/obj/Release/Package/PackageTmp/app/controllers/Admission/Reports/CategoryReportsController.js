define(['app'], function (app) {
    app.controller("CategoryReportsController", function ($scope, $http, $localStorage, $state, AppSettings, AdmissionService, AcademicService , Excel, $timeout) {
        $scope.loading = false;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.academicYear = 14;
            var authData = $localStorage.authorizationData;
            $scope.UserName = authData.userName;
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



        var authdata = $localStorage.authorizationData;
        $scope.userType = authdata.SystemUserTypeId
        $scope.UserName = authdata.userName;
       
        if ($scope.userType == 1) {
            $scope.ClgCode = localStorage.getItem('collegeCode')

        } else if ($scope.userType == 2) {
            $scope.ClgCode = $scope.UserName
            var userId = authdata.SysUserID;
        } else if ($scope.userType == 3) {
            $scope.ClgCode = authdata.userName
            var userId = authdata.SysUserID;
        } else {
            $scope.ClgCode = localStorage.getItem('collegeCode')
            // var ClgCode = '99999';

        }
        
        //var data = {};
        //$scope.$emit('showLoading', data);


        //var getActiveList = AdmissionService.getStudentCategory(ClgCode);
        //getActiveList.then(function (response) {
        //    //console.log(response)
        //    if (response.length > 0) {
        //        $scope.response = response;
        //        //     $scope.loading = false;
        //        $scope.$emit('hideLoading', data);
        //        $scope.Noresult = false;
        //        $scope.result = true;

        $scope.openOnroll = function (data,M) {
            $localStorage.categoryData = {
                CollegeCode: data.CollegeCode,
                SemId: data.SemID,
                BranchId: data.branchid,
                SchemeId: data.SchemeId,
                DataFormatTypeId: 1,
               
                Gender: M


            }
            //console.log($localStorage.categoryData)
            $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

        }
        $scope.getadmincategory = function () {

            var data = {};
            $scope.$emit('showLoading', data);
            var getActiveList = AdmissionService.getStudentCategory($scope.academicYear, $scope.ClgCode);
            getActiveList.then(function (response) {
                if (response.length > 0) {
                    //console.log(response)
                    $scope.CollegeCategories = response;
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
                    var Oc_F = 0;
                    var NA_M = 0;
                    var NA_F = 0;



                    for (var i = 0; i < response.length; i++) {

                        if (response[i].onroll != null)
                            onroll = onroll + response[i].onroll;

                        if (response[i].Sc_M != null)
                            Sc_M = Sc_M + response[i].Sc_M;

                        if (response[i].Sc_F != null)
                            Sc_F = Sc_F + response[i].Sc_F;

                        if (response[i].St_M != null)
                            St_M = St_M + response[i].St_M;

                        if (response[i].St_F != null)
                            St_F = St_F + response[i].St_F;

                        if (response[i].BC_A_M != null)
                            BC_A_M = BC_A_M + response[i].BC_A_M;

                        if (response[i].BC_A_F != null)
                            BC_A_F = BC_A_F + response[i].BC_A_F;

                        if (response[i].BC_B_M != null)
                            BC_B_M = BC_B_M + response[i].BC_B_M;

                        if (response[i].BC_B_F != null)
                            BC_B_F = BC_B_F + response[i].BC_B_F;

                        if (response[i].BC_C_M != null)
                            BC_C_M = BC_C_M + response[i].BC_C_M;

                        if (response[i].BC_D_M != null)
                            BC_D_M = BC_D_M + response[i].BC_D_M;

                        if (response[i].BC_D_F != null)
                            BC_D_F = BC_D_F + response[i].BC_D_F;

                        if (response[i].BC_C_F != null)
                            BC_C_F = BC_C_F + response[i].BC_C_F;

                        if (response[i].BC_E_M != null)
                            BC_E_M = BC_E_M + response[i].BC_E_M;

                        if (response[i].BC_E_F != null)
                            BC_E_F = BC_E_F + response[i].BC_E_F;

                        if (response[i].Oc_M != null)
                            Oc_M = Oc_M + response[i].Oc_M;

                        if (response[i].Oc_F != null)
                            Oc_F = Oc_F + response[i].Oc_F;

                        if (response[i].NA_M != null)
                            NA_M = NA_M + response[i].NA_M;

                        if (response[i].NA_F != null)
                            NA_F = NA_F + response[i].NA_F;
                    }

                    $scope.onroll = onroll;
                    $scope.Sc_M = Sc_M;
                    $scope.Sc_F = Sc_F;
                    $scope.St_M = St_M;
                    $scope.St_F = St_F;
                    $scope.BC_A_M = BC_A_M;
                    $scope.BC_A_F = BC_A_F;
                    $scope.BC_B_M = BC_B_M;
                    $scope.BC_C_F = BC_C_F;
                    $scope.BC_D_M = BC_D_M;
                    $scope.BC_D_F = BC_D_F;
                    $scope.BC_E_M = BC_E_M;
                    $scope.BC_E_F = BC_E_F;
                    $scope.BC_B_F = BC_B_F;
                    $scope.BC_C_M = BC_C_M;
                    $scope.Oc_M = Oc_M;
                    $scope.Oc_F = Oc_F;
                    $scope.NA_M = NA_M;
                    $scope.NA_F = NA_F;





                }
                else {
                    $scope.$emit('hideLoading', data);
                    //   $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }

            },
                function (error) {
                    alert("error while loading Reports");
                    $scope.$emit('hideLoading', data);
                    //  $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;

                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }

      
        $scope.openOcM = function (data, M) {
         
            $localStorage.categoryData = {
                CollegeCode: data.CollegeCode,
                SemId: data.SemID,
                BranchId: data.branchid,
                SchemeId: data.SchemeId,
                DataFormatTypeId: 2,
                Gender: M
            }
            $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

        }
        $scope.openOcF = function (data, F) {
            $localStorage.categoryData = {
                CollegeCode: data.CollegeCode,
                SemId: data.SemID,
                BranchId: data.branchid,
                SchemeId: data.SchemeId,
                DataFormatTypeId: 2,
                Gender: F
            }
            $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

        }
        $scope.openScM = function (data,M) {
                $localStorage.categoryData = {
                    CollegeCode: data.CollegeCode,
                    SemId: data.SemID,
                    BranchId: data.branchid,
                    SchemeId: data.SchemeId,
                    DataFormatTypeId: 3,
                    Gender: M
                }
                $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

        }

        $scope.openScF= function (data,F) {
            $localStorage.categoryData = {
                CollegeCode: data.CollegeCode,
                SemId: data.SemID,
                BranchId: data.branchid,
                SchemeId: data.SchemeId,
                DataFormatTypeId: 3,
                Gender: F
            }
            $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

        }
        $scope.openStM = function (data,M) {
                    $localStorage.categoryData = {
                        CollegeCode: data.CollegeCode,
                        SemId: data.SemID,
                        BranchId: data.branchid,
                        SchemeId: data.SchemeId,
                        DataFormatTypeId: 4,
                        Gender: M
                    }
                    $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

        }
        $scope.openStF = function (data,F) {
            $localStorage.categoryData = {
                CollegeCode: data.CollegeCode,
                SemId: data.SemID,
                BranchId: data.branchid,
                SchemeId: data.SchemeId,
                DataFormatTypeId: 4,
                Gender: F
            }
            $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

        }
        $scope.openBCAM = function (data,M) {
                        $localStorage.categoryData = {
                            CollegeCode: data.CollegeCode,
                            SemId: data.SemID,
                            BranchId: data.branchid,
                            SchemeId: data.SchemeId,
                            DataFormatTypeId: 5,
                            Gender:M
                        }
                        $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

        }
        $scope.openBCAF = function (data,F) {
            $localStorage.categoryData = {
                CollegeCode: data.CollegeCode,
                SemId: data.SemID,
                BranchId: data.branchid,
                SchemeId: data.SchemeId,
                DataFormatTypeId: 5,
                Gender:F
            }
            $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

        }
       
                        $scope.openBCBM = function (data,M) {
                                $localStorage.categoryData = {
                                    CollegeCode: data.CollegeCode,
                                    SemId: data.SemID,
                                    BranchId: data.branchid,
                                    SchemeId: data.SchemeId,
                                    DataFormatTypeId: 6,
                                    Gender:M
                                }
                                $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

                        }
                        $scope.openBCBF = function (data,F) {
                            $localStorage.categoryData = {
                                CollegeCode: data.CollegeCode,
                                SemId: data.SemID,
                                BranchId: data.branchid,
                                SchemeId: data.SchemeId,
                                DataFormatTypeId: 6,
                                Gender:F
                            }
                            $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

                        }
                        $scope.openBCCM = function (data,M) {
                                    $localStorage.categoryData = {
                                        CollegeCode: data.CollegeCode,
                                        SemId: data.SemID,
                                        BranchId: data.branchid,
                                        SchemeId: data.SchemeId,
                                        DataFormatTypeId: 7,
                                        Gender:M

                                    }
                                    $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

                        }
                        $scope.openBCCF = function (data) {
                            $localStorage.categoryData = {
                                CollegeCode: data.CollegeCode,
                                SemId: data.SemID,
                                BranchId: data.branchid,
                                SchemeId: data.SchemeId,
                                DataFormatTypeId: 7,
                                Gender:F
                            }
                            $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

                        }

                        $scope.openBCDM = function (data,M) {
                                        $localStorage.categoryData = {
                                            CollegeCode: data.CollegeCode,
                                            SemId: data.SemID,
                                            BranchId: data.branchid,
                                            SchemeId: data.SchemeId,
                                            DataFormatTypeId: 8,
                                            Gender:M

                                        }
                                        $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

                        }

                        $scope.openBCDF = function (data,F) {
                            $localStorage.categoryData = {
                                CollegeCode: data.CollegeCode,
                                SemId: data.SemID,
                                BranchId: data.branchid,
                                SchemeId: data.SchemeId,
                                DataFormatTypeId: 8,
                                Gender:F
                            }
                            $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

                        }

                        $scope.openBCEM = function (data,M) {
                                            $localStorage.categoryData = {
                                                CollegeCode: data.CollegeCode,
                                                SemId: data.SemID,
                                                BranchId: data.branchid,
                                                SchemeId: data.SchemeId,
                                                DataFormatTypeId: 9,
                                                Gender:M
                                            }
                                            $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

                        }

                        $scope.openBCEF= function (data,F) {
                            $localStorage.categoryData = {
                                CollegeCode: data.CollegeCode,
                                SemId: data.SemID,
                                BranchId: data.branchid,
                                SchemeId: data.SchemeId,
                                DataFormatTypeId: 9,
                                Gender:F
                            }
                            $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

                        }
                        $scope.openNaM = function (data,M) {
                            $localStorage.categoryData = {
                                CollegeCode: data.CollegeCode,
                                SemId: data.SemID,
                                BranchId: data.branchid,
                                SchemeId: data.SchemeId,
                                DataFormatTypeId: 10,
                                Gender:M
                            }
                            $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

                        }
                        $scope.openNaF = function (data,F) {
                            $localStorage.categoryData = {
                                CollegeCode: data.CollegeCode,
                                SemId: data.SemID,
                                BranchId: data.branchid,
                                SchemeId: data.SchemeId,
                                DataFormatTypeId: 10,
                                Gender:F
                            }
                            $state.go('Dashboard.AdmissionDashboard.CategoryDetails')

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