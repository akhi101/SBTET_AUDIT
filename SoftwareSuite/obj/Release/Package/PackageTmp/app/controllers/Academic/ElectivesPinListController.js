define(['app'], function (app) {
    app.controller("ElectivesPinListController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MarksEntryService, ElectivesService, MenuService, AssessmentService) {
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        $scope.College_Code = authData.College_Code;
        AppSettings.College_Name = authData.College_Name;
        $scope.College_Name = authData.College_Name;
        AppSettings.userName = authData.userName;
        $scope.BranchId = authData.BranchId;
        $scope.CollegeID = authData.CollegeID;
        $scope.subjectDetailsView = false;
        $scope.LoadImgForPinList = false;
        var regex = /^\d+$/;
        var temp = regex.test($scope.userName);

        if ($scope.BranchId != null && !(temp && ($scope.CollegeID != "0" && $scope.CollegeID != ""))) {          
            var branchCode = authData.userName.split('_')[0];
            // Getting Branch Name From Branch Code

            var branchNameDetails = AssessmentService.getbranchNameById(branchCode);
            branchNameDetails.then(function (response) {
                if (response.length > 0) {
                    $scope.branch = response[0].BranchName;
                    $localStorage.Academic.branchName = response[0].BranchName;
                    //$scope.branchName = response.;
                }
                else {
                    $scope.branch = '';
                }

            }, function (error) {
                alert("NOt Branch login");
            });                                           // Getting Branch Name From Branch Code     
                   
            // for getting Current Academic year

            var AcademicYearsActive = AssessmentService.GetAcademicYearsActive();
            AcademicYearsActive.then(function (response) {
                $scope.years = response.Table[0];
                $scope.AcademicYearsActiveResponse = $scope.years;
                $localStorage.Academic.AcademicYearsActiveResponse = $scope.years;

            },
            function (error) {
                alert("error");
            });
            $scope.sems = [];
            // load Semister Types to drop down
            var loadActiveSemister = AssessmentService.getActiveSemester();
            loadActiveSemister.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.sems = response.Table;
                    $scope.selectedsem = response.Table[2];
                  
                    $scope.LoadSchemeForSemester($scope.selectedsem);
                }
                else {
                    alert("no data");
                }
            }, function (error) {
                alert("error no data");
            });

            //loading Scheme related to sem

            $scope.LoadSchemeForSemester = function (selectedsem) {
                var schemeStatus = AssessmentService.getSchemeStatus();
                schemeStatus.then(function (response) {
                    var SchemesList = response.Table;
                    SchemesList.forEach(function (scheme) {
                        if (selectedsem.current_schemeid === scheme.SchemeID) {
                            $scope.loadedScheme = scheme;
                            $localStorage.Academic.scheme = $scope.loadedScheme;
                        }
                    });

                }, function (error) {
                    alert("error");
                });
            }                                                  

           
            // loading Elective pinlist
            var subjectdata = $localStorage.Academic.subjectdata;
            var semester = $localStorage.Academic.selectedsem;
            $scope.loadpins = function () {
                $scope.StudentsNotFound = false;
                $scope.LoadImgForPinList = true;
                $scope.subjectDetailsView = false;
                $scope.pinWise = [];
               
                $scope.SubjectCode = subjectdata.Subject_Code;
                var ElectivePinlist = ElectivesService.GetElectiveSubjectPinList(subjectdata.subid, semester.semid, $scope.College_Code, branchCode);
                ElectivePinlist.then(function (response) {
                    if (response.length > 0) {
                        $scope.StudentsNotFound = false;
                        $scope.subjectDetailsView = true;
                        $scope.LoadImgForPinList = false;
                        $scope.pinWise = response;
                    } else {
                        $scope.StudentsNotFound = true;
                        $scope.subjectDetailsView = false;
                        $scope.LoadImgForPinList = false;
                    }

                }, function (error) {
                    $scope.StudentsNotFound = true;
                    $scope.subjectDetailsView = false;
                    $scope.LoadImgForPinList = false;
                    console.log(error);

                });




            }
           
         
                 $scope.back = function () {
                     $state.go("Dashboard.Academic.Electives");
                 }

                 $scope.save = function () {
                     if (ElectivePinList != [] && ElectivePinList!='' && ElectivePinList!= undefined) {
                         var postElectivePins = ElectivesService.PostElectiveStudentList(ElectivePinList);
                         postElectivePins.then(function (response) {
                             console.log(response);
                             alert('Students Pins are added to electives successfully');
                             $scope.loadpins();
                         }, function (error) {
                             console.log(error);
                         });
                     }
                   

                 }
              
                 $scope.addData = function (studentid) {
                     return {
                         studentid: studentid,
                         subid: subjectdata.subid,
                     };
                 };
                
                 $scope.allItemsSelected = false;
                
                 var ElectivePinList = [];
                 $scope.selectEntity = function (data) {
                     if (data.isChecked) {
                         let list = $scope.addData(data.studentid);
                         ElectivePinList.push(list);                      
                     }
                     if (!data.isChecked) {
                         function arrayRemove(arr, value) {
                             return arr.filter(function(ele){
                                 return ele.studentid != value;
                             });
                         }
                         ElectivePinList = arrayRemove(ElectivePinList, data.studentid);              
                     }
                     for (var i = 0; i < $scope.pinWise.length; i++) {
                        if (!$scope.pinWise[i].isChecked) {
                            $scope.allItemsSelected = false;                           
                            return;
                        }
                    }                   
                    $scope.allItemsSelected = true;
                };
                $scope.selectAll = function () {
                     ElectivePinList = [];
                     for (var i = 0; i < $scope.pinWise.length; i++) {
                         $scope.pinWise[i].isChecked = $scope.allItemsSelected;                       
                        if ($scope.pinWise[i].isChecked) {                            
                            let list = $scope.addData($scope.pinWise[i].studentid);
                            ElectivePinList.push(list);                           
                        }
                        if (!$scope.pinWise[i].isChecked) {
                          function arrayRemove(arr, value) {
                                return arr.filter(function (ele) {
                                    return ele.studentid != value;
                                });

                            }
                            ElectivePinList = arrayRemove(ElectivePinList, $scope.pinWise[i].studentid);                           
                        }
                     }
                     console.log(ElectivePinList);
                };
        }
    });
});