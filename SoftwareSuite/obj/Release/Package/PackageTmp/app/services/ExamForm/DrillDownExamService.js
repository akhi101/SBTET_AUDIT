define(['app'], function (app) {
    app.service("DrillDownExamService", function (DataAccessService) {
        this.GetBasicManagementTypeList = function () {
            var data = DataAccessService.getDataAll('api/BasicManagementType/GetBasicManagementTypeList');
            return data;
        }
        this.GetExamFormDetailsListByID = function (ExmFrmID) {
            var paramObject = { "ExmFrmID": ExmFrmID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetExamFormDetailsListByID', paramObject);
            return promise;
        }
        this.GetDrillDownStudentDetailsListByCollegeDistrictID = function (CollegeDistrictID, CollegeID, Gender, AcdYrID) {
            var paramObject = { "CollegeDistrictID": CollegeDistrictID, "CollegeID": CollegeID, "Gender": Gender, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetDrillDownStudentDetailsListByCollegeDistrictID', paramObject);
            return promise;
        }
        this.GetDrillDownStudentDetailsListTEST = function (AcdYrID, CollegeDistrictID, LoggedUserId) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeDistrictID": CollegeDistrictID, "LoggedUserId": LoggedUserId };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetDrillDownStudentDetailsListTEST', paramObject);
            return promise;
        }
     
        this.GetDistrictListByStateID = function (StateID) {
            var paramObject = { "StateID": StateID };
            var promise = DataAccessService.getDataWithPara('api/BasicDistricts/GetDistrictListByStateID', paramObject);
            return promise;
        }
        this.GetDetailsByCollegeDistrictID = function (ExamInstID,CollegeID, Gender) {
            var paramObject = { "ExamInstID": ExamInstID, "CollegeID": CollegeID, "Gender": Gender };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetDetailsByCollegeDistrictID', paramObject);
            return promise;
        }

        this.GetCollegedataByMngtypeAndDistrict = function (ExamInstID, AcdYrID, DistrictID, LoggedUserId, MngtTypIDs, CourseID, ExamID, MainGrpID, MediumID, CasteID) {
            var paramObject = {
                "ExamInstID": ExamInstID, "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "LoggedUserId": LoggedUserId, "MngtTypIDs": MngtTypIDs, "CourseID": CourseID, "ExamID": ExamID, "MainGrpID": MainGrpID, "MediumID": MediumID, "CasteID": CasteID
            };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetCollegedataByMngtypeAndDistrict', paramObject);
            return promise;
        }
        this.GetCollegedataByMngtypeAndDistrictByCollege = function (ExamInstID, AcdYrID, DistrictID, CollegeID, Gender, MngtTypIDs, CourseID, ExamID, MainGrpID, MediumID, CasteID) {
            var paramObject = {
                "ExamInstID": ExamInstID, "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "CollegeID": CollegeID, "Gender": Gender,"MngtTypIDs": MngtTypIDs, "CourseID": CourseID, "ExamID": ExamID, "MainGrpID": MainGrpID, "MediumID": MediumID, "CasteID": CasteID
            }; var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetCollegedataByMngtypeAndDistrictByCollege', paramObject);
            return promise;
        }
        this.GetCollegedataByMngtypeAndDistrictByCollegeDistrictID = function (ExamInstID, AcdYrID, DistrictID, CollegeID, gender, MngtTypIDs, CourseID, ExamID, MainGrpID, MediumID, CasteID) {
            var paramObject = {
                "ExamInstID": ExamInstID, "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "CollegeID": CollegeID, "Gender": gender, "MngtTypIDs": MngtTypIDs, "CourseID": CourseID, "ExamID": ExamID, "MainGrpID": MainGrpID, "MediumID": MediumID, "CasteID": CasteID
            }; var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetCollegedataByMngtypeAndDistrictByCollegeDistrictID', paramObject);
            return promise;
        }
        this.GetDistrictListByStateID = function (StateID) {
            var paramObject = { "StateID": StateID };
            var promise = DataAccessService.getDataWithPara('api/BasicDistricts/GetDistrictListByStateID', paramObject);
            return promise;
        }
        this.GetCourseListForRegStud = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetCourseListForRegStud', paramObject);
            return promise;
        }
        this.GetBasicCourseList = function () {
            var data = DataAccessService.getDataAll('api/BasicCourse/GetBasicCourseList');
            return data;
        }
        this.GetMainGroupListByCollegeId = function (CollegeID, CourseID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetMainGroupListByCollegeId', paramObject);
            return promise;
        }
        this.GetBasicBranchListByGroup = function (MainGrpID) {
            var paramObject = { "MainGrpID": MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetBasicBranchListByGroup', paramObject);
            return promise;
        }
        this.GetBasicMediumList = function () {
            var data = DataAccessService.getDataAll('api/BasicMedium/GetBasicMediumList');
            return data;
        }
        this.GetCasteList = function () {
            var data = DataAccessService.getDataAll('api/BasicCaste/GetBasicCasteList');
            return data;
        }
        this.GetCurrentAcademicYearForDrillDown = function () {
            var data = DataAccessService.getDataAll('api/BasicAcademicYear/GetCurrentAcademicYearForDrillDown');
            return data;
        }

        this.GetBasicManagementTypeList = function () {
            var data = DataAccessService.getDataAll('api/BasicManagementType/GetBasicManagementTypeList');
            return data;
        }
        this.GetBasicBranchListByGroup = function (MainGrpID) {
            var paramObject = { "MainGrpID": MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetBasicBranchListByGroup', paramObject);
            return promise;
        }
        this.GetBasicMediumInRegStud = function (CollegeID, BranchID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "BranchID": BranchID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicMediumInRegStud', paramObject);
            return promise;
        }


        this.GetExamFormPaymentDetailsDistrictwise = function (LoggedUserId, ExamInstID, ExamID, DistrictIDs,  CollegeDistrictID,  MngtTypIDs,  CourseID,  MainGrpID,  MediumID,  CasteID) {
            var paramObject = { "LoggedUserId": LoggedUserId, "ExamInstID": ExamInstID, "ExamID": ExamID, "DistrictIDs": DistrictIDs, "CollegeDistrictID": CollegeDistrictID, "MngtTypIDs": MngtTypIDs, "CourseID": CourseID, "MainGrpID": MainGrpID, "MediumID": MediumID, "CasteID": CasteID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetExamFormPaymentDetailsDistrictwise', paramObject);
            return promise;
        }


        this.GetExamFormPaymentDetails = function (ExamInstID, ExamID, CollegeID, DistrictIDs, CollegeDistrictID, MngtTypIDs, CourseID, MainGrpID, MediumID, CasteID) {
            var paramObject = { "ExamInstID": ExamInstID, "ExamID": ExamID, "CollegeID": CollegeID, "DistrictIDs": DistrictIDs, "CollegeDistrictID": CollegeDistrictID, "MngtTypIDs": MngtTypIDs, "CourseID": CourseID, "MainGrpID": MainGrpID, "MediumID": MediumID, "CasteID": CasteID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetExamFormPaymentDetails', paramObject);
            return promise;
        }

        this.GetExamFormPaymentDetailsStudentList = function ( ExamInstID,  ExamID,  CollegeID,  DistrictIDs,  CollegeDistrictID,  MngtTypIDs,  CourseID,  MainGrpID,  MediumID,  CasteID) {
            var paramObject = { "ExamInstID": ExamInstID, "ExamID": ExamID, "CollegeID": CollegeID, "DistrictIDs": DistrictIDs, "CollegeDistrictID": CollegeDistrictID, "MngtTypIDs": MngtTypIDs, "CourseID": CourseID, "MainGrpID": MainGrpID, "MediumID": MediumID, "CasteID": CasteID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetExamFormPaymentDetailsStudentList', paramObject);
            return promise;
        }
        this.GetCurrentBasicExamInstanceForDrillDown = function (ExamInstID) {
            var paramObject = { "ExamInstID": ExamInstID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetBasicExamInstanceListByID', paramObject);
            return promise;
        }
        this.GetBasicExamList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
            return promise;
        }

        this.GetDistrictListByDistrictIDs = function (DistrictIDs) {
            var paramObject = { "DistrictIDs": DistrictIDs };
            var promise = DataAccessService.getDataWithPara('api/BasicDistricts/GetDistrictListByDistrictIDs', paramObject);
            return promise;
        }

    });
});