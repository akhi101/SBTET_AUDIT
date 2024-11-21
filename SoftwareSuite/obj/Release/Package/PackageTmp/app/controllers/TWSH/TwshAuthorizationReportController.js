define(['app'], function (app) {
    app.controller("TwshAuthorizationReportController", function ($scope, $state, TwshStudentRegService, $localStorage) {
        var authData = $localStorage.authorizationData;

        $scope.userId = authData.SysUserID;
        $scope.userType = authData.SystemUserTypeId;

        $scope.ExamTypes = [
           { Name: "Computer Based Test(CBT)", Id: 1 },
           { Name: "TypeMachine Based Test(TMBT)", Id: 2 }
        ];
        //var studData = $localStorage.TwshAuthListData;
        //$scope.ExamMode = studData.ExamMode;
        //$scope.ExamMonthYearId = studData.ExamMonthYearId;
        var GetInstituteReports = TwshStudentRegService.getTwshAuthorizationlList($scope.ExamMode, $scope.ExamMonthYearId)
        GetInstituteReports.then(function (response) {
          
            if (response.length > 0) {
                //$scope.LoadImg = false;
                //$scope.$emit('hideLoading', MyData);
                $scope.data = true;

                $scope.QualifiedList = response;
                var Registered = 0;
                var ApprovalPending = 0;
                var Approved = 0;
                var Rejected = 0;
                for (count = 0; count < $scope.QualifiedList.length; count++) {
                    Registered += parseInt($scope.QualifiedList[count].registered)
                    ApprovalPending += parseInt($scope.QualifiedList[count].ApprovalPending)
                    Approved += parseInt($scope.QualifiedList[count].Approved);
                    rejected += parseInt($scope.QualifiedList[count].rejected);
                }

                $scope.Registered = Registered;
                $scope.ApprovalPending = ApprovalPending;
                $scope.Approved = Approved;
                $scope.Rejected = Rejected;

            } else {
                //$scope.LoadImg = false;
                $scope.$emit('hideLoading', MyData);
                $scope.StatusMessage = "No Data Found";
                $scope.showStatus = true;
                $scope.statusclass = 'alert-danger';
                $scope.data = false;
            }
        },
            function (error) {
                $scope.$emit('hideLoading', MyData);
                //$scope.LoadImg = false;
                $scope.StatusMessage = "No Data Found";
                $scope.showStatus = true;
                $scope.statusclass = 'alert-danger';
                $scope.data = false;

            });

        var GetExamYearMonth = TwshStudentRegService.getTwshExamMonthYears();
        GetExamYearMonth.then(function (res) {
            //console.log(res)
           // var response=JSON.parse(res)
            $scope.getExamYearMonth = res.Table;
            //console.log($scope.getExamYearMonth)
        },
                function (error) {

                    var err = JSON.parse(error);
                });

        //$scope.LoadImg = true;
        $scope.GetReport = function () {
            $scope.fromdate = moment($scope.FromDate).format("YYYY-MM-DD");
            $scope.todate = moment($scope.ToDate).format("YYYY-MM-DD");
            var GetInstituteReports = TwshStudentRegService.getTwshAuthorizationlList($scope.ExamMode, $scope.ExamMonthYearId, $scope.fromdate.toString(), $scope.todate.toString());
            GetInstituteReports.then(function (response) {
            
                if (response.length > 0) {
                    //$scope.LoadImg = false;
                    //$scope.$emit('hideLoading', MyData);
                    $scope.data = true;

                    $scope.QualifiedList = response;
                    var Registered = 0;
                    var ApprovalPending = 0;
                    var Approved = 0;
                    var Rejected = 0;
                    for (count = 0; count < $scope.QualifiedList.length; count++) {
                        Registered += parseInt($scope.QualifiedList[count].registered)
                        ApprovalPending += parseInt($scope.QualifiedList[count].ApprovalPending)
                        Approved += parseInt($scope.QualifiedList[count].Approved);
                        Rejected += parseInt($scope.QualifiedList[count].rejected);
                    }

                    $scope.Registered = Registered;
                    $scope.ApprovalPending = ApprovalPending;
                    $scope.Approved = Approved;
                    $scope.Rejected = Rejected;

                } else {
                    //$scope.LoadImg = false;
                    $scope.$emit('hideLoading', MyData);
                    $scope.StatusMessage = "No Data Found";
                    $scope.showStatus = true;
                    $scope.statusclass = 'alert-danger';
                    $scope.data = false;
                }
            },
                function (error) {
                    $scope.$emit('hideLoading', MyData);
                    //$scope.LoadImg = false;
                    $scope.StatusMessage = "No Data Found";
                    $scope.showStatus = true;
                    $scope.statusclass = 'alert-danger';
                    $scope.data = false;

                });

        }
        $scope.DownloadtoExcel = function () {
            var ApprovalList = TwshStudentRegService.getTwshAuthorizationlListExcel($scope.ExamMode, $scope.ExamMonthYearId, $scope.fromdate.toString(), $scope.todate.toString());
            ApprovalList.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponceCode = '200') {
                    //$scope.loading = false;
                    //$scope.Data = true;
                    window.location.href = response[0].file;

                } else {
                    alert("No Data Found")
                    $scope.loading = false;
                    //$scope.Data = false;
                }
            },
        function (error) {
            //$scope.Data = false;
            $scope.loading = false;
            alert("error while loading Exam Month Year");

        });
        }


        $scope.DownloadtoExcelBlind = function () {
            var DataType = 1;
            var blndlist = TwshStudentRegService.GetStudentBlindListExcel(DataType);
            blndlist.then(function (response) {
                if (response != null && response.length > 1) {
                    var location = window.location.origin;
                    $scope.LoadImg = false;
                    window.location.href = response;
                    $scope.NoResult = false;

                } else {
                    alert("No Data Found")
                    $scope.loading = false;
                    //$scope.Data = false;
                }
            },
                function (error) {
                    //$scope.Data = false;
                    $scope.loading = false;
                    alert("error while loading List");

                });
        }

        $scope.OpenCountData = function (DataType, data) {
            $localStorage.TwshAuthListData = {
                DataType: DataType,
                ExamMode: $scope.ExamMode,
                ExamMonthYearId: $scope.ExamMonthYearId,
                CollegeCode: data.CollegeCode,
                fromdate: $scope.fromdate,
                todate: $scope.todate
            }
            //localStorage.setItem('RegistrationNo', RegistrationNo)
            $state.go('Dashboard.TypeWriting.TwshAuthorizationReportList')
        }

    })
})