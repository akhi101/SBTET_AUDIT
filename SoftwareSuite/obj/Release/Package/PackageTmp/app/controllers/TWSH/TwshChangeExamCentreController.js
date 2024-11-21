define(['app'], function (app) {
    app.controller("TwshChangeExamCentreController", function ($scope, $localStorage, TwshStudentRegService) {
        var authData = $localStorage.authorizationData;

        $scope.userId = authData.SysUserID;
        $scope.userType = authData.SystemUserTypeId;
        $scope.UserName = authData.UserName

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getExaminationCentres();
        }
        $scope.loading = false;

      

        $scope.getBatches = function (ExamDateselect) {
            console.log(ExamDateselect)
            $scope.exambatchList = [];
            $scope.ExamDateselected = JSON.parse(ExamDateselect);
            var getBatches = TwshStudentRegService.getBatches($scope.ExamDateselected.Id, $scope.StudentData[0].CourseId, $scope.StudentData[0].GradeId);
            getBatches.then(function (res) {
                $scope.exambatchList = res;
            }, function (err) {
                $scope.exambatchList = [];
            })
        }

        $scope.getTwshStudentDetails = function () {
            if ($scope.HallTicketNumber == null || $scope.HallTicketNumber == undefined || $scope.HallTicketNumber == '') {
                alert('Please Enter Correct Hall Ticket Number');
                return;
            }
            var getdata = TwshStudentRegService.GetTwshStudentDetails($scope.HallTicketNumber);
            getdata.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.StudentData = res.Table;
                    $scope.getDates()
                    $scope.NoData = false;
                    $scope.Label = true;

                } else {
                    $scope.StudentData = [];
                    $scope.loading = false;
                    $scope.NoData = true;
                    $scope.Label = false;
                    alert("No Data Found");

                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.NoData = true;
                    $scope.Label = false;
                    alert("error while loading Data");
                    console.log(error);
                });
        }
        $scope.getDates = function () {
        $scope.offlineExamDates = [];
        var getexamdates = TwshStudentRegService.getExamDates($scope.StudentData[0].CourseId, $scope.StudentData[0].GradeId)
        getexamdates.then(function (resp) {
            $scope.ExamDates = resp;
            $scope.loader1 = false
            $scope.submitbutton1 = false
        }, function (err) {
            $scope.ExamDates = []
        });
        }
        $scope.getExaminationCentres = function () {
            $scope.loading = true;
            $scope.nodata = false;
            var DataType = 1;
            var examcentres = TwshStudentRegService.GetExaminationCentres(DataType);
            examcentres.then(function (response) {
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.ExamCentresDataNew = response;
                    $scope.loading = false;
                    $scope.nodata = false;


                }
                else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    $scope.ExamCentresDataNew = [];

                    $scope.loading = false;
                    $scope.nodata = true;

                }

            },
                function (error) {

                });
        }

        $scope.SelectCentre = function (data) {
            $scope.SelectedCentre = data;
            $scope.ExamCenterID = $scope.SelectedCentre.ExamCenterID;
            $scope.SelectedTransferCentre = $scope.SelectedCentre.ExaminationCenterName;
            if ($scope.StudentData[0].ExaminationCenterCode+ '-' + $scope.StudentData[0].ExaminationCenterName == $scope.SelectedTransferCentre) {
                alert('Alloted Centre and Transfer Centre Should not be Same');
                return;
            }
        }
        $scope.Transfer = function () {
            var centrechange = TwshStudentRegService.UpdateNewCentre($scope.HallTicketNumber, $scope.ExamCenterID);
            centrechange.then(function (response) {

                //try {
                //    var res = JSON.parse(response);
                //}
                //catch (err) { }
                if ($scope.SelectedTransferCentre == undefined || $scope.SelectedTransferCentre == null || $scope.SelectedTransferCentre == '') {
                    alert('Please Select Examination Centre');
                    return;
                }
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription)
                    $scope.getTwshStudentDetails($scope.HallTicketNumber);
                } else if (response[0].ResponseCode == '400'){
                    alert(response[0].ResponseDescription)
                    $scope.getTwshStudentDetails($scope.HallTicketNumber);

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }

        $scope.changeBatch = function (Batch) {
            $scope.Batch = Batch;

        }

        $scope.ChangeBatch = function () {
            var centrebatch= TwshStudentRegService.UpdateNewBatch($scope.HallTicketNumber, $scope.Batch);
            centrebatch.then(function (response) {
                if ($scope.StudentData[0].ExamBatch == '0') {
                    alert('Hall Ticket Number Belongs to CBT');
                    return;
                }
                else if ($scope.StudentData[0].CourseId == '2') {
                    alert('Short Hand Not Eligible');
                    return;
                }
                else if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription)
                    $scope.getTwshStudentDetails($scope.HallTicketNumber);
                } else if (response[0].ResponseCode == '400') {
                    alert(response[0].ResponseDescription)
                    $scope.getTwshStudentDetails($scope.HallTicketNumber);

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


    })
})