define(['app'], function (app) {
    app.controller("StudentMobileAppAttendanceController", function ($scope, $http, $localStorage, $state,$window, $stateParams, AppSettings, $uibModal, AcademicService) {
       // $scope.buttontext = "Show Full Attendance";

       $scope.ResultFound = false;
       $scope.ResultNotFound = false;
       $scope.LoadImg = false;
      

        const $ctrl = this;
        $ctrl.$onInit = () => {           
            $scope.Studentpin = $stateParams.Pin;         

            $scope.getStudentDetails();
        }

/// recaptcha






$scope.keyLogin = function ($event) {
    if ($event.keyCode == 13) {
        $scope.getStudentDetails();
    }
}




        $scope.getStudentDetails = function () { 

            if( $scope.Studentpin == "" ||  $scope.Studentpin == undefined || $scope.Studentpin == null){
            alert("Enter Pin");
            return;
            }
           
          

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
            getAttendance.then(function (res) {
              
                try{
                var response = JSON.parse(res);
                }catch(err){
                    $scope.result = false;
                    alert("error while loading Data"); 
                }
                if (response.Table.length > 0) {
                    $scope.result = true;
                    $scope.ResultFound = true;
                    $scope.ResultNotFound = false;
                    $scope.LoadImg = false;
                    $scope.StudentData = response.Table[0];               
                    if($scope.StudentData.Pin.includes("-PH-")) {
                        $scope.StudentData.WorkingDaysForExams = 180;
                    } else {
                        $scope.StudentData.WorkingDaysForExams = 90;
                    }
                    $scope.StudentData.AttdForExams = (($scope.StudentData.NumberOfDaysPresent / $scope.StudentData.WorkingDaysForExams) * 100).toFixed(0);
              
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
                    $scope.ResultFound = false;
                    $scope.ResultNotFound = true;
                    $scope.LoadImg = false;
                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.ResultFound = false;
                    $scope.ResultNotFound = true;
                    $scope.LoadImg = false;
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
            
            // var divName = "idtoDivPrintAdmin";
            var divToPrint = document.getElementById(areatoprint);
            var temp = document.body.innerHTML;
            $("#studentAttendance1").hide();
            var domClone = divToPrint.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            //document.body.innerHTML = "";
            if (!$printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";
                document.body.appendChild($printSection);
            }
            $printSection.innerHTML = "";
            $printSection.appendChild(domClone);
           // alert($printSection.innerHTML);
            document.title = "Attendance Sheet" +$scope.Studentpin;
            window.print();
            document.body.removeChild($printSection);
            $("#studentAttendance1").show();
         
            // var divToPrint = document.getElementById(areatoprint);         
            // var domClone = divToPrint.cloneNode(true);
            // var $printSection = document.getElementById("printSection");
            // if (!$printSection) {
            //     var $printSection = document.createElement("div");
            //     $printSection.id = "printSection";
            //     document.body.appendChild($printSection);
            // }
            // $printSection.innerHTML = "";
            // $printSection.appendChild(domClone);
            // window.print();
            // document.body.removeChild($printSection);  

        }
    })
})