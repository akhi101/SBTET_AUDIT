define(['app'], function (app) {
    app.controller("TwshExamCentresCourseWiseController", function ($scope, $localStorage, $uibModal, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName;
        $scope.UserTypeID = authData.SystemUserTypeId;

        var tmpdata = $localStorage.TempData;


        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getExamCentresCoursewise();
            //$scope.GetExamCenters();
        }

       
        $scope.CourseAvailableValues = [
            { "Id": true, "Value": "Yes" },
            { "Id": false, "Value": "No" }
        ]

        $scope.changecourseavailable = function (data) {
            if (data==1) {
                $scope.UnAvailable = false;
            }
            else {
                $scope.UnAvailable = true;
            }
        }
        
        $scope.getExamCentresCoursewise = function () {
            $scope.loading = true;
            var getcentres = TwshStudentRegService.getExamCentresCoursewise(1, tmpdata.ExamCentreID, tmpdata.AcademicYearID, tmpdata.ExamMonthYearID,tmpdata.MBT,tmpdata.SHORTHAND);
            getcentres.then(function (response) {
                try {
                    var Res = JSON.parse(response)
                }
                catch { }
                if (Res.Table.length > 1 && Res.Table[0].ResponseCode == undefined) {
                    $scope.loading = false;
                    $scope.Data = true;
                    $scope.getData = Res.Table;
                }
                else if (Res.Table.length > 0 && Res.Table[0].ResponseCode == '400') {
                    //alert("No Data Found")
                    $scope.loading = false;
                    $scope.confirmGetOldExamCentreData();
                }
            },
                function (error) {
                    $scope.Data = false;
                    $scope.loading = false;
                    alert("error while loading Exam Centers");

                });
        }


        $scope.confirmGetOldExamCentreData = function () {
            var getcentres = TwshStudentRegService.getExamCentresCoursewise(2, tmpdata.ExamCentreID, tmpdata.AcademicYearID, tmpdata.ExamMonthYearID, tmpdata.MBT, tmpdata.SHORTHAND);
            getcentres.then(function (response) {
                try {
                    var Res = JSON.parse(response)
                }
                catch { }
                if (Res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.getData = Res.Table;
                }
                else {
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

       

        

        $scope.EditCentres = function (ExamCentreCourseID) {
            var editcentres = TwshStudentRegService.editExamCentresCoursewise(ExamCentreCourseID);
            editcentres.then(function (response) {
                try {
                    var Res = JSON.parse(response)
                }
                catch { }
                if (Res.Table.length > 0) {
                    $scope.EditData = Res.Table[0];

                    if ($scope.EditData.CourseAvailable == false) {
                        $scope.UnAvailable = true;
                    }
                    else {
                        $scope.UnAvailable = false;
                    }
                }
                else {
                    $scope.getData = [];
                }
            },
                function (error) {
                    $scope.Data = false;
                    $scope.loading = false;
                    alert("error while loading Exam Centers");

                });

            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/TWSH/Popups/EditExamCentresCourseWisePopup.html",
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



        $scope.DownloadtoExcel = function () {
            if ($scope.ExamMode == null || $scope.ExamMode == undefined || $scope.ExamMode == "") {
                alert("Please select Exam Mode.");
                return;
            }
            //$scope.loading = true;
            var ApprovalList = TwshStudentRegService.getExamCentersByModeExcel($scope.ExamMode);
            ApprovalList.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponceCode = '200') {
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

            
            var updatecoursewisecentres = TwshStudentRegService.UpdateTwshExamCentresCourseWise(data.ExamCentreCourseID, data.ExamStrength, data.CourseAvailable, data.Active,$scope.UserName)
            updatecoursewisecentres.then(function (response) {
                try {
                    var response = JSON.parse(response)
                }
                catch (err) { }
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription);
                    $scope.getExamCentresCoursewise();
                    $scope.modalInstance.close();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription);
                    $scope.getExamCentresCoursewise();
                    $scope.modalInstance.close();
                } else {
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
            if ($scope.CBT == undefined || $scope.CBT == '') {
                alert("Select CBT");
                return;
            }
            if ($scope.MBT == undefined || $scope.MBT == '') {
                alert("Select MBT");
                return;
            }
            if ($scope.ShortHand == undefined || $scope.ShortHand == '') {
                alert("Select ShortHand");
                return;
            }


            var SetTwshExamCenter = TwshStudentRegService.SetTwshExamCentres(1, 0, $scope.year, $scope.ExamMonthYear, examcenterdetail.CollegeCode, examcenterdetail.CollegeName, $scope.ExamDistrict, $scope.Gendersallow, $scope.CBT, $scope.MBT, $scope.ShortHand, examcenterdetail.Address, 1, $scope.UserName)
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
    })
})