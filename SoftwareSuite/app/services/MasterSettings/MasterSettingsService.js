define(['app'], function (app) {
    app.service("MasterSettingsService", function (DataAccessService) {

        this.SetMonthYear = function (Sem, AcademicYear, Scheme, studentType, examYearmonth) {
            var paramObject = {
                "SemId": Sem, "AcademicYearId": AcademicYear,
                "SchemeId": Scheme, "StudentTypeId": studentType, "ExamYearMonth": examYearmonth,
                //"IsActive": '1' 
            };
            return DataAccessService.postData('api/PreExamination/SetMonthYear', paramObject);
        };

        this.getTantalizationReport = function () {
            var promise = DataAccessService.getDataWithPara('api/PreExamination/getTantalizationReport');
            return promise;
        }

        this.UploadHomePageSlides = function (FileName,sign) {
            var paramObject = { "FileName": FileName, "photoPath": sign };
            var promise = DataAccessService.postData('api/PreExamination/UploadHomePageSlides', paramObject);
            return promise;
        }

        
        this.getAttendanceSMSList = function () {
            return DataAccessService.getDataAll('api/PreExamination/getAttendanceSMSList');
        };

        this.getSubjectList = function () {
            return DataAccessService.getDataAll('api/PreExamination/getSubjectList');
        };

        this.getSubjectList = function () {
            return DataAccessService.getDataAll('api/PreExamination/getSubjectList');
        };

        this.getWebsiteFeedbackReport = function () {
            return DataAccessService.getDataAll('api/PreExamination/getWebsiteFeedbackReport');
        };

        this.getSubjectList1 = function () {
            return DataAccessService.getDataAll('api/PreExamination/getSubjectList1');
        };

        this.GetBranchs = function () { 
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetBranchs');
            return promise;
        }

        
        this.UpdatePresumptiveAttendance = function (PIN, NumberOfDays, username,ExamMonthYearId) {
            var paramObject = {
                "PIN": PIN,
                "NumberOfDays": NumberOfDays,
                "username": username,
                "ExamMonthYearId": ExamMonthYearId
                
            };
            return DataAccessService.getDataWithPara('MasterPage/UpdatePresumptiveAttendance', paramObject);
        };

        this.UpdateC09MarksData = function (DataTypeId, Scheme,SemId, ExamMonthYearId, pin, SubjectCode, Internal, EndExam, SubjectTotal,Remarks) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "Scheme": Scheme,
                "SemId": SemId,
                "ExamMonthYearId": ExamMonthYearId,
                "pin": pin,
                "SubjectCode": SubjectCode,
                "Internal": Internal,
                "EndExam": EndExam,
                "SubjectTotal": SubjectTotal,
                "Remarks": Remarks
            };
            return DataAccessService.getDataWithPara('MasterPage/UpdateC09MarksData', paramObject);
        };

        this.GetSemester = function () {
            var promise = DataAccessService.getDataWithPara('MasterPage/GetSemester');
            return promise;
        }

        this.GetColleges = function () {
            var promise = DataAccessService.getDataWithPara('MasterPage/GetColleges');
            return promise;
        }
        
        this.getActiveBranches = function () {
            var promise = DataAccessService.getDataWithPara('MasterPage/getActiveBranches');
            return promise;
        }
        
        this.GetExamMonthYear = function () {
            var promise = DataAccessService.getDataWithPara('MasterPage/GetExamMonthYear');
            return promise;
        }
        

        this.getSchemes = function () {
            var promise = DataAccessService.getDataWithPara('Admission/getSchemes');
            return promise;
        }
        
        this.GetSubjectTypes = function () {
            var promise = DataAccessService.getDataWithPara('MasterPage/GetSubjectTypes');
            return promise;
        }

        

        this.GetSchemeBranchs = function () {
            var promise = DataAccessService.getDataWithPara('MasterPage/GetSchemeBranchs');
            return promise;
        }
        
        this.getModules = function () {
            var promise = DataAccessService.getDataWithPara('MasterPage/GetModules');
            return promise;
        }

        this.GetMasterSubjects = function (SchemeId, BranchId, SemId) {
            var paramObject = {
                "SchemeId": SchemeId, "BranchId": BranchId, "SemId": SemId
            }
            return DataAccessService.getDataWithPara('MasterPage/GetMasterSubjects', paramObject);
        };

        this.ChangeSchemeBranchStatus = function (Id, IsActive) {
            var paramObject = {
                "Id": Id, "IsActive": IsActive
            }
            return DataAccessService.getDataWithPara('MasterPage/ChangeSchemeBranchStatus', paramObject);
        };
        
        this.getUserById = function (id) {
            var paramObject = {
                "id": id
            }
            return DataAccessService.getDataWithPara('MasterPage/getUserById', paramObject);
        };
        
       
        this.AddSchemeBranches = function (DataTypeId, schemeid, SchemeCode, BranchId, BranchCode) {
            var paramObject = {
                "DataTypeId": DataTypeId, "schemeid": schemeid, "SchemeCode": SchemeCode,
                "BranchId": BranchId, "BranchCode": BranchCode
            }
            return DataAccessService.getDataWithPara('MasterPage/AddSchemeBranches', paramObject);
        };
        
        this.AddUser = function (DataTypeId, UserName, UserTypeId, UserPassword, FirstName, LastName, Address,
            EmailId, CellNo, CollegeId, BranchId) {
           
            var paramObject = {
            "DataTypeId": DataTypeId,
        "UserName": UserName, "UserTypeId": UserTypeId,
                "UserPassword": UserPassword, "FirstName": FirstName,"LastName": LastName, "Address": Address,
                "EmailId": EmailId, "CellNo": CellNo,"CollegeId": CollegeId, "BranchId": BranchId
            }
          
            return DataAccessService.getDataWithPara('MasterPage/AddUser', paramObject);
        };
        

        this.getAttendanceByPin = function (Pin, ExamMonthYearId) {
            //alert(Pin)
            var paramObject = { "Pin": Pin, "ExamMonthYearId": ExamMonthYearId };
            console.log(paramObject)
            return DataAccessService.getDataWithPara('MasterPage/getAttendanceByPin', paramObject);
        };

        
        this.EditSubject = function (Subject_Code, subid) {
            var paramObject = {
                "Subject_Code": Subject_Code,
                "subid": subid
            };    
            return DataAccessService.getDataWithPara('MasterPage/EditSubject', paramObject);
        };

        this.getSubModules = function () {
            var promise = DataAccessService.getDataWithPara('MasterPage/getSubModules');
            return promise;
        }



        this.getModuleColors = function () {
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetModuleColours');
            return promise;
        }

        this.getAllModules = function () {
            var promise = DataAccessService.getDataWithPara('MasterPage/getAllModules');
            return promise;
        }

        this.getAllUserModules = function () {
            var promise = DataAccessService.getDataWithPara('MasterPage/getAllUserModules');
            return promise;
        }

        this.getAllSubModules = function () {
            var promise = DataAccessService.getDataWithPara('MasterPage/getAllSubModules');
            return promise;
        }

        this.getAllUserSubModules = function () {
            var promise = DataAccessService.getDataWithPara('MasterPage/getAllUserSubModules');
            return promise;
        }

        this.UserSubModuleInactive = function (Id, IsActive, UserTypeId) {
            var paramObject = {
                "Id": Id, "IsActive": IsActive, "UserTypeId": UserTypeId
            };
            return DataAccessService.postData('MasterPage/UserSubModuleInactive', paramObject);
        }

        this.GetSubmodulesByModule = function (ModuleId) {
            var paramObject = {
                "ModuleId": ModuleId 
            };
            return DataAccessService.postData('MasterPage/GetSubmodulesByModule', paramObject);
        }

        this.DeleteSubject = function (subid) {
            var paramObject = {
                "subid": subid
            };
            return DataAccessService.postData('MasterPage/DeleteSubject', paramObject);
        }


        this.EditScheme = function (Id) {
            var paramObject = { "Id": Id };
            return DataAccessService.getDataWithPara('MasterPage/EditScheme', paramObject);
        };

        this.DeleteScheme = function (Id) {
            var paramObject = { "Id": Id };
            return DataAccessService.getDataWithPara('MasterPage/DeleteScheme', paramObject);
        };
        
        this.UpdateScheme = function (Id, Scheme) {
            var paramObject = { "Id": Id, "Scheme": Scheme };
            return DataAccessService.getDataWithPara('MasterPage/UpdateScheme', paramObject);
        };

        this.SetSchemeStatus = function (Id, IsActive) {
            var paramObject = { "Id": Id, "IsActive": IsActive };
            return DataAccessService.getDataWithPara('MasterPage/SetSchemeStatus', paramObject);
        };
        

        this.UserModuleInactive = function (Id, IsActive, UserTypeId) {
            var paramObject = {
                "Id": Id, "IsActive": IsActive, "UserTypeId": UserTypeId
            };
            return DataAccessService.postData('MasterPage/UserModuleInactive', paramObject);
        }
       
         this.AddSubjects = function (DataTypeId, Subject_Code, SubjectName,Mid1Max_Marks,Mid2Max_Marks,InternalMax_Marks,
           Credits, subtype, semid, end_exam_max_marks, iselective, schemeid,branchid, PCode, BoardQuestionPaper, ElectiveSet, Mid3Max_Marks,subid) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "Subject_Code": Subject_Code,
                "SubjectName": SubjectName,
                "Mid1Max_Marks": Mid1Max_Marks,
                "Mid2Max_Marks": Mid2Max_Marks,
                "InternalMax_Marks": InternalMax_Marks,
                "Credits": Credits,
                "subtype": subtype,
                "semid": semid,
                "end_exam_max_marks": end_exam_max_marks,
                "iselective": iselective,
                "schemeid":schemeid,
                "branchid": branchid,
                "PCode": PCode,
                "BoardQuestionPaper": BoardQuestionPaper,
                "ElectiveSet": ElectiveSet,
                "Mid3Max_Marks": Mid3Max_Marks,
                "subid": subid
                       
            };
            var param = {
                "DataTypeId": DataTypeId,
                "Subject_Code": Subject_Code,
                "SubjectName": SubjectName,
                "Mid1Max_Marks": Mid1Max_Marks,
                "Mid2Max_Marks": Mid2Max_Marks,
                "InternalMax_Marks": InternalMax_Marks,
                "Credits": Credits,
                "subtype": subtype,
                "semid": semid,
                "end_exam_max_marks": end_exam_max_marks,
                "iselective": iselective,
                "schemeid": schemeid,
                "branchid": branchid,
                "PCode": PCode,
                "BoardQuestionPaper": BoardQuestionPaper,
                "ElectiveSet": ElectiveSet,
                "Mid3Max_Marks": Mid3Max_Marks,
                

            };
            //console.log(paramObject)
            if (DataTypeId == 1) {
                return DataAccessService.postData('MasterPage/AddSubjects', param);
            } else {
                return DataAccessService.postData('MasterPage/UpdateSubjects', paramObject);
            }
       
        }

        this.SetCurrentMonthYear = function (studentType, examYearmonth) {
            var paramObject = {
                "StudentTypeId": studentType, "ExamYearMonth": examYearmonth
            };
            return DataAccessService.postData('api/PreExamination/SetCurrentMonthYear', paramObject);
        }

        this.AddModule = function (ModuleName, Class, ModuleRouteName) {
            var paramObject = {
                "ModuleName": ModuleName, "Class": Class, "ModuleRouteName": ModuleRouteName
            };
            return DataAccessService.postData('MasterPage/AddModule', paramObject);
        }

        this.AddUserModule = function (UserTypeId, ModuleId) {
            var paramObject = {
                "UserTypeId": UserTypeId, "ModuleId": ModuleId
            };
            return DataAccessService.postData('MasterPage/AddUserModule', paramObject);
        }

        this.AddSubModules = function (ModuleId, ClassId, SubModuleName, SubModuleRouteName) {
            var paramObject = {
                "ModuleId": ModuleId, "ClassId": ClassId, "SubModuleName": SubModuleName, "SubModuleRouteName": SubModuleRouteName
            };
            return DataAccessService.postData('MasterPage/AddSubModules', paramObject);
        }


        this.AddUserSubModule = function (UserTypeId, ModuleId, SubModuleId) {
            var paramObject = {
                "UserTypeId": UserTypeId, "ModuleId": ModuleId, "SubModuleId": SubModuleId
            };
            return DataAccessService.postData('MasterPage/AddUserSubModule', paramObject);
        }

        this.GetUserTypes = function (DataType, UserTypeID, Active) {
            var paramObj = {
                "DataType": DataType,
                "UserTypeID": UserTypeID,
                "Active": Active
            };
            var promise = DataAccessService.postData('MasterPage/GetorEditorActiveUserTypes', paramObj);
            return promise;
        };

        this.GetActiveUserTypes = function (DataType, UserTypeID, Active) {
            var paramObj = {
                "DataType": DataType,
                "UserTypeID": UserTypeID,
                "Active": Active
            };
            var promise = DataAccessService.postData('MasterPage/GetorEditorActiveUserTypes', paramObj);
            return promise;
        };

        this.EditUserTypes = function (DataType, UserTypeID, Active) {
            var paramObj = {
                "DataType": DataType,
                "UserTypeID": UserTypeID,
                "Active": Active
            };
            var promise = DataAccessService.postData('MasterPage/GetorEditorActiveUserTypes', paramObj);
            return promise;
        };

        this.AddUserTypes = function (paramObject) {

            return DataAccessService.postData('MasterPage/AddorUpdateUserTypes', paramObject);
        };

        this.UpdateUserTypes = function (paramObject) {

            return DataAccessService.postData('MasterPage/AddorUpdateUserTypes', paramObject);
        };


        this.GetUsers = function (DataType, UserTypeID, UserID, Active) {
            var paramObj = {
                "DataType": DataType,
                "UserTypeID": UserTypeID,
                "UserID": UserID,
                "Active": Active
            };
            var promise = DataAccessService.postData('MasterPage/GetorEditorActiveUsers', paramObj);
            return promise;
        };

        this.GetUsers = function (DataType, UserTypeID, UserID, Active) {
            var paramObj = {
                "DataType": DataType,
                "UserTypeID": UserTypeID,
                "UserID": UserID,
                "Active": Active
            };
            var promise = DataAccessService.postData('MasterPage/GetorEditorActiveUsers', paramObj);
            return promise;
        };

        this.EditUsers = function (DataType, UserTypeID,UserID, Active) {
            var paramObj = {
                "DataType": DataType,
                "UserTypeID": UserTypeID,
                "UserID": UserID,
                "Active": Active
            };
            var promise = DataAccessService.postData('MasterPage/GetorEditorActiveUsers', paramObj);
            return promise;
        };

        this.AddUser = function (paramObject) {

            return DataAccessService.postData('MasterPage/AddorUpdateUsers', paramObject);
        };

        this.UpdateUser = function (paramObject) {

            return DataAccessService.postData('MasterPage/AddorUpdateUsers', paramObject);
        };


    })
})