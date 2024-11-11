 define(['app'], function (app) {
     app.controller("SetsemesterController", function ($scope, $http, $localStorage, $state, AppSettings, AdminService) {
         $scope.edit = true;
        
         $scope.SetSemester = [];
         var Usertype=1;
         var GetSemester = AdminService.GetSemester(Usertype)
         GetSemester.then(function (response) {
             console.log(response);
             $scope.SetSemester = response.Table;
             $scope.SchemeList = response.Table1;
        
         },
         function (error) {
             alert("error while loading Modules");
             var err = JSON.parse(error);
             console.log(err.Message);
         });
         $scope.editDetaila = function () {
             $scope.edit = false;
             $scope.Save = true;
           
         }
         
         var Schemelist = [];
         $scope.changeSheamEnable = function (data) {
             if (data.IsActive=1) {
                 data.IsActive = false;
             }
             else if (data.IsActive = 0) {
                 data.IsActive = true;
             }
             var Scheamdata = $scope.pushData(data.semId, data.SchemeID, data.IsActive ? 1 : 0);
             for (var i = 0; i < Schemelist; i++) {
                 if (Schemelist[i].semId == Scheamdata.semId) {
                     Scheamdata.SchemeID = Schemelist[i].SchemeID;
                 }
             }
             Schemelist.remElementByVal2(data.semId);
             Schemelist.push(Scheamdata);
         }
         $scope.changeSheam = function (data) {
                   if (Schemelist.length == '0') {
               
                       var Scheamdata = $scope.pushData(data.semId, data.SchemeID, data.IsActive? 1 : 0);
                 Schemelist.push(Scheamdata);

             } else if (Schemelist.length > 0) {
                 tempId = [];
                 var Scheamdata = $scope.pushData(data.semId, data.SchemeID, data.IsActive? 1 : 0);

                 for (var i = 0; i < Schemelist; i++){
                     if (Schemelist[i].semId == Scheamdata.semId) {
                         Scheamdata.IsActive = Schemelist[i].IsActive;
                     }
                 }
                 Schemelist.remElementByVal1(data);

                 

                  Schemelist.push(Scheamdata);

             }
             console.log(Schemelist);

         }

         Array.prototype.remElementByVal1 = function (val) {
             for (var i = 0; i < this.length; i++) {
                 if (this[i].semId === val.semId) {
                     this.splice(i, 1);
                     break;
                 }
             }
             return this;
         }
         Array.prototype.remElementByVal2 = function (val) {
             for (var i = 0; i < this.length; i++) {
                 if (this[i].semId === val) {
                     this.splice(i, 1);
                     break;
                 }
             }
             return this;
         }

         $scope.pushData = function ( semId, SchemeID,IsActive) {
             return {
                 IsActive: IsActive,
                 semId: semId,
                 SchemeID: SchemeID
                 
             };
         }

         $scope.SaveScheamdata = function () {
             $scope.edit = true;
             $scope.Save = false;

             var SaveScheamdata = AdminService.SaveScheamdata(Usertype,JSON.stringify(Schemelist));
             SaveScheamdata.then(function (response) {
                 alert("data saved successful")

             })



         }
    
    })
})