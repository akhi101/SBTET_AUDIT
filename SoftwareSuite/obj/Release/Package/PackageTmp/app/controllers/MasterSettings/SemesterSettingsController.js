define(['app'], function (app) {
    app.controller("SemesterSettingsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MasterPageService, StudentResultService, PreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName
        var expanded = false;
      
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetsemData();
            //  $scope.disabletable();
        }
       
        $scope.selsession1type = [{ IsSession1labl: 'TRUE', IsSession1: true }, { IsSession1labl: 'FALSE', IsSession1: false }];
        $scope.selsession2type = [{ IsSession2labl: 'TRUE', IsSession2: true }, { IsSession2labl: 'FALSE', IsSession2: false }];      
        $scope.sessioninfo = [{ session: "SESSION 1" }, { session: "SESSION 2" }]
        //get schemes data for dropdown
        var SCHEMESEMINFO = StudentResultService.GetSchemeDataForResults();
        $scope.seminfo = [];     
        SCHEMESEMINFO.then(function (data) {
            if (data.length > 0) {
                $scope.schemeinfo = data;
            }
        }, function (error) {
            alert("unable to load Schemes");
        });

        $scope.GetsemData = function () {
            var GetSemester = PreExaminationService.GetSemesters()
            GetSemester.then(function (response) {

                $scope.GetMasterSchemes = response.Table;

                for (var j = 1; j < response.Table.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
            }, 
         function (error) { 
             alert("data is not loaded");
             var err = JSON.parse(error);
             console.log(err.Message);
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
          
            for (var k = 0; k < $scope.schemeinfo.length ; k++) {
                if ($scope.schemeinfo[k].schemeid == data.schemeid) {
                    var selscheme = $scope.schemeinfo[k].scheme;
                }            
            }

            var datatypeid = 2;
            var SetSemester = PreExaminationService.SetSemester(datatypeid, data.Sem, $scope.UserName, selscheme, data.schemeid, data.IsSession1, data.IsSession2, data.SequenceId, data.SemId, data.IsActive)
            SetSemester.then(function (response) {
                var response = JSON.parse(response)
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription)
                    $scope.GetsemData();
                } else {
                    alert('Something Went Wrong')
                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }

        $scope.showsemCheckboxes = function () {
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
            var toggleStatus = $scope.isAllSelectedses;
            angular.forEach($scope.sessioninfo, function (itm) { itm.selected = toggleStatus; });
            $scope.sesarr = [];
            angular.forEach($scope.sessioninfo, function (value, key) {
                if (value.selected === true) {
                    $scope.sesarr.push({ "ses": value.session })
                }
            });
        }

        $scope.optionToggledsem = function () {
            $scope.isAllSelectedses = $scope.sessioninfo.every(function (itm) { return itm.selected; })
            $scope.sesarr = [];
            angular.forEach($scope.sessioninfo, function (value, key) {
                if (value.selected === true) {
                    $scope.sesarr.push({ "ses": value.session })
                }
            });
        }

        $scope.Submit = function () {

            var datatypeid = 1          
         
            if ($scope.scheme == null || $scope.scheme == undefined || $scope.scheme == "") {
                alert("Select Scheme.");
                return;
            }
           // var data = JSON.parse($scope.scheme)
            if ($scope.scheme.schemeid == null || $scope.scheme.schemeid == undefined || $scope.scheme.schemeid == "") {
                alert("Select Scheme.");
                return;
            }
            if ($scope.Semester == null || $scope.Semester == undefined || $scope.Semester == "") {
                alert("Enter Semester.");
                return;
            }
            if ($scope.sesarr == undefined || $scope.sesarr.length == null || $scope.sesarr.length == 0 ) {
                alert("Select Session");
                return;
            }

            if ($scope.sesarr.length > 0) {
                var issess1 = false;
                var issess2 = false;
                for (var i = 0; i < $scope.sesarr.length; i++) {
                    if ($scope.sesarr[i].ses == 'SESSION 1' && $scope.sesarr[i].ses != 'SESSION 2') {
                         issess1 = true;
                       
                    } else if ($scope.sesarr[i].ses == 'SESSION 2' && $scope.sesarr[i].ses != 'SESSION 1') {
                      
                         issess2 = true;
                    } 
                }              
            }
 

            var SetSemester = PreExaminationService.SetSemester(datatypeid, $scope.Semester, $scope.UserName, $scope.scheme.scheme, $scope.scheme.schemeid, issess1, issess2,0,0,true)
            SetSemester.then(function (response) {
                var response = JSON.parse(response)
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription)
                    $scope.GetsemData();
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