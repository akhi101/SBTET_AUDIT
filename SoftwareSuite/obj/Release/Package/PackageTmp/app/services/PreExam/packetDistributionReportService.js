$(function () {
    'use strict';
    angular.module('app')
        .factory('packetDistributionReportService',
            function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/PacketDistributionReport/";
                var packetDistributionReportService = {};

                packetDistributionReportService.getPacketDistributionReport = function (packetDistributionReport) {
                    return $http.post(serviceBase + 'GetPacketDistributionReport', packetDistributionReport, { responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };
                return packetDistributionReportService;
            });
}());