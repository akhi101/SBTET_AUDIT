﻿define(['app'], function (app) {
    app.service("ExamFormsRepeaterApprovalService", function (DataAccessService) {
        this.PostApprovalForms = function (object) {
            var promise = DataAccessService.postData('api/ExamFormsRepeater/PostApprovalForms', object);
            return promise;
        }
        this.GetExamFormsRepeaterApprovalList = function (AcdYrID, CollegeID, CourseID, ExamID, MainGrpID) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "MainGrpID": MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/ExamFormsRepeater/GetExamFormsRepeaterApprovalList', paramObject);
            return promise;
        }
        this.GetExamFormsRepeaterById = function (ExmFrmID) {
            var paramObject = { "ExmFrmID": ExmFrmID };
            var promise = DataAccessService.getDataWithPara('api/ExamFormsRepeater/GetExamFormsRepeaterById', paramObject);
            return promise;
        }
        this.GetCourseListForRegStud = function (CollegeID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/ExamFormsRepeater/GetCourseListForRegStud', paramObject);
            return promise;
        }
        this.GetMainGroupListByCollegeId = function (CollegeID, CourseID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/ExamFormsRepeater/GetMainGroupListByCollegeId', paramObject);
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
            var promise = DataAccessService.getDataWithPara('api/ExamFormsRepeater/GetCollegeListByDistrictAndMandal', paramObject);
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
    });
});