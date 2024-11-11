define(['app'], function (app) {
    app.controller("OpenExamFormGenerationController", function ($scope, $localStorage, $state, AppSettings, ExamFormsApprovalService, ExamFormsService, ExamFormsBridgeCourseService, ExamFormsRepeaterService, ExamFormsCorrectionService) {
        $scope.OpenExamForm = {};
        $scope.ExamFormsApprovalList = {};
        //$scope.OpenExamForm.MonthandYear = $filter($scope.OpenExamForm.MonthandYear)(new Date(), 'MM/YYYY');
        //$scope.OpenExamForm.BirthDate = $filter($scope.OpenExamForm.BirthDate)(new Date(), 'DD/MM/YYYY');
        $scope.CourseList = [];
        $scope.ExamList = [];
        $scope.BranchList = [];
        $scope.MediumList = [];
        $scope.CasteList = [];
        $scope.SubCastList = [];
        $scope.MainGroupList = [];
        $scope.OpenExamForm.Gender = "M";
        $scope.OpenExamForm.Handicaped = "N";
        $scope.PhysDisbList = [];
        $scope.spclconslist = [];
        $scope.SubList = [];
        $scope.subjectList = [];
        $scope.SecondLangList = [];
        $scope.SelectedFYSubjects = false;
        $scope.SelectedSYSubjects = false;
        $scope.SelectedFYOSubjects = false;
        $scope.SelectedSYOSubjects = false;
        $scope.HideInfo = true;
        $scope.OpenExamForm.IsAllChecked = false;
        $scope.checkedChkBoxList = [];
        $scope.IsPracticalSelected = false;
        $scope.OpenExamFormsSubject = [];
        $scope.OpenExamForm.OpenExamFormsSubject = [];
        $scope.PacData = [];
        $scope.CollegeChangeRequestList = {};
        $scope.OpenExamForm.RegularFees = 0.00;
        $scope.OpenExamForm.LateFees = 0.00;
        $scope.OpenExamForm.FormFees = 0.00;
        //$scope.OpenExamForm.LastApprearedHallTicketNo = "";  
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].GridFormToOpen == PageNm) {
                var obj = {};
                obj.isaddable = UsersRightsdata[i].isaddable;
                RightForCurrentPage.push(obj);
            }
        }
        var PData = [{ value: 633 }, { value: 634 }, { value: 635 }, { value: 636 }, { value: 637 }, { value: 282 }, { value: 283 }, { value: 284 }, { value: 288 }, { value: 289 }, { value: 290 }, { value: 294 }, { value: 295 }, { value: 296 }, { value: 300 }, { value: 301 }, { value: 302 }, { value: 306 }, { value: 307 }, { value: 308 }, { value: 314 }, { value: 320 }, { value: 326 }, { value: 332 }, { value: 336 }, { value: 337 }, { value: 338 }, { value: 342 }, { value: 343 }, { value: 344 }, { value: 348 }, { value: 349 }, { value: 354 }, { value: 355 }, { value: 360 }, { value: 361 }, { value: 368 }, { value: 372 }, { value: 373 }, { value: 378 }, { value: 379 }, { value: 380 }, { value: 384 }, { value: 385 }, { value: 386 }, { value: 390 }, { value: 391 }, { value: 392 },
        { value: 396 }, { value: 397 }, { value: 398 }, { value: 402 }, { value: 403 }, { value: 404 }, { value: 408 }, { value: 414 }, { value: 415 }, { value: 416 }, { value: 420 }, { value: 421 }, { value: 422 }, { value: 426 }, { value: 427 }, { value: 428 }, { value: 432 }, { value: 433 }, { value: 434 }, { value: 438 }, { value: 439 }, { value: 440 }, { value: 444 }, { value: 445 }, { value: 446 }, { value: 450 }, { value: 451 }, { value: 452 }, { value: 456 }, { value: 457 }, { value: 458 }, { value: 462 }, { value: 463 }, { value: 464 }, { value: 468 }, { value: 469 }, { value: 470 }, { value: 474 }, { value: 475 }, { value: 476 }, { value: 480 }, { value: 481 }, { value: 482 },
        { value: 486 }, { value: 488 }, { value: 492 }, { value: 494 }, { value: 498 }, { value: 500 }, { value: 506 }, { value: 510 }, { value: 511 }, { value: 512 }, { value: 516 }, { value: 517 }, { value: 518 }, { value: 522 }, { value: 523 }, { value: 524 }, { value: 528 }, { value: 529 }, { value: 530 }, { value: 534 }, { value: 535 }, { value: 536 }, { value: 540 }, { value: 541 }, { value: 542 }, { value: 546 }, { value: 547 }, { value: 548 }, { value: 558 }, { value: 559 }, { value: 560 }, { value: 564 }, { value: 565 }, { value: 566 }, { value: 570 }, { value: 571 }, { value: 572 }, { value: 576 }, { value: 577 }, { value: 578 }, { value: 582 }, { value: 583 }, { value: 588 }, { value: 589 },
        { value: 590 }, { value: 594 }, { value: 595 }, { value: 596 }, { value: 600 }, { value: 601 }, { value: 602 }, { value: 606 }, { value: 607 }, { value: 608 }, { value: 612 }, { value: 613 }, { value: 614 }, { value: 618 }, { value: 619 }, { value: 620 }, { value: 624 }, { value: 625 }, { value: 626 }, { value: 629 }, { value: 632 }, { value: 2347 }, { value: 2348 }, { value: 2358 }, { value: 2359 }, { value: 2360 }, { value: 2364 }, { value: 2365 }, { value: 2366 }, { value: 2370 }, { value: 2371 }, { value: 2372 }, { value: 2376 }, { value: 2377 }, { value: 2378 }, { value: 2382 }, { value: 2383 }, { value: 2384 }, { value: 2388 }, { value: 2391 },
        { value: 2395 }, { value: 2401 }, { value: 2402 }, { value: 2403 }, { value: 2407 }, { value: 2410 }, { value: 2416 }, { value: 2420 }, { value: 2421 }, { value: 2422 }, { value: 2426 }, { value: 2427 }, { value: 2428 }, { value: 2432 }, { value: 2433 }, { value: 2434 }, { value: 2438 }, { value: 2439 }, { value: 2440 }, { value: 2444 }, { value: 2445 }, { value: 2446 }, { value: 2450 }, { value: 2451 }, { value: 2452 }, { value: 2458 }, { value: 2459 }, { value: 2460 }, { value: 2464 }, { value: 2465 }, { value: 2466 }, { value: 2470 }, { value: 2471 }, { value: 2472 }, { value: 2476 }, { value: 2477 },
        { value: 2478 }, { value: 2482 }, { value: 2483 }, { value: 2484 }, { value: 2488 }, { value: 2489 }, { value: 2490 }, { value: 2494 }, { value: 2495 }, { value: 2496 }, { value: 2500 }, { value: 2501 }, { value: 2502 }, { value: 2503 }, { value: 2507 }, { value: 2508 }, { value: 2509 }, { value: 2513 }, { value: 2514 }, { value: 2515 }, { value: 2519 }, { value: 2520 }, { value: 2521 }, { value: 2524 }, { value: 2527 }
        ];
        $scope.GetPacData = function () {
            $scope.PacData = PData;
        }
        $scope.Updateddisable = false;        

        $scope.CheckUncheckAll = function () {
            for (var i = 0; i < $scope.subjectList.length; i++) {              
                    $scope.subjectList[i].Selected = $scope.OpenExamForm.IsAllChecked;                    
                }                       
        };
        if (AppSettings.CollegeID != 0) {
            var CourseList = ExamFormsApprovalService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
                $scope.ExamFormsApprovalList.CourseID = "" + $scope.CourseList[0].CourseID + "";
                $scope.NFillCoursePart($scope.ExamFormsApprovalList.CourseID);
            }, function (error) {
                alert(error);
            });
        }
        $scope.AcodamicMonthandYear = function () {           
            $scope.OpenExamForm.MonthandYear = new Date("01/06/2005");         
        };       
        $scope.AcodamicMonthandYear();
        $scope.showWeeks = false;
        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1,
            'datepicker-mode': "'month'",
            'min-mode': "month", 
            format: 'mm-yyyy'
        };
        $scope.showcalendar = function ($event) {            
                $scope.showdp = true;           
        };
        $scope.showdp = false;

        $scope.dobdate = function () {
            $scope.OpenExamForm.BirthDate = new Date();           
        };
        $scope.dobdate();
        $scope.showDOBCal = function ($event) {
            $scope.showDobdp = true;
        };
        $scope.showDobdp = false;
        var MediumList = ExamFormsService.GetBasicMediumList();
        MediumList.then(function (Mediumdata, status, headers, config, error) {
            $scope.MediumList = Mediumdata;
        }, function (error) {
            alert(error);
        });
        var CasteList = ExamFormsRepeaterService.GetCasteList();
        CasteList.then(function (Castedata, status, headers, config, error) {
            $scope.CasteList = Castedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillSubCaste = function (CasteID) {
            $scope.SubCasteDisable = false;
            var SubCastList = ExamFormsRepeaterService.GetSubCastListByCasteID(CasteID);
            SubCastList.then(function (SubCastdata, status, headers, config, error) {
                $scope.SubCastList = SubCastdata;
            }, function (error) {
                alert(error);
            });
        }
        var PhysDisbList = ExamFormsService.GetPhysDisbList();
        PhysDisbList.then(function (PhysDisbListdata, status, headers, config, error) {
            $scope.PhysDisbList = PhysDisbListdata;
        }, function (error) {
            alert(error);
        });
        var SpclConsList = ExamFormsService.GetSpclConsList();
        SpclConsList.then(function (SpclConsListdata, status, headers, config, error) {
            $scope.SpclConsList = SpclConsListdata;
        }, function (error) {
            alert(error);
        });

        var MainGroupList = ExamFormsRepeaterService.GetMainGroupListByCollegeId(AppSettings.CollegeID, $scope.ExamFormsApprovalList.CourseID, AppSettings.AcdYrID);
        MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
            $scope.MainGroupList = MainGroupListdata;
        }, function (BasicBranchdata, status, headers, config) {
            alert(error);
        });
        var SecondLangList = ExamFormsCorrectionService.GetBasicSubjectListForSecondLangauge();
        SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
            $scope.SecondLangList = SecondLangdata;
        }, function (SecondLangdata, status, headers, config) {
            alert(error);
        });
        $scope.uploadPhoto = function (files) {
            var fd = new FormData();
            fd.append("file", files[0]);
            var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegPhoto/?PreStudRegID=" + $scope.OpenExamForm.PreStudRegID + "&SSCHallTicket=" + $scope.OpenExamForm.PreStudRegID + "&UpdLoginID=" + AppSettings.LoggedUserId;
            $http.post(url, fd, {
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            }).then(function (data) {
                alert("Uploaded Photo Successfully");
            })
                .catch(function (data, status, headers, config) {
                    alert(data);
                    $scope.file = "";
                });
        };
        $scope.uploadSign = function (files) {
            var fd = new FormData();
            fd.append("file", files[0]);
            var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegSign/?PreStudRegID=" + $scope.OpenExamForm.PreStudRegID + "&SSCHallTicket=" + $scope.OpenExamForm.PreStudRegID + "&UpdLoginID=" + AppSettings.LoggedUserId;
            $http.post(url, fd, {
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            }).then(function (data) {
                alert("Uploaded Photo Successfully");
            })
                .catch(function (data, status, headers, config) {
                    alert(data);
                    $scope.file = "";
                });
        }; 
        //$scope.GetOpenExamFormValue = function () {
        //    $scope.PreStudRegID = $scope.OpenExamForm.PreStudRegID;
        //}
        $scope.GetValue = function () {
            $scope.GetPacData();   
            //$scope.GetOpenExamFormValue();
            $scope.checkedChkBoxList = [];
                $scope.OpenExamForm.RegularFees = 0;
                $scope.OpenExamForm.LateFees = 0;
                $scope.OpenExamForm.FormFees = $scope.OpenExamForm.RegularFees + $scope.OpenExamForm.LateFees;               
            for (var i = 0; i < $scope.subjectList.length; i++) {
                if ($scope.subjectList[i].selected == true) {
                    $scope.checkedChkBoxList.push($scope.subjectList[i]);
                    $scope.CalculateFee();
                    //$scope.OpenExamForm = {};
                }               
            }
           
        }
        $scope.GetGroupSubjects = function (MainGrpID) {
            if (MainGrpID != null) {
                if ($scope.ExamFormsApprovalList.ExamID != undefined) {
                    var SubList = ExamFormsRepeaterService.GetGroupSubjects(MainGrpID, $scope.ExamFormsApprovalList.ExamID);
                    SubList.then(function (subdata, status, headers, config, error) {
                        $scope.SubList = subdata;
                        $scope.subjectList = subdata;                        
                    }, function (BasicBranchdata, status, headers, config) {
                        alert(error);
                    });
                }
            }
        }
        $scope.CalculateFee = function () {            
            $scope.isupdatableDisable = false;
            var ExamListdata = ExamFormsService.GetExamFormsByIdForOpenExamForm($scope.ExamFormsApprovalList.CourseID, $scope.ExamFormsApprovalList.ExamID, AppSettings.ExamInstID);
            ExamListdata.then(function (data, status, headers, config, error) {
                //$scope.OpenExamFormsSubject = data[0];
                if ($scope.ExamFormsApprovalList.ExamID != undefined && $scope.ExamFormsApprovalList.CourseID != undefined && $scope.checkedChkBoxList != undefined) {
                    if ($scope.OpenExamForm.IsAllChecked != true) {
                        if ($scope.checkedChkBoxList.length > 0) {                            
                            $scope.SelectedFYSubjects = false;
                            $scope.SelectedSYSubjects = false;
                            $scope.SelectedFYOSubjects = false;
                            $scope.SelectedSYOSubjects = false;
                            for (var i = 0; i < $scope.checkedChkBoxList.length; i++) {
                                $scope.IsPracticalSelected = false;
                                if ($scope.checkedChkBoxList[i].selected == true) {
                                    if ($scope.checkedChkBoxList[i].ExamID == 1) {
                                        $scope.SelectedFYSubjects = true;
                                    }
                                    if ($scope.checkedChkBoxList[i].ExamID == 2) {
                                        $scope.SelectedSYSubjects = true;
                                    }
                                    if ($scope.checkedChkBoxList[i].ExamID == 3) {
                                        $scope.SelectedFYOSubjects = true;
                                    }
                                    if ($scope.checkedChkBoxList[i].ExamID == 4) {
                                        $scope.SelectedSYOSubjects = true;
                                    }

                                }
                                for (var k = 0; k < $scope.PacData.length; k++) {
                                    if ($scope.checkedChkBoxList[i].ExmSubID == $scope.PacData[k].value) {
                                        $scope.IsPracticalSelected = true;
                                    }
                                }
                            }
                            if ($scope.IsPracticalSelected == true && $scope.SelectedSYSubjects == true && $scope.SelectedFYSubjects == true) {
                                $scope.OpenExamForm.RegularFees = data[1].ExamFeesAmount + data[0].ExamFeesAmount;
                                $scope.OpenExamForm.LateFees = data[1].LateAmount2;
                                $scope.OpenExamForm.FormFees = $scope.OpenExamForm.RegularFees + $scope.OpenExamForm.LateFees;
                            }
                            else if ($scope.IsPracticalSelected == true && $scope.SelectedSYSubjects == true && $scope.SelectedFYSubjects == false) {
                                $scope.OpenExamForm.RegularFees = data[1].ExamFeesAmount;
                                $scope.OpenExamForm.LateFees = data[1].LateAmount2;
                                $scope.OpenExamForm.FormFees = $scope.OpenExamForm.RegularFees + $scope.OpenExamForm.LateFees;
                            }
                            else if ($scope.IsPracticalSelected == false && $scope.SelectedSYSubjects == true && $scope.SelectedFYSubjects == true) {
                                $scope.OpenExamForm.RegularFees = data[0].ExamFeesAmount + data[0].ExamFeesAmount;
                                $scope.OpenExamForm.LateFees = data[1].LateAmount2;
                                $scope.OpenExamForm.FormFees = $scope.OpenExamForm.RegularFees + $scope.OpenExamForm.LateFees;
                            }
                            else if ($scope.IsPracticalSelected == true && $scope.SelectedSYSubjects == false && $scope.SelectedFYSubjects == true) {
                                $scope.OpenExamForm.RegularFees = data[1].ExamFeesAmount;// + data[0].ExamFeesAmount;
                                $scope.OpenExamForm.LateFees = data[1].LateAmount2;
                                $scope.OpenExamForm.FormFees = $scope.OpenExamForm.RegularFees + $scope.OpenExamForm.LateFees;
                            }
                            else if ($scope.IsPracticalSelected == true && $scope.SelectedSYOSubjects == true && $scope.SelectedFYOSubjects == true) {
                                $scope.OpenExamForm.RegularFees = data[1].ExamFeesAmount + data[1].ExamFeesAmount;
                                $scope.OpenExamForm.LateFees = data[1].LateAmount2;
                                $scope.OpenExamForm.FormFees = $scope.OpenExamForm.RegularFees + $scope.OpenExamForm.LateFees;
                            }
                            else if ($scope.IsPracticalSelected == true && $scope.SelectedSYOSubjects == true && $scope.SelectedFYOSubjects == false) {
                                $scope.OpenExamForm.RegularFees = data[1].ExamFeesAmount;
                                $scope.OpenExamForm.LateFees = data[1].LateAmount2;
                                $scope.OpenExamForm.FormFees = $scope.OpenExamForm.RegularFees + $scope.OpenExamForm.LateFees;
                            }
                            else if ($scope.IsPracticalSelected == false && $scope.SelectedSYOSubjects == true && $scope.SelectedFYOSubjects == true) {
                                $scope.OpenExamForm.RegularFees = data[0].ExamFeesAmount + data[0].ExamFeesAmount;
                                $scope.OpenExamForm.LateFees = data[1].LateAmount2;
                                $scope.OpenExamForm.FormFees = $scope.OpenExamForm.RegularFees + $scope.OpenExamForm.LateFees;
                            }
                            else if ($scope.IsPracticalSelected == true && $scope.SelectedSYOSubjects == false && $scope.SelectedFYOSubjects == true) {
                                $scope.OpenExamForm.RegularFees = data[1].ExamFeesAmount;
                                $scope.OpenExamForm.LateFees = data[1].LateAmount2;
                                $scope.OpenExamForm.FormFees = $scope.OpenExamForm.RegularFees + $scope.OpenExamForm.LateFees;
                            }
                            else {
                                $scope.OpenExamForm.RegularFees = data[0].ExamFeesAmount;
                                $scope.OpenExamForm.LateFees = data[0].LateAmount2;
                                $scope.OpenExamForm.FormFees = $scope.OpenExamForm.RegularFees + $scope.OpenExamForm.LateFees;
                            }

                        }
                    }
                    else {
                        if ($scope.ExamFormsApprovalList.ExamID == 1) {
                            $scope.OpenExamForm.RegularFees = data[0].ExamFeesAmount;
                            $scope.OpenExamForm.LateFees = data[0].LateAmount2;
                            $scope.OpenExamForm.FormFees = $scope.OpenExamForm.RegularFees + $scope.OpenExamForm.LateFees;
                        }
                        else if ($scope.ExamFormsApprovalList.ExamID == 2) {
                            $scope.OpenExamForm.RegularFees = data[1].ExamFeesAmount;
                            $scope.OpenExamForm.LateFees = data[1].LateAmount2;
                            $scope.OpenExamForm.FormFees = $scope.OpenExamForm.RegularFees + $scope.OpenExamForm.LateFees;
                        }
                        else if ($scope.ExamFormsApprovalList.ExamID == 3) {
                            $scope.OpenExamForm.RegularFees = data[1].ExamFeesAmount;
                            $scope.OpenExamForm.LateFees = data[1].LateAmount2;
                            $scope.OpenExamForm.FormFees = $scope.OpenExamForm.RegularFees + $scope.OpenExamForm.LateFees;
                        }
                       else if ($scope.ExamFormsApprovalList.ExamID == 4) {
                            $scope.OpenExamForm.RegularFees = data[1].ExamFeesAmount;
                            $scope.OpenExamForm.LateFees = data[1].LateAmount2;
                            $scope.OpenExamForm.FormFees = $scope.OpenExamForm.RegularFees + $scope.OpenExamForm.LateFees;
                        }
                       else {
                                $scope.OpenExamForm.RegularFees = 0;
                                $scope.OpenExamForm.LateFees = 0;
                                $scope.OpenExamForm.FormFees = $scope.OpenExamForm.RegularFees + $scope.OpenExamForm.LateFees;
                            }                        
                    }

                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            if ((CourseID != "") && (CourseID != null)) {
                var ExamList = ExamFormsApprovalService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamDisable = false;
                    $scope.ExamList = BasicExamdata;
                }, function (error) {
                    alert(error);
                });
            }
        }

        $scope.NFillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            if ((CourseID != "") && (CourseID != null)) {
                if (CourseID != 0) {
                    var ExamList = ExamFormsApprovalService.GetBasicExamList($scope.ExamFormsApprovalList.CourseID, AppSettings.AcdYrID);
                    ExamList.then(function (BasicExamdata, status, headers, config, error) {
                        $scope.ExamDisable = false;
                        $scope.ExamList = BasicExamdata;
                        var BranchList = ExamFormsBridgeCourseService.GetBasicBranchListByCourseID($scope.ExamFormsApprovalList.CourseID);
                        BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                            $scope.BranchList = BasicBranchdata;
                        }, function (error) {
                            alert(error);
                        });

                        var GroupList = ExamFormsApprovalService.GetBasicGroupList($scope.ExamFormsApprovalList.CourseID, AppSettings.AcdYrID);
                        GroupList.then(function (BasicGrpdata, status, headers, config, error) {
                            $scope.GrpDisable = false;
                            $scope.MainGroupList = BasicGrpdata;
                        }, function (error) {
                            alert(error);
                        });
                    }, function (error) {
                        alert(error);
                    });
                }
            }
        }
        $scope.SaveExamForms = function () {
            if (CheckValidation() == true) {
                $scope.isupdatableDisable = true;

                if ($("#ApplicationDate").val() != "") { $scope.OpenExamForm.ApplicationDate = $("#ApplicationDate").val(); }
                $scope.OpenExamForm.CreLoginID = AppSettings.LoggedUserId;
                $scope.OpenExamForm.UpdLoginID = AppSettings.LoggedUserId;
                $scope.OpenExamForm.AcdYrID = AppSettings.AcdYrID;
                $scope.OpenExamForm.CollegeID = AppSettings.CollegeID;
                $scope.OpenExamForm.ExamInstID = AppSettings.ExamInstID;
                for (var i = 0; i < $scope.checkedChkBoxList.length; i++) {
                    var obj = {};
                    obj.ExmSubID = $scope.checkedChkBoxList[i].ExmSubID;
                    obj.ExmSubName = $scope.checkedChkBoxList[i].ExmSubName;
                    $scope.OpenExamFormsSubject.push(obj);
                }   
                $scope.OpenExamForm.AdmDate = $scope.OpenExamForm.MonthandYear;
                $scope.OpenExamForm.CommunityID = $scope.CasteList.CasteID
                $scope.OpenExamForm.SubCastID = $scope.SubCastList.SubCastID
                $scope.OpenExamForm.MediumID = $scope.MediumList.MediumID;                
                $scope.OpenExamForm.SecondLangID = $scope.SecondLangList.SecondLangID;
                //$scope.OpenExamForm.ExamID = $scope.ExamFormsApprovalList.ExamID
                $scope.OpenExamForm.MainGrpID = $scope.ExamFormsRepeater.MainGrpID;
                $scope.OpenExamForm.ExamID = $scope.ExamFormsApprovalList.ExamID;
                $scope.OpenExamForm.CourseID = $scope.ExamFormsApprovalList.CourseID;
                $scope.OpenExamForm.PhysDisbID = $scope.PhysDisbList.PhysDisbID;
                $scope.OpenExamForm.SpclConsID = $scope.SpclConsList.SpclConsID;
                $scope.OpenExamForm.ExmFeesFlag = " ";
                $scope.OpenExamForm.RecgFeesFlag = " ";
                $scope.OpenExamForm.Classwithdrawal = "N";                
                $scope.OpenExamForm.Eligible = "N"; 
                $scope.OpenExamForm.ScholarshipFlag = "N";   
                
                    $scope.OpenExamForm.OpenExamFormsSubject = $scope.OpenExamFormsSubject;
                  
                if (($scope.OpenExamForm.ExmFrmID == undefined) || ($scope.OpenExamForm.ExmFrmID == "")) { $scope.OpenExamForm.ExmFrmID = 0; }
                if ($scope.OpenExamForm.ExmFrmID == 0) {
                    var getPromise = ExamFormsService.GetCheckPRNNoPresent($scope.OpenExamForm.PreStudRegID, AppSettings.ExamInstID);
                    getPromise.then(function (data) {
                        if (data != 0) {
                            alert("Exam form is already generated agains this PRNNo.");
                            $scope.isupdatableDisable = false;
                            return;
                        } else {
                            var getPromise = ExamFormsService.AddOpenExamForms($scope.OpenExamForm);
                            getPromise.then(function (msg) {
                                $scope.isupdatableDisable = false;
                                alert("Saved successfully!!");
                                $scope.OpenExamForm = {};
                                //$scope.ExamFormsRepeater.MainGrpID = "";
                                //$scope.OpenExamForm.RegularFees = "";
                                //$scope.OpenExamForm.LateFees = 0.00;
                                //$scope.OpenExamForm.FormFees = 0.00;
                                //$scope.CourseList = [];
                                //$scope.ExamList = [];
                                //$scope.BranchList = [];
                                //$scope.MediumList = [];
                                //$scope.SecondLangList = [];
                                //$scope.CasteList = [];
                                //$scope.SubCastList = [];
                                //$scope.MainGroupList = [];
                                $scope.OpenExamForm.Gender = "M";
                                $scope.OpenExamForm.Handicaped = "N";
                                $scope.OpenExamForm.Year = "All";
                                //$scope.PhysDisbList = [];
                                //$scope.spclconslist = [];
                                $scope.SubList = [];
                            }, function (error) {
                                $scope.isupdatableDisable = false;
                                alert(error);
                            });
                        }
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    var getPromise = ExamFormsService.UpdateOpenExamForms($scope.OpenExamForm);
                    getPromise.then(function (msg) {
                        $scope.isupdatableDisable = false;
                        alert("Updated successfully!!");
                        $scope.OpenExamForm = {};
                        //$scope.ExamFormsRepeater.MainGrpID = "";
                        //$scope.CourseList = [];
                        //$scope.ExamList = [];
                        //$scope.BranchList = [];
                        //$scope.MediumList = [];
                        //$scope.SecondLangList = [];
                        //$scope.CasteList = [];
                        //$scope.SubCastList = [];
                        //$scope.MainGroupList = [];
                        $scope.OpenExamForm.Gender = "M";
                        $scope.OpenExamForm.Handicaped = "N";
                        $scope.OpenExamForm.Year = "All";
                        //$scope.PhysDisbList = [];
                        //$scope.spclconslist = [];
                        //$scope.SubList = [];

                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        function CheckValidation() {
            if (($scope.OpenExamForm.PreStudRegID == undefined) || ($scope.OpenExamForm.PreStudRegID == "")) {
                alert("Please enter Last Appreared Hall Ticket No");
                return false;
            }
            if (($scope.OpenExamForm.MonthandYear == undefined) || ($scope.OpenExamForm.MonthandYear == "")) {
                alert("Please select Month and year");
                return false;
            }
            if (($scope.OpenExamForm.year == undefined) || ($scope.OpenExamForm.year == "")) {
                alert("Please select last appreared year");
                return false;
            }
            if (($scope.OpenExamForm.StudName == undefined) || ($scope.OpenExamForm.StudName == "")) {
                alert("Please enter candidate name");
                return false;
            }
            if (($scope.OpenExamForm.FatherName == undefined) || ($scope.OpenExamForm.FatherName == "")) {
                alert("Please enter candidate father name");
                return false;
            }
            if (($scope.OpenExamForm.MotherName == undefined) || ($scope.OpenExamForm.MotherName == "")) {
                alert("Please enter candidate mother name");
                return false;
            }
            if (($scope.OpenExamForm.Nationality == undefined) || ($scope.OpenExamForm.Nationality == "")) {
                alert("Please select Nationality");
                return false;
            }
            if (($scope.OpenExamForm.BirthDate == undefined) || ($scope.OpenExamForm.BirthDate == "")) {
                alert("Please enter date of birth");
                return false;
            }
            if (($scope.OpenExamForm.AadharNo == undefined) || ($scope.OpenExamForm.AadharNo == "")) {
                alert("Please enter AadharNo");
                return false;
            }
            if (($scope.CasteList.CasteID == undefined) || ($scope.CasteList.CasteID == "")) {
                alert("Please select caste");
                return false;
            }
            if (($scope.CasteList.CasteID != undefined) || ($scope.CasteList.CasteID != "")) {
                if (($scope.SubCastList.SubCastID == undefined) || ($scope.SubCastList.SubCastID == "")) {
                    alert("Please select sub caste");
                    return false;
                }
            }
           
            if (($scope.ExamFormsRepeater.MainGrpID == undefined) || ($scope.ExamFormsRepeater.MainGrpID == "")) {
                alert("Select Main Group");
                return false;
            }

            if ($scope.OpenExamForm.Handicaped == 'Y') {
                if (($scope.PhysDisbList.PhysDisbID == 0) || ($scope.PhysDisbList.PhysDisbID == 1)) {
                    alert("Select Physical Disability");
                    return false;
                }
                if ($scope.PhysDisbList.PhysDisbID > 1) {
                    if (($scope.OpenExamForm.PhysDisbPer == undefined) || ($scope.OpenExamForm.PhysDisbPer == "") || ($scope.OpenExamForm.PhysDisbPer == 0)) {
                        alert("Enter Disability %.");
                        return false;
                    }
                }
                if ($scope.PhysDisbList.PhysDisbID == 2) {
                    if ($scope.SpclConsList.PhysDisbPer < 40) {
                        alert("Enter Disability % must be greater than or equal to 40, if you are blind condidate.");
                        return false;
                    }
                    //if ($scope.OpenExamForm.BranchID == 2) {
                    //    alert("Blind condidate can't take science group");
                    //    return false;
                    //}
                }

            }
            if (($scope.ExamFormsApprovalList.CourseID == undefined) || ($scope.ExamFormsApprovalList.CourseID== "")) {
                alert("Please select Course");
                return false;
            }
            if (($scope.ExamFormsApprovalList.ExamID == undefined) || ($scope.ExamFormsApprovalList.ExamID == "")) {
                alert("Please select Exam year");
                return false;
            }
            //if (($scope.ExamFormsRepeater.MainGrpID == undefined) || ($scope.ExamFormsRepeater.MainGrpID == "")) {
            //    alert("Please select group year");
            //    return false;
            //}
            
            if (($scope.SecondLangList.SecondLangID == undefined) || ($scope.SecondLangList.SecondLangID == "")) {
                alert("Blank New Second Language Not Allowed");
                return false;
            }
            if (($scope.MediumList.MediumID == undefined) || ($scope.MediumList.MediumID == "")) {
                alert("Blank  Medium Not Allowed");
                return false;
            }
            if (($scope.checkedChkBoxList == undefined) || ($scope.checkedChkBoxList == "")) {
                alert("Please select at least one subject ");
                return false;
            }
            //subjectList.selected
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamForms.CollegeID == undefined) || ($scope.ExamForms.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
                
            }
            else{
                return true;
            }

           
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
    });

});