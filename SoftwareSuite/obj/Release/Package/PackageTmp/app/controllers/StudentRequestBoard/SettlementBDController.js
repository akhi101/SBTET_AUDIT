define(['app'], function (app) {
    app.controller("SettlementBDController", function ($http, $scope, $state, AppSettings, StudReqListService) {
        $scope.SettlementBD = {};
        $scope.EditRptType = "1";
        //var authData = $localStorage.authorizationData;
        //$scope.userName = authData.userName;
        //AppSettings.LoggedUserId = authData.SysUserID;
        //AppSettings.DistrictIDs = authData.DistrictIDs;
        //$scope.LoggedCollegeID = AppSettings.CollegeID;
        //AppSettings.AcdYrID = authData.AcdYrID;
        //var PageNm = $state.current.name.split(".")[1];
        //var RightForCurrentPage = [];
        //var UsersRightsdata = [];
        //UsersRightsdata = AppSettings.UserRights;
        //for (var i = 0; i < UsersRightsdata.length; i++) {
        //    if (UsersRightsdata[i].ListFormName == PageNm) {
        //        var obj = {};
        //        obj.isaddable = UsersRightsdata[i].isaddable;
        //        RightForCurrentPage.push(obj);
        //    }
        //}
       
        var MyList = StudReqListService.GetDateFromPaymentDetails();
        MyList.then(function (Mydata, status, headers, config, error) {
            ///alert("Hello");
            $scope.MyList = Mydata;
        }, function (error) {
            alert(error);
            });

        $scope.GetReport = function () {
            if ($scope.SettlementBD.Date == undefined || $scope.SettlementBD.Date == "") {
                alert("Please Select Date.");
                return false;
            }
            //else if (($scope.MediumChange.HTNO != undefined) && ($scope.MediumChange.HTNO != "")) {
            var StudList = StudReqListService.GetReport($scope.SettlementBD.Date, $scope.EditRptType).then(function (results) {
                if (results != "") {
                    var file = new Blob([results], { type: 'application/txt' });
                    var fileURL = URL.createObjectURL(file);
                    var date = new Date();
                    var fileName = "TSBIE_Settlement_" + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + ".txt";
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.href = fileURL;
                    a.download = fileName;
                    a.click();
                    alert("Downloaded Successfully.")
                }
                else {
                    alert("No Records Found");
                }
            }, function (error) {
                if (error.statusText == 'No Data Found') {
                    alert("No Data Found");
                }
                else {
                    alert(error.statusText);
                }
            });
        }
    });
});

