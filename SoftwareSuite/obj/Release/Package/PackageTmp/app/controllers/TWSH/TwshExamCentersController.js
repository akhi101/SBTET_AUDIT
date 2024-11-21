define(['app'], function (app) {
    app.controller("TwshExamCentersController", function ($scope, $localStorage, $uibModal, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName;
        $scope.UserTypeID = authData.SystemUserTypeId;
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.ExamMode = 2;
            $scope.ExamMonthYear = "";
            $scope.Adddata = false;
            $scope.GetExamCenters();
            $scope.GetTwshDisticts();
            console.log($localStorage.TempData)
            $scope.year = $localStorage.TempData.AcademicYearID
            //$scope.GetDetails();
        }

        var AcademicYearsActive = TwshStudentRegService.GetTwshAcademicYears();
        AcademicYearsActive.then(function (response) {

            //  $scope.years = response.Table[0];
            $scope.Acayears = response.Table;
           // console.log($localStorage.TempData)
            $scope.AcademyearicID = $localStorage.TempData.AcademicYearID
            $scope.getExamMonthYearsData()
        },
            function (error) {
                alert("error while loading Academic Year");
            });


        $scope.getExamMonthYearsData = function (year) {

            //let academicId = $scope.years.AcademicID;

            var EmYears = TwshStudentRegService.GetTwshExamMonthYearbyID($scope.year);
            EmYears.then(function (response) {
                console.log(response)
                try {
                    var Res = JSON.parse(response)
                }
                catch { error }
                $scope.ExamMonthYears = Res.Table;
                $scope.ExamMonthYear = $localStorage.TempData.ExamMonthYearID
                $scope.getExamCentres()
            },
                function (error) {
                    alert("error while loading semesters");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }


        $scope.GendersList = [
           { Name: "Male", Id: 1 },
           { Name: "Female", Id: 2 },
           { Name: "Both", Id: 3 }
        ];

        $scope.ExamTypes = [
         { Name: "Computer Based Test(CBT)", Id: 1 },
         { Name: "TypeMachine Based Test(TMBT)", Id: 2 }
        ];

        //$scope.addData = function () {

        //    $scope.Adddata = true;
        //}

        $scope.getExamCentres = function (ExamMonthYear) {
        $scope.loading = true;
            var getcentres = TwshStudentRegService.getExamCenters(1,$scope.year,$scope.ExamMonthYear);
            getcentres.then(function (response) {
                try {
                    var Res = JSON.parse(response)
                }
                catch { }
                if (Res.Table.length > 1 &&  Res.Table[0].ResponseCode == undefined){
                    $scope.loading = false;
                    $scope.Data = true;
                    $scope.getData = Res.Table;
                }
                else if (Res.Table.length > 0 && Res.Table[0].ResponseCode == '400') {
                    //alert("No Data Found")
                    $scope.loading = false;
                        $scope.modalInstance = $uibModal.open({
                            templateUrl: "/app/views/TWSH/Popups/ConfirmOldExamCentresPopup.html",
                            size: 'lg',
                            scope: $scope,
                            windowClass: 'modal-fit',
                            backdrop: 'static',
                            keyboard: false
                        });

                    $scope.closeModal = function () {
                        $scope.modalInstance.close();
                    };
                }
            },
        function (error) {
            $scope.Data = false;
            $scope.loading = false;
            alert("error while loading Exam Centers");
           
        });
        }


        $scope.confirmGetOldExamCentreData = function () {
            var getcentres = TwshStudentRegService.getExamCenters(2, $scope.year, $scope.ExamMonthYear);
            getcentres.then(function (response) {
                try {
                    var Res = JSON.parse(response)
                }
                catch { }
                if (Res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.getData = Res.Table;
                    $scope.modalInstance.close();
                }
                else{
                    alert("No Data Found")
                    $scope.loading = false;
                }
            },
                function (error) {
                    $scope.Data = false;
                    $scope.loading = false;
                    alert("error while loading Exam Centers");

                });
        }

        $scope.GetExamCenters = function () {
            var CenterCollegeList = TwshStudentRegService.getTwshExamCenterCollegeList();
            CenterCollegeList.then(function (response) {
                $scope.ExamCenterCollegeList = response.Table;

            }, function (error) {
                alert("error while loading Exam centers.");

            });
        }

        $scope.GetTwshDisticts = function () {
            var getTwshDistictMasterList = TwshStudentRegService.getTwshDistictMasterList();
            getTwshDistictMasterList.then(function (response) {
                $scope.ExamDistrictList = response.Table;

            }, function (error) {
                alert("error while loading Exam Disticts.");

            });
        }


        $scope.EditCentres = function (Id) {
            var getcentres = TwshStudentRegService.editExamCenters(Id);
            getcentres.then(function (response) {
                try {
                    var Res = JSON.parse(response)
                }
                catch { }
                if (Res.Table.length > 0) {
                    $scope.EditData = Res.Table[0];
                }
                else {
                    alert("No Data Found")
                }
            },
                function (error) {
                    $scope.Data = false;
                    $scope.loading = false;
                    alert("error while loading Exam Centers");

                });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/TWSH/Popups/EditExamCentresPopup.html",
                size: 'lg',
                scope: $scope,
                windowClass: 'modal-fit',
                backdrop: 'static',
                keyboard: false
            });

            $scope.closeModal = function () {
                $scope.modalInstance.close();
            };

        }
       

        $scope.ActiveValues = [
            { "Id": true, "Value": true },
              { "Id": false, "Value": false }
        ]

        $scope.inputs = [
           { "Id": 1, "Value": "Yes" },
             { "Id": 0, "Value": "No" }
        ]

        $scope.deleteExamcenter = function (id,data) {

            if (confirm("Are you sure you want to delete Exam center " + data.ExaminationCenterCode + "-" + data.ExaminationCenterName +" ?") == true) {
              
                var DeleteTwshExamCenter = TwshStudentRegService.DeleteTwshExamCenter(id);
                DeleteTwshExamCenter.then(function (response) {
                    if (response[0].ResponceCode == '200') {
                        alert(response[0].ResponceDescription)
                        $scope.GetDetails();
                    } else {
                        $scope.GetDetails();
                    }
                },
                    function (error) {
                    });
            }

        }


        $scope.DownloadtoExcel = function () {

            var excel = TwshStudentRegService.getExamCentersExcel($scope.year, $scope.ExamMonthYear);
            excel.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponceCode='200') {
                    //$scope.loading = false;
                    $scope.Data = true;
                    window.location.href = response[0].file;
                   
                } else {
                    alert("No Data Found")
                    $scope.loading = false;
                    $scope.Data = false;
                }
            },
        function (error) {
            $scope.Data = false;
            $scope.loading = false;
            alert("error while loading Exam Month Year");

        });
        }

        $scope.UpdateDetails = function (data) {
            var Setexamcentres = TwshStudentRegService.UpdateTwshExamCentres(2, data.Id, data.AcademicID, data.ExamMonthYearID, data.ExaminationCenterCode, data.ExaminationCenterName, data.DistrictId, data.GenderId, data.IsTwOnline, data.IsTw, data.IsSh, data.ExaminationCenterAddress, data.IsActive, data.InsertedBy)
            Setexamcentres.then(function (response) {
                try {
                    var response = JSON.parse(response)
                }
                catch (err) { }
                if (response.Table[0].ResponseCode == '200') { 
                    alert(response.Table[0].ResponseDescription);
                    $scope.getExamCentres(data.ExamMonthYearID);
                    $scope.modalInstance.close();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription);
                    $scope.getExamCentres(data.ExamMonthYearID);
                    $scope.modalInstance.close();
                }else {
                    alert('Something Went Wrong');
                    $scope.getExamCentres();
                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }


        $scope.Submit = function () {



            if ($scope.College == null || $scope.College == undefined || $scope.College == "") {
                alert("Select College.");
                return;
            }

            var examcenterdetail = JSON.parse($scope.College);
            if ($scope.ExamDistrict == null || $scope.ExamDistrict == undefined || $scope.ExamDistrict == "") {
                alert("Select Exam center district.");
                return;
            }
            if ($scope.Gendersallow == null || $scope.Gendersallow == undefined || $scope.Gendersallow == "") {
                alert("Select Geneders allowed");
                return;
            }
            if ($scope.CBT == undefined ||  $scope.CBT == '') {
                alert("Select CBT");
                return;
            }
            if ($scope.MBT == undefined  || $scope.MBT=='') {
                alert("Select MBT");
                return;
            }
            if ($scope.ShortHand == undefined || $scope.ShortHand=='') {
                alert("Select ShortHand");
                return;
            }
           

            var SetTwshExamCenter = TwshStudentRegService.SetTwshExamCentres(1,0, $scope.year, $scope.ExamMonthYear, examcenterdetail.CollegeCode, examcenterdetail.CollegeName, $scope.ExamDistrict, $scope.Gendersallow, $scope.CBT, $scope.MBT, $scope.ShortHand, examcenterdetail.Address,1,$scope.UserName)
            SetTwshExamCenter.then(function (response) {
                try {
                    var response = JSON.parse(response)
                }
                catch (err) { }
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getExamCentres(data.ExamMonthYearID);
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getExamCentres(data.ExamMonthYearID);
                } else {
                    alert('Something Went Wrong');
                    $scope.getExamCentres(data.ExamMonthYearID);
                }
            },
                function (error) {
                    alert("something Went Wrong");


                });
        }



        $scope.openDetails = function (data) {

            $localStorage.TempData = {
                ExamCentreID: data.Id,
                AcademicYearID: data.AcademicID,
                ExamMonthYearID: data.ExamMonthYearID,
                MBT: data.IsTw,
                SHORTHAND: data.IsSh
            };

            $state.go('Dashboard.TypeWriting.TwshExamCentersCourseWise');


        }
    })
})