define(['app'], function (app) {
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

    app.controller("StudentSearchReportController", function ($scope, $state, $stateParams, $localStorage, AppSettings, ReportService, $uibModal, Excel, $timeout, AttendanceService, $rootScope) {
        var authdata = $localStorage.authorizationData;
        var markslist = [];
        $scope.StudentSearchReportStats = [];
        $scope.searchResult = false;
        $scope.LoadImg = true;
        $scope.AccessControl = function () {
            $scope.Access = false;
            if (AppSettings.CollegeID == 0) {
                $scope.Access = true;
            }
            else {
                alert("You are not allowed to access this page");
                $state.go('login');
            }
        };
        $scope.flagValues = [
            { flagName: true, flagValue:true },
             { flagName: false, flagValue:false }
        ]

        $scope.genders = [
          { gender:"Male", Id: 1},
           { gender:"Female", Id: 2}
        ]

        $scope.govtEmployeee = [
          { Name: true, Value:"1" },
           { Name: false, Value:"0" }
        ]
        $scope.searchtxt = "";
        $scope.DownloadExcelResult = function (tableId) {

            var exportHref = Excel.tableToExcel(tableId, '');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.download = "";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }
        $scope.EditDetails = function () {
            $scope.edit = true;
        }
        var mid1list = [];
        $scope.AddMarksById = function (data) {
        
            var isvalied = false;

            data.mid1 = data.mid1.trim();
            if (data.mid1 != null && data.mid1 != "" && data.mid2 != null && data.mid2 != "" && data.internal != null && data.internal != ""
                && data.endexam != null && data.endexam != "") {
                if (isNaN(data.mid1 && ata.mid2 && data.internal && data.endexam)) {
                    if (data.mid1.toUpperCase() == 'AB' || data.mid1.toUpperCase() == 'MP' || data.mid1.toUpperCase() == 'DC' || data.mid1.toUpperCase() == 'TC' || data.mid1.toUpperCase() == 'DT') {
                        isvalied = true;
                    } else {
                        isvalied = false;
                    }
                    if (data.mid2.toUpperCase() == 'AB' || data.mid2.toUpperCase() == 'MP' || data.mi2.toUpperCase() == 'DC' || data.mid2.toUpperCase() == 'TC' || data.mid2.toUpperCase() == 'DT') {
                        isvalied = true;
                    } else {
                        isvalied = false;
                    }
                    if (data.internal.toUpperCase() == 'AB' || data.internal.toUpperCase() == 'MP' || data.internal.toUpperCase() == 'DC' || data.internal.toUpperCase() == 'TC' || data.internal.toUpperCase() == 'DT') {
                        isvalied = true;
                    } else {
                        isvalied = false;
                    }
                    if (data.endexam.toUpperCase() == 'AB' || data.endexam.toUpperCase() == 'MP' || data.endexam.toUpperCase() == 'DC' || data.endexam.toUpperCase() == 'TC' || data.mid1.toUpperCase() == 'DT') {
                        isvalied = true;
                    } else {
                        isvalied = false;
                    }

                } else {
                    isvalied = true;
                }

            }

            if (data.mid1 != null && data.mid1 != "" && isvalied) {
              
                if (mid1list.length > 0) {
                    for (var i = 0 ; i < mid1list.length ; i++) {
                        if (mid1list[i].id == data.id) {
                            mid1list[i].mid1 = data.mid1;
                            mid1list[i].mid2 = data.mid2;
                            mid1list[i].internal = data.internal;
                            mid1list[i].endexam = data.endexam;
                            tempId.push(data.id);
                        }
                        if (mid1list[i].id != data.id && !tempId.includes(data.id)) {
                            var mid1data = $scope.addData(data.id, data.mid1, data.mid2, data.internal, data.emdexam);
                            tempId.push(data.id);
                            mid1list.push(mid1data);


                        }
                    }
                } else if (mid1list.length == 0) {
                    var mid1data = $scope.addData(data.id, data.mid1);
                    mid1list.push(mid1data);
                }
            }
      
        }

        $scope.viewValues = function (key, value) {
         
        }

        var tempId = [];
        $scope.addData = function (id, mid1) {
            return {
                id: id,
                mid1: mid1,
            };
        }

        $scope.AddMarksByIds = function (data) {       
            if (data.mid1 > data.Mid1Max_Marks) {
                alert("Marks Entered should not be greater than maximum marks.");
                $('#' + data.id).val('');
                if (markslist.length > 0) {
                    for (var i = 0 ; i < markslist.length; i++) {
                        if (markslist[i].id == data.id) {
                            markslist[i].mid1 = '';
                            data.mid1 = '';
                        }
                    }
                }
                return;
            }

         

            if (data.mid2 > data.Mid2Max_Marks) {
                alert("Marks Entered should not be greater than maximum marks.");
                $('#' + data.id).val('');
                if (markslist.length > 0) {
                    for (var i = 0 ; i < markslist.length; i++) {
                        if (markslist[i].id == data.id) {
                            markslist[i].mid2 = '';
                            data.mid2 = '';
                        }
                    }
                }
                return;
            }
            if (data.internal > data.InternalMax_Marks) {
                alert("Marks Entered should not be greater than maximum marks.");
                $('#' + data.id).val('');
                if (markslist.length > 0) {
                    for (var i = 0 ; i < markslist.length; i++) {
                        if (markslist[i].id == data.id) {
                            markslist[i].internals = '';
                            data.internal = '';
                        }
                    }
                }
                return;
            }
            if (data.endexam > data.end_exam_max_marks) {
                alert("Marks Entered should not be greater than maximum marks.");
                $('#' + data.id).val('');
                if (markslist.length > 0) {
                    for (var i = 0 ; i < markslist.length; i++) {
                        if (markslist[i].id == data.id) {
                            markslist[i].endexam = '';
                            data.endexam = '';
                        }
                    }
                }
                return;
            }
         
            
            if (data.mid1) {
                data.mid1 = data.mid1.trim();
                if (data.mid1 != null && data.mid1 != "") {
                    if (isNaN(data.mid1)) {
                        if (data.mid1.toUpperCase() == 'AB' || data.mid1.toUpperCase() == 'MP' || data.mid1.toUpperCase() == 'DC' || data.mid1.toUpperCase() == 'TC' || data.mid1.toUpperCase() == 'DT') {
                            isvalied = true;
                        } else {
                            isvalied = false;
                        }
                    } else {
                        isvalied = true;
                    }
                }
            }
            if (data.mid2) {
                data.mid2 = data.mid2.trim();
                if (data.mid2 != null && data.mid2 != "") {
                    if (isNaN(data.mid2)) {
                        if (data.mid2.toUpperCase() == 'AB' || data.mid2.toUpperCase() == 'MP' || data.mid2.toUpperCase() == 'DC' || data.mid2.toUpperCase() == 'TC' || data.mid2.toUpperCase() == 'DT') {
                            isvalied = true;
                        } else {
                            isvalied = false;
                        }
                    } else {
                        isvalied = true;
                    }
                }
            }
            if (data.internal) {
                data.internal = data.internal.trim();
                if (data.internal != null && data.internal != "") {
                    if (isNaN(data.internal)) {
                        if (data.internal.toUpperCase() == 'AB' || data.internal.toUpperCase() == 'MP' || data.internal.toUpperCase() == 'DC' || data.internal.toUpperCase() == 'TC' || data.internal.toUpperCase() == 'DT') {
                            isvalied = true;
                        } else {
                            isvalied = false;
                        }
                    } else {
                        isvalied = true;
                    }
                }
            }
            if (data.endexam) {     
            data.endexam = data.endexam.trim();
            if (data.endexam != null && data.endexam != "") {
                if (isNaN(data.endexam)) {
                    if (data.endexam.toUpperCase() == 'AB' || data.endexam.toUpperCase() == 'MP' || data.endexam.toUpperCase() == 'DC' || data.endexam.toUpperCase() == 'TC' || data.endexam.toUpperCase() == 'DT') {
                        isvalied = true;
                    } else {
                        isvalied = false;
                    }
                } else {
                    isvalied = true;
                }
            }
            }

            if (data.mid1 != null && data.mid1 != "" || data.mid2 != null && data.mid2 != "" || data.internal != null && data.internal != "" ||
                data.endexam != null && data.endexam != "") {
                if (markslist.length == '0') {
                 
                    var marksdata = $scope.addDatas(data.id, data.mid1, data.mid2, data.internal, data.endexam);
                    markslist.push(marksdata);


                } else if (markslist.length > 0) {
                    for (var i = 0 ; i < markslist.length; i++) {
                        if (markslist[i].id == data.id) {
                            markslist[i].mid1 = data.mid1;
                            markslist[i].mid2 = data.mid2;
                            markslist[i].internals = data.internal;
                            markslist[i].endexam = data.endexam;
                            tempId.push(data.id);
                        }
                        if (markslist[i].id != data.id && !tempId.includes(data.id)) {

                            var marksdata = $scope.addDatas(data.id, data.mid1, data.mid2, data.internal, data.endexam);
                            tempId.push(data.id);
                            markslist.push(marksdata);

                        }
                    }
                }
              
            }      

        }
        $scope.uploadPhoto = function () {
            var input = document.getElementById("userPic");
            var fileSize = input.files[0].size;

            if (fileSize <= 50000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#userImg').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.load(function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");

                            // var data = base64Image.replace(/^data:image\/\w+;base64,/, "");

                            $scope.userPic = base64Image;

                        });

                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else {
                alert("file size should be less then 50kb ");
                return;
            }
        }

        $scope.printDetails = function () {

            $scope.printHead = true;
            var divName = "idtoDivPrint";
            var $markstable = document.createElement("div");
            $markstable.innerHTML = '';
            $markstable.className = "tables";
            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;
            //    $("#markslist").hide();
            var domClone = divToPrint.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            if ($printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";


                document.body.appendChild($printSection);

                var $ele1 = document.createElement("div");
                $ele1.className = "row";

                var $ele2 = document.createElement("div");
                $ele2.className = "col-lg-2 col-md-12";

                var $ele3 = document.createElement("div");
                $ele3.className = "col-lg-10 col-md-12";


                $ele1.appendChild($ele3);

                $printSection.appendChild($ele1);

                $printSection.appendChild($ele1);
                $printSection.appendChild($markstable);

            }
            var tempTitle = document.title;
            document.title = 'StudentDetails';
            window.print();
            document.title = tempTitle;


        }


        $scope.uploadSign = function () {
            var input = document.getElementById("stdPhotoFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 50000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdPhotoImg').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.load(function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");

                            // var data = base64Image.replace(/^data:image\/\w+;base64,/, "");

                            $scope.signature = base64Image;
                        });

                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else {
                alert("file size should be less then 50kb ");
                return;
            }
        }



        $scope.addDatas = function (id, mid1, mid2, internal, endexam) {
            return {
                id: id,
                mid1: mid1,
                mid2: mid2,
                internals: internal,
                endexam: endexam,
            };
        }

        $scope.searchBy = function (filter) {
            $scope.selectedFilter = filter;
            switch (filter) {
                case "ATTID":
                    $scope.placeholder = 'Attendee ID';

                    break;
                case "PIN":
                    $scope.placeholder = 'Pin';

                    break;
                case "Aadhaar":
                    $scope.placeholder = 'Aadhaar no';

                    break;
            }
        };


        $scope.logOut = function () {
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;
           
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };
            $state.go('login')
        }


        $scope.search = function () {
          //  $scope.searchResult = true;
            $scope.LoadImg = true;
            $scope.StudentDetailsFound = false;
            var filter = $scope.filter;
            if ($scope.placeholder == 'Pin') {
                $('#stdPhotoImg').attr('src', '');
                $('#userImg').attr('src', '');
                var SearchstudentInfo = ReportService.GetStudentByPin(filter);
                SearchstudentInfo.then(function (data) {
                    $scope.searchResult = true;
                    $scope.LoadImg = false;
                    if (data.Table.length > 0 || data.Table1.length > 0 || data.Table2.length > 0) {
                        if (data.Table.length == 0) {
                            $scope.Table = false;
                            alert("No Data Found in Assessment")
                        } else if (data.Table1.length == 0) {
                            $scope.Table = false;
                            alert("No Data Found in Attendance")
                        } else if (data.Table2.length == 0) {
                            $scope.Table = false;
                            alert("No Data Found in Addmission")
                        } else{
                             $scope.Table = true;
                         }
                        $scope.StudentDetailsFound = true;
                        $scope.StudentSearchReportStats = data.Table;
                        if( data.Table1.length > 0){
                            $scope.StudentAttendanceReports = data.Table1;
                            $scope.StudentPin = data.Table1[0].Pin;
                            $scope.attName = data.Table1[0].name;
                        }
                        try {
                            $scope.AdmissioneReports = data.Table2[0];

                            if ($scope.AdmissioneReports.PolycetHallTicketNo == null || $scope.AdmissioneReports.PolycetHallTicketNo == "") {
                                $scope.polycet = false;
                            } else {
                                $scope.polycet = true;;
                            }
                            $scope.signature = data.Table2[0].CandidateSign;
                            $scope.userPic = data.Table2[0].ProfilePhoto;
                        } catch (err) { }
                        $('#userImg').attr('src', $scope.userPic);
                        $("#stdPhotoImg").attr('src', $scope.signature);
                    
                        $scope.studentData = $scope.StudentSearchReportStats;
                        $scope.updateMandals($scope.AdmissioneReports.DistrictId)
                    }
                    else {
                        $scope.searchResult = false;
                        $scope.LoadImg = false;
                        $scope.StudentDetailsFound = false;
                        alert("Data Not Found");
                        $scope.StudentSearchReportStats = [];
                        return;
                    }
                }, function (error) {
                    $scope.searchResult = false;
                    $scope.LoadImg = false;
                    $scope.StudentDetailsFound = false;
                    alert("error");

                });
            } else if ($scope.placeholder == 'Aadhaar no') {
                $('#stdPhotoImg').attr('src', '');
                $('#userImg').attr('src', '');
                var SearchstudentInfos = ReportService.GetSudentByAadhaar(filter);
                SearchstudentInfos.then(function (data) {
                    $scope.searchResult = true;
                    $scope.LoadImg = false;
                    if (data.Table.length > 0) {
                      
                        $scope.StudentDetailsFound = true;
                        $scope.StudentSearchReportStats = data.Table;
                        if( data.Table1.length > 0){
                            $scope.StudentAttendanceReports = data.Table1;
                            $scope.StudentPin = data.Table1[0].Pin;
                            $scope.attName = data.Table1[0].name;
                        }
                        $scope.AdmissioneReports = data.Table2[0];
                        if ($scope.AdmissioneReports.PolycetHallTicketNo == null || $scope.AdmissioneReports.PolycetHallTicketNo == "") {
                            $scope.polycet = false;
                        } else {
                            $scope.polycet = true;;
                        }
                        $scope.signature = data.Table2[0].CandidateSign;
                        $scope.userPic = data.Table2[0].ProfilePhoto;
                        $('#userImg').attr('src', $scope.userPic);
                        $("#stdPhotoImg").attr('src', $scope.signature);
                      
                        $scope.studentData = $scope.StudentSearchReportStats;
                        $scope.updateMandals($scope.AdmissioneReports.DistrictId)
                    }
                    else {
                        alert("Data Not Found");
                        $scope.StudentSearchReportStats = [];
                        return;
                    }
                }, function (error) {
                    $scope.searchResult = false;
                    $scope.LoadImg = false;
                    $scope.StudentDetailsFound = false;
                    alert("error");
                });
            } else if ($scope.placeholder == 'Attendee ID') {
                $('#stdPhotoImg').attr('src', '');
                $('#userImg').attr('src', '');
                var SearchstudentInfo = ReportService.GetStudentByattendeeId(filter);
                SearchstudentInfo.then(function (data) {
                    $scope.searchResult = true;
                    $scope.LoadImg = false;
                    if (data.Table.length > 0) {
                      
                        $scope.StudentDetailsFound = true;
                        $scope.StudentSearchReportStats = data.Table;                       
                        if( data.Table1.length > 0){
                            $scope.StudentAttendanceReports = data.Table1;
                            $scope.StudentPin = data.Table1[0].Pin;
                            $scope.attName = data.Table1[0].name;
                        }
                        $scope.AdmissioneReports = data.Table2[0];
                        if ($scope.AdmissioneReports.PolycetHallTicketNo == null || $scope.AdmissioneReports.PolycetHallTicketNo == "") {
                            $scope.polycet = false;
                        } else {
                            $scope.polycet = true;;
                        }
                        $scope.signature = data.Table2[0].CandidateSign;
                        $scope.userPic = data.Table2[0].ProfilePhoto;
                        $('#userImg').attr('src', $scope.userPic);
                        $("#stdPhotoImg").attr('src', $scope.signature);
                  //      console.log($scope.StudentSearchReportStats)
                        $scope.studentData = $scope.StudentSearchReportStats;
                        $scope.updateMandals($scope.AdmissioneReports.DistrictId)
                    }
                    else {
                        alert("Data Not Found");
                        $scope.StudentSearchReportStats = [];
                        return;
                    }
                }, function (error) {
                    $scope.searchResult = false;
                    $scope.LoadImg = false;
                    $scope.StudentDetailsFound = false;
                    alert("error");
                });
            } else {
                $scope.searchResult = false;
                $scope.LoadImg = false;
                $scope.StudentDetailsFound = false;
                alert("Select the filter options");

            }
        }

        //var getRegion = ReportService.GetRegion();
        //getRegion.then(function (data) {
        //    if (data.Table.length > 0) {
        //        console.log(data.Table);
        //    }else {
        //        alert("No Region Found")
        //    }
        //}, function (error) {
          
        //    alert("error");
        //});

        
        var getMiniority = ReportService.GetMiniority();
        getMiniority.then(function (data) {
            if (data.Table.length > 0) {
                $scope.MinorityTypes = data.Table;
            } else {
                alert("No Minority Found")
            }
        }, function (error) {

            alert("error");
        });

        var getRegion = ReportService.GetRegion();
        getRegion.then(function (data) {
            if (data.Table.length > 0) {
                $scope.Regions = data.Table;
            } else {
                alert("No Region Found")
            }
        }, function (error) {

            alert("error");
        });

        var getCategory = ReportService.GetCategory();
        getCategory.then(function (data) {
            if (data.Table.length > 0) {
                $scope.Categories = data.Table;
            } else {
                alert("No Categories Found")
            }
        }, function (error) {

            alert("error");
        });
        var getBranches = ReportService.GetActiveBranches();
        getBranches.then(function (response) {
          
            $scope.getBranches = response.Table;
        },
        function (error) {
            alert("error while loading Branches");
            var err = JSON.parse(error);
            console.log(err.Message);
        });

        var getSemisters = ReportService.GetActiveSemisters();
        getSemisters.then(function (response) {
        
            $scope.getSemisters = response.Table;
        },
        function (error) {
            alert("error while loading Semisters");
            var err = JSON.parse(error);
            console.log(err.Message);
        });

        var getSchemes = ReportService.GetSchemes();
        getSchemes.then(function (response) {
       
            $scope.getSchemes = response.Table;
        },
        function (error) {
            alert("error while loading Schemes");
            var err = JSON.parse(error);
            console.log(err.Message);
        });

        var getSccBoard = ReportService.GetSscBoard();
        getSccBoard.then(function (response) {
          
            $scope.getSscBoard = response.Table;
        },
        function (error) {
            alert("error while loading Ssc Data");
            var err = JSON.parse(error);
            console.log(err.Message);
        });

        var getIncomeCategory = ReportService.GetIncomeCategory();
        getIncomeCategory.then(function (response) {
          
            $scope.getIncomeCategory = response.Table;
        },
        function (error) {
            alert("error while loading IncomeCategory");
            var err = JSON.parse(error);
            console.log(err.Message);
        });


        var getSpecialCategory = ReportService.GetSpecialCategory();
        getSpecialCategory.then(function (data) {
            if (data.Table.length > 0) {
                $scope.SpecialCategories = data.Table;
            } else {
                alert("No Special Categories Found")
            }
        }, function (error) {

            alert("error");
        });

        var getDistricts = ReportService.GetDistricts();
        getDistricts.then(function (data) {
            if (data.Table.length > 0) {
               // console.log(data.Table);
                $scope.Districts = data.Table;
            } else {
                alert("No Districts Found")
            }
        }, function (error) {
            $scope.StudentReg.DistrictId
            alert("error");
        });

        $scope.updateMandals = function (DistrictId) {
            ReportService.GetMandalsForDistrict(DistrictId).then(function (data) {
                $scope.Mandals = data;
             
            }, function (error) {
               console.log(error);
            });
        }

        var getEducationalQualification = ReportService.GetEducationalQualification();
        getEducationalQualification.then(function (data) {
            if (data.Table.length > 0) {
                $scope.Qualifications = data.Table;
            } else {
                alert("No Educational Qualification Found")
            }
        }, function (error) {

            alert("error");
        });

        var GetBanks = ReportService.GetBanks();
        GetBanks.then(function (data) {
            if (data.Table.length > 0) {
                $scope.getBanks = data.Table;
            } else {
                alert("No Banks Found")
            }
        }, function (error) {

            alert("error");
        });
        

        var getReligion = ReportService.GetReligion();
        getReligion.then(function (data) {
            if (data.Table.length > 0) {
              
            } else {
                alert("No Religion Found")
            }
        }, function (error) {

            alert("error");
            });

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        };

        $scope.GetStudentAtt = function () {


            if ($scope.StudentPin != null && $scope.StudentPin != "" && $scope.StudentPin != undefined) {

              
            
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: "/app/views/Admission/Reports/StudentAttendanceReport.html",
                        size: 'xlg',
                        scope: $scope,
                        windowClass: 'modal-fit-att',
                        //backdrop: 'static',

                    });

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
                // $scope.getattendance = function () {
                var getAttendancePinwise = AttendanceService.GetAttendenceDataByPinWise($scope.StudentPin);
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

        }







        $scope.updateData = function () {
            //console.log(markslist)
            var updateData = ReportService.updateMarks(markslist);
            updateData.then(function (data) {
                // console.log(data)
                alert("Student Marks Updated Successfully")
                $scope.search()
            }, function (error) {
                $scope.searchResult = false;
                $scope.LoadImg = false;
                $scope.StudentDetailsFound = false;
                alert("error");
            });
        }
        $scope.updatePersonalData = function () {
      
          
            var req = {
                "StudentId": $scope.AdmissioneReports.studentid == null || $scope.AdmissioneReports.studentid == undefined ? "" : $scope.AdmissioneReports.studentid,
                "profilephoto": $scope.userPic == null || $scope.userPic == undefined ? "" : $scope.userPic,
                "CandidateSign": $scope.signature == null || $scope.signature == undefined ? "" : $scope.signature,
                "CategoryId": $scope.AdmissioneReports.CategoryId == null || $scope.AdmissioneReports.CategoryId == undefined ? "" : $scope.AdmissioneReports.CategoryId,
                "SpecialCategoryId": $scope.AdmissioneReports.SpecialCategoryId == null || $scope.AdmissioneReports.SpecialCategoryId == undefined ? "" : $scope.AdmissioneReports.SpecialCategoryId,
                "TenthRollNo": $scope.AdmissioneReports.TenthHallTicketNo == null || $scope.AdmissioneReports.TenthHallTicketNo == undefined ? "" : $scope.AdmissioneReports.TenthHallTicketNo,
                "TenthYear": $scope.AdmissioneReports.TenthYear == null || $scope.AdmissioneReports.TenthYear == undefined ? "" : $scope.AdmissioneReports.TenthYear,
                "TenthBoard": $scope.AdmissioneReports.TenthBoard == null || $scope.AdmissioneReports.TenthBoard == undefined ? "" : $scope.AdmissioneReports.TenthBoard,
                "TenthHallTicketNo": $scope.AdmissioneReports.TenthHallTicketNo + "," + $scope.AdmissioneReports.TenthHallTicketNo == null || $scope.AdmissioneReports.TenthHallTicketNo,
                "StudentRecided": $scope.AdmissioneReports.StudentRecided == null || $scope.AdmissioneReports.StudentRecided == undefined ? "" : $scope.AdmissioneReports.StudentRecided,
                //"PolycetHallTicketNo": $scope.AdmissioneReports.PolycetHallTicketNo == null || $scope.AdmissioneReports.PolycetHallTicketNo == undefined ? "" : $scope.AdmissioneReports.PolycetHallTicketNo,
                "QualificationId": $scope.AdmissioneReports.QualificationId == null || $scope.AdmissioneReports.QualificationId == undefined ? "" : $scope.AdmissioneReports.QualificationId,
                "ReligionId": $scope.AdmissioneReports.ReligionId == null || $scope.AdmissioneReports.ReligionId == undefined ? "" : $scope.AdmissioneReports.ReligionId,
                "Region": $scope.AdmissioneReports.Region == null || $scope.AdmissioneReports.Region == undefined ? "" : $scope.AdmissioneReports.Region,
                "MinorityType": $scope.AdmissioneReports.MinorityType == null || $scope.AdmissioneReports.MinorityType == undefined ? "" : $scope.AdmissioneReports.MinorityType,
                "PermanentAddress": $scope.AdmissioneReports.PermanentAddress == null || $scope.AdmissioneReports.PermanentAddress == undefined ? "" : $scope.AdmissioneReports.PermanentAddress,
                "TempararyAddress": $scope.AdmissioneReports.TempararyAddress == null || $scope.AdmissioneReports.TempararyAddress == undefined ? "" : $scope.AdmissioneReports.TempararyAddress,
                "HouseNo": $scope.AdmissioneReports.HouseNo == null || $scope.AdmissioneReports.HouseNo == undefined ? "" : $scope.AdmissioneReports.HouseNo,
                "VillageorTown": $scope.AdmissioneReports.VillageorTown  == null || $scope.AdmissioneReports.VillageorTown == undefined ? "" : $scope.AdmissioneReports.VillageorTown ,
                "DistrictId": $scope.AdmissioneReports.DistrictId == null || $scope.AdmissioneReports.DistrictId == undefined ? "" : $scope.AdmissioneReports.DistrictId,
                "MandalId": $scope.AdmissioneReports.MandalId == null || $scope.AdmissioneReports.MandalId == undefined ? "" : $scope.AdmissioneReports.MandalId,
                "Pincode": $scope.AdmissioneReports.Pincode == null || $scope.AdmissioneReports.Pincode == undefined ? "" : $scope.AdmissioneReports.Pincode,
                "IsPhysicallyHandicaped": $scope.AdmissioneReports.IsPhysicallyHandicaped == null || $scope.AdmissioneReports.IsPhysicallyHandicaped == undefined ? "" : $scope.AdmissioneReports.IsPhysicallyHandicaped,
                "FatherAadhaarNo": $scope.AdmissioneReports.FatherAadhaarNo == null || $scope.AdmissioneReports.FatherAadhaarNo == undefined ? "" : $scope.AdmissioneReports.FatherAadhaarNo,
                "MotherAadhaarNo": $scope.AdmissioneReports.MotherAadhaarNo == null || $scope.AdmissioneReports.MotherAadhaarNo == undefined ? "" : $scope.AdmissioneReports.MotherAadhaarNo,
                "IsFatherGorthEmp": $scope.AdmissioneReports.IsFatherGorthEmp == null || $scope.AdmissioneReports.IsFatherGorthEmp == undefined ? "" : $scope.AdmissioneReports.IsFatherGorthEmp,
                "Income": $scope.AdmissioneReports.Income == null || $scope.AdmissioneReports.Income == undefined ? "" : $scope.AdmissioneReports.Income,
                "IncomeCategory": $scope.AdmissioneReports.IncomeCategory == null || $scope.AdmissioneReports.IncomeCategory == undefined ? "" : $scope.AdmissioneReports.IncomeCategory,
                "Occupation": $scope.AdmissioneReports.Occupation  == null || $scope.AdmissioneReports.Occupation == undefined ? "" :$scope.AdmissioneReports.Occupation,
                "CasteNo": $scope.AdmissioneReports.CasteNo == null || $scope.AdmissioneReports.CasteNo == undefined ? "" : $scope.AdmissioneReports.CasteNo,
                "BankId": $scope.AdmissioneReports.Bank == null || $scope.AdmissioneReports.Bank == undefined ? "" : $scope.AdmissioneReports.Bank,
                "BankAccountNo": $scope.AdmissioneReports.BankAccountNo == null || $scope.AdmissioneReports.BankAccountNo == undefined ? "" : $scope.AdmissioneReports.BankAccountNo,
                "IfscCode": $scope.AdmissioneReports.IfscCode == null || $scope.AdmissioneReports.IfscCode == undefined ? "" : $scope.AdmissioneReports.IfscCode,
                "BankBranch": $scope.AdmissioneReports.BankBranch == null || $scope.AdmissioneReports.BankBranch == undefined ? "" : $scope.AdmissioneReports.BankBranch,
                //"ShiftId": $scope.AdmissioneReports.ShiftId == null || $scope.AdmissioneReports.ShiftId == undefined ? "" : $scope.AdmissioneReports.ShiftId,
                //"PIN": $scope.AdmissioneReports.Pin == null || $scope.AdmissioneReports.Pin == undefined ? "" : $scope.AdmissioneReports.Pin,
                "Name": $scope.AdmissioneReports.Name == null || $scope.AdmissioneReports.Name == undefined ? "" : $scope.AdmissioneReports.Name,
                "FatherName": $scope.AdmissioneReports.FatherName == null || $scope.AdmissioneReports.FatherName == undefined ? "" : $scope.AdmissioneReports.FatherName,
                "MotherName": $scope.AdmissioneReports.MotherName == null || $scope.AdmissioneReports.MotherName == undefined ? "" : $scope.AdmissioneReports.MotherName,
                "Gender": $scope.AdmissioneReports.Gender == null || $scope.AdmissioneReports.Gender == undefined ? "" : $scope.AdmissioneReports.Gender,
                "DateOfBIrth": $scope.AdmissioneReports.DateOfBIrth == null || $scope.AdmissioneReports.DateOfBIrth == undefined ? "" : $scope.AdmissioneReports.DateOfBIrth,
                //"CourseID": $scope.AdmissioneReports.CourseID == null || $scope.AdmissioneReports.CourseID == undefined ? "" : $scope.AdmissioneReports.CourseID,
                "AadharNo": $scope.AdmissioneReports.AadharNo == null || $scope.AdmissioneReports.AadharNo == undefined ? "" : $scope.AdmissioneReports.AadharNo,
                "EmailId": $scope.AdmissioneReports.EmailId == null || $scope.AdmissioneReports.EmailId == undefined ? "" : $scope.AdmissioneReports.EmailId,
                "ParentContact": $scope.AdmissioneReports.ParentContact == null || $scope.AdmissioneReports.ParentContact == undefined ? "" : $scope.AdmissioneReports.ParentContact,
                "StudentContact": $scope.AdmissioneReports.StudentContact == null || $scope.AdmissioneReports.StudentContact == undefined ? "" : $scope.AdmissioneReports.StudentContact,
                "CollegeCode": $scope.AdmissioneReports.CollegeCode == null || $scope.AdmissioneReports.CollegeCode == undefined ? "" : $scope.AdmissioneReports.CollegeCode,
                //"SchemeId": $scope.AdmissioneReports.SchemeId == null || $scope.AdmissioneReports.SchemeId == undefined ? "" : $scope.AdmissioneReports.SchemeId,
                //"AcademicYearId": $scope.AdmissioneReports.AcademicYearId == null || $scope.AdmissioneReports.AcademicYearId == undefined ? "" : $scope.AdmissioneReports.AcademicYearId,
                //"BranchID": $scope.AdmissioneReports.BranchID == null || $scope.AdmissioneReports.BranchID == undefined ? "" : $scope.AdmissioneReports.BranchID,
                "AttendeeId": $scope.AdmissioneReports.AttendeeId == null || $scope.AdmissioneReports.AttendeeId == undefined ? "" : $scope.AdmissioneReports.AttendeeId,
                "Activeflag": $scope.AdmissioneReports.ActiveFlag == null || $scope.AdmissioneReports.ActiveFlag == undefined ? "" : $scope.AdmissioneReports.ActiveFlag,
                "semid":$scope.AdmissioneReports.SemId == null || $scope.AdmissioneReports.SemId == undefined ? "" : $scope.AdmissioneReports.SemId
            }

            var updateData = ReportService.UpdateStudentData(req);
            updateData.then(function (data) {
               
                if (data == '' || data == null) {
                    $scope.userPic = '';
                    $scope.signature = '';
                    alert("Student Data Updated Successfully")
                    $scope.search();
                } else {
                    alert(data);
                }
             
                //$("#stdPhotoImg").remove()
              

                //$scope.search()
            }, function (error) {
                $scope.searchResult = false;
                $scope.LoadImg = false;
                $scope.StudentDetailsFound = true;
                alert(error);
            });
        }


    });

});

