define(['app'], function (app) {
    app.service("BasicExaminerService", function (DataAccessService) {
        this.PostBasicExaminer = function (object) {
            var promise = DataAccessService.postData('api/PreExaminerAppointments/PostBasicExaminer', object);
            return promise;
        }
        this.UpdateBasicExaminer = function (object) {
            var promise = DataAccessService.postData('api/PreExaminerAppointments/PostBasicExaminer', object);
            return promise;
        }
        this.GetBasicExaminerListForMobileNoUpdate = function (CollegeID, ExmSubID) {
            var paramObject = { "CollegeID": CollegeID, "ExmSubID": ExmSubID };
            var promise = DataAccessService.getDataWithPara('api/PreExaminerAppointments/GetBasicExaminerListForMobileNoUpdate', paramObject);
            return promise;
        }
        this.GetBasicExaminerListByCollegeIDANDSubjectID = function (PrePractCntrID, ExmSubID, ZoneType, MainGrpID) {
            var paramObject = { "PrePractCntrID": PrePractCntrID, "ExmSubID": ExmSubID, "ZoneType": ZoneType, "MainGrpID": MainGrpID};
            var promise = DataAccessService.getDataWithPara('api/PreExaminerAppointments/GetBasicExaminerListByCollegeIDANDSubjectID', paramObject);
            return promise;
        }
        this.GetBasicExaminerListByCollegeIDANDSubjectIDByObj = function (object) {
            var promise = DataAccessService.postData('api/PreExaminerAppointments/PostBasicExaminerListByCollegeIDANDSubjectIDByObj', object);
            return promise;
        }

        this.GetBasicExaminerListForChange = function (PrePractCntrID, ExmSubID, CourseID, DistrictID, InstanceID, MainGrpID) {
            var paramObject = { "PrePractCntrID": PrePractCntrID, "ExmSubID": ExmSubID, "CourseID": CourseID, "DistrictID": DistrictID, "InstanceID": InstanceID, "MainGrpID":MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/PreExaminerAppointments/GetBasicExaminerListForChange', paramObject);
            return promise;
        }
        this.GetExaminerListofCenterForMobileNumberUpdate = function (DistrictID, PrePractCntrID, ExmSubID, InstanceID ) {
            var paramObject = { "DistrictID": DistrictID, "PrePractCntrID": PrePractCntrID, "ExmSubID": ExmSubID, "InstanceID": InstanceID };
            var promise = DataAccessService.getDataWithPara('api/PreExaminerAppointments/GetExaminerListofCenterForMobileNumberUpdate', paramObject);
            return promise;
        }
        this.GetVocationalExaminerListofCenterForMobileNumberUpdate = function (DistrictID, PrePractCntrID, MainGrpID, InstanceID) {
            var paramObject = { "DistrictID": DistrictID, "PrePractCntrID": PrePractCntrID, "MainGrpID": MainGrpID, "InstanceID": InstanceID };
            var promise = DataAccessService.getDataWithPara('api/PreExaminerAppointments/GetVocationalExaminerListofCenterForMobileNumberUpdate', paramObject);
            return promise;
        }
        this.GetVocationalExaminerListofCenterForMobileNumberUpdateBridge = function (DistrictID, PrePractCntrID, InstanceID) {
            var paramObject = { "DistrictID": DistrictID, "PrePractCntrID": PrePractCntrID, "InstanceID": InstanceID };
            var promise = DataAccessService.getDataWithPara('api/PreExaminerAppointments/GetVocationalExaminerListofCenterForMobileNumberUpdateBridge', paramObject);
            return promise;
        }
        this.PostExaminerAppointmentChange = function (object) {
            var promise = DataAccessService.postData('api/PreExaminerAppointments/PostExaminerAppointmentChange', object);
            return promise;
        }
        this.PostSendOTPForExaminer = function (object) {
            var promise = DataAccessService.postData('api/PreExaminerAppointments/PostSendOTPForExaminer', object);
            return promise;
        }

        this.GetPracticalExamSubjectForPracticalAppointmentList = function (MainGrpID, ExamID) {
            var paramObject = { "MainGrpID": MainGrpID, "ExamID": ExamID  };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetPracticalExamSubjectForPracticalAppointmentList', paramObject);
            return promise;
        }       
        //this.GetBasicExaminerListForMobileNoUpdate = function () {
        //    var data = DataAccessService.getDataAll('api/PreExaminerAppointments/GetBasicExaminerListForMobileNoUpdate');
        //    return data;
        //}
        this.GetPracticalCenterListByDistrictIDANDZoneType = function (ExamInstID, ZoneType, DistrictID) {
            var paramObject = { "ExamInstID": ExamInstID, "ZoneType": ZoneType, "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/PreExaminerAppointments/GetPracticalCenterListByDistrictIDANDZoneType', paramObject);
            return promise;
        }
        this.GetNewExaminerMobileNo = function (ExaminerIDNew) {
            var paramObject = { "ExaminerIDNew": ExaminerIDNew };
            var promise = DataAccessService.getDataWithPara('api/PreExaminerAppointments/GetNewExaminerMobileNo', paramObject);
            return promise;
        }
        
        this.GetPracticalExamSubjectForPracticalBridgeAppointmentList = function (ExamID, EvalTypID) {
            var paramObject = { "ExamID": ExamID, "EvalTypID": EvalTypID };
            var promise = DataAccessService.getDataWithPara('api/BasicExamSubject/GetPracticalExamSubjectForPracticalBridgeAppointmentList', paramObject);
            return promise;
        }

        this.getExaminerBridgeListByCollegeID = function (collegeID, exmSubID, examinerTypeID, examID, mainGrpID) {
            var paramObject = { "CollegeID": collegeID, "ExmSubID": exmSubID, "ExaminerTypeID": examinerTypeID, "ExamID": examID, "MainGrpID": mainGrpID  };
            var promise = DataAccessService.getDataWithPara('api/PreExaminerAppointments/GetExaminerBridgeListByCollegeID', paramObject);
            return promise;
        }        


    });
});