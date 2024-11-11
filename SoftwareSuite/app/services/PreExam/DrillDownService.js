define(['app'], function (app) {
    app.service("DrillDownService", function (DataAccessService) {       

        this.GetDrillDownStudentDetailsList = function (AcdYrID) {
            var paramObject = { "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetDrillDownStudentDetailsList', paramObject);
            return promise;
        }
        this.GetDrillDownStudentDetailsListByID = function (PreStudRegID, AcdYrID) {
            var paramObject = { "PreStudRegID": PreStudRegID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetDrillDownStudentDetailsListByID', paramObject);
            return promise;
        }
        this.GetDrillDownStudentDetailsListByCollegeDistrictID = function (AcdYrID, DistrictID, CollegeID, Gender, MngtTypIDs, CourseID, ExamID, MainGrpID, MediumID, CasteID, Feestatus) {
            if (Feestatus == undefined) { Feestatus = 0;}
            var paramObject = {
                "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "CollegeID": CollegeID, "Gender": Gender, "MngtTypIDs": MngtTypIDs, "CourseID": CourseID, "ExamID": ExamID, "MainGrpID": MainGrpID, "MediumID": MediumID, "CasteID": CasteID, "Feestatus": Feestatus
            };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetDrillDownStudentDetailsListByCollegeDistrictID', paramObject);
            return promise;
        }
        this.GetDrillDownStudentDetailsListTEST = function (AcdYrID, DistrictID, LoggedUserId, MngtTypIDs, CourseID, ExamID, MainGrpID, MediumID, CasteID) {
            var paramObject = {
                "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "LoggedUserId": LoggedUserId, "MngtTypIDs": MngtTypIDs, "CourseID": CourseID, "ExamID": ExamID, "MainGrpID": MainGrpID, "MediumID": MediumID, "CasteID": CasteID
            };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetDrillDownStudentDetailsListTEST', paramObject);
            return promise;
        }   
        this.GetDrillDownStudentDetailsListTESTByCollege = function (AcdYrID, DistrictID, CollegeID, Gender, MngtTypIDs, CourseID, ExamID, MainGrpID, MediumID, CasteID) {
            var paramObject = {
                "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "CollegeID": CollegeID, "Gender": Gender, "MngtTypIDs": MngtTypIDs, "CourseID": CourseID, "ExamID": ExamID, "MainGrpID": MainGrpID, "MediumID": MediumID, "CasteID": CasteID};
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetDrillDownStudentDetailsListTESTByCollege', paramObject);
            return promise;
        }        
        this.GetDrillDownStudentDetailsListENVandETHByCollege = function (ExmInstID, ExmSubID, DistrictID) {
            var paramObject = {
                "ExamInstID": ExmInstID, "ExmSubID": ExmSubID, "CollegeDistrictID": DistrictID
            };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetDrillDownStudentDetailsListENVandETHByCollege', paramObject);
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

        //fee paid
        this.GetDrillDownStudentDetailsRecognitionFeeList = function (AcdYrID, DistrictID, LoggedUserId, MngtTypIDs, CourseID, ExamID, MainGrpID, MediumID, CasteID,FeeStatus) {
            var paramObject = {
                "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "LoggedUserId": LoggedUserId, "MngtTypIDs": MngtTypIDs, "CourseID": CourseID, "ExamID": ExamID, "MainGrpID": MainGrpID, "MediumID": MediumID, "CasteID": CasteID, "FeeStatus": FeeStatus
            };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetDrillDownStudentDetailsRecognitionFeeList', paramObject);
            return promise;
        }
        this.GetDrillDownStudentDetailsListRecognitionFeeByCollege = function (AcdYrID, DistrictID, CollegeID, Gender, MngtTypIDs, CourseID, ExamID, MainGrpID, MediumID, CasteID, FeeStatus) {
            var paramObject = {
                "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "CollegeID": CollegeID, "Gender": Gender, "MngtTypIDs": MngtTypIDs, "CourseID": CourseID, "ExamID": ExamID, "MainGrpID": MainGrpID, "MediumID": MediumID, "CasteID": CasteID, "FeeStatus": FeeStatus
            };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetDrillDownStudentDetailsListRecognitionFeeByCollege', paramObject);
            return promise;
        }   



        //for Admission Payment

        this.GetDrillDownPaymentForAdmissionForDistrict = function (AcdYrID, DistrictID, LoggedUserId, MngtTypIDs, CourseID, ExamID, MainGrpID, MediumID, CasteID, PaymentDate) {
            var paramObject = {
                "AcdYrID": AcdYrID, "CollegeDistrictID": DistrictID, "LoggedUserId": LoggedUserId, "MngtTypIDs": MngtTypIDs, "CourseID": CourseID, "ExamID": ExamID, "MainGrpID": MainGrpID, "MediumID": MediumID, "CasteID": CasteID, "PaymentDate": PaymentDate
            };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetDrillDownPaymentForAdmissionForDistrict', paramObject);
            return promise;
        }   
        this.GetDrillDownPaymentForAdmissionForCollege = function (AcdYrID, CollegeID, MngtTypIDs, CourseID, ExamID, MainGrpID, MediumID, CasteID, PaymentDate) {
            var paramObject = {
                "AcdYrID": AcdYrID, "CollegeID": CollegeID, "MngtTypIDs": MngtTypIDs, "CourseID": CourseID, "ExamID": ExamID,
                "MainGrpID": MainGrpID, "MediumID": MediumID, "CasteID": CasteID, "PaymentDate": PaymentDate
            };
            var promise = DataAccessService.getDataWithPara('api/DrillDownStudentDetails/GetDrillDownPaymentForAdmissionForCollege', paramObject);
            return promise;
        } 
        this.GetBasicExamList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
            return promise;
        }
        this.GetPhotoCheckListReportByDIEO = function (ExamID, CourseID, DistrictID) {
            var paramObject = { "ExamID": ExamID, "CourseID": CourseID, "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownAdmission/GetPhotoCheckListReportByDIEO', paramObject);
            return promise;
        }
        this.GetPhotoCheckListReportByCollege = function (CollegeID, ExamID, CourseID, UserTypeFlag) {
            var paramObject = { "CollegeID": CollegeID, "ExamID": ExamID, "CourseID": CourseID, "UserTypeFlag" : UserTypeFlag };
            var promise = DataAccessService.getDataWithPara('api/DrillDownAdmission/GetPhotoCheckListReportByCollege', paramObject);
            return promise;
        }
        this.GetPhotoCheckListReportPDFByCollege = function (CollegeID, ExamID, CourseID) {
            var paramObject = { "CollegeID": CollegeID, "ExamID": ExamID, "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/DrillDownAdmission/GetPhotoCheckListReportPDFByCollege', paramObject);
            return promise;
        }
        this.PostConfirmStudent = function (object) {
            var promise = DataAccessService.postData('api/DrillDownAdmission/PostConfirmStudent', object);
            return promise;
        }

        this.GetBasicManagementTypeListWithAll = function () {
            var data = DataAccessService.getDataAll('api/BasicManagementType/GetBasicManagementTypeListWithAll');
            return data;
        }
        this.GetPraticalDateList = function () {
            var data = DataAccessService.getDataAll('api/BasicCourse/GetPraticalDateList'); //BasicPracticalDetails
            return data;
        }
    });
});