define(['app'], function (app) {
    app.service("DRDCChartService", function (DataAccessService) {
        this.AddPreCampus = function (object) {
            var promise = DataAccessService.postData('api/DRDCChart/PostInsertPreCampus', object);
            return promise;
        }
        this.UpdatePreCampus = function (object) {
            var promise = DataAccessService.postData('api/DRDCChart/PostPreCampus', object);
            return promise;
        }
        this.DeletePreCampus = function (CampusID, UpdLoginID) {
            var paramObject = { "CampusID": CampusID, "UpdLoginID": UpdLoginID };
            var promise = DataAccessService.deleteData('api/DRDCChart/DeletePreCampus', paramObject);
            return promise;
        }

        this.GetMainGroupListByCourse = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/DRDCChart/GetMainGroupListByCourse', paramObject);
            return promise;
        }
        this.GetSubjectsListByGroup = function (MainGrpID, ExamID) {
            var paramObject = { "MainGrpID": MainGrpID ,"ExamID": ExamID };
            var promise = DataAccessService.getDataWithPara('api/DRDCChart/GetSubjectsListByGroup', paramObject);
            return promise;
        }
        this.GetPreCampusList = function (ExamInstID) {
            var paramObject = { "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PreCampus/GetPreCampusList', paramObject);
            return promise;
        }
        this.GetPreDRDCListForDRDCChart = function (ExamInstID, CampusID) {
            var paramObject = { "ExamInstID": ExamInstID, "CampusID": CampusID };
            var promise = DataAccessService.getDataWithPara('api/DRDCChart/GetPreDRDCListForDRDCChart', paramObject);
            return promise;
        }
        
        this.GetUpdateBlockedDR = function (drdcIDs,CampusID,ExamInstID) {
            var paramObject = { "drdcIDs": drdcIDs,"CampusID": CampusID,"ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/DRDCChart/GetUpdateBlockedDR', paramObject);
            return promise;
        }
        this.GetDRDCChart = function (ExamInstID, SubjectID,CourseID, ExamID, CampDays) {
            var paramObject = { "ExamInstID": ExamInstID, "SubjectID": SubjectID, "CourseID": CourseID, "ExamID": ExamID, "CampDays": CampDays};
            var promise = DataAccessService.getDataWithPara('api/DRDCChart/GetDRDCChart', paramObject);
            return promise;
        }
        this.GetDRDCChartSubjectWise = function (CampusID) {
            var paramObject = { "CampusID": CampusID };
            var promise = DataAccessService.getDataWithPara('api/DRDCChart/GetDRDCChartSubjectWise', paramObject);
            return promise;
        }





        this.GetPreCampusList = function (ExamInstID) {
            var paramObject = { "ExamInstID": ExamInstID };
            var data = DataAccessService.getDataWithPara('api/PreCampus/GetPreCampusList', paramObject);
            return data;
        }
        this.GetPreCampusListByDRDCId = function (DRDCID) {
            var paramObject = { "DRDCID": DRDCID };
            var data = DataAccessService.getDataWithPara('api/PreCampus/GetPreCampusListByDRDCId', paramObject);
            return data;
        }
        this.GetPreCampusById = function (CampusID) {
            var paramObject = { "CampusID": CampusID };
            var promise = DataAccessService.getDataWithPara('api/PreCampus/GetPreCampusById', paramObject);
            return promise;
        }
        this.GetBasicDistrictsListByDRDCId = function (DRDCID) {
            var paramObject = { "DRDCID": DRDCID };
            var promise = DataAccessService.getDataWithPara('api/PreCampus/GetBasicDistrictsListByDRDCId', paramObject);
            return promise;
        }
        this.GetPreCampusListByDistrictId = function (DistrictID, ExamInstID) {
            var paramObject = { "DistrictID": DistrictID, "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/PreCampus/GetPreCampusListByDistrictId', paramObject);
            return promise;
        }
    });
});