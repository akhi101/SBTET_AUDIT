$(function () {
    'use strict';
    angular.module('app')
        .factory('centerwiseSeatingArrangementService', 
        function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/CenterwiseSeatingArrangement/";
                var centerwiseSeatingArrangementService = {};

                centerwiseSeatingArrangementService.getCenterwiseSeatingArrangement = function (centerwiseSeatingArrangement) {
                    return $http.post(serviceBase + 'GetCenterwiseSeatingArrangement', centerwiseSeatingArrangement, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
            };

            centerwiseSeatingArrangementService.GetCenterwiseDayWiseStudentRollNos = function (CenterwiseSeatingArrangement) {
                return $http.post(serviceBase + 'GetCenterwiseDayWiseStudentRollNos', CenterwiseSeatingArrangement, { responseType: 'arraybuffer' }).then(function (results) {
                    return results.data;
                });
            };

            //centerwiseSeatingArrangementService.GetCenterwiseDayWiseStudentRollNosPDF = function () {
            //    return $http.post(serviceBase + 'GetCenterwiseDayWiseStudentRollNosPDF', { params: { ExamInstID: ExamInstID, DistrictID: DistrictID } }, { responseType: 'arraybuffer' }).then(function (results) {
            //        return results.data;
            //    });
            //};



                return centerwiseSeatingArrangementService;
        });
}());