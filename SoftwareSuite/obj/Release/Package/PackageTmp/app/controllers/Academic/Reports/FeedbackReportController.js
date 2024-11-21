define(['app'], function (app) {
    app.controller("FeedbackReportController", function ($scope, $q, $http, $localStorage, Excel, $timeout, AcademicService, PreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId
        $scope.Data = false;
        var authData = $localStorage.authorizationData;
        if ($scope.UserTypeId == 2) {
            $scope.selcollege = authData.College_Code;
            var Branchs = AcademicService.GetBranchList($scope.selcollege);
            Branchs.then(function (response) {
                //console.log(response)
                $scope.GetBranchList = response;

            }, function (error) {
                alert("error while loading Academic Year");

            });
        } else if ($scope.UserTypeId == 3) {
            $scope.selcollege = authData.College_Code;
            $scope.selBranch = authData.BranchId
            var Branchs = AcademicService.GetBranchList($scope.selcollege);
            Branchs.then(function (response) {
                //console.log(response)
                $scope.GetBranchList = response;

            }, function (error) {
                alert("error while loading Academic Year");

            });
        }
        $scope.ChangeCollege = function () {
            var Branchs = AcademicService.GetBranchList($scope.selcollege);
            Branchs.then(function (response) {
                //console.log(response)
                $scope.GetBranchList = response;

            }, function (error) {
                alert("error while loading Academic Year");

            });
        }

       

        var ApprovalLists = AcademicService.GetCollegeList();
        ApprovalLists.then(function (response) {
            //console.log(response)
            $scope.GetCollegeList = response.Table;

        }, function (error) {
            alert("error while loading Academic Year");

        });
        
        var Schemes = AcademicService.getSchemes();
        Schemes.then(function (response) {
            //console.log(response)
            $scope.getSchemes = response.Table;

        }, function (error) {
            alert("error while loading Academic Year");

        });
       

        $scope.ChangeScheme = function () {
            var Semesters = AcademicService.GetSchemeSems($scope.selscheme);
            Semesters.then(function (response) {
                //console.log(response)
                $scope.getActiveSemester = response.Table;

            }, function (error) {
                alert("error while loading Academic Year");

            });
        }
        
      
        
        
        $scope.GetData = function () {
            //GetAdminFeedbackReport  FeedbackId, CollegeCode, branchid,  SchemeId,  SemId
            var getReportData = AcademicService.GetFeedbackReport($scope.FeedbackId,$scope.selcollege,$scope.selBranch,$scope.selscheme, $scope.selsem)
                getReportData.then(function (response) {
                    var response = JSON.parse(response)
                    if (response.Table.length > 0) {
                        $scope.Data = true
                        $scope.Noresult = false;
                        $scope.getFeedbackReport = response.Table;

                    } else {
                        $scope.Data = false
                        $scope.Noresult = true;
                    }
                },
                    function (error) {
                        alert("error while loading Feedback Report");
                        var err = JSON.parse(error);
                        console.log(err.Message);
                        $scope.loading = false;
                        $scope.Data = false;
                        $scope.Noresult = true;
                    });
          
        }
        //$scope.FeedbackType = [
        //    { "Id": 1, "Name": "2019-2020 MID 1 FEEDBACK" },
        //    { "Id": 2, "Name": "2019-2020 MID 2 FEEDBACK" }]

        //-----------------------get available feedbacks for dropdown ------------------
        var GetAvailableFeedbacks = AcademicService.GetAvailableFeedbacks();
        GetAvailableFeedbacks.then(function (res) {
            try {
                var res = JSON.parse(res);
            } catch (err) { }

            $scope.FeedbackType = res.Table;
        },
            function (error) {
                var err = JSON.parse(error);
                console.log(err.Message);

            });

       

        $scope.Submit = function () {
            var authData = $localStorage.authorizationData;
            if ($scope.UserTypeId == 2) {
                $scope.selcollege = authData.College_Code;
            } else if ($scope.UserTypeId == 3) {
                $scope.selcollege = authData.College_Code;
                $scope.selBranch = authData.BranchId
            }
            $scope.loading = true;
            $scope.Data = false;
            $scope.Noresult = false;
            //if ($scope.UserTypeId == 1 || $scope.UserTypeId == 1010) {
            //    var getData = AcademicService.GetAdminFeedbackReport($scope.FeedbackId, 2, 5, 2);
            //}else{  
            var getData = AcademicService.GetFeedbackReport($scope.FeedbackId, $scope.selcollege, $scope.selBranch, $scope.selscheme, $scope.selsem);
            //}
            getData.then(function (response) {
                if (response.Table.length > 0 && response.Table1.length > 0 && response.Table2.length > 0) {
                    $scope.getFeedbackReport = response.Table;
                    $scope.feedbackdesclist = response.Table1;
                    $scope.getFeedbackReport1 = response.Table2;
                    console.log($scope.getFeedbackReport1)
                    $scope.loading = false;
                    $scope.Data = true;
                    $scope.Noresult = false;

                    $scope.distfeedbacksdesc = [];
                    var finalarr = [];
                    response.Table2.forEach(function (dat) {
                        if (!$scope.distfeedbacksdesc.includes(dat.DescriptionId))
                            $scope.distfeedbacksdesc.push(dat.DescriptionId);
                    })

                    for (var i = 0; i < response.Table1.length; i++) {
                        finalarr[i] = {};
                        finalarr[i].descId = response.Table1[i].DescriptionID;
                        finalarr[i].descName = response.Table1[i].DescriptionName;
                        var descarr = [];
                        $scope.getFeedbackReport1.forEach(function (value1, index1) {
                            if (value1.DescriptionId == response.Table1[i].DescriptionID) {
                                var temparr1 = [];
                                $scope.getFeedbackReport.forEach(function (value2, index2) {
                                    if (value2.subid == value1.SubId && !temparr1.includes(value2.subid)) {
                                        descarr[index2] = {};
                                        descarr[index2] = value1;
                                        temparr1.push(value2.subid);
                                    }
                                });
                            }
                        });
                        finalarr[i].descfeed = descarr;

                    }

                    $scope.feedbackdata = finalarr;
                    console.log($scope.feedbackdata)
                } else {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.Noresult = true;
                    alert("No Data Found");
                }

            },
                function (error) {
                    alert("error while loading Feedback Report");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.Noresult = true;
                });
        }

        $scope.DownloadtoExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "FeedbackReport.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }

        $scope.GetFeedbackReportExcel = function () {

            $scope.loading1 = true;
            $scope.Noresult1 = false;
            var loadData1 = PreExaminationService.GetFeedbackReportExcel($scope.FeedbackId1)
            loadData1.then(function (res) {

                var data = JSON.parse(res)
                if (data[0].file) {
                    $scope.Result1 = true;
                    var location = data[0].file;
                    window.location.href = location;
                    $scope.Noresult1 = false;
                    $scope.loading1 = false;
                } else
                    if (data[0].ResponceCode == '400') {
                        $scope.loading1 = false;
                        $scope.Noresult1 = true;
                        alert(data[0].ResponceDescription);
                    }
                    else {
                        $scope.loading1 = false;
                        $scope.Noresult1 = true;
                        alert('Something Went Wrong')
                    }

            }, function (error) {
                console.log(error)
                $scope.loading1 = false;
                $scope.gentmetbl = false;
                $scope.Noresult1 = true;
                $scope.Result1 = false;
                $scope.LoadImg1 = false;
            });
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