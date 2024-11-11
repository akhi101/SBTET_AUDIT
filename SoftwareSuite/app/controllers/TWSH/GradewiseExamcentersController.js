define(['app'], function (app) {
    app.controller("GradewiseExamcentersController", function ($scope, $http, $localStorage, $state, AppSettings, TwshStudentRegService) {
        var authData = $localStorage.authorizationData;
        $scope.inputs = [
            { Value: "YES", Id: 1 },
            { Value: "NO", Id: 0 }
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

            var ExamCentersList = TwshStudentRegService.GetExamCentersList();
            ExamCentersList.then(function (res) {
                // console.log(res);
                $scope.ExamCentersList = res;
            }, function (err) {
                $scope.GetExamCentersList = [];
            });


        }

        $scope.deleteExamcenter = function (id, data) {

            if (confirm("Are you sure you want to delete Exam center " + data.ExamCenter + " ?") == true) {

                var DeleteTwshExamCenter = TwshStudentRegService.DeleteGradewiseExamCenters(id);
                DeleteTwshExamCenter.then(function (response) {
                    if (response[0].ResponceCode == '200') {
                        alert(response[0].ResponceDescription)
                        $scope.submit();
                    } else {
                        $scope.submit();
                    }
                },
                    function (error) {
                    });
            }

        }

        $scope.Editsemesterdat = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;

        }

        var data = {};
        //$scope.$emit('showLoading', data);
        $scope.Data = false;
        $scope.Nodata = false;
        $scope.loading = false;
        $scope.submit = function () {
          
            $scope.Data = false;
            $scope.loading = true;
            var getData = TwshStudentRegService.TwshGradewiseExamCenters();
            getData.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.StrengthReport = response.Table;
                    for (var j = 1; j < response.Table.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                    $scope.loading = false;
                    $scope.Data = true;
                    $scope.NoData = false;

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


        $scope.Cancel = function (data, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
                ele2[j].style['-webkit-appearance'] = "none";
                ele2[j].style['-moz-appearance'] = "none";
            }
        }

        $scope.Add = function () {
            var Obj = {       
                "ExamCenterId": $scope.ExamCenter,
                "TEL": $scope.TEL,
                "TEH": $scope.TEH,
                "TEHS": $scope.TEHS,
                "TTL": $scope.TTL,
                "TTH": $scope.TTH,
                "TTHS": $scope.TTHS,
                "THL": $scope.THL,
                "THH": $scope.THH,
                "TUL": $scope.TUL,
                "TUH": $scope.TUH,
                "SEL": $scope.SEL,
                "SEI": $scope.SEI,
                "SEH": $scope.SEH,
                "SEHS150": $scope.SEHS150,
                "SEHS180": $scope.SEHS180,
                "SEHS200": $scope.SEHS200,
                "STL": $scope.STL,
                "STH": $scope.STH,
                "STHS80": $scope.STHS80,
                "STHS100": $scope.STHS100,
                "SUL": $scope.SUL,
                "SUH": $scope.SUH,
                "TEJ": $scope.TEJ,
                "DataTypeId": 1
            }
            var setInstitute = TwshStudentRegService.AddGradewiseExamCenters(Obj);
            setInstitute.then(function (res) {
                $scope.edit = false;
                var response = JSON.parse(res)
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription)
                    $scope.submit();
                } else if (response[0].ResponseCode == '400') {
                    alert(response[0].ResponseDescription)
                    $scope.submit();
                }

            }, function (err) {
                $scope.edit = true;
                alert('Something Went Wrong')
                console.log(err);
            });
        }


        $scope.Update = function (data, ind) {
          
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
                ele2[j].style['-webkit-appearance'] = "none";
                ele2[j].style['-moz-appearance'] = "none";
            }
            
            var Obj={
                
                "ExamCenterId":data.ExamCenterId, 
                "TEL":data.TEL, 
                "TEH":data.TEH, 
                "TEHS":data.TEHS, 
                "TTL":data.TTL, 
                "TTH":data.TTH, 
                "TTHS":data.TTHS,  
                "THL":data.THL, 
                "THH":data.THH, 
                "TUL":data.TUL, 
                "TUH":data.TUH, 
                "SEL":data.SEL, 
                "SEI":data.SEI, 
                "SEH":data.SEH, 
                "SEHS150":data.SEHS150, 
                "SEHS180":data.SEHS180, 
                "SEHS200":data.SEHS200, 
                "STL":data.STL, 
                "STH":data.STH, 
                "STHS80":data.STHS80, 
                "STHS100":data.STHS100, 
                "SUL":data.SUL, 
                "SUH":data.SUH, 
                "TEJ": data.TEJ,
                "DataTypeId":2,
                "IsActive":data.IsActive,
                "Id":  data.Id
        }
            var setInstitute = TwshStudentRegService.UpdateGradewiseExamCenters(Obj);
            setInstitute.then(function (res) {
                $scope.edit = false;
                var response = JSON.parse(res)
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription)
                    $scope.submit();
                }

            }, function (err) {
                $scope.edit = true;
                alert('Something Went Wrong')
                console.log(err);
            });
        }

        $scope.DownloadExcel = function () {
            var getExcelDta = TwshStudentRegService.TwshGradewiseExamCentersExcel();
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