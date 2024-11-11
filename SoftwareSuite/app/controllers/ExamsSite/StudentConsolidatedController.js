define(['app'], function (app) {
    app.controller("StudentConsolidatedController", function ($scope, $http, $localStorage, $window, $state, AppSettings, StudentResultService, PreExaminationService , Excel, $timeout) {


        const $ctrl = this;
        $ctrl.$onInit = () => {
            //$state.reload();
            $scope.SessionCaptcha = sessionStorage.getItem('SessionCaptcha')
            $scope.GetCaptchaData()
        }
        // get month and year of examination
        $scope.MonthAndYear = [
            { "Id": 1, "ExamYearMonth": "Oct - Nov 2018" },
            { "Id": 2, "ExamYearMonth": "Mar - Apr 2019" },
            { "Id": 3, "ExamYearMonth": "June 2019" },
            { "Id": 4, "ExamYearMonth": "Nov - Dec 2019" }
        ]

        $scope.ChangeScheme = function () {
            console.log($scope.scheme.schemeid);
        }


        $scope.GetCaptchaData = function () {
            var captcha = PreExaminationService.GetCaptchaString($scope.SessionCaptcha);
            captcha.then(function (response) {
                try {
                    var res = JSON.parse(response);
                    $scope.GetCatcha = res[0].Text;
                    $scope.CaptchaImage = res[0].Image;

                } catch (err) {
                    $scope.GetCatcha = ''
                }
            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }

        //get schemes data for dropdown
        var SCHEMESEMINFO = StudentResultService.GetSchemeDataForResults();
        $scope.seminfo = [];
        $scope.examtypeinfo = [];
        $scope.pin = "";
        $scope.showData = 0;
        SCHEMESEMINFO.then(function (data) {
            if (data.length > 0) {

                $scope.schemeinfo = data;

            }
        }, function (error) {
            alert("unable to load Schemes");
        });
        // dropdown for sem exams
        $scope.loadSemExamTypes = function (SchemeId) {
            $scope.seminfo = [];
            $scope.examtypeinfo = [];
            $scope.pin = "";
            if ((SchemeId == undefined) || (SchemeId == "0") || (SchemeId == "")) {

                return false;
            }
            $scope.showData = 0;
            var SemExamInfo = StudentResultService.GetExamTypeForResults(SchemeId);
            SemExamInfo.then(function (data) {

                if (data.Table.length > 0) {

                    // $scope.schemeinfo = data[0].schemeInfo;
                    //$scope.seminfo = data[0].semInfo;
                    $scope.seminfo = data.Table;
                    // $scope.examtypeinfo = data.Table1;
                    // $scope.branchinfo = data[0].branchInfo;
                }

            }, function (error) {
                alert("unable to load semester");
            });
        }

        $scope.loadExamTypes = function (sem) {
            $scope.examtypeinfo = [];
            $scope.pin = "";
            if (($scope.scheme === undefined) || ($scope.scheme === "0") || ($scope.scheme === "")) {

                return false;
            }
            if (($scope.sem === undefined) || ($scope.sem === "0") || ($scope.sem === "")) {

                return false;
            }




            $scope.showData = 0;



            // Branch Information
            var SemExamInfo = StudentResultService.GetExamTypeForResults($scope.scheme);
            SemExamInfo.then(function (data) {
                if (data.Table.length > 0) {
                    $scope.examtypeinfo = data.Table1;

                }

            }, function (error) {
                alert("cannot load exam Type");
            });
        }


        $scope.hidePreviousResult = function () {
            $scope.ResultFound = false;
            $scope.showData = 0;
        },


        $scope.createCaptcha = function () {
            $scope.newCapchaCode = "";
            document.getElementById('captcha').innerHTML = "";
            var charsArray =
                "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
            var lengthOtp = 6;
            var captcha = [];
            for (var i = 0; i < lengthOtp; i++) {
                //below code will not allow Repetition of Characters
                var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
                if (captcha.indexOf(charsArray[index]) == -1)
                    captcha.push(charsArray[index]);
                else i--;
            }
            var canv = document.createElement("canvas");
            canv.id = "captcha";
            canv.width = 150;
            canv.height = 40;
            var ctx = canv.getContext("2d");
            ctx.font = "25px Georgia";
            ctx.strokeText(captcha.join(""), 0, 30);
            //storing captcha so that can validate you can save it somewhere else according to your specific requirements
            $scope.newCapchaCode = captcha.join("");
            document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
        }



        $window.validateRecaptcha = $scope.validateRecaptcha;


        $scope.keyLogin = function ($event) {
            if ($event.keyCode == 13) {
                $scope.Submit();
            }
        }

        $scope.ValidateCaptchaText = function (PinNumber, StudtypeId) {


            if ($scope.CaptchaText == undefined || $scope.CaptchaText == "") {
                $scope.CaptchaText = "";
                alert("Enter Captcha");
                $scope.loginbutton = false;
                return;
            };

            var captcha = PreExaminationService.ValidateCaptchaText($scope.SessionCaptcha, $scope.CaptchaText, $scope.Pin);
            captcha.then(function (res) {
                var response = JSON.parse(res)
                //var Data = JSON.parse(response[0])
                //var response = Data;
                if (response[0].ResponceCode == '200') {
                    //alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                    $scope.LoadImg = false;
                    $scope.DetailsNotFound = false;
                    $scope.DetailsFound = true;
                    $scope.Submit()
                    //  var resp = Data;


                } else {
                    alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)

                    $scope.CaptchaImage = captcha[0].Image;
                    $scope.Login.CaptchaText = "";
                    $scope.loginbutton = false;

                }

            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }


        $scope.Submit = function () {
            if ($scope.scheme == "" || $scope.scheme == undefined || $scope.scheme == null) {
                alert("select Scheme.");
                return;
            }

            if ($scope.Pin == "" || $scope.Pin == undefined || $scope.Pin == null) {
                alert("Enter Pin");
                return;
            }
            //if ($scope.ConCaptcha == undefined || $scope.ConCaptcha == "") {
            //    alert("Enter Captcha");
            //    return;
            //};


            //if ($scope.ConCaptcha == $scope.newCapchaCode) {
            //    // alert("Valid Captcha");
            //} else {
            //    alert("Invalid Captcha. try Again");
            //    $scope.ConCaptcha = "";
            //    $scope.createCaptcha();
            //    return;
            //}


            $scope.showData = 0
            $scope.LoadImg = true;
            $scope.ResultNotFound = false;
            $scope.ResultFound = false;

            $scope.ResultFound = false;
            $scope.LoadImg = true;
            if ($scope.scheme.schemeid == 8) {
                var resultdata = StudentResultService.GetC09ConsolidatedResult($scope.Pin);
                resultdata.then(function (data) {
                    $scope.ConCaptcha = "";
                    $scope.createCaptcha();
                    $scope.co9Data = true;
                    var data = JSON.parse(data)
                    data.Table3 = data.Table3;
                    if (data.Table.length > 0) {
                        if (data.Table[0].ResponceCode == '400') {
                            $scope.co9Data = false;
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.LoadImg = false;
                        }
                        if (data.Table3.length > 0) {
                            data.Table3.forEach(function (item, i) {
                                if (item.SemId == "9") {
                                    data.Table3.splice(i, 1);
                                    data.Table3.unshift(item);
                                }
                            });

                        }

                        if (data.Table2.length > 0) {
                            $scope.showData = 1;
                            $scope.LoadImg = false;
                            $scope.ResultFound = true;
                            $scope.ResultNotFound = false;
                            $scope.studentInfo = data.Table1[0];
                            var resultData = [];
                            resultData = data.Table2;
                            $scope.TotalData = data.Table1[0];

                            $scope.totalearnedCourseCredits = data.Table1[0].CgpaTotalGained;
                            $scope.CreditsGained = parseFloat(data.Table1[0].CreditsGained) + 2.5 * data.Table3.length;
                            $scope.CgpaTotalCredits = parseFloat(data.Table1[0].CgpaTotalCredits) + 2.5 * data.Table3.length;
                            $scope.newresultDisplayInfo1 = [];

                            var SemesterList = [];

                            for (var i = 0; i < data.Table3.length; i++) {
                                if (!SemesterList.includes(data.Table3[i].SemId)) {
                                    SemesterList.push(data.Table3[i].SemId);
                                    var temp = {};
                                    temp.Subjects = [];
                                    var temcount = [];
                                    temp.Sgpainfo = [];
                                    temp.courseinfo = [];
                                    temp.semtotalinfo = [];
                                    temp.Semester = data.Table3[i].Semester;
                                    temp.TotalMarks = data.Table3[i].TotalMarks;
                                    temp.Result = data.Table3[i].Result;

                                    temp.SemId = data.Table3[i].SemId;
                                    var temp1 = {
                                        TotalGradePoints: data.Table3[i].TotalGradePoints,
                                        SGPA: data.Table3[i].SGPA,
                                        Credits: data.Table3[i].Credits
                                    }

                                    temp.Sgpainfo.push(temp1);
                                    var courseTotalGradePoints = 0;
                                    var courseCerditsGained = 2.5;
                                    var courseMaxcerdits = "";
                                    for (var j = 0; j < resultData.length; j++) {
                                        if (resultData[j].SemId == temp.SemId) {
                                            temp.Subjects.push(resultData[j]);
                                            courseTotalGradePoints += parseFloat(resultData[j].TotalGradePoints);
                                            courseCerditsGained += resultData[j].CreditsGained;

                                        }
                                    }
                                    var temp2 = {
                                        courseTotalGradePoints: courseTotalGradePoints,
                                        courseCerditsGained: courseCerditsGained,
                                        courseMaxCerdits: data.Table3[i].Credits + 2.5,
                                    }
                                    temp.courseinfo.push(temp2);

                                    //if (!temcount.includes(temp.SemId)) {
                                    //    temcount.push(temp.SemId);
                                    //    var tempobj = {
                                    //        Subject_Code: "",
                                    //        SubjectName: "Rubrics",
                                    //        MaxCredits: "2.5",
                                    //        Mid1Marks: "-",
                                    //        Mid2Marks: "-",
                                    //        InternalMarks: "-",
                                    //        EndExamMarks: "-",
                                    //        SubjectTotal: "-",
                                    //        HybridGrade: "-",
                                    //        GradePoint: "-",
                                    //        CreditsGained: "2.5",
                                    //        TotalGradePoints: "-",
                                    //        WholeOrSupply: "W",
                                    //        ExamMonthYear: "",
                                    //        ExamStatus: "P"
                                    //    };


                                    //    temp.Subjects.push(tempobj);
                                    //}
                                    $scope.newresultDisplayInfo1.push(temp);
                                }
                            }

                        }
                        else {
                            $scope.co9Data = false;
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.LoadImg = false;
                        }
                    }
                    else {
                        $scope.co9Data = false;
                        $scope.ResultFound = false;
                        $scope.ResultNotFound = true;
                        $scope.LoadImg = false;
                    }
                }, function (error) {
                    $scope.co9Data = false;
                    $scope.ResultFound = false;
                    $scope.ResultNotFound = true;
                    $scope.LoadImg = false;


                });
            } else if ($scope.scheme.schemeid == 1 || $scope.scheme.schemeid == 3 || $scope.scheme.schemeid == 4 || $scope.scheme.schemeid == 2 || $scope.scheme.schemeid == 6 || $scope.scheme.schemeid == 7) {
                if ($scope.scheme.schemeid == 1) {
                    var resultdata = StudentResultService.GetC14ConsolidatedResult($scope.Pin);
                } else if ($scope.scheme.schemeid == 3) {
                    var resultdata = StudentResultService.GetC16ConsolidatedResult($scope.Pin);
                } else if ($scope.scheme.schemeid == 4) {
                    var resultdata = StudentResultService.GetC16SConsolidatedResult($scope.Pin);
                } else if ($scope.scheme.schemeid == 2 || $scope.scheme.schemeid == 10) {
                    var resultdata = StudentResultService.GetER91ConsolidatedResult($scope.Pin);
                } else if ($scope.scheme.schemeid == 6) {
                    var resultdata = StudentResultService.GetC05ConsolidatedResult($scope.Pin);
                } else if ($scope.scheme.schemeid == 7) {
                    var resultdata = StudentResultService.GetC08ConsolidatedResult($scope.Pin);
                }

                resultdata.then(function (data) {
                    $scope.co9Data = true;
                    var data = JSON.parse(data)
                    $scope.ConCaptcha = "";
                    $scope.createCaptcha();
                    if (data.Table.length > 0) {
                        if (data.Table[0].ResponceCode == '400') {
                            $scope.co9Data = false;
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.LoadImg = false;
                        }
                        if (data.Table3.length > 0) {
                            data.Table3.forEach(function (item, i) {
                                if (item.SemId == "9") {
                                    data.Table3.splice(i, 1);
                                    data.Table3.unshift(item);
                                }
                            });

                        }

                        if (data.Table2.length > 0) {
                            $scope.showData = 1;
                            $scope.LoadImg = false;
                            $scope.ResultFound = true;
                            $scope.ResultNotFound = false;
                            $scope.studentInfo = data.Table1[0];
                            var resultData = [];
                            resultData = data.Table2;
                            $scope.TotalData = data.Table1[0];

                            $scope.totalearnedCourseCredits = data.Table1[0].CgpaTotalGained;
                            $scope.CreditsGained = parseFloat(data.Table1[0].CreditsGained) + 2.5 * data.Table3.length;
                            $scope.CgpaTotalCredits = parseFloat(data.Table1[0].CgpaTotalCredits) + 2.5 * data.Table3.length;
                            $scope.newresultDisplayInfo1 = [];

                            var SemesterList = [];

                            for (var i = 0; i < data.Table3.length; i++) {
                                if (!SemesterList.includes(data.Table3[i].SemId)) {
                                    SemesterList.push(data.Table3[i].SemId);
                                    var temp = {};
                                    temp.Subjects = [];
                                    var temcount = [];
                                    temp.Sgpainfo = [];
                                    temp.courseinfo = [];
                                    temp.semtotalinfo = [];
                                    temp.Semester = data.Table3[i].Semester;
                                    temp.TotalMarks = data.Table3[i].TotalMarks;
                                    temp.Result = data.Table3[i].Result;

                                    temp.SemId = data.Table3[i].SemId;
                                    var temp1 = {
                                        TotalGradePoints: data.Table3[i].TotalGradePoints,
                                        SGPA: data.Table3[i].SGPA,
                                        Credits: data.Table3[i].Credits
                                    }

                                    temp.Sgpainfo.push(temp1);
                                    var courseTotalGradePoints = 0;
                                    var courseCerditsGained = 2.5;
                                    var courseMaxcerdits = "";
                                    for (var j = 0; j < resultData.length; j++) {
                                        if (resultData[j].SemId == temp.SemId) {
                                            temp.Subjects.push(resultData[j]);
                                            courseTotalGradePoints += parseFloat(resultData[j].TotalGradePoints);
                                            courseCerditsGained += resultData[j].CreditsGained;

                                        }
                                    }
                                    var temp2 = {
                                        courseTotalGradePoints: courseTotalGradePoints,
                                        courseCerditsGained: courseCerditsGained,
                                        courseMaxCerdits: data.Table3[i].Credits + 2.5
                                    }
                                    temp.courseinfo.push(temp2);

                                    $scope.newresultDisplayInfo1.push(temp);
                                }
                            }

                        }
                        else {
                            $scope.co9Data = false;
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.LoadImg = false;
                        }
                    }
                    else {
                        $scope.co9Data = false;
                        $scope.ResultFound = false;
                        $scope.ResultNotFound = true;
                        $scope.LoadImg = false;
                    }

                }, function (error) {
                    $scope.co9Data = false;
                    $scope.ResultFound = false;
                    $scope.ResultNotFound = true;
                    $scope.LoadImg = false;

                });
            } else {
                var resultdata = StudentResultService.GetConsolidatedResult($scope.Pin);
                resultdata.then(function (data) {
                    $scope.co9Data = false;
                    var data = JSON.parse(data)
                    $scope.ConCaptcha = "";
                    $scope.createCaptcha();
                    if (data.Table.length > 0) {
                        if (data.Table2.length > 0) {
                            $scope.showData = 1;
                            $scope.LoadImg = false;
                            $scope.ResultFound = true;
                            $scope.ResultNotFound = false;
                            $scope.studentInfo = data.Table[0];
                            var resultData = [];
                            resultData = data.Table2;
                            $scope.TotalData = data.Table1[0];

                            $scope.totalearnedCourseCredits = data.Table1[0].CgpaTotalGained;
                            $scope.CreditsGained = parseFloat(data.Table1[0].CreditsGained) + 2.5 * data.Table3.length;
                            $scope.CgpaTotalCredits = parseFloat(data.Table1[0].CgpaTotalCredits) + 2.5 * data.Table3.length;

                            $scope.newresultDisplayInfo = [];

                            var SemesterList = [];
                            var sems = []
                            for (var i = 0; i < data.Table3.length; i++) {


                                if (!SemesterList.includes(data.Table3[i].SemId)) {
                                    SemesterList.push(data.Table3[i].SemId);
                                    var temp = {};
                                    temp.Subjects = [];
                                    var temcount = [];
                                    temp.Sgpainfo = [];
                                    temp.courseinfo = [];
                                    temp.semtotalinfo = [];
                                    temp.Semester = data.Table3[i].Semester;

                                    temp.SemId = data.Table3[i].SemId;
                                    var temp1 = {
                                        TotalGradePoints: data.Table3[i].TotalGradePoints,
                                        SGPA: data.Table3[i].SGPA,
                                        Credits: data.Table3[i].Credits
                                    }

                                    temp.Sgpainfo.push(temp1);
                                    var courseTotalGradePoints = 0;
                                    if (temp.SemId == 6) {
                                        var courseCerditsGained = 0;
                                    } else {
                                        var courseCerditsGained = 2.5;
                                    }

                                    var courseMaxcerdits = "";
                                    for (var j = 0; j < resultData.length; j++) {
                                        if (resultData[j].SemId == temp.SemId) {
                                            temp.Subjects.push(resultData[j]);
                                            courseTotalGradePoints += parseFloat(resultData[j].TotalGradePoints);
                                            courseCerditsGained += resultData[j].CreditsGained;

                                        }

                                    }

                                    if (temp.SemId == 6) {
                                        var temp2 = {
                                            courseTotalGradePoints: courseTotalGradePoints,
                                            courseCerditsGained: courseCerditsGained,
                                            courseMaxCerdits: data.Table3[i].Credits,
                                        }

                                    } else {
                                        var temp2 = {
                                            courseTotalGradePoints: courseTotalGradePoints,
                                            courseCerditsGained: courseCerditsGained,
                                            courseMaxCerdits: data.Table3[i].Credits + 2.5,
                                        }

                                    }

                                    sems.push(temp2);
                                    temp.courseinfo.push(temp2);

                                    if (!temcount.includes(temp.SemId)) {
                                        if (temp.SemId != '6') {
                                            temcount.push(temp.SemId);
                                            var tempobj = {
                                                Subject_Code: "",
                                                SubjectName: "Rubrics",
                                                MaxCredits: "2.5",
                                                Mid1Marks: "-",
                                                Mid2Marks: "-",
                                                InternalMarks: "-",
                                                EndExamMarks: "-",
                                                SubjectTotal: "-",
                                                HybridGrade: "-",
                                                GradePoint: "-",
                                                CreditsGained: "2.5",
                                                TotalGradePoints: "-",
                                                WholeOrSupply: "W",
                                                ExamMonthYear: "",
                                                ExamStatus: "P"
                                            };


                                            temp.Subjects.push(tempobj);
                                        }
                                    }
                                    $scope.newresultDisplayInfo.push(temp);
                                }
                            }

                            var courseTotalGradePoints = 0
                            var courseCerditsGained = 0
                            var courseMaxCerdits = 0
                            for (var j = 0; j < sems.length; j++) {
                                courseTotalGradePoints += parseFloat(sems[j].courseTotalGradePoints);
                                courseCerditsGained += sems[j].courseCerditsGained;
                                courseMaxCerdits += sems[j].courseMaxCerdits;
                                $scope.courseTotalGradePoints = courseTotalGradePoints
                                $scope.courseCerditsGained = courseCerditsGained
                                $scope.courseMaxCerdits = courseMaxCerdits

                            }

                        }
                        else {
                            $scope.co9Data = false;
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.LoadImg = false;
                        }
                    }
                    else {
                        $scope.co9Data = false;
                        $scope.ResultFound = false;
                        $scope.ResultNotFound = true;
                        $scope.LoadImg = false;
                    }
                }, function (error) {
                    $scope.co9Data = false;
                    $scope.ResultFound = false;
                    $scope.ResultNotFound = true;
                    $scope.LoadImg = false;

                });
            }

        }

        $scope.DownloadPdfResult = function (tableid) {
            // alert(tableid + ":" + AppSettings.ExportToPdfUrl);
            //alert("pdf : " + tableid);
            html2canvas($('#idtoDivPrintAdmin'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 500
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("Table.pdf");
                }
            });
        }

        $scope.DownloadExcelResult = function (tableId) {
            var exportHref = Excel.tableToExcel(tableId, 'StudentResult');
            $timeout(function () { location.href = exportHref; }, 100);
        }

        $scope.PrintStudentResult = function () {

        //    var divName = "idtoDivPrintAdmin";
        //    var divToPrint = document.getElementById(divName);
        //    var temp = document.body.innerHTML;
        ////    $("#studentresult1").hide();
        //    var domClone = divToPrint.cloneNode(true);
        //    var $printSection = document.getElementById("idtoDivPrintAdmin");
        //    //document.body.innerHTML = "";
        //    if (!$printSection) {
        //        var $printSection = document.createElement("div");
        //        $printSection.id = "idtoDivPrintAdmin";
        //        document.body.appendChild($printSection);
        //    }
        //    $printSection.innerHTML = "";
        //    $printSection.appendChild(domClone);
            // alert($printSection.innerHTML);
            document.title = "CONSOLIDATED_MEMORANDUM_MARKS_" + $scope.Pin;

            window.print();
            //document.body.removeChild($printSection);
            //$("#studentresult1").show();
        };


        $scope.PrintDashBoard = function () {
            var divName = "";
            if ($scope.adminuser == true) {
                divName = "idtoDivPrintAdmin";
            }
            else {
                divName = "DivIdToPrint";
            }

            var divToPrint = document.getElementById(divName);

            var newWin = window.open('', 'Print-Window');

            newWin.document.open();


            newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');

            newWin.document.close();

            setTimeout(function () { newWin.close(); }, 10);
        }

        $scope.DownloadPdfResultStudent = function (tableid) {

            // alert(tableid + ":" + AppSettings.ExportToPdfUrl);
            //alert("pdf : " + tableid);
            var height = $('#idtoDivPrintAdmin').height();
            var width = $('#idtoDivPrintAdmin').width();
            $('#idtoDivPrintAdmin').height('auto');
            var scaleBy = 5;
            var w = 1000;
            var h = 1000;
            var div = document.querySelector('#idtoDivPrintAdmin');
            var canvas = document.createElement('canvas');
            canvas.width = window.innerWidth * scaleBy;
            canvas.height = window.innerHeight * scaleBy;

            var context = canvas.getContext('2d');
            context.scale(scaleBy, scaleBy);
            html2canvas(div, {
                canvas: canvas,
                onrendered: function (canvas) {
                    thecanvas = canvas;
                    var data = thecanvas.toDataURL();
                    var docDefinition = {
                        // pageSize: { width: thecanvas.width, height: thecanvas.height },
                        content: [{
                            image: data,
                            width: 500
                        }],
                    };
                    pdfMake.createPdf(docDefinition).download("Table.pdf");
                    $('#idtoDivPrintAdmin').height(height);
                }
            });
        }

        $scope.stboclogin = function () {
            $state.go('login');
        }
    });


    app.factory('Excel', function ($window) {
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

    })
})