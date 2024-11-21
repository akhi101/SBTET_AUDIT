define(['app'], function (app) {
    app.service("StudentRegService", function (DataAccessService) {
        //this.AddStudentReg = function (object) {
        //    var promise = DataAccessService.putData('api/StudentReg/PutStudentReg', object);
        //    return promise;
        //}
        this.UpdateStudentReg = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/PostStudentReg', object);
            return promise;
        }
        this.UpdateStudentRegFirstTab = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/UpdateStudentRegFirstTab', object);
            return promise;
        }
        this.GetStudentDetailsPrint = function (StudentId) {
            var paramObject = { "StudentId": StudentId };
            var promise = DataAccessService.getDataWithPara('Admission/GetStudentDetailsPrint', paramObject);
            return promise;
        }

        this.GeneratePin = function (StudentID) {
            var paramObject = { "StudentID": StudentID };
            var promise = DataAccessService.getDataWithPara('Admission/GeneratePin', paramObject);
            return promise;
        }
        

        this.getDistricts = function () {
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetDistricts');
            return promise;
        }

        this.GetColleges = function () {
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetColleges');
            return promise;
        }

        
        this.GetMandalsForDistrict = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetMandalsForDistrict', paramObject);
            return promise;
        }
      

        
        this.UpdateStudentRegSecondTab = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/UpdateStudentRegSecondTab', object);
            return promise;
        }
        this.UpdateStudentRegThirdTab = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/UpdateStudentRegThirdTab', object);
            return promise;
        }
        this.UpdateStudentRegAadharAuthenticate = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/UpdateStudentRegAadharAuthenticate', object);
            return promise;
        }
        this.PostupdateEligible = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/PostupdateEligible', object);
            return promise;
        }
        this.PostStudentRegBatchNo = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/PostStudentRegBatchNo', object);
            return promise;
        }
        this.DeleteStudentReg = function (StudentRegId) {
            var paramObject = { "StudentRegId": StudentRegId };
            var promise = DataAccessService.deleteData('api/StudentReg/DeleteStudentReg', paramObject);
            return promise;
        }
        this.FillStudentRegDetailsList = function (CollegeID, SchemeID, SemID, BranchID, SectionID, ShiftID) {
            var paramObject = { "CollegeID": CollegeID, "SchemeID": SchemeID, "SemID": SemID, "BranchID": BranchID, "SectionID": SectionID, "ShiftID": ShiftID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentRegListByCourseExamBranch', paramObject);
            return promise;
        }
        this.GetStudentRegListByCollegeCourseBranch = function (CollegeCode, SchemeID, SemID, BranchID, SectionID, ShiftID, AcademicYearId) {
            //alert(" In Service scheme : " + SchemeID + " Semester : " + SemID + "Branch : " + BranchID + "Academic Year : " + AcademicYearId);
            var paramObject = { "CollegeCode": CollegeCode, "SchemeID": SchemeID, "SemID": SemID, "BranchID": BranchID, "SectionID": SectionID, "ShiftID": ShiftID, "AcademicYearId": AcademicYearId };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentRegListByCollegeCourseBranch', paramObject);
            return promise;
        }

        this.GetStudentRegListByCollegeCourseBranchDataNotUpdated = function (CollegeCode, SchemeID, SemID, BranchID, SectionID, ShiftID, AcademicYearId) {
            //alert(" In Service scheme : " + SchemeID + " Semester : " + SemID + "Branch : " + BranchID + "Academic Year : " + AcademicYearId);
            var paramObject = { "CollegeCode": CollegeCode, "SchemeID": SchemeID, "SemID": SemID, "BranchID": BranchID, "SectionID": SectionID, "ShiftID": ShiftID, "AcademicYearId": AcademicYearId };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentRegListByCollegeCourseBranchDataNotUpdated', paramObject);
            return promise;
        }

        this.GetStudentRegListByCollegeCourseBranchAadharNotVerified = function (CollegeCode, SchemeID, SemID, BranchID, SectionID, ShiftID, AcademicYearId) {
            //alert(" In Service scheme : " + SchemeID + " Semester : " + SemID + "Branch : " + BranchID + "Academic Year : " + AcademicYearId);
            var paramObject = { "CollegeCode": CollegeCode, "SchemeID": SchemeID, "SemID": SemID, "BranchID": BranchID, "SectionID": SectionID, "ShiftID": ShiftID, "AcademicYearId": AcademicYearId };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentRegListByCollegeCourseBranchAadharNotVerified', paramObject);
            return promise;
        }

        this.GetAdmissionPinReports = function (CollegeCode, branchid, semid, AcademicYear, DataFormatTypeId) {
            var paramObject = {"CollegeCode": CollegeCode,"BranchId":branchid ,"semid": semid, "AcademicYearId": AcademicYear, "DataFormatTypeId": DataFormatTypeId };
            var promise = DataAccessService.getDataWithPara('Admission/GetAdmissionPinReports', paramObject);
            return promise;
        }

        this.FillStudentRegDetailsListForCollege = function (CollegeCode, UserId) {
            var paramObject = { "CollegeCode": CollegeCode, "UserId": UserId };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentRegListForCollege', paramObject);
            return promise;
        }
        this.FillStudentRegDetailsListByAdmNoOrPhoto = function (CollegeID, WithPhoto, AdmNo) {
            var paramObject = { "CollegeID": CollegeID, "WithPhoto": WithPhoto, "AdmNo": AdmNo };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentRegDetailsListByAdmNoOrPhoto', paramObject);
            return promise;
        }
        this.FillStudentRegDetailsListByGroupAndMedium = function (CollegeID, MainGrpID, MediumID, SubjectID) {
            var paramObject = { "CollegeID": CollegeID, "MainGrpID": MainGrpID, "MediumID": MediumID, "SubjectID": SubjectID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentRegDetailsListByGroupAndMedium', paramObject);
            return promise;
        }
        this.FillStudentRegDetailsListAll = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentRegDetailsListAll', paramObject);
            return promise;
        }
        this.FillStudentRegDetailsListForPhotoUpload = function (CollegeID, CourseID, ExamID, BranchID, WithPhoto) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID, "WithPhoto": WithPhoto };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentRegDetailsListForPhotoUpload', paramObject);
            return promise;
        }
        this.FillStudentRegDetailsListForPhotoUploadOrForAadhar = function (CollegeID, CourseID, ExamID, BranchID, WithPhoto, ForAadhar) {
            var paramObject = {
                "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID, "WithPhoto": WithPhoto, "ForAadhar": ForAadhar
            };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentRegDetailsListForPhotoUpload', paramObject);
            return promise;
        }

        this.FillStudentRegDetailsListForApproval = function (CollegeID, CourseID, ExamID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentRegListByCourseExamBranchForApproval', paramObject);
            return promise;
        }
        this.FillStudentListForRecognationFeePaid = function (CollegeID, CourseID, ExamID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentListForRecognationFeePaid', paramObject);
            return promise;
        }
        this.FillStudentListForManageStudents = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentListForManageStudents', paramObject);
            return promise;
        }
        this.DeleteManageStudents = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/DeleteManageStudents', object);
            return promise;
        }
        //this.DeleteManageStudents = function (object) {
        //    // var paramObject = { "StudentReg": StudentReg };
        //    var promise = DataAccessService.deleteData('api/StudentReg/DeleteManageStudents', object);
        //    return promise;
        //}
        this.GetStudentRegById = function (StudRegID) {

            var paramObject = { "StudRegID": StudRegID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentRegById', paramObject);
            return promise;
        }
        this.GetStaticDataForAdmission = function () {

            var promise = DataAccessService.getDataAll('api/StudentReg/GetStaticDataForAdmission');
            return promise;
        }

       
        this.GetCheckDependancy = function (StudentRegId) {
            var paramObject = { "StudentRegId": StudentRegId };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetCheckDependancy', paramObject);
            return promise;
        }

        this.GetCourseList = function () {
            var data = DataAccessService.getDataAll('api/BasicCourse/GetCourseList');
            return data;
        }

        this.getActiveBranches = function () {
            var data = DataAccessService.getDataAll('Admission/getActiveBranches');
            return data;
        }

        

        this.GetMotherTongueList = function () {
            var data = DataAccessService.getDataAll('api/BasicMotherTongue/GetBasicMotherTongueList');
            return data;
        }
        this.GetOccupationList = function () {
            var data = DataAccessService.getDataAll('api/BasicOccupation/GetBasicOccupationList');
            return data;
        }
        this.GetCommunityList = function () {
            var data = DataAccessService.getDataAll('api/BasicCommunity/GetBasicCommunityList');
            return data;
        }
        this.GetCasteList = function () {
            var data = DataAccessService.getDataAll('api/BasicCaste/GetBasicCasteList');
            return data;
        }
        this.GetSubCastListByCasteID = function (CasteId) {
            var paramObject = { "CasteId": CasteId };
            var promise = DataAccessService.getDataWithPara('api/BasicSubCaste/GetSubCastListByCasteID', paramObject);
            return promise;
        }
        this.GetMediumList = function (CollegeID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicMediumInAdmissionStud', paramObject);
            return promise;
        }
        this.GetBasicMediumList = function () {
            var data = DataAccessService.getDataAll('api/BasicMedium/GetBasicMediumList');
            return data;
        }
        this.GetBasicMediumListByCollegeId = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicMedium/GetBasicMediumListByCollegeId', paramObject);
            return promise;
        }

        this.GetSecondLangList = function (CollegeID, StudRegID) {
            var paramObject = { "CollegeID": CollegeID, "StudRegID": StudRegID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicSubjectListForSecondLangauge', paramObject);
            return promise;
        }
        this.GetWithdrawlReasonList = function () {
            var data = DataAccessService.getDataAll('api/BasicWithdrawlReason/GetBasicWithdrawlReasonList');
            return data;
        }
        this.GetIncGrList = function () {
            var data = DataAccessService.getDataAll('api/BasicIncomeGroups/GetBasicIncomeGroupsList');
            return data;
        }
        this.GetMandalList = function () {
            var data = DataAccessService.getDataAll('api/BasicMandal/GetBasicMandalList');
            return data;
        }
        this.GetMandalListByDistrict = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/BasicMandal/GetBasicMandalByDistrictID', paramObject);
            return promise;
        }
        this.GetStateList = function () {
            var data = DataAccessService.getDataAll('api/BasicState/GetBasicStateList');
            return data;
        }
        this.GetDistrictListByStateID = function (StateID) {
            var paramObject = { "StateID": StateID };
            var promise = DataAccessService.getDataWithPara('api/BasicDistricts/GetDistrictListByStateID', paramObject);
            return promise;
        }
        this.GetMainGroupListForStudAdmission = function (CollegeID, StudRegID) {
            var paramObject = { "CollegeID": CollegeID, "StudRegID": StudRegID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetMainGroupListForStudAdmission', paramObject);
            return promise;
        }
        this.GetMainGroupList = function () {
            var data = DataAccessService.getDataAll('api/BasicMainGroup/GetBasicMainGroupList');
            return data;
        }
        this.GetMainGroupListByCollegeId = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetMainGroupListByCollegeId', paramObject);
            return promise;
        }
        this.GetPhysDisbList = function () {
            var data = DataAccessService.getDataAll('api/BasicPhysDisability/GetBasicPhysDisabilityList');
            return data;
        }
        this.GetSpclConsList = function () {
            var data = DataAccessService.getDataAll('api/BasicSpclConsiderations/GetBasicSpclConsiderationsList');
            return data;
        }
        this.GetExamList = function () {
            var data = DataAccessService.getDataAll('api/BasicExam/GetBasicExamList');
            return data;
        }
        this.GetBasicExamList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
            return promise;
        }
        //this.GetStudCatList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicStudentCategory/GetBasicStudentCategoryList');
        //    return data;
        //}
        //this.PostStudentRegPhoto = function (SignFile, ApplicantId, UserId) {
        //    var promise = DataAccessService.postData('api/StudentReg/PostStudentRegPhoto', object);
        //    return promise;
        //}
        this.AddStudentRegPhoto = function (Photofile, StudRegID, SSCHallTicket, UpdLoginID) {
            var promise = DataAccessService.PutUploadImage('api/StudentReg/PutFileUpload1', Photofile, StudRegID, SSCHallTicket, UpdLoginID, "P");
            return promise;
        }
        this.AddStudentRegSign = function (Photofile, StudRegID, SSCHallTicket, UpdLoginID) {
            var promise = DataAccessService.PutUploadImage('api/StudentReg/PutFileUpload1', Photofile, StudRegID, SSCHallTicket, UpdLoginID, "S");
            return promise;
        }
        this.FillStudRegStatusForReport = function (CollegeID, CourseID, BranchID, ReportType) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "BranchID": BranchID, "ReportType": ReportType };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudRegStatusForReport', paramObject);
            return promise;
        }
        this.GetStudentRegByIdForApproved = function (StudRegID) {
            var paramObject = { "StudRegID": StudRegID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentRegByIdForApproved', paramObject);
            return promise;
        }
        this.UpdateStudentCertificates = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/PostUpdateStudentCertificates', object);
            return promise;
        }
        this.FillStudentRegDetailsListForUpdateCertificates = function (CollegeID, CourseID, ExamID, BranchID, WithCertificates) {
            var paramObject = {
                "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID, "WithCertificates": WithCertificates
            };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetFillStudentRegDetailsListForUpdateCertificates', paramObject);
            return promise;
        }
        this.PostStudentAadhar = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/PostStudentAadhar', object);
            return promise;
        }
        this.GetStudentTempAadhar = function (AadharNo) {
            var paramObject = { "AadharNo": AadharNo };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentTempAadhar', paramObject);
            return promise;
        }
        this.PostStudentAadharStatus = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/PostStudentAadharStatus', object);
            return promise;
        }
        this.GetCheckFromTodate = function (FromDate, ToDate) {
            var paramObject = { "FromDate": FromDate, "ToDate": ToDate };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetCheckFromTodate', paramObject);
            return promise;
        }
        this.FillStudentRegDetailsListForGroupChange = function (CollegeID, CourseID, ExamID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetFillStudentRegDetailsListForGroupChange', paramObject);
            return promise;
        }
        this.PostGroupChange = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/PostGroupChange', object);
            return promise;
        }
        this.GetBasicSubjectListForSecondLangaugeInRegStud1 = function (CollegeID, CourseID, AcdYrID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "AcdYrID": AcdYrID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicSubjectListForSecondLangaugeInRegStud', paramObject);
            return promise;
        }
        this.GetBasicMediumInRegStud = function (CollegeID, BranchID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "BranchID": BranchID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicMediumInRegStud', paramObject);
            return promise;
        }
        this.GetSSCHallTicketData = function (SSCHallTicket) {
            var paramObject = { "SSCHallTicket": SSCHallTicket };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetSSCHallTicketData', paramObject);
            return promise;
        }
        this.GetPaymentForRecognition = function (FeeAmount) {
            var paramObject = { "FeeAmount": FeeAmount };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetPaymentForRecognition', paramObject);
            return promise;
        }

        this.StudCheckData = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/PostOrderID', object);
            return promise;
        }
        this.GenPin = function (StudentID) {
            var paramObject = { "StudentID": StudentID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GenPin', paramObject);
            return promise;
        }

        this.ReqRdKyc = function (pidOptions) {
            var promise = DataAccessService.postRdKyc(pidOptions);
            return promise;
        };
        this.ReqRdKyc2 = function (pidOptions) {
            var promise = DataAccessService.postRdKyc2(pidOptions);
            return promise;
        };

        this.ReqRdFpKyc = function (url, pidOptions) {
            var promise = DataAccessService.postRdFpKyc(url, pidOptions);
            return promise;
        };

        this.ReqRdIrisKyc = function (url, pidOptions) {
            var promise = DataAccessService.postRdIrisKyc(url, pidOptions);
            return promise;
        };

        this.DoAadhaarKyc = function (aadhaarNo, xmlData, serType) {
            var paramObject = { "AadhaarNo": aadhaarNo, "ReqXml": xmlData, "ServiceType": serType };
            var promise = DataAccessService.postData('Admission/DoAadhaarKyc', paramObject);
            return promise;
        }
        
        this.StudentAadhaarVerified = function (StudentId, AadhaarNo) {
            var paramObject = { "StudentId": StudentId, "AadhaarNo": AadhaarNo };
            var promise = DataAccessService.getDataWithPara('Admission/StudentAadhaarVerified', paramObject);
            return promise;
        };
        this.GetAttendeeidbyPin = function (Pin) {
            var paramObject = { "Pin": Pin };
            var promise = DataAccessService.getDataWithPara('Admission/GetAttendeeidbyPin', paramObject);
            return promise;
        };

        this.RegisterBmaAttendee = function (ReqData) {
            var paramObj = { "ReqData": ReqData };
            var promise = DataAccessService.postData('Admission/RegisterBmaAttendee', ReqData);
            return promise;
        };

        this.GetTransferCollegeDetails = function (AcademicYearId, CollegeCode, BranchCode, SemId) {
            var paramObject = { "AcademicYearId": AcademicYearId, "CollegeCode": CollegeCode, "BranchCode": BranchCode, "SemId": SemId };
            var promise = DataAccessService.getDataWithPara('Admission/GetTransferCollegeDetails', paramObject);
            return promise;
        };

        this.GetTransferStudentdetails = function (Pin) {
            var paramObject = { "Pin": Pin };
            var promise = DataAccessService.getDataWithPara('Admission/GetTransferStudentdetails', paramObject);
            return promise;
        };


        this.GetBranchList = function (CollegeCode) {
            var paramObject = { "CollegeCode": CollegeCode };
            var promise = DataAccessService.getDataWithPara('Academic/GetBranchList', paramObject);
            return promise;
        }
        this.TransferStudent = function (ReqData) {
           // var paramObj = { "ReqData": ReqData };
            var promise = DataAccessService.postData('Admission/TransferStudent', ReqData);
            return promise;
        };
        this.SendStudentDetailsASSms = function (Message, CellNo) {
           // var paramobj = { "Message": Message, "CellNo": CellNo };
            var Urlstring ="?User=sbtetts&Passwd=sbtet@1972&Sid=SBTETS&Mobilenumber=91" + CellNo + "&Message=" + Message + "&Mtype=N&DR`=Y";
            var promise = DataAccessService.getDataWithPara('http://api.smscountry.com/SMSCwebservice_bulk.aspx' + Urlstring,"");
            return promise
        };

       
    });
});