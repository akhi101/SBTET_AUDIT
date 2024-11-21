define(['app'], function (app) {
    app.controller("ExamSchemeSemesterSettingsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MasterPageService, StudentResultService, PreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName
        var expanded = false;

        $scope.ReportFound = false;
        $scope.Noreports = false;
        $scope.GetMasterschemeSem = [];       

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetAcademicData();         
         
        }

        $scope.schemeinfo = [];

        var SCHEMESEMINFO = StudentResultService.GetSchemeDataForResults();
     
        SCHEMESEMINFO.then(function (data) {
            if (data.length > 0) {
                $scope.schemeinfo = data;
            }
        }, function (error) {
            alert("unable to load Schemes");
        });

        var LoadActiveSemesters = PreExaminationService.getActiveSemester();
        LoadActiveSemesters.then(function (response) {
            $scope.ActiveSemesters = response.Table;
        },
            function (error) {
                var err = JSON.parse(error);
                console.log(err.Message);
            });

        $scope.loadSemExamTypes = function (schemeid) {
            if ((schemeid == null)) {
                return false;
            }
            $scope.seminfo = [];
          //  $scope.examtypeinfo = [];
            var SemExamInfo = StudentResultService.GetExamTypeForResults(schemeid);
            SemExamInfo.then(function (data) {

                if (data.Table.length > 0) {
                    $scope.seminfo = data.Table;
                //    $scope.examtypeinfo = data.Table1;
                }

            }, function (error) {
                alert("unable to load semester");
            });
        }

        $scope.showsemCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxessem");
            if (!expanded) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;               
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.closesemCheckbox = function () {
            var checkboxes = document.getElementById("checkboxessem");
            if (!expanded) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
               
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }


        $scope.toggleAllsem = function () {
            var toggleStatus = $scope.isAllSelectedsem;
            angular.forEach($scope.seminfo, function (itm) { itm.selected = toggleStatus; });
            $scope.semarr = [];
            angular.forEach($scope.seminfo, function (value, key) {
                if (value.selected === true) {
                    $scope.semarr.push({ "semid": value.semid })
                }
            });
        }

        $scope.optionToggledsem = function () {
            $scope.isAllSelectedsem = $scope.seminfo.every(function (itm) { return itm.selected; })
            $scope.semarr = [];
            angular.forEach($scope.seminfo, function (value, key) {
                if (value.selected === true) {
                    $scope.semarr.push({ "semid": value.semid })
                }
            });
        }




        $scope.sessioninfo = [{ session: "SESSION 1", val: 1 }, { session: "SESSION 2", val: 2 }]



        $scope.GetAcademicData = function () {
            var GetMonthYear = PreExaminationService.GetMonthYear()
            GetMonthYear.then(function (response) {

                $scope.GetExamMonthYear = response.Table;


            },
                function (error) {
                    alert("data is not loaded");

                });
        }
        var LoadExamTypeBysem = PreExaminationService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Student Types");

            });

        $scope.GetDetails = function () {
            if ($scope.selAcademicYear == null || $scope.selAcademicYear == undefined || $scope.selAcademicYear == "") {
                alert("Select Academic Year.");
                return;
            }
            if ($scope.selSession == null || $scope.selSession == undefined || $scope.selSession == "") {
                alert("Select Session.");
                return;
            }
            $scope.GetMasterSessions = [];
            $scope.ReportFound = false;
            $scope.Noreports = false;

            var SchemeSem = PreExaminationService.GetTimeTableSessionSchemeSemesters($scope.selSession, $scope.selAcademicYear);
            SchemeSem.then(function (data) {
                try { var data = JSON.parse(data) } catch (err) { }

                if (data.length > 0) {
                    $scope.ReportFound = true;
                    $scope.Noreports = false;
                    $scope.GetMasterschemeSem = data;
                    for (var j = 1; j < data.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                } else {
                    $scope.ReportFound = false;
                    $scope.Noreports = true;
                }
            }, function (error) {
                    $scope.GetMasterschemeSem = [];
                $scope.ReportFound = fale;
                $scope.Noreports = true;
            });


        }


        $scope.Editsemesterdat = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
                ele1[j].style['-webkit-appearance'] = "auto";
                ele1[j].style['-moz-appearance'] = "auto";
            }
            $scope['edit' + ind] = false;

        }

        $scope.Updatesemesterdat = function (data, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
                ele2[j].style['-webkit-appearance'] = "none";
                ele2[j].style['-moz-appearance'] = "none";
            }

            var datatypeid = 2;
           
            if (data.AcademicYearId == null || data.AcademicYearId == undefined || data.AcademicYearId == "") {
                alert("Select Academic Year.");
                return;
            }                  
            if (data.SessionId == undefined || data.SessionId == null || data.SessionId == "") {
                alert("Select Session");
                return;
            }           
            if (data.SchemeId == null || data.SchemeId == undefined || data.SchemeId == "") {
                alert("select Scheme.");
                return;
            }
            if (data.SemId == null || data.SemId == undefined || data.SemId == "") {
                alert("select Semester.");
                return;
            }
            if (data.StartDate == null || data.StartDate == undefined || data.StartDate == "") {
                alert("Select Start Date");
                return;
            }
            if (data.EndDate == null || data.EndDate == undefined || data.EndDate == "") {
                alert("Select End Date");
                return;
            }
            if (data.ReAdmissionEndDate == null || data.ReAdmissionEndDate == undefined || data.ReAdmissionEndDate == "") {
                alert("Select ReAdmission End Date Date.");
                return;
            }
            if (data.NofDays == null || data.NofDays == undefined || data.NofDays == "") {
                alert("Enter working days.");
                return;
            }
           
            var srtdate = data.StartDate == undefined || data.StartDate == null || data.StartDate == "" ? " " : moment(data.StartDate).format("YYYY-MM-DD");
            var enddate = data.EndDate == undefined || data.EndDate == null || data.EndDate == "" ? " " : moment(data.EndDate).format("YYYY-MM-DD");
            var ReAdmissionEndDate = data.ReAdmissionEndDate == undefined || data.ReAdmissionEndDate == null || data.ReAdmissionEndDate == "" ? " " : moment(data.ReAdmissionEndDate).format("YYYY-MM-DD");
            var json = {
                "Id": data.Id, "AcademicYearId": parseInt(data.AcademicYearId), "SessionId": parseInt(data.SessionId), "SchemeId": data.SchemeId, "SemId": data.SemId,

                "StartDate": srtdate, "EndDate": enddate, "NofDays": parseInt(data.NofDays), "ReAdmissionEndDate": ReAdmissionEndDate
            }

            var SetTimeTableSessionSchemeSemesters = PreExaminationService.SetTimeTableSessionSchemeSemesters(datatypeid, json)
            SetTimeTableSessionSchemeSemesters.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription);

                } else if (response[0].ResponceCode == '400') {
                    alert(response[0].ResponceDescription);

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }



        $scope.Submit = function () {

            var datatypeid = 1

           
            if ($scope.selAcademicYear == null || $scope.selAcademicYear == undefined || $scope.selAcademicYear == "") {
                alert("Select Academic Year.");
                return;
            }
            if ($scope.selSession == undefined || $scope.selSession == null || $scope.selSession == "") {
                alert("Select Session");
                return;
            }
            if ($scope.selscheme == null || $scope.selscheme == undefined || $scope.selscheme == "") {
                alert("select Scheme.");
                return;
            }
            if ($scope.WorkingDay == null || $scope.WorkingDay == undefined || $scope.WorkingDay == "") {
                alert("Enter Working Days.");
                return;
            }          
                    
            if ($scope.semarr.length <= 0) {
                alert('Select Semester.')
                return;
            }
            if ($scope.StartDate == null || $scope.StartDate == undefined || $scope.StartDate == "") {
                alert("Select Start Date");
                return;
            }
            if ($scope.EndDate == null || $scope.EndDate == undefined || $scope.EndDate == "") {
                alert("Select End Date");
                return;
            }
            if ($scope.ReAdmissionEndDate == null || $scope.ReAdmissionEndDate == undefined || $scope.ReAdmissionEndDate == "") {
                alert("Select ReAdmission End Date");
                return;
            }


            var temparr = [];
            if ($scope.semarr.length > 0) {
                for (var i = 0; i < $scope.semarr.length; i++) {
                  var obj =   {
                      "Id": 0, "AcademicYearId": parseInt($scope.selAcademicYear), "SessionId": parseInt($scope.selSession), "SchemeId": parseInt($scope.selscheme), "SemId": $scope.semarr[i].semid,
                      "StartDate": moment($scope.StartDate).format("YYYY-MM-DD"), "EndDate": moment($scope.EndDate).format("YYYY-MM-DD"), "NofDays": parseInt($scope.WorkingDay), "ReAdmissionEndDate": moment($scope.ReAdmissionEndDate).subtract(1, "days").format("YYYY-MM-DD")
                  }
                    temparr.push(obj);
                }
            }
            var SetTimeTableSessionSchemeSemesters = PreExaminationService.SetTimeTableSessionSchemeSemesters(datatypeid, temparr)
            SetTimeTableSessionSchemeSemesters.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription);

                }
             else if (response[0].ResponceCode == '400') {
                alert(response[0].ResponceDescription);

            } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }


    })
})