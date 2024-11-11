define(['app'], function (app) {
    app.service("DownloadHallTicketService", function (DataAccessService) {

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



        this.GetBasicMediumList = function (CollegeID, MainGrpID) {
            var paramObject = { "CollegeID": CollegeID, "MainGrpName": MainGrpID };
            var data = DataAccessService.getDataWithPara('api/ReqMediumChange/GetBasicMediumListByCollegeIdGrpName', paramObject);
            return data;
        }

        this.GetPreExamNRHTData = function (ExamID, ExamInstID, CollegeID, MainGrpID, MediumID, CourseID) {
            var paramObject = { "ExamID": ExamID, "ExamInstID": ExamInstID, "CollegeID": CollegeID, "MainGrpID": MainGrpID, "MediumID": MediumID, "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/HallTicket/GetPreExamNRHTData', paramObject);
            return promise;
        }

        this.PrintHallticket = function (CollegeID, ExamID, ExamInstID, PreStudRegID) {
            var paramObject = { "CollegeID": CollegeID, "ExamID": ExamID, "ExamInstID": ExamInstID, "PreStudRegID": PreStudRegID };
            var promise = DataAccessService.getDataWithPara('api/HallTicket/GetHallTicketReportByType', paramObject);
            return promise;
        }
    });
});