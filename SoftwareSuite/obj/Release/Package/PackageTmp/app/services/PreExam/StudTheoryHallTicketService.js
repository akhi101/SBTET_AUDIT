$(function () {
    'use strict';
    angular.module('app')
        .factory('StudTheoryHallTicketService', 
        function ($http, AppSettings ) {

            var serviceBase = AppSettings.WebApiUrl + "api/HallTicket/";
            var StudTheoryHallTicketService = {};
            StudTheoryHallTicketService.GetHallTicket = function (HTNo) 
            {
                return $http.get(serviceBase + 'DownloadHallTicketByRollNo', { params: { HTNo:HTNo }, responseType: 'arraybuffer' }).then(function (results) //ExamID: ExamID, MainGrpID: MainGrpID, DistrictID: DistrictID, CollegeID: CollegeID, ExamInstID: ExamInstID
                {
                    return results.data;
                });
            };

           


            return StudTheoryHallTicketService;

            
        });
}());