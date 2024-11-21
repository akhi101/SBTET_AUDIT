define(['app'], function (app) {
    app.service("ElectivesService", function (DataAccessService) {
       
        this.GetExamType = function (SchemeId) {
            var paramObject = {"schemeid":SchemeId };
            var promise = DataAccessService.getDataWithPara('Assessment/getExamTypes', paramObject);
            return promise;
        }
        
         this.getStudentType = function () {
             return DataAccessService.getDataAll('Assessment/getStudentType');
         },
             this.GetElectiveSubjects = function (semId, schemeId, branchId, collegeCode, AcademicYearID, SessionID) {
             var paramObject = { "semId": semId, "schemeId": schemeId, "branchId": branchId, "collegeCode": collegeCode, "AcademicYearID": AcademicYearID, "SessionID": SessionID };
             return DataAccessService.getDataWithPara('Academic/GetElectiveSubjects', paramObject);
         },
         this.GetElectiveSubjectPinList = function (subId, semId, CollegeCode, branchCode) {
             var paramObject = { "subId": subId, "semId": semId, "CollegeCode": CollegeCode, "branchCode": branchCode};
             return DataAccessService.getDataWithPara('Academic/GetElectiveSubjectPinList', paramObject);
         },
        this.PostElectiveStudentList = function ( StudentList) {
            //var paramObject = {};
            return DataAccessService.postData('Academic/PostElectiveStudentList', StudentList);
        },
         //this.PostFinaldata = function (json) {
         //    //var paramObject = {};
         //    return DataAccessService.postData('Academic/PostFinaldata', json);
         //},
          this.PostFinaldata = function (json) {
              var paramObject = { "json": json };
              return DataAccessService.postData('api/PreExamination/PostFinaldata', paramObject);
          }
        });
    });