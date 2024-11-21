define(['app'], function (app) {
    app.controller("FeeSettingsController", function ($scope, $localStorage, PreExaminationService) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName;


        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getfeesettingsdata();


        }
        $scope.ServiceTypeValues = [{ "Id": "1", "value": 1 }, { "Id": "2", "value": 2 }]
        $scope.ChallanPrefixValues = [{ "Id": "1", "value": "MC" }, { "Id": "2", "value": "INTRM" }, { "Id": "3", "value": "TRANS" }, { "Id": "4", "value": "DMM" }, { "Id": "5", "value": "DDC" }, { "Id": "6", "value": "TC" }, { "Id": "7", "value": "NC" }, { "Id": "8", "value": "GC" }, { "Id": "9", "value": "STUD" }]

        var getDatagetCertificates = PreExaminationService.GetCertificateTypes()
        getDatagetCertificates.then(function (response) {

            try {
                var response = JSON.parse(response);
            } catch (err) { }
            $scope.CertificateTypes = response.Table;
            //$scope.CertificateTypes.splice(7, 1); 
            console.log($localStorage.StudentServices)
            $scope.Certificate = $localStorage.StudentServices.ServiceType;


            $scope.Service = false;
        }, function (error) {
            $scope.NoDataFound = true;
            $scope.result = false;
        })















        //var SchemeSem = PreExaminationService.GetTimeTableSessionSchemeSemesters($scope.selSession, $scope.selAcademicYear);
        //SchemeSem.then(function (data) {
        //    try { var data = JSON.parse(data) } catch (err) { }

        //    if (data.length > 0) {
        //        $scope.ReportFound = true;
        //        $scope.Noreports = false;
        //        $scope.GetFeeSettings = data;
        //        for (var j = 1; j < $scope.GetFeeSettings.length + 1; j++) {
        //            $scope['edit' + j] = true;
        //        }
        //    } else {
        //        $scope.ReportFound = false;
        //        $scope.Noreports = true;
        //    }
        //}, function (error) {
        //    $scope.GetFeeSettings = [];
        //    //$scope.ReportFound = fale;
        //    $scope.Noreports = true;
        //});










        $scope.Add = function () {

            var datatypeid = 1


            if ($scope.ServiceName == null || $scope.ServiceName == undefined || $scope.ServiceName == "") {
                alert("Please Enter Service Name");
                return;
            } if ($scope.ServiceType == null || $scope.ServiceType == undefined || $scope.ServiceType == "") {
                alert("Please Select Service Type");
                return;
            } if ($scope.ChallanPrefix == null || $scope.ChallanPrefix == undefined || $scope.ChallanPrefix == "") {
                alert("Please Enter ChallanPrefix");
                return;
            }
            if ($scope.Amount == undefined || $scope.Amount == null || $scope.Amount == "") {
                alert("Amount");
                return;
            }
           
           

            
            var datatypeid = 1
            var AddFeeSettings = PreExaminationService.AddFeeSettings(datatypeid, 0, $scope.ServiceName, 1, $scope.Amount,$scope.ServiceType, $scope.ChallanPrefix,$scope.UserName)
            AddFeeSettings.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }





        $scope.getfeesettingsdata = function () {
            var DataTypeID=1
            var getcourdurs = PreExaminationService.GetFeeSettingsData(DataTypeID,0);
            getcourdurs.then(function (response) {

                ////try {
                ////    var res = JSON.parse(response);
                ////}
                ////catch (err) { }
                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.FeeSettingsData = response.Table;
                    $scope.Noreports = false;
                    for (var j = 1; j < $scope.FeeSettingsData.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }

                }
                else {
                    $scope.FeeSettingsData = [];
                    $scope.Noreports = true;
                }


            },

                function (error) {
                    alert("error while loading CourseDuration");
                    var err = JSON.parse(error);

                });
        }






        $scope.Updatefeesettings = function (data, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
                ele2[j].style['-webkit-appearance'] = "none";
                ele2[j].style['-moz-appearance'] = "none";
            }

            var datatypeid = 2;

            //if (data.AcademicYearId == null || data.AcademicYearId == undefined || data.AcademicYearId == "") {
            //    alert("Service Name");
            //    return;
            //}
            //if (data.SessionId == undefined || data.SessionId == null || data.SessionId == "") {
            //    alert("Amount");
            //    return;
            //}
            //if (data.SchemeId == null || data.SchemeId == undefined || data.SchemeId == "") {
            //    alert("Status");
            //    return;
            //}
            //if (data.SemId == null || data.SemId == undefined || data.SemId == "") {
            //    alert("Action");
            //    return;
            //}
            


            var feesett = PreExaminationService.UpdateFeeSettings(datatypeid, data.Id, data.Name, data.Is_Active, data.Price, data.ServiceType, data.ChallanPrefix, $scope.UserName)
            feesett.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].StatusCode == '200') {
                    alert(response[0].StatusDescription);
                    $scope.getfeesettingsdata();

                } else if (response[0].StatusCode == '400') {
                    alert(response[0].StatusDescription);
                    $scope.getfeesettingsdata();

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }











        $scope.Editfeesettings = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }


            $scope['edit' + ind] = false;

            //var DataTypeID = 2
            //var getcourdurs = PreExaminationService.GetFeeSettingsData(DataTypeID, data.Id);
            //getcourdurs.then(function (response) {

            //    //try {
            //    //    var res = JSON.parse(response);
            //    //}
            //    //catch (err) { }

            //    if (response.Table.length > 0) {
            //        $scope.FeeSettingsData = response.Table;
            //        for (var j = 1; j < $scope.FeeSettingsData.length + 1; j++) {
            //            $scope['edit' + j] = true;
            //        }
            //    }
            //    else {
            //        $scope.FeeSettingsData = [];
            //    }


            //},

            //    function (error) {
            //        alert("error while loading CourseDuration");
            //        var err = JSON.parse(error);

            //    });

        }






    })
})