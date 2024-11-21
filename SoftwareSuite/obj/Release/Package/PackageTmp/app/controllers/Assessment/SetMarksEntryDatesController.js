define(['app'], function (app) {
    app.controller("SetMarksEntryDatesController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MarksEntryService, MenuService, AssessmentService) {

        const $ctrl = this;

        $scope.finalList = [];

        $scope.disabletable = function () {
            var ele = document.getElementsByClassName("tableinpt");
            //ele.style.width = "100%";
            //ele.style['box-shadow'] = "none";
            //ele.style['pointer-events'] = "none";
            //ele.style.cursor = "pointer";


        }

        $scope.ChangeDate = function (DataType, type) {
            
            if (DataType == 1) {
                $scope.FromDateValue =1
            } else if (DataType == 2) {
                $scope.ToDateValue = 1
            } else if (DataType == 3) {
                $scope.FineDateValue = 1
            }
        }

        $scope.LoadStudentType = function () {
            //  $scope.ExamName = examName;
            var LoadExamTypeBy = MarksEntryService.getStudentType();
            LoadExamTypeBy.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.StudentType = response.Table;
                } else {
                    $scope.StudentType = [];
                    alert("No Student found on this Record");
                }
            },
                function (error) {
                    alert("error while loading Student Types");
                    console.log(error);
                });
        }

        $scope.GetExamMonthYearsData = function () {
        
            let academicId = $scope.years.AcademicID;
          
            var EmYears = AssessmentService.GetExamMonthYearAcademicYear(academicId);
        EmYears.then(function (response) {
            console.log(response)
            $scope.ExamMonthYears = response.Table;
        },
            function (error) {
                alert("error while loading semesters");
                var err = JSON.parse(error);
                console.log(err.Message);
            });
        }

        $scope.LoadSemisters = function () {
            var LoadActiveSemesters = AssessmentService.getActiveSemester();
            LoadActiveSemesters.then(function (response) {
                $scope.ActiveSemesters = response.Table;
            },
                function (error) {
                    alert("error while loading semesters");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });

        }
        //$ctrl.$onInit = () => {
        $scope.LoadStudentType();
        $scope.LoadSemisters();
        //}

        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.CollegeID = authData.CollegeID;
        $scope.CollegeID = authData.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.PrevAdmNo = authData.PrevAdmNo;
        AppSettings.TypeFlag = authData.TypeFlag;
        AppSettings.MngtTypID = authData.MngtTypID;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID;
        AppSettings.SeqNo = authData.SeqNo;
        AppSettings.DistrictIDs = authData.DistrictIDs;
        $scope.College_Code = authData.College_Code;
        $scope.College_Name = authData.College_Name;
        $scope.SystemUserTypeId = authData.SystemUserTypeId;
        $scope.BranchId = authData.BranchId;
        $scope.ShowSetDates = true;

        var AcademicYearsActive = AssessmentService.GetAcademicYearsActive();
        AcademicYearsActive.then(function (response) {

            //  $scope.years = response.Table[0];
            $scope.Acayears = response.Table;

        },
            function (error) {
                alert("error while loading Academic Year");
            });

        $scope.setAcademicYears = function (yrs) {
            try {
                $scope.years = JSON.parse(yrs);
                $scope.GetExamMonthYearsData()
                $scope.GetMarksEntryDatesList();
            } catch (err) { }

        }



        $scope.GetMarksEntryDatesList = function () {
            if ($scope.years.AcademicID !== null && $scope.years.AcademicID !== 'undefined') {
                let academicId = $scope.years.AcademicID;
                var getMarksEntryList = MarksEntryService.GetMarksEntryDates(academicId);
                getMarksEntryList.then(function (response) {
                    if (response.length > 0) {
                        $scope.MarksEntryData = response;
                        for (let i = 0; i < $scope.MarksEntryData.length; i++) {
                            if ($scope.MarksEntryData[i].type == 'Regular' || $scope.MarksEntryData[i].type == 'Backlog') {
                                $scope.finalList.push($scope.MarksEntryData[i]);
                            }
                        }

                        //  var ele = document.getElementsByClassName("tableinpt");
                        for (var j = 1; j < response.length + 1; j++) {
                            $scope['edit' + j] = true;
                        }
                    }
                },

                    function (error) {
                        alert("error while Getting Mark Entry Dates");
                        var err = JSON.parse(error);
                        console.log(err.Message);
                    });

            } else {
                $scope.MarksEntryData = [];

            }


        }

        $scope.EditDates = function (data, ind) {
            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;

        }


        $scope.UpdateDates = function (dat, ind) {
           
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }

            //if (dat.fromdate == null || dat.StartDate == undefined || dat.StartDate == "") {
            //    alert("Select Start Date");
            //    return;
            //}
            //if (dat.EndDate == null || dat.EndDate == undefined || dat.EndDate == "") {
            //    alert("Select End Date");
            //    return;
            //}
            //if (dat.FineDate == null || dat.FineDate == undefined || dat.FineDate == "") {
            //    alert("Select Fine Date");
            //    return;
            //}
            var srtdate = dat.fromdate == undefined || dat.fromdate == null || dat.fromdate == "" ? " " : dat.fromdate;
            var enddate = dat.todate == undefined || dat.todate == null || dat.todate == "" ? " " : dat.todate;
            var finedate = dat.finedate == undefined || dat.finedate == null || dat.finedate == "" ? " " : dat.finedate;
            if ($scope.FromDateValue == 1) {
                var srtdate1 = moment(dat.fromdate).format("DD/MM/YYYY")
                var startTime = moment(dat.fromdate).format("HH:mm:ss")

                if (startTime == '00:00:00') {

                    var StartDate = srtdate1 + ' ' + '00:00:00';

                } else {
                    var StartDate = srtdate1 + ' ' + '00:00:00';
                }
            } else {
                var StartDate = srtdate;
            }
            if ($scope.ToDateValue == 1) {
                var enddate = moment(enddate).format("DD/MM/YYYY")
                var EndTime = moment(enddate).format("HH:mm:ss")


                if (EndTime == '00:00:00') {
                    var EndDate = enddate + " 23:59:00";
                } else {
                    var EndDate = enddate + ' ' + "23:59:00";
                }
            } else {
                var EndDate = enddate;
            }
            if ($scope.FineDateValue == 1) {
                var FineDate1 = moment(finedate).format("DD/MM/YYYY")
                var FineTime = moment(finedate).format("HH:mm:ss")
                if (FineTime == '00:00:00') {
                    var FindDate = FineDate1 + " 23:59:00";
                } else {
                    var FindDate = FineDate1 + ' ' + "23:59:00";
                }
            } else {
                var FindDate = finedate;
            }
           console.log(StartDate, EndDate, FindDate)

            var updatedate = MarksEntryService.UpdateMarksEntryDatesforAdmin(dat.id, StartDate, EndDate, FindDate, dat.fine_ammount)
            updatedate.then(function (response) {
                //var res = JSON.parse(response)
                if (response.Table[0].ResponceCode == '200') {
                    alert(response.Table[0].ResponceDescription)
                    $scope.GetMarksEntryDatesList();
                    $scope.FromDateValue = 0
                    $scope.ToDateValue = 0
                    $scope.FineDateValue = 0
                } else {
                    alert('Something Went Wrong')
                }
            },
                function (error) {
                    alert("something Went Wrong")


                });

        }
        Array.prototype.remByVal = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i].ElectiveSet === val) {
                    this.splice(i, 1);
                    break;
                }
            }
            return this;
        }

        $scope.getSchemes = function () {

            //$scope.getActiveSchemes = [];
            //$scope.UserSemesters = [];
            //$scope.Examtypes = [];
            if ($scope.StudentId == 2 || $scope.StudentId == 1) {
                var LoadActiveSchemes = AssessmentService.getSchemes($scope.StudentId);
                LoadActiveSchemes.then(function (response) {
                    $scope.getActiveSchemes = response;
                },
                    function (error) {
                        alert("error while loading Schemes");
                        var err = JSON.parse(error);
                        console.log(err.Message);
                    });
            } else {

            }
        }



        $scope.getExamType = function (selected) {
            $scope.Examtypes = [];
            var LoadExamTypeBysem = AssessmentService.getExamTypesBySem($scope.StudentId, $scope.schemeId);
            LoadExamTypeBysem.then(function (response) {
                if (response.length > 0) {
                    $scope.Examtypes = response;
                } else {
                    $scope.Examtypes = [];
                    alert("No Exam type found on this Record");
                }

            },
                function (error) {
                    alert("error while loading Exam Types");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }


        $scope.getSemestersByScheme = function () {
            $scope.UserSemesters = [];
            var LoadSemByScheme = AssessmentService.getSemBySchemes($scope.StudentId, $scope.schemeId)
            LoadSemByScheme.then(function (response) {
                if (response.length > 0) {
                    $scope.UserSemesters = response;
                } else {
                    // $scope.Examtypes = [];
                    alert("No Sem found on this Record");
                }

            },
                function (error) {
                    alert("error while loading Semesters");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });

        }






        // set exam dates
        $scope.SetDates = function () {

            $scope.ShowSetDates = true;

        }
        $scope.OpenDashboard = function () {
            $scope.homeDashBoard = true;
            $state.go("Dashboard");
        }


        $scope.LoadExamType = function (selected) {
            var selectedschemeid = JSON.parse(selected)
            $scope.Currentscheme = selectedschemeid.current_schemeid
            var LoadExamTypeBysem = AssessmentService.getExamTypesBySem($scope.StudentId, $scope.Currentscheme);
            LoadExamTypeBysem.then(function (response) {
                if (response.length > 0) {
                    $scope.Examtypes = response;
                } else {
                    $scope.Examtypes = [];
                    alert("No Exam type found on this Record");
                }

            },
                function (error) {
                    alert("error while loading Exam Types");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }


        // submit Marks Entry dates Form
        $scope.submitData = function () {
            $scope.BtnDisable = true;
            $scope.LoadImg = true;
            $scope.MarksEntryData = false;
            //   if ($scope.SetDatesForm.$valid) {
            if ($scope.StudentId == 1 || $scope.StudentId == 2) {

                var schemeId = $scope.schemeId
                var semid = $scope.SemesterId

            } else {
                var schemeId = $scope.Currentscheme;
                var semid = JSON.parse($scope.sem).semid;
            }
            var startDate = moment($scope.StartDate).format("DD/MM/YYYY")
            var startTime = moment($scope.StartDate).format("HH:mm:ss")

            if (startTime == '00:00:00') {

                var fromdate = moment($scope.StartDate).format("DD/MM/YYYY HH:mm:ss");

            } else {
                var fromdate = startDate + ' ' + "00:00:00";
            }
            var EndDate = moment($scope.EndDate).format("DD/MM/YYYY")
            var EndTime = moment($scope.EndDate).format("HH:mm:ss")


            if (EndTime == '00:00:00') {
                var todate = moment($scope.EndDate).format("DD/MM/YYYY") + " 23:59:00";
            } else {
                var todate = EndDate + ' ' + "23:59:00";
            }


            var FineDate = moment($scope.FineDate).format("DD/MM/YYYY")
            var FineTime = moment($scope.FineDate).format("HH:mm:ss")
            if (FineTime == '00:00:00') {
                var finedate = moment($scope.FineDate).format("DD/MM/YYYY") + " 23:59:00";
            } else {
                var finedate = FineDate + ' ' + "23:59:00";
            }

            let Academicid = $scope.years.AcademicID;
            let UserName = authData.userName;

            let Examid = $scope.examId;
            let fineamount = $scope.fineAmount;
            let studenttypeid = $scope.StudentId;
            // console.log(Examid,semid, Academicid, UserName, fromdate, todate, finedate, fineamount, studenttypeid, schemeId)
            //                @examid int,
            //@semid int,
            //@AcademicYearId int,
            //@username varchar(10),
            //@fromdate varchar(500),
            //@todate varchar(500),
            //@finedate varchar(500),
            //@ipaddress varchar(25),
            //@fine int,
            //@studenttypeid int,
            //@schemeid int
            var ipaddress = "ABCD!@#$"
            var PostMarkEntryDates = MarksEntryService.AddMarksEntryDates(Examid, semid, Academicid, UserName, fromdate, todate, finedate, ipaddress, fineamount, studenttypeid, schemeId, $scope.ExamMonthYear);
            PostMarkEntryDates.then(function (response) {
                alert("Marks Entry Dates are set successfully");
                $scope.BtnDisable = false;
                $scope.LoadImg = false;
                $scope.MarksEntryData = true;
                $scope.GetMarksEntryDatesList();
            }, function (error) {
                $scope.BtnDisable = false;
                $scope.LoadImg = false;
                $scope.MarksEntryData = true;
                let err = JSON.parse(error);
                console.log(err.Message);
            });

            //  }
            //    }
        }

        $scope.logOut = function () {
            $scope.$emit("logout", authData.userName);
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;


            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };

        }
    });



});