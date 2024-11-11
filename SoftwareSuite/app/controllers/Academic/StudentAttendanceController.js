define(['app'], function (app) {
    app.controller("StudentAttendanceController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, AcademicService) {
       // $scope.buttontext = "Show Full Attendance";
      
        $scope.getStudentDetails = function () { 
            $scope.attendancedata = [];
            $scope.months = [];
            $scope.StudentData = [];
            $scope.filteredData = [];
            AttDataList = [];
            window.localStorage.setItem("pin", pin);
            var pin = pin;
            var days = [];
            var istr = "";
            for (var i = 1; i <= 31; i++) {
                if (i < 10)
                    istr = "0" + i;
                else
                    istr = "" + i;
                days.push(istr);
            }
          //  $scope.attName = name;
            $scope.days = days
            $scope.LoadImg = true;
            $scope.showbrancwiseattdata = false;
            var getAttendance = AcademicService.getAttendanceReport($scope.Studentpin);
            getAttendance.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.result = true;
                    $scope.StudentData = response.Table[0];               
              
                if (response.Table1.length > 0 && response.Table2.length > 0) {
                    $scope.attmonths = [];
                    $scope.filteredData = [];
                    $scope.filteredData = response.Table2;
                    $scope.data = $scope.filteredData;
                    $scope.totalattreport = response.Table1;
                    $scope.attendId = response.Table[0].AttendeeId;
                    $scope.attpin = response.Table[0].Pin;
                    $scope.attName = response.Table[0].Name;
                    var attbymonth = [];

                    var arr = $scope.totalattreport;
                    var finalarr = [];
                    for (var j = 0; j < response.Table2.length; j++) {
                        var attbymonth = [];
                        var temparr2 = [];
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].AttendanceMonth === response.Table2[j].AttendanceMonth) {
                                attbymonth.push(arr[i]);
                                temparr2.push(arr[i].Day);
                            }
                        }

                        var attstatarr = [];
                        finalarr[j] = {};
                        finalarr[j].month = response.Table2[j].AttendanceMonth;
                        attstatarr[j] = {};
                        attbymonth.forEach(function (value) {
                            var temparr1 = [];
                            $scope.days.forEach(function (day, k) {
                                if (value.Day == day && temparr2.includes(day)) {
                                    let att = {};
                                    att.day = value.Day;
                                    att.AttendeeId = value.AttendeeId;
                                    att.date = value.Date;
                                    att.month = value.AttendanceMonth;
                                    att.Status = value.Status;
                                    attstatarr[k] = att;
                                    temparr1.push(value.Day);
                                } else if (value.Day != day && !temparr1.includes(day) && !temparr2.includes(day)) {
                                    let att = {};
                                    let D = value.Date.split('-');
                                    var dat = D[0] + '-' + D[1] + '-' + day;
                                    att.day = day;
                                    att.date = dat;
                                    att.AttendeeId = value.AttendeeId;
                                    att.month = value.AttendanceMonth;
                                    att.Status = "-";
                                    attstatarr[k] = att;
                                    temparr1.push(day);
                                }

                            });
                            finalarr[j].attstat = attstatarr;
                        });
                        $scope.attendancedata = finalarr;



                    }
                    $scope.months = [];
                    $scope.filteredData = [];
                    AttDataList = [];
                    window.localStorage.setItem("pin", pin);
                    var pin = pin;
                    var days = [];
                    var istr = "";
                    for (var i = 1; i <= 31; i++) {
                        if (i < 10)
                            istr = "0" + i;
                        else
                            istr = "" + i;
                        days.push(istr);
                    }
                    // $scope.attName = name;
                    $scope.days = days
                    // $scope.LoadImg = true;
                    $scope.showbrancwiseattdata = false;
                }
                } else {
                    $scope.result = false;
                }
            },
                function (error) {
                    $scope.result = false;
                    alert("error while loading Data");
                    console.log(error);
                });
        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        };


        $scope.OpenAttendance = function () { 
            $scope.showfullattendance = true;
            $scope.buttontext = "Hide";
            //$scope.modalInstance = $uibModal.open({
            //    templateUrl: "/app/views/Admission/Reports/StudentAttendanceReport.html",
            //    size: 'xlg',
            //    scope: $scope,
            //    windowClass: 'modal-fit-att',
            //    //backdrop: 'static',

            //});
        }
        $scope.printDetails = function (areatoprint) {          
         
            var divToPrint = document.getElementById(areatoprint);         
            var domClone = divToPrint.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            if (!$printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";
                document.body.appendChild($printSection);
            }
            $printSection.innerHTML = "";
            $printSection.appendChild(domClone);
            window.print();
            document.body.removeChild($printSection);  

        }
    })
})