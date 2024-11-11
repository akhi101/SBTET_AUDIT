define(['app'], function (app) {
    app.controller("DesignationController", function ($scope, $localStorage, PayRollService) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName;


        const $ctrl = this;
        $ctrl.$onInit = () => {
           
            $scope.getdesignationdata();


        }

            var getdesign = PayRollService.GetDesignationTypes();
            getdesign.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (response.Table.length > 0) {
                    $scope.DesignationTypeData = response.Table;


                }
                else {
                    $scope.DesignationTypeData = [];
                }


            },

                function (error) {
                    alert("error while loading Designation");
                    var err = JSON.parse(error);

                });
        

        $scope.DesignationCodeValues = [{ "Id": '1', "value": '1' }, { "Id": '2', "value": '2' }, { "Id": '3', "value": '3' }, { "Id": '4', "value": '4' },
        { "Id": '5', "value": '5' }, { "Id": '6', "value": '6' }];


        $scope.DesignationCodeValues1 = [{ "DesignationOrder": '1', "value": '1' }, { "DesignationOrder": '2', "value": '2' }, { "DesignationOrder": '3', "value": '3' }, { "DesignationOrder": '4', "value": '4' },
            { "DesignationOrder": '5', "value": '5' }, { "DesignationOrder": '6', "value": '6' }];

        $scope.Add = function () {

            var datatypeid = 1


            if ($scope.DesignationName == null || $scope.DesignationName == undefined || $scope.DesignationName == "") {
                alert("Please Enter Designation Name");
                return;
            }
            if ($scope.DesignationType == null || $scope.DesignationType == undefined || $scope.DesignationType == "") {
                alert("Please Select Designation Type");
                return;
            }

            //if ($scope.DesignationOrder == null || $scope.DesignationOrder == undefined || $scope.DesignationOrder == "") {
            //    alert("Please Enter Designation Order");
            //    return;
            //}
            //if ($scope.NoofPost == undefined || $scope.NoofPost == null || $scope.NoofPost == "") {
            //    alert("Please Enter No of Post");
            //    return;
            //}
            //if ($scope.GONumber == undefined || $scope.GONumber == null || $scope.GONumber == "") {
            //    alert("Please Enter GO Number");
            //    return;
            //}
            //if ($scope.NoofVacants == undefined || $scope.NoofVacants == null || $scope.NoofVacants == "") {
            //    alert("Please Enter No of Vacants");
            //    return;
            //}
            let DesignationOrder = ($scope.DesignationOrder == null || $scope.DesignationOrder == undefined || $scope.DesignationOrder == "" ? 0 : $scope.DesignationOrder)
            let NoofPost = ($scope.NoofPost == null || $scope.NoofPost == undefined || $scope.NoofPost == "" ? 0 : $scope.NoofPost)
            let GONumber = ($scope.GONumber == null || $scope.GONumber == undefined || $scope.GONumber == "" ? 0 : $scope.GONumber)
            let NoofVacants = ($scope.NoofVacants == null || $scope.NoofVacants == undefined || $scope.NoofVacants == "" ? 0 : $scope.NoofVacants)
            var datatypeid = 1
            var AddDesignation = PayRollService.AddDesignations(datatypeid, 0, $scope.DesignationName, $scope.DesignationType,DesignationOrder, NoofPost, GONumber, NoofVacants, 1, $scope.UserName)
            AddDesignation.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getdesignationdata();
                    $scope.ClearData();
                   
                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getdesignationdata();
                    $scope.ClearData();
                 

                } else {
                    alert('Something Went Wrong')
                    $scope.ClearData();

                }
            },
                function (error) {
                    alert("something Went Wrong")
                    $scope.ClearData();


                });
        }


        $scope.ClearData = function () {
            $scope.DesignationName = "";
            $scope.DesignationType = null;
            $scope.DesignationOrder = "";
            $scope.NoofPost = "";
            $scope.GONumber = "";
            $scope.NoofVacants = "";
            

        }


        $scope.getdesignationdata = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetDesignationData(DataTypeID, 0,0);
            getdesign.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.DesignationData = res.Table;
                    $scope.Noreports = false;
                    for (var j = 1; j < $scope.DesignationData.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                    

                }
                else {
                    $scope.DesignationData = [];
                    $scope.Noreports = true;
                }


            },

                function (error) {
                    alert("error while loading Designation");
                    var err = JSON.parse(error);

                });
        }






        $scope.Updatedesignations = function (data, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
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



            var desig = PayRollService.UpdateDesignations(datatypeid, data.DesignationId, data.DesignationName, data.DesignationTypeId, data.DesignationOrder, data.NoOfPost, data.GONumber, data.NoOfVacants, 1, $scope.UserName)
            desig.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].StatusCode == '200') {
                    alert(response[0].StatusDescription);
                    $scope.getdesignationdata();
                    $scope.ClearData();
                    

                } else if (response[0].StatusCode == '400') {
                    alert(response[0].StatusDescription);
                    $scope.getdesignationdata();
                    $scope.ClearData();
                   

                } else {
                    alert('Something Went Wrong')
                    $scope.ClearData();

                }
            },
                function (error) {
                    alert("something Went Wrong")
                    $scope.ClearData();


                });
        }











        $scope.Editdesignations = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;

  

        }
        $scope.ChangeStatus = function (DesignationId, Status) {
            var DataType = 3;
            var getSlides = PayRollService.PayRollStatus(DataType, DesignationId, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getdesignationdata();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getdesignationdata();
                } else {
                    alert("Something Went Wrong")
                }
            },
                function (error) {

                    alert("error while loading Slides");
                    //alert("error while loading Notification");

                    var err = JSON.parse(error);
                });
        }





    })
})