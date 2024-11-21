define(['app'], function (app) {
    app.controller("TwshExamTimeSlotsController", function ($scope, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.Data = false;
          
            $scope.ExamMonthYear = "";

        }

        var AcademicYearsActive = TwshStudentRegService.GetTwshAcademicYears();
        AcademicYearsActive.then(function (response) {

            //  $scope.years = response.Table[0];
            $scope.Acayears = response.Table;

        },
            function (error) {
                alert("error while loading Academic Year");
            });

        $scope.getExamMonthYearsData = function (year) {

            //let academicId = $scope.years.AcademicID;

            var EmYears = TwshStudentRegService.GetTwshExamMonthYearbyID(year);
            EmYears.then(function (response) {
                console.log(response)
                try {
                    var Res = JSON.parse(response)
                }
                catch { error }
                $scope.ExamMonthYears = Res.Table;
                $scope.getData = []
                $scope.Data = false;
            },
                function (error) {
                    $scope.getData = []
                    $scope.Data = false;
                    alert("error while loading Data");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }

        var ExamDistricts = TwshStudentRegService.GetAllGrades();
        ExamDistricts.then(function (res) {
            $scope.Grades = res;
        }, function (err) {
            $scope.Grades = [];
        });

        var ExamDistricts = TwshStudentRegService.getCourses();
        ExamDistricts.then(function (res) {
            $scope.Courses = res;
        }, function (err) {
            $scope.Courses = [];
        });

        var ExamDistricts = TwshStudentRegService.GetBatches();
        ExamDistricts.then(function (res) {
            $scope.GetBatches = res;
        }, function (err) {
            $scope.GetBatches = [];
        });
        

        $scope.GendersList = [
           { Name: "Male", Id: 1 },
           { Name: "Female", Id: 2 },
           { Name: "Both", Id: 3 }
        ];

        $scope.ExamTypes = [
         { Name: "Computer Based Test(CBT)", Id: 1 },
         { Name: "TypeMachine Based Test(TMBT)", Id: 2 }
        ];

        $scope.ChangeExamMonthYear = function () {
            $scope.getData = []
            $scope.Data = false;
        }


        //$scope.loading = true;
        //    var ApprovalList = TwshStudentRegService.getExamTimeSlots();
        //    ApprovalList.then(function (response) {
               
        //        if (response.length > 0) {
        //            $scope.loading = false;
        //            $scope.Data = true;
        //            $scope.getData = response;
        //            for (var j = 1; j < response.length + 1; j++) {
        //                $scope['edit' + j] = true;
        //            }
        //        } else {
        //            alert("No Data Found")
        //            $scope.loading = false;
        //            $scope.Data = false;
        //        }
        //    },
        //function (error) {
        //    $scope.Data = false;
        //    $scope.loading = false;
        //    alert("error while loading Exam Month Year");

        //});
       
            $scope.Timeslots = function () {
                var ApprovalList = TwshStudentRegService.getExamTimeSlots($scope.year, $scope.ExamMonthYear);
                ApprovalList.then(function (response) {
                    //var response = JSON.parse(response)
                    if (response.Table.length > 0) {
                        $scope.loading = false;
                        $scope.Data = true;
                        $scope.getData = response.Table;
                        console.log($scope.getData)
                        for (var j = 1; j < response.Table.length + 1; j++) {
                            $scope['edit' + j] = true;
                        }
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


            $scope.Submit = function () {
                
            var DataTypeId = 1
            if ($scope.Course == null || $scope.Course == undefined || $scope.Course == "") {
                alert("Please select Course.");
                return;
            }
            
            if ($scope.Grade == null || $scope.Grade == undefined || $scope.Grade == "") {
                alert("Please select Grade.");
                return;
            }
            if ($scope.Batch == null || $scope.Batch == undefined || $scope.Batch == "") {
                alert("Please select Batch.");
                return;
            }
            if ($scope.Paper1 == null || $scope.Paper1 == undefined || $scope.Paper1 == "") {
                alert("Please Enter Paper 1 Time Slot.");
                return;
            }
            if ($scope.Paper2 == null || $scope.Paper2 == undefined || $scope.Paper2 == "") {
                alert("Please Enter Paper 2 Time Slot.");
                return;
            }
            if ($scope.PCODE == null || $scope.PCODE == undefined || $scope.PCODE == "") {
                alert("Please Enter PCODE.");
                return;
            }
            var ApprovalList = TwshStudentRegService.CreateTwshTimeSlot(DataTypeId, $scope.Course, $scope.Grade, $scope.Batch, $scope.Paper1, $scope.Paper2, $scope.PCODE);
            ApprovalList.then(function (response) {
                var response = JSON.parse(response)
                $scope.ExamMonthYear = "";
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription);
                    $scope.Timeslots();
                } else if (response[0].ResponceCode == '400') {
                    alert(response[0].ResponceDescription);
                    $scope.Timeslots();
                } else {
                    alert('Something Went Wrong')
                }
            },
        function (error) {
            alert("error while loading Exam Month Year");
            $scope.$emit('hideLoading', data);
        });
        }

        $scope.Editsemesterdat = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;

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
            console.log($scope.year, $scope.ExamMonthYear)
            var ApprovalList = TwshStudentRegService.getExamTimeSlotsExcel($scope.year, $scope.ExamMonthYear);
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

        $scope.DeleteTimeSlot = function (Id) {

            if (confirm("Are you sure you want to Delete Time Slot?") == true) {
                $scope.DeleteData(Id)
            } else {
                userPreference = "Save Canceled!";

            }

        }

        $scope.DeleteData = function (Id) {
            var DeleteInstitute = TwshStudentRegService.Delete_TimeSlot(Id);
            DeleteInstitute.then(function (res) {
                alert("Time Slot Deleted Successfully")
                $scope.Timeslots();
            }, function (err) {
                console.log(err)
            });
        }

        $scope.Updatesemesterdat = function (data, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }


            var datatypeid = 2;

         
            if (data.Paper1TimeSlot == null || data.Paper1TimeSlot == undefined || data.PPaper1TimeSlotaper1 == "") {
                alert("Please Enter Paper 1 Time Slot.");
                return;
            }
            if (data.Paper2TimeSlot == null || data.Paper2TimeSlot == undefined || data.Paper2TimeSlot == "") {
                alert("Please Enter Paper 2 Time Slot.");
                return;
            }
            if (data.PCODE == null || data.PCODE == undefined || data.PCODE == "") {
                alert("Please Enter PCODE.");
                return;
            }
            var SetSemester = TwshStudentRegService.SetTwshTimeSlot(datatypeid,  data.Paper1TimeSlot, data.Paper2TimeSlot, data.Id, data.PCODE,data.Active)
            SetSemester.then(function (response) {
                var response = JSON.parse(response)
                if (response[0].ResponceCode == '200') {

                    alert(response[0].ResponceDescription)
                    $scope.Timeslots();
                } else {
                    alert('Something Went Wrong')
                }
            },
                function (error) {
                    alert("something Went Wrong")


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

        //$scope.GetExamYearMonth = function () {
        //    var data = {};
        //    $scope.$emit('showLoading', data);
        //    var ApprovalLists = TwshStudentRegService.GetTwshExamCenters();
        //    ApprovalLists.then(function (response) {
        //        $scope.getData = response.Table;
        //        for (var j = 1; j < response.Table.length + 1; j++) {
        //            $scope['edit' + j] = true;
        //        }
        //        $scope.$emit('hideLoading', data);
        //    }, function (error) {
        //        $scope.$emit('hideLoading', data);
        //        alert("error while loading Academic Year");

        //    });
        //}
    })
})