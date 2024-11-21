$(function () {
    'use strict';
    angular.module('app')
        .factory('TheoryHallTicketService', 
        function ($http, AppSettings ) {

            var serviceBase = AppSettings.WebApiUrl + "api/HallTicket/";
            var TheoryHallTicketService = {};
            TheoryHallTicketService.GetHallTicket = function (HTNo) 
            {
                return $http.get(serviceBase + 'DownloadHallTicketByRollNo', { params: { HTNo:HTNo }, responseType: 'arraybuffer' }).then(function (results) //ExamID: ExamID, MainGrpID: MainGrpID, DistrictID: DistrictID, CollegeID: CollegeID, ExamInstID: ExamInstID
                {
                    return results.data;
                });
            };

           


            return TheoryHallTicketService;

            
        });
}());