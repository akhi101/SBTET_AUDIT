$(function () {
    'use strict';
    angular.module('app')
        .factory('photoCheckListService', 
        function ($http, AppSettings ) {

            var serviceBase = AppSettings.WebApiUrl + "api/PhotoCheckList/";
            var photoCheckListService = {};
                
            photoCheckListService.getPhotoCheckListReportByType = function (CollegeID,  ExamID, CourseID,BranchID,  MainGrpID) {
                return $http.get(serviceBase + 'GetPhotoCheckListReportByType', { params: { CollegeID: CollegeID, ExamID: ExamID, CourseID: CourseID, BranchID: BranchID, MainGrpID: MainGrpID } , responseType: 'arraybuffer' }).then(function (results) {
                        return results.data;
                    });
                };
            return photoCheckListService;
        });
}());