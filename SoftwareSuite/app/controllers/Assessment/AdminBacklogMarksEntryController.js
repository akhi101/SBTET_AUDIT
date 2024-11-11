define(['app'], function (app) {
    app.factory('Excel', function ($window) {
        //alert("hello");
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
            format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
        return {
            tableToExcel: function (tableId, worksheetName) {
                var table = $(tableId);
                ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    });

    app.controller("AdminBacklogMarksEntryController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MenuService, AssessmentService, Excel, $timeout, MarksEntryService) {

        var authData = $localStorage.authorizationData;
        $scope.userType = authData.SystemUserTypeId;
        $scope.userName = authData.userName;
        AppSettings.userName = authData.userName;

        $scope.showcollegedetail = false;
        $scope.excelhide = true;
            
        $scope.subbtn = false;
        var issaved = true;
        $scope.resultFound = false;
        $scope.studentsNotFound = false;
        $scope.LoadImgForPinList = false;

        if ($scope.userType != 1) {           
            alert("Access denied for this module");
            $state.go('Dashboard.AssessmentDashboard');          
        }

        $scope.DownloadtoExcel = function (tableid, scheme) {
          
            $scope.excelhide = false;
            var ele2 = document.getElementsByClassName("disablefield");
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
                ele2[j].style['-webkit-appearance'] = "none";
                ele2[j].style['-moz-appearance'] = "none";
                ele2[j].style['background-color'] = "unset";             
            }

            var exportHref = Excel.tableToExcel(tableid, 'backlog marks');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = $scope.years.AcademicYear + '_'+$scope.scheme.Scheme+'_'+'backlogMarks.xls';
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);

            var ele2 = document.getElementsByClassName("disablefield");
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "auto";
                ele2[j].style.border = "1px solid #ddd";
                ele2[j].style['-webkit-appearance'] = "auto";
                ele2[j].style['-moz-appearance'] = "auto";
                ele2[j].style['background-color'] = "-internal-light dark(rgb(255, 255, 255)";
            }
            $scope.excelhide = true;
        }


        // for getting Current Academic year

        var AcademicYearsActive = AssessmentService.GetAcademicYearsActive();
        AcademicYearsActive.then(function (response) {
            $scope.yearslist = response.Table;
        },
            function (error) {
                alert("error");
            });

        $scope.setAcademicYears = function (years) {
            try {
                $scope.years = JSON.parse(years);
                $scope.hidedata();
            } catch (err) { }

        }

        $scope.setscheme = function (schem) {
            try {
                $scope.scheme = JSON.parse(schem);
                $scope.hidedata();
            } catch (err) { }

        }

        $scope.getActiveSchemes = [];
        // load schemes
        var LoadActiveSchemes = AssessmentService.getSchemes(2);
        LoadActiveSchemes.then(function (response) {
            $scope.getActiveSchemes = response;
        }, function (error) {
            alert("error while loading Schemes");
            var err = JSON.parse(error);
            console.log(err.Message);
            $scope.getActiveSchemes = [];
        });

        $scope.hidedata = function () {
            $scope.resultFound = false;
            $scope.studentsNotFound = false;
            $scope.LoadImgForPinList = false;
            $scope.search = '';
        }





        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }

        var markslist = [];

        var previewlist = [];

        var PinIdlist = []
        $scope.GetData = function () {
            if (angular.isUndefined($scope.years) || $scope.years == null) {
                alert('select Academic Year.')
                return;
            }
            if ($scope.scheme == undefined || $scope.scheme == null || $scope.scheme == "") {
                alert('select Scheme.')
                return;
            }
            markslist = [];

            previewlist = [];
            NEMarksList = [];
            PinIdlist = [];

            $scope.resultFound = false;
            $scope.studentsNotFound = false;
            $scope.LoadImgForPinList = true;
            var subjectPinList = MarksEntryService.getBacklogSubjectPinList($scope.years.AcademicID, $scope.scheme.SchemeId);
            subjectPinList.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.resultFound = true;
                    $scope.studentsNotFound = false;
                    $scope.LoadImgForPinList = false;
                    $scope.pinWise = response.Table;
                    NEMarksList = response;
                    PinIdlist = response.Table.map((obj) => { return { id: obj.id } });
                    //markslist = response.Table.map((obj) => { if (obj.marks != null) { return { id: obj.id, marks: obj.marks } } });
                    //markslist = markslist.filter(function (element) { return element !== undefined; });
                    //$scope.SubjectName = response.Table1[0].SubjectName;
                    //$scope.MaxMarks = response.Table1[0].maxmarks;
                    response.Table.forEach(function (stud) {
                        if (stud.marks != null) {
                            previewlist.push(stud);
                        }

                    });

                    if (previewlist.length == $scope.pinWise.length) {
                        issaved = true;
                        $scope.subbtn = true;
                    }
                } else {
                    alert('No Pins available for the selected inputs.')
                    $scope.resultFound = false;
                    $scope.studentsNotFound = true;
                    $scope.LoadImgForPinList = false;
                }
            }, function (error) {
                $scope.pinWise = [];
                $scope.resultFound = false;
                $scope.studentsNotFound = true;
                $scope.LoadImgForPinList = false;
                let err = JSON.parse(error)
                console.log(err);

            });

        }



        $scope.editMarks = function (data) {
            let pin = data.pin;
            subid = $localStorage.assessment.selectSubjectDetails.subid;

            var editmarksentered = MarksEntryService.editMarksEntry($scope.College_Code, branchCode, semId, examId, subid, pin);
            editmarksentered.then(function (res) {
                console.log(res);
                $scope.GetData();
            }, function (err) {
                console.log(err);
                alert("error occured while editing the marks");
            });

        }

        $scope.OpenDashboard = function () {
            $scope.homeDashBoard = true;
            $state.go("Dashboard");
        }

        var tempId = [];



        $scope.addData = function (id, marks) {
            return {
                id: id,
                marks: marks,
            };
        },


            $scope.AddMarksById = function (data) {
                var isvalied = false;
            if (data.marks > data.maxmarks) {
                    alert("Marks Entered should not be greater than maximum marks.");
                    $('#' + data.id).val('');
                    if (markslist.length > 0) {
                        markslist.map((obj) => {
                            if (obj.id == data.id) {
                                obj.marks = '';
                            }
                        });
                    }
                    return;
                }
                data.marks = data.marks.trim();
                if (data.marks != null && data.marks != "") {
                    if (isNaN(data.marks)) {
                        if (data.marks.toUpperCase() == 'AB' || data.marks.toUpperCase() == 'MP' || data.marks.toUpperCase() == 'DC' || data.marks.toUpperCase() == 'TC' || data.marks.toUpperCase() == 'DT') {
                            isvalied = true;
                        } else {
                            isvalied = false;
                        }

                    } else {
                        isvalied = true;
                    }
                }
                if (data.marks != null && data.marks != "" && isvalied) {
                    if (markslist.length > 0) {
                        markslist.map((obj) => {
                            if (obj.id == data.id) {
                                obj.marks = data.marks;
                                tempId.push(data.id);
                            }
                            if (obj.id != data.id && !tempId.includes(data.id)) {
                                var marksdata = $scope.addData(data.id, data.marks);
                                tempId.push(data.id);
                                markslist.push(marksdata);

                            }
                        });

                    } else if (markslist.length == 0) {
                        var marksdata = $scope.addData(data.id, data.marks);
                        markslist.push(marksdata);

                    }
                }

            },




            $scope.save = function () {
               

                issaved = true;
            if (markslist != [] && markslist != '') {
              
                    var postmarks = MarksEntryService.PostBacklogSemExamMarks(markslist);
                    postmarks.then(function (response) {
                        //   console.log(response);
                        alert('Marks are Saved Successfully');
                        $scope.GetData();
                    }, function (error) {
                        console.log(error);
                        // alert(error);
                    });
                } else {
                    alert('No valid data Present');
                    $scope.GetData();
                }

            }
        $scope.back = function () {
            $state.go("Dashboard.AssessmentDashboard");
        }

        $scope.submit = function () {
            var conf = confirm("Are you sure you want to submit the marks");
            if (conf) {
                subid = $localStorage.assessment.selectSubjectDetails.subid;
                let collegeCode = authData.College_Code;
                var submitMarks = MarksEntryService.SubmitMarksEntered(collegeCode, branchCode, AcademicId, semId, examId, subid);
                submitMarks.then(function (response) {
                    //   console.log(response);
                    alert('Marks are Submited Successfully');
                    $scope.GetData();
                }, function (error) {
                    console.log(error);
                });
            }

        },


            $scope.printMarksEntered = function () {
                if (issaved == false) {
                    alert('Save the marks before You Print');
                    return;
                }
                var divName = "idtoDivPrint";
                var $markstable = document.createElement("div");
                $markstable.innerHTML = '';
                $markstable.className = "table";

                var parsent = new DOMParser();
                var bl = parsent.parseFromString('<div id="divtitle">STATE BOARD OF TECHNICAL EDUCATION AND TRAINING TELANGANA</div>', "text/html");
                var parsent = new DOMParser();
                var cl = parsent.parseFromString('<div id="Entry">Backlog marks Entry</div>', "text/html");

                //var parse = new DOMParser();
                //var al = parse.parseFromString('<div id="divtop" ><span id="text-left"><label class="label-pad">College : </label>' + collegeName + '</span><span id="text-right"><label class="label-pad">Branch :</label>' + branchName + "(" + BranchCode + ")" + ' </span> </div>', "text/html");
                //var parser = new DOMParser();
                //var el = parser.parseFromString('<div id="divtoadd" ><span id="text-left"><label class="label-pad">Scheme : </label>' + $scope.loadedScheme.Scheme + '</span><span id="text-center"><label class="label-pad sem-pad"> Semester :</label>' + semName + "     " + '</span><span id="text-right"><label class="label-pad">Subject Code :</label>' + SubjectCode + '</span></div>', "text/html");
                var divToPrint = document.getElementById(divName);
                var temp = document.body.innerHTML;
                $("#markslist").hide();
                var domClone = divToPrint.cloneNode(true);
                var $printSection = document.getElementById("printSection");
                if (!$printSection) {
                    var $printSection = document.createElement("div");
                    $printSection.id = "printSection";
                    //var $ele1 = document.createElement("div");
                    //$ele1.className = "sbtet_img";             
                    var divToPrintheads = bl.getElementById("divtitle");
                    var divToPrintheaded = cl.getElementById("Entry");
                    //var divToPrinthead = el.getElementById("divtoadd");
                    $markstable.appendChild(divToPrintheads);
                    $markstable.appendChild(divToPrintheaded);
                    //$markstable.appendChild(divToPrinthead);


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
                $printSection.appendChild(domClone);
                // console.log($printSection.innerHTML);
                window.print();
                document.body.removeChild($printSection);
                $("#markslist").show();
                $scope.showcollegedetail = false;

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
            $state.go('login')
        }


    });
});