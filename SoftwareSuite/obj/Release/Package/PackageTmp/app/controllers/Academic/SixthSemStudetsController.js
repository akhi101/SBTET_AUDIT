define(['app'], function (app) {
    app.controller("SixthSemStudentsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, AcademicService) {

        var authData = $localStorage.authorizationData;
        console.log(authData)
        $scope.userName = authData.userName;
        $scope.CollegeCode = authData.College_Code;
        AppSettings.College_Name = authData.College_Name;
        $scope.College_Name = authData.College_Name;
        AppSettings.userName = authData.userName;
        $scope.BranchCode = authData.BranchCode;
        $scope.BranchId = authData.BranchId;
        $scope.CollegeID = authData.CollegeID;
      //  $scope.AcademicId = authData.AcademicId;
        //if ($scope.AcademicId == null || $scope.AcademicId == undefined || $scope.AcademicId == 0) {
        //    $scope.AcademicId = 13
        //}

        $scope.timeslotlist = [{ Id: true, val: '6SEM' }, { Id: false, val: '5SEM' }];


        $scope.PinsList = [];
        $scope.changeCenter = function (data) {
            if (data.Is6thSemStudied == true) {
                var Is6thSemStudied = 1
            } else if (data.Is6thSemStudied == false) {
                var Is6thSemStudied = 0
            }
            if ($scope.PinsList.length == '0') {
                //  console.log(data.internal)
                var marksdata = $scope.pushData(data.ID,data.PIN, Is6thSemStudied);
                $scope.PinsList.push(marksdata);


            } else if ($scope.PinsList.length > 0) {
                tempId = [];
                $scope.PinsList.map((obj) => {
                    if (obj.pin == data.PIN) {
                        obj.Is6thSemStudied = Is6thSemStudied;
                        obj.Id = data.ID;
                        tempId.push(data.PIN);
                    }
                    else if (obj.pin != data.PIN && !tempId.includes(data.PIN)) {
                        //  console.log(data.internal)
                        var marksdata = $scope.pushData(data.ID,data.PIN, Is6thSemStudied);

                        tempId.push(data.PIN);
                        $scope.PinsList.push(marksdata);

                    }
                });

            }
            //console.log($scope.PinsList);

        }


        $scope.pushData = function (Id,pin, Is6thSemStudied) {
            return {
                Id: Id,
                pin: pin,
                Is6thSemStudied: Is6thSemStudied,
            };
        }


        var AcademicYears = AcademicService.getAcademicYears($scope.CollegeID);
        AcademicYears.then(function (data, status, headers, config, error) {
            //console.log(data)
            $scope.AcademicYears = data.Table;
           
            for (let i = 0; i < $scope.AcademicYears.length; i++) {
                if ($scope.AcademicYears[i].IsCurrentAcademicYear == '1') {
                    $scope.AcademicId = $scope.AcademicYears[i].AcademicID
                }
                
            }
            $scope.ChangeSData()
        }, function (error) {

            console.log(error);
        });
        //$scope.LoadImg = true;
        //var getSixthSemStudents = AcademicService.GetSixthSemStudentsData($scope.CollegeCode, $scope.BranchId, $scope.AcademicId);
        //getSixthSemStudents.then(function (data) {
        //    if (data.length > 0) {
        //        $scope.Semdata = data;
        //        $scope.LoadImg = false;
        //        $scope.Result = true;
        //        $scope.Noresult = false;
        //    } else {
        //        $scope.LoadImg = false;
        //        $scope.Result = false;
        //        $scope.Noresult = true;
        //    }

        //}, function (error) {
        //    $scope.LoadImg = false;
        //    //alert(error);
        //    $scope.Result = false;
        //    $scope.Noresult = true;
        //});

        $scope.ChangeSData = function () {
            $scope.LoadImg = true;
            var getSixthSemStudents = AcademicService.GetSixthSemStudentsData($scope.CollegeCode, $scope.BranchId, $scope.AcademicId);
            getSixthSemStudents.then(function (data) {
                if (data.length > 0) {
                    $scope.Semdata = data;
                    $scope.LoadImg = false;
                    $scope.Result = true;
                    $scope.Noresult = false;
                } else {
                    $scope.LoadImg = false;
                    $scope.Result = false;
                    $scope.Noresult = true;
                }

            }, function (error) {
                $scope.LoadImg = false;
                console.log(error);
                $scope.Result = false;
                $scope.Noresult = true;
            });

        }


        $scope.UpdateData = function () {
            if ($scope.PinsList.length == 0) {
                alert('Please Change atleast 1 pin status and update')
                return;
            }
            var setExaminationCenters = AcademicService.SetPinsData($scope.CollegeCode, $scope.BranchId, $scope.AcademicId, $scope.PinsList);
            setExaminationCenters.then(function (response) {
                if (response[0].ResponseCode == '200') {
                    $scope.PinsList =[]
                    alert(response[0].ResponseDescription);
                } else if (response[0].ResponseCode == '400') {
                    alert(response[0].ResponseDescription);
                }

            },
                function (error) {
                    alert("error while Saving Data");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                    $scope.loading = false;
                    //$scope.Noresult = true;
                    $scope.result = false;
                });
        }

        $scope.SubmitData = function () {
            //if ($scope.PinsList.length == 0) {
            //    alert('Please Change atleast 1 pin status and update')
            //    return;
            //}
            var Submitted = 1;
            var SetSixthSemData = AcademicService.SetSixthSemStudentsSubmit($scope.CollegeCode, $scope.BranchId, $scope.AcademicId, Submitted);
            SetSixthSemData.then(function (response) {
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription);

                    $scope.edit = true;
                    $scope.update = false;
                } else if (response[0].ResponseCode == '400') {
                    alert(response[0].ResponseDescription);
                }


            },
                function (error) {
                    alert("error while Submitting Data");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                });
        }

    })
})