define(['app'], function (app) {
    app.controller("DepartmentController", function ($scope, $localStorage, PayRollService) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName;


        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getdepartmentdata();


        }
        $scope.ClearData = function () {
            $scope.DepartmentName = "";
           


        }
        
        $scope.Add = function () {

            var datatypeid = 1


            if ($scope.DepartmentName == null || $scope.DepartmentName == undefined || $scope.DepartmentName == "") {
                alert("Please Enter Department Name");
                return;
            } 
            var datatypeid = 1
            var AddDepartment = PayRollService.AddDepartments(datatypeid, 0, $scope.DepartmentName,1, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getdepartmentdata();
                    $scope.ClearData();


                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getdepartmentdata();
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





        $scope.getdepartmentdata = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetDepartmentData(DataTypeID, 0, 0);
            getdesign.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.DepartmentData = res.Table;
                    $scope.Noreports = false;
                    for (var j = 1; j < $scope.DepartmentData.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }


                }
                else {
                    $scope.DepartmentData = [];
                    $scope.Noreports = true;
                }


            },

                function (error) {
                    alert("error while loading Department");
                    var err = JSON.parse(error);

                });
        }






        $scope.Updatedepartment = function (data, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }

            var datatypeid = 2;

           



            var desig = PayRollService.UpdateDepartments(datatypeid, data.DepartmentID, data.DepartmentName, $scope.UserName)
            desig.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].StatusCode == '200') {
                    alert(response[0].StatusDescription);
                    $scope.getdepartmentdata();
                    $scope.ClearData();


                } else if (response[0].StatusCode == '400') {
                    alert(response[0].StatusDescription);
                    $scope.getdepartmentdata();
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











        $scope.Editdepartment = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }
        $scope.ChangeStatus = function (DepartmentID, Status) {
            var DataType = 3;
            var getSlides = PayRollService.ChangeDepartmentStatus(DataType, DepartmentID, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getdepartmentdata();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getdepartmentdata();
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