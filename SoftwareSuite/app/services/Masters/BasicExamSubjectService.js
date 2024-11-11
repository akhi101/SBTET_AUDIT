define(['app'], function (app) {
    app.service("BasicExamSubjectService", function (DataAccessService) {
        this.AddBasicExamSubject = function (object) {
            var promise = DataAccessService.putData('api/BasicExamSubject/PutBasicExamSubject', object);
            return promise;
        }
        this.PostBasicExamSubjectInsert = function (object) {
            var promise = DataAccessService.postData('api/BasicExamSubject/PostBasicExamSubjectInsert', object);
            return promise;
        }
        this.UpdateBasicExamSubject = function (object) {
            var promise = DataAccessService.postData('api/BasicExamSubject/PostBasicExamSubject', object);
            return promise;
        }
        this.DeleteBasicExamSubject = function (ExmSubID, UpdLoginID) {
            var paramObject = { "ExmSubID": ExmSubID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/BasicExamSubject/DeleteBasicExamSubject', paramObject);
            return promise;
        }
        this.GetBasicExamSubjectList = function () {
            var data = DataAccessService.getDataAll('api/BasicExamSubject/GetBasicExamSubjectList');
            return data;
        }
        this.GetBasicExamSubjectForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicExamSubject/GetBasicExamSubjectForList', paramObject);
            return data;
        }

        this.GetBasicExamSubjectListByID = function (ExmSubID) {
            var paramObject = { "ExmSubID": ExmSubID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetBasicExamSubjectListByID', paramObject);
            return promise;
        }
        this.GetBasicExamSubjectListReport = function (CourseID, ExamID) {
            var paramObject = { "CourseID": CourseID, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetBasicExamSubjectListReport', paramObject);
            return promise;
        }
        this.GetBasicExamSubjectListForSubjectPckt = function (CourseID, ExamID, SubjectType, PcktID,MediumID) {
            var paramObject = { "CourseID": CourseID, "ExamID": ExamID, "SubjectType": SubjectType, "PcktID": PcktID, "MediumID": MediumID};
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetBasicExamSubjectListForSubjectPckt', paramObject);
            return promise;
        }
        this.GetBasicExamSubjectListforUpdateSubPacket = function (CourseID, ExamID , ExmSubID) {
            var paramObject = { "CourseID": CourseID, "ExamID": ExamID, "ExmSubID": ExmSubID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetBasicExamSubjectListforUpdateSubPacket', paramObject);
            return promise;
        }
        this.GetOldSyllabusExamSubject = function (ExamID) {
            var paramObject = { "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetOldSyllabusExamSubject', paramObject);
            return promise;
        }
        this.GetEquivalenceExamSubject = function ( ExamID) {
            var paramObject = { "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetEquivalenceExamSubject', paramObject);
            return promise;
        }
        this.GetBasicExamSubjectListByExamID = function (ExamID, EvalType) {
            var paramObject = { "ExamID": ExamID, "EvalType": EvalType };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetBasicExamSubjectListByExamID', paramObject);
            return promise;
        }
        this.GetSyllabusListReport = function (ExamID, BranchID, MainGrpID) {
            var paramObject = { "ExamID": ExamID, "BranchID": BranchID, "MainGrpID": MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetBasicExamSubjectListReport', paramObject);
            return promise;
        }
        this.GetExamSubjectByCourseExamMainGroupID = function (CourseID, ExamID, MainGrpID, SubjectType) {
            var paramObject = { "CourseID": CourseID, "ExamID": ExamID, "MainGrpID": MainGrpID, "SubjectType": SubjectType };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetExamSubjectByCourseExamMainGroupID', paramObject);
            return promise;
        }
        this.GetExamTimeTableSubjectListByExamIDBranchID = function (ExamID, BranchID, ExamInstID) {
            var paramObject = { "ExamID": ExamID, "BranchID": BranchID,"ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetExamTimeTableSubjectListByExamIDBranchID', paramObject);
            return promise;
        }
        this.GetExamTimeTableSubjectListForMobileNoChange = function (ExamID, BranchID, ExamInstID) {
            var paramObject = { "ExamID": ExamID, "BranchID": BranchID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetExamTimeTableSubjectListForMobileNoChange', paramObject);
            return promise;
        }
        this.GetPracticalSubjectListByExamIDBranchID = function (ExamID) {
            var paramObject = { "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetPracticalSubjectListByExamIDBranchID', paramObject);
            return promise;
        }
        this.GetExamTimeTableSubjectListByExamIDBranchIDAndMainGrpID = function (ExamID, BranchID, ExamInstID, MainGrpID) {
            var paramObject = { "ExamID": ExamID, "BranchID": BranchID, "ExamInstID": ExamInstID, "MainGrpID": MainGrpID  };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetExamTimeTableSubjectListByExamIDBranchIDAndMainGrpID', paramObject);
            return promise;
        }
        this.GetOtherExamSubjectListForOtherMarkEntrySchedule = function (ExamID) {
            var paramObject = { "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetOtherExamSubjectListForOtherMarkEntrySchedule', paramObject);
            return promise;
        }
        this.GetSubjectForAttendanceCheckList = function (CourseID,ExamID) {
            var paramObject = { "CourseID": CourseID , "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetSubjectForAttendanceCheckList', paramObject);
            return promise;
        }
        this.GetSubjectForAttendanceCheckList = function (CourseID, ExamID) {
            var paramObject = { "CourseID": CourseID, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetSubjectForAttendanceCheckList', paramObject);
            return promise;
        }
        this.GetPracticalExamSubjectForPracticalAppointmentList = function (MainGrpID, ExamID) {
            var paramObject = { "MainGrpID": MainGrpID, "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetPracticalExamSubjectForPracticalAppointmentList', paramObject);
            return promise;
        }
        this.GetGeneralExamSubjectListForMobileNumberUpdate = function (ExamID) {
            var paramObject = { "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetGeneralExamSubjectListForMobileNumberUpdate', paramObject);
            return promise;
        }
        this.GetVocationalExamSubjectListForMobileNumberUpdate = function (ExamID, MainGrpID) {
            var paramObject = { "ExamID": ExamID, "MainGrpID": MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetVocationalExamSubjectListForMobileNumberUpdate', paramObject);
            return promise;
        }
        this.GetPracticalExamSubjectForMobileNumberUpdate = function (MainGrpID, ExamID) {
            var paramObject = { "MainGrpID": MainGrpID , "ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetPracticalExamSubjectForMobileNumberUpdate', paramObject);
            return promise;
        }
        this.GetOtherExamSubjectListForOtherMarkEntryScheduleList = function () {
            var data = DataAccessService.getDataAll('api/BasicExamSubject/GetOtherExamSubjectListForOtherMarkEntryScheduleList');
            return data;
        }
        this.GetCheckDependancy = function (ExmSubID) {
            var paramObject = { "ExmSubID": ExmSubID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});