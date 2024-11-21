define(['app'], function (app) {
    app.service("ExamFormsCancelService", function (DataAccessService) {
        this.PostCancelForms = function (object) {
            var promise = DataAccessService.postData('api/ExamForms/PostCancelForms', object);
            return promise;
        }
        this.GetExamFormsCancelList = function (ExamInstID, CollegeID, CourseID, ExamID, MainGrpID) {
            var paramObject = { "ExamInstID": ExamInstID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "MainGrpID": MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExamFormsCancelList', paramObject);
            return promise;
        }
        this.GetExamFormsById = function (ExmFrmID) {
            var paramObject = { "ExmFrmID": ExmFrmID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExamFormsById', paramObject);
            return promise;
        }
        this.GetCourseListForRegStud = function (CollegeID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetCourseListForRegStud', paramObject);
            return promise;
        }
        this.GetMainGroupListByCollegeId = function (CollegeID, CourseID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetMainGroupListByCollegeId', paramObject);
            return promise;
        }

        this.GetMainGroupListByCollegeCourseId = function (CollegeID, CourseID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetMainGroupListByCollegeCourseId', paramObject);
            return promise;
        }

        
        this.GetBasicAcademicYearListForExamForm = function () {
            var data = DataAccessService.getDataAll('api/BasicAcademicYear/GetBasicAcademicYearListForExamForm');
            return data;
        }
        this.GetDistrictListByStateID = function (StateID) {
            var paramObject = { "StateID": StateID };
            var promise = DataAccessService.getDataWithPara('api/BasicDistricts/GetDistrictListByStateID', paramObject);
            return promise;
        }
        this.GetMandalListByDistrict = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/BasicMandal/GetBasicMandalByDistrictID', paramObject);
            return promise;
        }
        this.GetCollegeListByDistrictAndMandal = function (DistrictID, MandalID) {
            var paramObject = { "DistrictID": DistrictID, "MandalID": MandalID };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetCollegeListByDistrictAndMandal', paramObject);
            return promise;
        }
        this.GetCourseListForRegStud = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetCourseListForRegStud', paramObject);
            return promise;
        }
        this.GetBasicExamList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
            return promise;
        }

        this.GetBasicMediumList = function (CollegeID, MainGrpID) {
            var paramObject = { "CollegeID": CollegeID, "MainGrpName": MainGrpID };
            var data = DataAccessService.getDataWithPara('api/ReqMediumChange/GetBasicMediumListByCollegeIdGrpName', paramObject);
            return data;
        }
    });
});