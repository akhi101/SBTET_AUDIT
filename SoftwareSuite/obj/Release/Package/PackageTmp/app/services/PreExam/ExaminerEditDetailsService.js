define(['app'], function (app) {
    app.service("ExaminerDetailsEditService", function (DataAccessService) {       
        this.GetAcademicYear = function () {
            var promise = DataAccessService.getDataWithPara('api/BasicAcademicYear/GetBasicAcademicYearListForRequests');
            return promise;
        }

        this.GetCollegeData = function (AcdYrID, DistrictIDs, SysUserID) {
            var paramObject = { "AcdYrID": AcdYrID, "DistrictIDs": DistrictIDs, "SysUserID": SysUserID };
            var promise = DataAccessService.getDataWithPara('api/ExaminerDetail/GetCollegeData', paramObject);
            return promise;
        }

        this.GetExaminerDetailsByColCode = function (ColCode) {
            var paramObject = { "ColCode": ColCode};
            var promise = DataAccessService.getDataWithPara('api/ExaminerDetail/GetExaminerDetailsByColCode', paramObject);
            return promise;
        }

        this.GetExaminerDetailsByID = function (ExaminerID) {
            var paramObject = { "ExaminerID": ExaminerID };
            var promise = DataAccessService.getDataWithPara('api/ExaminerDetail/GetExaminerDetailsByID', paramObject);
            return promise;
        }

        this.UpdateExaminerData = function (object) {           
            var promise = DataAccessService.postData('api/ExaminerDetail/UpdateExaminerData', object);
            return promise;
        }

        this.GetMediumList = function () {
            var data = DataAccessService.getDataAll('api/ReqNameCorrection/GetBasicMediumList');
            return data;
        }

        this.GetEmpTypeList = function () {
            var data = DataAccessService.getDataAll('api/ExaminerDetail/GetEmpTypeList');
            return data;
        }

        this.GetBasicSubjectList = function () {
            var data = DataAccessService.getDataAll('api/ExaminerDetail/GetBasicSubjectList');
            return data;
        }

        this.postPhotoCorrectionData = function (StudData) {
            var promise = DataAccessService.postData('api/ExaminerDetail/PostPhotoCorrectionData', object);
            return promise;
        };
    });
});