define(['app'], function (app) {
    app.controller("AttendanceReportStudListController", function ($scope, $state, $http, $stateParams, AttendanceService, $localStorage, $uibModal, AppSettings, Excel, $timeout) {
        var data = {};
        $scope.$emit('showLoading', data);
        $scope.printData = false;
        var authdata = $localStorage.authorizationData;
        var CollegeId = authdata.College_Code ==null ||authdata.College_Code==undefined ?$localStorage.CollegeAttendanceReports.collegecode:authdata.College_Code;
        $scope.userType = authdata.SystemUserTypeId
        $scope.UserId = authdata.SysUserID
        var AcademicId = authdata.AcademicId == null || authdata.AcademicId ==undefined || authdata.AcademicId == "" ? 6 : authdata.AcademicId;
        $scope.AttendanceReportbranchwisestats = [];
        var Scheme = authdata.SchemeId;
        var semester = authdata.SemesterId;
        var Branch = authdata.BranchCode;
        var percentage = authdata.percentage;
        var AttDataList = [];
     //   $scope.LoadImg = true;
        $scope.showbrancwiseattdata = false;
        var getAttendanceByScheme_sem_BranchInfo = AttendanceService.GetAttendenceDataByBranchWise(CollegeId, Scheme, AcademicId, semester, Branch, percentage);
        getAttendanceByScheme_sem_BranchInfo.then(function (data) {
           // $scope.$emit('hideLoading', data);
            $scope.showbrancwiseattdata = true;
            if (data.Table.length > 0) {
             //   $scope.LoadImg = false;
                $scope.$emit('hideLoading', data);
              
                $scope.AttendanceReportbranchwisestats = data.Table;
                $scope.filteredbranchData = $scope.AttendanceReportbranchwisestats;
                $scope.name = $scope.AttendanceReportbranchwisestats.name;
               
                $scope.filteredbranchData = data.Table;


            }
            else {
                alert("Data Not Found");
                $scope.$emit('hideLoading', data);
                $scope.filteredbranchData = [];
                return;
            }
        }, function (error) {
            $scope.$emit('hideLoading', data);
            //     $scope.LoadImg = false;
            $scope.showbrancwiseattdata = false;
            alert(error);
        });

        //$scope.getattdata = function (AttendanceMonth,nod) {

        //    if (true) {
        //      //  $scope.months.push(parent.AttendanceMonth);
        //        var attstatus_date = [];
        //        var attfinalstatus_date = [];
        //        // var temp = [];
        //        $scope.prev = null;
        //        var obj = {};
        //        obj.AttdMonth = '';
        //        obj.date = '';
        //        obj.status = '';
        //        obj.attdcode = '';
        //        obj.attdid = '';
        //        var temparr = [];
        //        var arr = $scope.totalattreport;
        //        if (arr.length > 0) {
        //            for (var i = 0; i < arr.length; i++) {
        //                if (arr[i].AttendanceMonth === AttendanceMonth) {
        //                    attstatus_date.push(arr[i]);
        //                    temparr.push(arr[i].Day);
        //                }
        //            }
        //            //  return attstatus_date;&& attstatus_date.length == insertdate.length && attstatus_date.length != dayslen.length&& attstatus_date.length != parent.nod&& !insertdate.includes(temp1)
        //            var val2 = attstatus_date;
        //            var tempval = [];
        //            let dayslen = $scope.days;
        //            var insertdate = [];
        //            var temp1 = [];

        //            attstatus_date.forEach(function (value) {
        //                 temp1.push(value.Day);
        //                for (var j = 0; j < nod; j++) {
        //                    //  if (!temp1.includes(insertdate) && !temp1.includes(insertdate)) {
        //                    if (value.Day == dayslen[j] && !insertdate.includes(dayslen[j])) {
        //                        attfinalstatus_date.push(value);
        //                        insertdate.push(value.Day);
        //                    } else if (dayslen[j] == value.Day && !insertdate.includes(dayslen[j]) && !temp1.includes(dayslen[j]) &&!temparr.includes(dayslen[j])) {
        //                        obj = {};
        //                        let D = value.Date.split('-');
        //                        var date1 = D[0] + '-' + D[1] + '-' + dayslen[j];
        //                        obj.date = date1;
        //                        obj.Pin = value.Pin;
        //                        obj.AttendanceMonth = value.AttendanceMonth;
        //                        obj.AttendeeId = value.AttendeeId;
        //                        insertdate.push(dayslen[j]);
        //                        attfinalstatus_date.push(obj);
        //                    }
        //                }

        //                //   }


        //            });

        //            return attfinalstatus_date;

        //        }
        //    }
        //}
        $scope.stringify = function (x) {
            return JSON.stringify(x)
        };

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        };

        $scope.StudentAttData = function (AttId, date, status) {
            return {
                'AttendeeId': AttId,
                "Date": date,
                "Status": status

            };
        }
       
        var tempId = [];
       
        $scope.addDataToList = function (dat) {
            dat.Status = dat.Status.trim();
            if (dat.Status != undefined && dat.Status != "" && dat.Status != null) {
                if (AttDataList.length > 0) {
                    for (var i = 0; i < AttDataList.length; i++) {
                        if (AttDataList[i].Date == dat.date) {
                            AttDataList[i].Status = dat.Status;
                            AttDataList[i].AttendeeId = dat.AttendeeId;
                            AttDataList[i].Date = dat.date;
                            tempId.push(dat.date);
                        }
                        if (AttDataList[i].Date != dat.date && !tempId.includes(dat.date)) {
                            var attdata = $scope.StudentAttData(dat.AttendeeId, dat.date, dat.Status);
                            tempId.push(dat.date);
                            AttDataList.push(attdata);
                            console.log(AttDataList);

                        }
                    }
                } else if (AttDataList.length == 0) {
                    var attdata = $scope.StudentAttData(dat.AttendeeId, dat.date, dat.Status);
                    AttDataList.push(attdata);
                    console.log(AttDataList);
                }              
            }
           
       
           
            $scope.AttDataList = AttDataList
        }

    


        $scope.UpdateAtt = function (Remarks) {
            if (AttDataList != [] && AttDataList != '') {
                $scope.Remarks=Remarks
                if ($scope.Remarks == null || $scope.Remarks == undefined || $scope.Remarks == "") {
                    alert("Please Enter Remarks")
                    return
                }
                var postattendance = AttendanceService.UpdateAttendenceDataByBranch($scope.UserId, $scope.AttDataList, $scope.Remarks);
                postattendance.then(function (response) {
                    var res = JSON.parse(response);
                    if (res[0].ResponceCode == '200') {
                        alert(res[0].ResponceDescription);
                        // $scope.GetStudentAttData($scope.attpin, $scope.attName);
                        $scope.modalInstance.close();
                        $scope.AttDataList = []
                        AttDataList = []
                    } else if (res[0].ResponceCode == '400') {
                        alert(res[0].ResponceDescription);

                    }
                 //   $scope.GetStudentAttData($scope.attpin, $scope.attName);
                }, function (error) {
                    console.log(error);
                    // alert(error);
                });
            } else {
                alert('No valid data Present');
                $scope.modalInstance.close();
                $scope.AttDataList = []
                AttDataList = []
              //  $scope.GetStudentAttData($scope.attpin, $scope.attName);
            }

        }

        $scope.printDetails = function (divName) {
       //     $('#myModal').modal('hide')
            $scope.modalInstance.close();
          //  $scope.printData = true;
           
          // // $('#myModal').modal('hide');
            var printContents = document.getElementById(divName).innerHTML;
         
          var originalContents = document.body.innerHTML;
        
           document.body.innerHTML = printContents;
         
            window.print();
           
            document.body.innerHTML = originalContents;
           
         
           
          //  $scope.printHead = true;
                    
        
            //var divToPrint = document.getElementById(divName);
            //var temp = divToPrint.innerHTML;
            //////    $("#markslist").hide();
            ////var domClone = divToPrint.cloneNode(true);
            ////var $printSection = document.getElementById(divName);
            ////if ($printSection) {
            ////    //var $printSection = document.createElement("div");
               
            ////    document.body.appendChild($printSection);               

            ////}
         
            //window.print();
         

            //var divToPrint = document.getElementById(divName);
            //var temp = document.body.innerHTML;
            ////    $("#markslist").hide();
            //var domClone = divToPrint.cloneNode(true);
            //var $printSection = document.getElementById("printSection");
            //if ($printSection) {
            //    var $printSection = document.createElement("div");
            //    $printSection.id = "printSection";


            //    document.body.appendChild($printSection);
            //}
            window.print()
        }

      


        $scope.DownloadtoExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'attendanceReport');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                $('#a').remove();
                a.download = "AttendanceReportBranchWise.xls";
                document.body.appendChild(a);
                a.click();
                $('#a').remove();
            }, 100);
        }




        $scope.filteredData = [];
        $scope.GetStudentAttData = function (pin, name) {

            if (pin != null && pin != "" && pin != undefined) {

                if ($scope.userType == 1 || $scope.userType == 2 || $scope.userType == 1014) {
                    $scope.AttDataList = []
                    AttDataList = []
                    $scope.Remarks =""
                $scope.modalInstance = $uibModal.open({
                    templateUrl: "/app/views/Admission/Reports/UpdateStudentAttendance.html",
                    size: 'xlg',
                    scope: $scope,
                    windowClass: 'modal-fit-att',
                    //backdrop: 'static',

                });
    
            }else if($scope.userType == 3){
                $scope.modalInstance = $uibModal.open({
                    templateUrl: "/app/views/Admission/Reports/StudentAttendanceReport.html",
                    size: 'xlg',
                    scope: $scope,
                    windowClass: 'modal-fit-att',
                    //backdrop: 'static',








                });
                                
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
                $scope.attName = name;
                $scope.days = days
                $scope.LoadImg = true;
                $scope.showbrancwiseattdata = false;
                // $scope.getattendance = function () {
                var getAttendancePinwise = AttendanceService.GetAttendenceDataByPinWise(pin);
                getAttendancePinwise.then(function (data) {
                    $scope.LoadImg = false;
                    $scope.showbrancwiseattdata = true;
                    if (data.Table.length > 0 && data.Table1.length > 0) {
                        $scope.attmonths = [];
                        $scope.filteredData = [];
                        $scope.filteredData = data.Table1;
                        $scope.data = $scope.filteredData;
                        $scope.totalattreport = data.Table;
                        $scope.attendId = data.Table[0].AttendeeId;
                        $scope.attpin = data.Table[0].Pin;
                        var attbymonth = [];                  
                      
                        var arr = $scope.totalattreport;
                        var finalarr = [];
                        for (var j = 0; j < data.Table1.length; j++) {
                            var attbymonth = [];
                            var temparr2 = [];
                            for (var i = 0; i < arr.length; i++) {
                                if (arr[i].AttendanceMonth === data.Table1[j].AttendanceMonth) {
                                    attbymonth.push(arr[i]);
                                    temparr2.push(arr[i].Day);
                                }
                            }                         
                          
                            var attstatarr = [];
                            finalarr[j] = {};                          
                            finalarr[j].month = data.Table1[j].AttendanceMonth;
                            attstatarr[j] = {};
                            attbymonth.forEach(function (value) {
                                var temparr1 = [];

                                var ua = window.navigator.userAgent;
                                var msie = ua.indexOf("MSIE ");

                                $scope.days.forEach(function (day,k) {

                                    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                                        if (value.Day == day && temparr2.indexOf(day)) {
                                            let att = {};
                                            att.day = value.Day;
                                            att.AttendeeId = value.AttendeeId;
                                            att.date = value.Date;
                                            att.month = value.AttendanceMonth;
                                            att.Status = value.Status;
                                            attstatarr[k] = att;
                                            temparr1.push(value.Day);
                                        } else if (value.Day != day && !temparr1.indexOf(day) && !temparr2.indexOf(day)) {
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
                                    }
                                    else{
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
                                    }
                                   
                                });
                                finalarr[j].attstat = attstatarr;
                            });                                                                                 
                            $scope.attendancedata = finalarr;                
                           
                        }



                    } else {
                        $scope.LoadImg = false;
                        $scope.filteredData = [];
                        $scope.showbrancwiseattdata = false;
                    }

                }, function (err) {
                    $scope.LoadImg = false;
                    $scope.filteredData = [];
                    $scope.showbrancwiseattdata = false;
                    alert(err)
                });

            }




            //} else {
            //    $scope.filteredData = [];
            //    alert("No Attendance data found for this record")
            //    return
            //}

        }



    });

    app.factory('Excel', function ($window) {
        //alert("hello");
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
            format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
        return {
            tableToExcel: function (tableId, worksheetName) {               
                var table = $(tableId),
                    ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    });

});