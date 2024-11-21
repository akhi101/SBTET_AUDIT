define(['app'], function (app) {
    app.service("StudySecondLanguageService", function (DataAccessService) {
        this.AddStudySecondLanguage = function (object) {
            var promise = DataAccessService.putData('api/ReqStudySecondLanguage/PutReqStudySecondLanguage', object);
            return promise;
        }
        this.CheckSecondLanguageExist = function (SecLangID, CollegeID) {
            var paramObject = { "SecLangID": SecLangID, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/ReqStudySecondLanguage/CheckSecondLanguageExist', paramObject);
            return promise;
        }
        this.InsertReqStudySecondLanguage = function (object) {
            var promise = DataAccessService.postData('api/ReqStudySecondLanguage/PostReqStudySecondLanguage', object);
            return promise;
        }
        this.DeleteDupTripPass = function (PassCertID) {
            var paramObject = { "PassCertID": PassCertID };
            var promise = DataAccessService.deleteData('api/ReqStudySecondLanguage/DeleteReqStudySecondLanguage', paramObject);
            return promise;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }
        this.GetStudySecondLanguageList = function (OldSecondLanguageID) {
            var paramObject = { "OldSecondLanguageID": OldSecondLanguageID };
            var data = DataAccessService.getDataWithPara('api/BasicSubject/GetBasicSubjectListForSecondLangauge', paramObject);
            return data;
        }

        this.GetStudySecondLanguageByID = function (PassCertID) {
            var paramObject = { "PassCertID": PassCertID };
            var promise = DataAccessService.getDataWithPara('api/ReqStudySecondLanguage/GetReqStudySecondLanguageByID', paramObject);
            return promise;
        }
        this.GetStudentInfo = function (HTNO, CollegeID) {
            var paramObject = { "HTNO": HTNO, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/ReqStudySecondLanguage/GetStudentInfo', paramObject);
            return promise;
        }

        this.GetSubjectName = function (subCode) {
            var paramObject = [];
            var paramObject = { "SubjectCode": subCode };
            var promise = DataAccessService.getDataWithPara('api/ReqStudySecondLanguage/GetSubjectName', paramObject);
            return promise;
        }


        this.GetReqStudySecondLanguageByFormNoAndAcdYrID = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqStudySecondLanguage/GetReqStudySecondLanguageByFormNoAndAcdYrID', paramObject);
            return promise;
        }
         
    });
});