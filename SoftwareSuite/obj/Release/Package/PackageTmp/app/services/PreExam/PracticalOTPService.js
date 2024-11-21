define(['app'], function (app) {
    app.service("PracticalOTPService", function (DataAccessService) {
        this.GetBasicCourseList = function () {
            var data = DataAccessService.getDataAll('api/PracticalOTP/GetBasicCourseList');
            return data;
        }
        this.GetExamListbyCourseID = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/PracticalOTP/GetExamListbyCourseID', paramObject);
            return promise;
        }
        this.GetExaminerDetails = function (ExamID, CurrDate, PrBatchID, ExmSubID, DistrictIDs, CourseID) {
            var paramObject = { "ExamID": ExamID, "CurrDate": CurrDate, "PrBatchID": PrBatchID, "ExmSubID": ExmSubID, "DistrictIDs": DistrictIDs, "CourseID": CourseID };
            var data = DataAccessService.getDataWithPara('api/PracticalOTP/GetExaminerDetails', paramObject);
            return data;
        }
        this.UpdateExaminerMobileNo = function (examinerMobile, examinerCode) {
            var paramObject = { "examinerMobile": examinerMobile, "examinerCode": examinerCode };
            var promise = DataAccessService.getDataWithPara('api/PracticalOTP/UpdateExaminerMobileNo', paramObject);
            return promise;
        }
        this.sendOTPCode = function (CourseID, ExamID, CurrDate, PrBatchID, ExmSubID, DistrictIDs) {
            var paramObject = { "CourseID": CourseID, "ExamID": ExamID, "CurrDate": CurrDate, "PrBatchID": PrBatchID, "ExmSubID": ExmSubID, "DistrictIDs": DistrictIDs };
            var data = DataAccessService.getDataWithPara('api/PracticalOTP/sendOTPCode', paramObject);
            return data;
        }
        this.GetBasicParticalSubjectList = function (CourseID, ExamId, PrDate, SessionType) {
            var paramObject = { "CourseID": CourseID, "ExamId": ExamId, "PrDate": PrDate, "SessionType": SessionType };
            var data = DataAccessService.getDataWithPara('api/PracticalReport/GetBasicParticalSubjectList', paramObject);
            return data;
        }
        this.GetDrillDownStudentDetailsListENVandETH = function (ExamInstID, ExmSubID) {
            var paramObject = { "ExamInstID": ExamInstID, "ExmSubID": ExmSubID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetDrillDownStudentDetailsListENVandETH', paramObject);
            return promise;
        }

        this.GetBasicPracticalSubjectList = function (CourseID, ExamId, PrBatchID) {
            var paramObject = { "CourseID": CourseID, "ExamId": ExamId, "PrBatchID": PrBatchID };
            var data = DataAccessService.getDataWithPara('api/PracticalOTP/GetBasicPracticalSubjectList', paramObject);
            return data;
        }
        this.GetMainGroupListByCollegeCourseId = function (CollegeID, CourseID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/PracticalOTP/GetMainGroupListByCollegeCourseId', paramObject);
            return promise;
        }
        this.GetVocationalCourses = function (ExamID, MainGrpID) {
            var paramObject = { "ExamID": ExamID, "MainGrpID": MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/PracticalOTP/GetVocationalCourses', paramObject);
            return promise;
        }
        this.GetScheduleDetails = function (CourseID, PrBatchID) {
            var paramObject = { "CourseID": CourseID, "PrBatchID": PrBatchID };
            var promise = DataAccessService.getDataWithPara('api/PracticalOTP/GetScheduleDetails', paramObject);
            return promise;
        }
    });
});