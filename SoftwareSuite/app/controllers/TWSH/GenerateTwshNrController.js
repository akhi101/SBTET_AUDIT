        define(['app'], function (app) {
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
            app.controller("GenerateTwshNrController", function ($scope, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {
                var authData = $localStorage.authorizationData;

                $scope.Data = false;

                $scope.UserTypeId = authData.SystemUserTypeId;
                if ($scope.UserTypeId == 1 || $scope.UserTypeId == 5 || $scope.UserTypeId == 1011 || $scope.UserTypeId == 1012 || $scope.UserTypeId == 1000 || $scope.UserTypeId == 1013 || $scope.UserTypeId == 1014 || $scope.UserTypeId == 1015 || $scope.UserTypeId == 1007 || $scope.UserTypeId == 1002 || $scope.UserTypeId == 1009) {
                    $scope.CollegeCode = null;
                } else if ($scope.UserTypeId == 2) {
                    $scope.CollegeCode = authData.College_Code;
                } else if ($scope.UserTypeId == 3) {
                    var branchCode = authData.userName.split('_')[0];
                    $scope.CollegeCode = authData.College_Code;
                }
              

                $scope.DownloadExcel = function () {
                    var getExcelDta = TwshStudentRegService.generateTwshNrExcel();
                    getExcelDta.then(function (data) {
                        $scope.gentmetbl = false;

                        if (data.length > 0) {
                            if (data.length > 4) {
                                $scope.Result = true;
                                var location = data;
                                window.location.href = location;

                            } else {
                                alert("Syllabus Coverage Report not Available");
                            }
                        } else {
                            alert("Syllabus Coverage Report not Available");
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

                $scope.DownloadtoExcel = function (tableid) {
                    var exportHref = Excel.tableToExcel(tableid, 'SyllabusCoverageReport');
                    $timeout(function () {
                        var a = document.createElement('a');
                        a.href = exportHref;
                        a.remove();
                        a.download = "SyllabusCoverageReport.xls";
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                    }, 100);
                }

              
                var data = {};
                $scope.$emit('showLoading', data);
                 var getData = TwshStudentRegService.generateTwshNr($scope.UserTypeId, $scope.CollegeCode, branchCode);
                    getData.then(function (response) {
                        //var response = JSON.parse(response)
                        if (response.length > 0) {
                            $scope.getSyllabusReport = response;
                            $scope.$emit('hideLoading', data);
                            $scope.Data = true;
                            $scope.NoData = false;
                        } else {
                            $scope.$emit('hideLoading', data);
                            $scope.Data = false;
                            $scope.NoData = true;
                            alert("No Data Found");
                        }

                    },
                        function (error) {
                            $scope.$emit('hideLoading', data);
                            alert("error while loading Syllabus Report");
                            var err = JSON.parse(error);
                            console.log(err.Message);
                            $scope.loading = false;
                            $scope.Data = false;
                            $scope.NoData = true;
                        });



                //$scope.submit = function () {
                //    $scope.loading = true;
                //    var getData = AcademicService.GetSyllabusReport($scope.UserTypeId, $scope.ShiftId, $scope.CollegeCode);
                //    getData.then(function (response) {
                //        console.log(response)
                //        if (response.Table1.length > 0) {
                //            $scope.getSyllabusReport = response.Table1;
                //            $scope.loading = false;
                //            $scope.Data = true;
                //            $scope.NoData = false;
                //        } else {
                //            $scope.loading = false;
                //            $scope.Data = false;
                //            $scope.NoData = true;
                //            alert("No Data Found");
                //        }

                //    },
                //   function (error) {
                //       alert("error while loading Syllabus Report");
                //       var err = JSON.parse(error);
                //       console.log(err.Message);
                //       $scope.loading = false;
                //       $scope.Data = false;
                //       $scope.NoData = true;
                //   });
                //}
                $scope.openDetails = function () {
                    //$state.go('Dashboard.Academic.PrincipalSyllabusCoverageReport')
                }


            })
        })

 