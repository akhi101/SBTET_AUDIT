define(['app'], function (app) {
    app.service("DownloadStatusReportService", function (DataAccessService) {
       
        this.GetEnvEthStatusReport = function (SysUsrID, ExmSubID) {
            var paramObject = { "SysUsrGrpID": SysUsrID, "ExmSubID": ExmSubID};
            var promise = DataAccessService.getDataWithPara('api/DownloadStatusRpt/GetEnvEthStatusReport', paramObject);
            return promise;
        }

        this.GetDistrictWiseData = function (_distCode, _typeID, ExmSubID) {
            var paramObject = { "DistCode": _distCode, "TypeID": _typeID, "ExmSubID": ExmSubID };
            var promise = DataAccessService.getDataWithPara('api/DownloadStatusRpt/GetDistrictWiseData', paramObject);
            return promise;
        }

        /////////////////////////////////////////////////////
        this.GetBasicCourseList = function () {
            var data = DataAccessService.getDataAll('api/PracticalReport/GetBasicCourseList');
            return data;
        }

        this.GetBasicExamList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
            return promise;
        }

        this.GetBasicPracticalSubjectList = function (CourseID, ExamId) {
            var paramObject = { "CourseID": CourseID, "ExamId": ExamId };
            var data = DataAccessService.getDataWithPara('api/DownloadStatusRpt/GetBasicPracticalSubjectList', paramObject);
            return data;
        }

        this.GetPracticalStatusReport = function (DistrictIDs, ExamID,ExmSubID) {
            var paramObject = { "DistrictIDs": DistrictIDs, "ExamID": ExamID, "ExmSubID": ExmSubID };
            var promise = DataAccessService.getDataWithPara('api/DownloadStatusRpt/GetPracticalStatusReport', paramObject);
            return promise;
        }

        this.GetMainGroupListByCollegeCourseId = function (CollegeID, CourseID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/DownloadStatusRpt/GetMainGroupListByCollegeCourseId', paramObject);
            return promise;
        }

        this.GetVocationalPracSubList = function (ExamID, MainGrpID) {
            var paramObject = { "ExamID": ExamID, "MainGrpID": MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/DownloadStatusRpt/GetVocPracSubjects', paramObject);
            return promise;
        }
    });
});