define(['app'], function (app) {
    app.service("AdminService", function (DataAccessService) {

        this.GetUserTypes = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getUserTypes');
            return promise;
        }

        this.GetUsers = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetUsers');
            return promise;
        }

        this.GetAllUsers = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetAllUsers');
            return promise;
        }

        this.GetActiveBranches = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getActiveBranches');
            return promise;
        }

        

        this.GetStaffTypes = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetStaffTypes');
            return promise;
        }

        this.GetWebSiteVisiterCount = function () {
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetWebSiteVisiterCount');
            return promise;
        }
        
        
        this.getDownloadsList = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getDownloadsList');
            return promise;
        }
    

        this.GetAffiliatedTwshInstitutions = function () {
            var promise = DataAccessService.getDataWithPara('api/TwshStudentReg/GetAffiliatedTwshInstitutions');
            return promise;
        }
        
        this.getNotifications = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getNotifications');
            return promise;
        }

        this.getTenders = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getTenders');
            return promise;
        }

        this.GetAllCourses = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetAllCourses');
            return promise;
        }
        

        this.getUserType = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getUserType');
            return promise;
        }

        this.AddUserPasswords = function (UserName,UserPassword) {
            var paramObj = { "UserName": UserName, "UserPassword": UserPassword };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddUserPasswords', paramObj);
            return promise;
        }

        
        this.GetNotificationByUser = function (usertypeid) {
            var paramObj = { "usertypeid": usertypeid };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetNotificationByUser', paramObj);
            return promise;
        }
        
        this.GetModulesbyRole = function (usertypeid) {
            var paramObj = { "usertypeid": usertypeid };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetModulesbyRole', paramObj);
            return promise;
        }

        this.GetAllModulesbyRole = function (usertypeid) {
            var paramObj = { "usertypeid": usertypeid };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetAllModulesbyRole', paramObj);
            return promise;
        }

        this.GetNotificationsActiveByUser = function (UserTypeId) {
            var paramObj = { "UserTypeId": UserTypeId };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetNotificationsActiveByUser', paramObj);
            return promise;
        }

        this.GetSubModulesbyRole = function (usertypeid, moduleid) {
            var paramObj = { "usertypeid": usertypeid, "moduleid": moduleid };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetSubModulesbyRole', paramObj);
            return promise;
        }


        this.SetSubModuleInactive = function (usertypeid,moduleId,SubModuleId,IsActive) {
            var paramObj = {
                "usertypeid": usertypeid, "moduleId": moduleId,"SubModuleId":SubModuleId,"IsActive":IsActive 
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/SetSubModuleInactive', paramObj);
            return promise;
        }

        this.SetModuleInactive = function (usertypeid, moduleId, IsActive) {
            var paramObj = {
                "usertypeid": usertypeid, "moduleId": moduleId, "IsActive": IsActive
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/SetModuleInactive', paramObj);
            return promise;
        }

        
        

        this.NotificationInactive = function (Id) {
            var paramObj = { "Id": Id };
            var promise = DataAccessService.getDataWithPara('api/AdminService/NotificationInactive', paramObj);
            return promise;
        }

        this.PostNotification = function (NotificationData) {           
            var paramObj = { "Json": NotificationData };
            var promise = DataAccessService.postData('api/AdminService/PostNotification', paramObj);
            return promise;
        };


        this.getUserIdStatus = function (UserName) {
            var paramObj = { "UserName": UserName };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetUserIdStatus', paramObj);
            return promise;
        }
        this.switchUserState = function (UserId) {
            var paramObj = { "UserId": UserId };
            var promise = DataAccessService.getDataWithPara('api/AdminService/SwitchUserStatus', paramObj);
            return promise;
        }

        this.getcollegesList = function () {         
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetCollegesList');
            return promise;
        }
        

        this.getStaffList = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getStaffList');
            return promise;
        }

        
        this.getActiveSchemes = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getActiveSchemes');
            return promise;
        }

        this.getCircularTypes = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getCircularTypes');
            return promise;
        }
        this.getProjects = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetProjects');
            return promise;
        }

        this.getTaskTypes = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetTaskTypes');
            return promise;
        }

        this.getBranchesList = function (CollegeCode) {         
            var paramObj = {"CollegeCode": CollegeCode};
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetBranchList', paramObj);
            return promise;
        }
        
        
        this.CreateUser = function (UserTypeId, UserName, UserPassword, ExpiryDate, FirstName, LastName, Address1, EmailId, CellNo, CollegeId, BranchId) {
            var paramObject = {
                "UserTypeId": UserTypeId, "UserName": UserName, "UserPassword": UserPassword, "ExpiryDate": ExpiryDate, "FirstName": FirstName, "LastName": LastName,
                "Address1": Address1, "EmailId": EmailId, "CellNo": CellNo, "CollegeId": CollegeId, "BranchId": BranchId
            };
         
            var promise = DataAccessService.postData('api/AdminService/createUser', paramObject);
            return promise;
        };


        this.GetSemester = function (UserType) {

            var paramObj = { "UserType": UserType };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetSemester', paramObj);
            return promise;
        }

        this.DeleteBmaAttendee = function (attendeeid, remarks) {
            var paramObject = { "attendeeid": attendeeid, "remarks": remarks };
            var promise = DataAccessService.getDataWithPara('Admission/DeleteBmaAttendee', paramObject);
            return promise;
        }

        this.getCircularsList = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getCirculars');
            return promise;
        }
        
        this.getCircularsActive = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getCircularsActive');
            return promise;
        }


        this.getTendersActive = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getTendersActive');
            return promise;
        }

        

        this.getStaffActive = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getStaffActive');
            return promise;
        }

        this.GetActiveDownloadsList = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetActiveDownloadsList');
            return promise;
        }
        

       
        this.getCircularByUser = function (UserTypeId) {
            var paramObj = { "UserTypeId": UserTypeId }
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetCircularByUser', paramObj);
            return promise;
        }
        
        this.DeleteStaff = function (id) {
            var paramObj = { "id": id }
            var promise = DataAccessService.getDataWithPara('api/AdminService/DeleteStaff', paramObj);
            return promise;
        }

        this.DeleteDownloads = function (id) {
            var paramObj = { "id": id }
            var promise = DataAccessService.getDataWithPara('api/AdminService/DeleteDownloads', paramObj);
            return promise;
        }

        this.DeleteCircular = function (id) {
            var paramObj = { "id": id }
            var promise = DataAccessService.getDataWithPara('api/AdminService/DeleteCircular', paramObj);
            return promise;
        }

        this.DeleteTender = function (id) {
            var paramObj = { "id": id }
            var promise = DataAccessService.getDataWithPara('api/AdminService/DeleteTender', paramObj);
            return promise;
        }
        
        this.SwitchStaff = function (id, IsActive) {
            var paramObj = { "id": id, "IsActive": IsActive }
            var promise = DataAccessService.getDataWithPara('api/AdminService/SwitchStaff', paramObj);
            return promise;
        }


        this.SwitchCircular = function (id,IsActive) {
            var paramObj = { "id": id, "IsActive": IsActive }
            var promise = DataAccessService.getDataWithPara('api/AdminService/SwitchCircular', paramObj);
            return promise;
        }

        this.SwitchDownloads = function (id, IsActive) {
            var paramObj = { "id": id, "IsActive": IsActive }
            var promise = DataAccessService.getDataWithPara('api/AdminService/SwitchDownloads', paramObj);
            return promise;
        }

        this.SwitchTender = function (id, IsActive) {
            var paramObj = { "id": id, "IsActive": IsActive }
            var promise = DataAccessService.getDataWithPara('api/AdminService/SwitchTender', paramObj);
            return promise;
        }

        this.SaveScheamdata = function (UserType, json) {
            var paramObject = { "UserType":UserType, "json": json };
            return DataAccessService.postData('api/AdminService/SaveScheamdata', paramObject);
        }

        this.UploadStaffInfo = function (Name, Photo, Designation, MobileNumber, SectionId,Subject, Email, FileName) {
            var paramObject = {
                "Name": Name, "Photo": Photo, "Designation": Designation, "SectionId": SectionId, "Subject": Subject,
                "Email": Email, "MobileNumber": MobileNumber, "FileName": FileName
            };
                       
            var promise = DataAccessService.postData('api/PreExamination/UploadStaffInfo', paramObject);
            return promise;
        }

        this.UpdateStaffInfo = function (Name, Photo, Designation, Subject,SectionId, Email,MobileNumber, FileName, Id) {
            var paramObject = {
                "Name": Name, "Photo": Photo, "Designation": Designation, "SectionId": SectionId, "Subject": Subject,
                "Email": Email, "MobileNumber": MobileNumber, "FileName": FileName,
                "Id":Id
            };

            var promise = DataAccessService.postData('api/PreExamination/UpdateStaffInfo', paramObject);
            return promise;
        }
        
        

        this.uploadFile = function (ExcelData, CircularFileName, Title, CircularTypeId, NotificationDate) {
            var paramObject = {
                "Title": Title, "Url": ExcelData, "CircularFileName": CircularFileName, "CircularTypeId": CircularTypeId,
                "NotificationDate": NotificationDate
            };

            var promise = DataAccessService.postData('api/PreExamination/uploadFile', paramObject);
            return promise;
        }

        this.UploadDownload = function (ExcelData, CircularFileName, Title, CircularTypeId, NotificationDate) {
            var paramObject = {
                 "Url": ExcelData, "CircularFileName": CircularFileName, "CircularTypeId": CircularTypeId,
                "NotificationDate": NotificationDate,"Title": Title
            };

            var promise = DataAccessService.postData('api/PreExamination/UploadDownload', paramObject);
            return promise;
        }

        this.AddTickets = function (DataType, TaskID, TaskTypeID, ProjectID, TaskDescription, ExcelData, TicketFileName, TaskDate, TaskRemarks, Active,UserName) {
            var paramObject = {
                "DataType": DataType,
                "TaskID": TaskID,
                "TaskTypeID": TaskTypeID,
                "ProjectID": ProjectID,
                "TaskDescription": TaskDescription,
                "TicketFilePath": ExcelData,
                "TicketFileName": TicketFileName,
                "TaskDate": TaskDate,
                "TaskRemarks": TaskRemarks,
                "Active": Active,
                "UserName": UserName
            };

            var promise = DataAccessService.postData('api/AdminService/AddorUpdateorDeleteTickets', paramObject);
            return promise;
        }

        this.UpdateTickets = function (DataType, TaskID, TaskTypeID, ProjectID, TaskDescription, ExcelData, TicketFileName, TaskDate, TaskRemarks, Active, UserName) {
            var paramObject = {
                "DataType": DataType,
                "TaskID": TaskID,
                "TaskTypeID": TaskTypeID,
                "ProjectID": ProjectID,
                "TaskDescription": TaskDescription,
                "TicketFilePath": ExcelData,
                "TicketFileName": TicketFileName,
                "TaskDate": TaskDate,
                "TaskRemarks": TaskRemarks,
                "Active": Active,
                "UserName": UserName
            };

            var promise = DataAccessService.postData('api/AdminService/AddorUpdateorDeleteTickets', paramObject);
            return promise;
        }

        this.DeleteTickets = function (ExcelData, CircularFileName, Title, CircularTypeId, NotificationDate) {
            var paramObject = {
                "Title": Title, "Url": ExcelData, "CircularFileName": CircularFileName, "CircularTypeId": CircularTypeId,
                "NotificationDate": NotificationDate
            };

            var promise = DataAccessService.postData('api/AdminService/AddorUpdateorDeleteTickets', paramObject);
            return promise;
        }

        this.GetTicketsData = function (DataType, UserName, TaskID) {
            var paramObject = {
                "DataType": DataType,
                "UserName": UserName,
                "TaskID": TaskID

            };

            var promise = DataAccessService.getDataWithPara('api/AdminService/GetorEditorDeleteTicketsData', paramObject);
            return promise;
        }

        this.EditTicketData = function (DataType, UserName, TaskID) {
            var paramObject = {
                "DataType": DataType,
                "UserName": UserName,
                "TaskID": TaskID

            };

            var promise = DataAccessService.getDataWithPara('api/AdminService/GetorEditorDeleteTicketsData', paramObject);
            return promise;
        }

        this.DeleteTicketsData = function (DataType, UserName, TaskID) {
            var paramObject = {
                "DataType": DataType,
                "UserName": UserName,
                "TaskID": TaskID

            };

            var promise = DataAccessService.getDataWithPara('api/AdminService/GetorEditorDeleteTicketsData', paramObject);
            return promise;
        }

        this.UpdateCountsData = function (TaskID, Status, Remarks) {
            var paramObject = {
                "TaskID": TaskID,
                "Status": Status,
                "Remarks": Remarks
        
            };

            var promise = DataAccessService.postData('api/AdminService/UpdateCountsData', paramObject);
            return promise;
        }

        this.UpdateWorkAssigned = function (DataType, TaskID, WorkAssignedTo, CompletionStatus, UpdatedFilePath, StatusRemarks) {
            var paramObject = {
                "DataType": DataType,
                "TaskID": TaskID,
                "WorkAssignedTo": WorkAssignedTo,
                "CompletionStatus": CompletionStatus,
                "UpdatedFilePath": UpdatedFilePath,
                "StatusRemarks": StatusRemarks
            };

            var promise = DataAccessService.postData('api/AdminService/UpdateWorkAssigned', paramObject);
            return promise;
        }


        this.UpdateFileStatus = function (DataType, TaskID, WorkAssignedTo, CompletionStatus, ExcelData, UpdatedFileName, StatusRemarks) {
            var paramObject = {
                "DataType": DataType,
                "TaskID": TaskID,
                "WorkAssignedTo": WorkAssignedTo,
                "CompletionStatus": CompletionStatus,
                "UpdatedFilePath": ExcelData,
                "UpdatedFileName": UpdatedFileName,
                "StatusRemarks": StatusRemarks

            };

            var promise = DataAccessService.postData('api/AdminService/UpdateWorkStatus', paramObject);
            return promise;
        }
        this.SetTender = function (ExcelData, TenderFileName, Title, CircularTypeId, TenderDate,EndDate) {
            var paramObject = {
                "Title": Title, "Url": ExcelData, "TenderFileName": TenderFileName,
                "TenderDate": TenderDate, "EndDate": EndDate
            };

            var promise = DataAccessService.postData('api/PreExamination/SetTender', paramObject);
            return promise;
        }
 

        this.UpdateDownloads = function (ExcelData, CircularFileName, Title, CircularTypeId, NotificationDate, Id) {
            var paramObject = {
                "Title": Title, "Url": ExcelData, "CircularFileName": CircularFileName, "CircularTypeId": CircularTypeId,
                "NotificationDate": NotificationDate,"Id":Id
            };

            var promise = DataAccessService.postData('api/PreExamination/UpdateDownloads', paramObject);
            return promise;
        }

        this.UpdateCircular = function (ExcelData, CircularFileName, Title, CircularTypeId, NotificationDate, ID) {
            var paramObject = {
                "Title": Title, "Url": ExcelData, "CircularFileName": CircularFileName, "CircularTypeId": CircularTypeId,
                "NotificationDate": NotificationDate, "ID": ID
            };
            console.log(paramObject)
            var promise = DataAccessService.postData('api/PreExamination/UpdateCircular', paramObject);
            return promise;
        }

        this.UpdateTender = function (ExcelData, TenderFileName, Title, TenderDate,EndDate, Id) {
            var paramObject = {
                "Title": Title, "Url": ExcelData, "TenderFileName": TenderFileName,
                "TenderDate": TenderDate,"EndDate":EndDate, "Id": Id
            };

            var promise = DataAccessService.postData('api/PreExamination/UpdateTender', paramObject);
            return promise;
        }

        this.GetTicketsCount = function (UserName) {
            var paramObj = { "UserName": UserName };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetTicketsCount', paramObj);
            return promise;
        }

        this.GetStatusWiseTickets = function (DataType, UserName) {
            var paramObj = {
                "DataType": DataType,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetStatusWiseTickets', paramObj);
            return promise;
        }
        //this.uploadFile = function (ExcelData, Title, Description, Ids) {
        //    var promise = DataAccessService.uploadFileToUrl('AdminServiceBase/uploadFile?Title=' + Title + '&Description=' + Description + '&Ids='+Ids, ExcelData);
        //    return promise;
        //}

        this.GetTicketsCountData = function (DataType, UserName,User,ProjectID) {
            var paramObject = {
                "DataType": DataType,
                "UserName": UserName,
                "User": User,
                "ProjectID": ProjectID

            };

            var promise = DataAccessService.getDataWithPara('api/AdminService/GetTicketsCountData', paramObject);
            return promise;
        }

        this.GetTicketsReportExcel = function (FromDate,ToDate,UserName) {
            var paramObject = {
                "FromDate": FromDate,
                "ToDate": ToDate,
                "UserName": UserName
            };

            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetTicketsReportExcel', paramObject);
            return promise;
        }


        this.GetStatuswiseReport = function (DataType,UserName) {
            var paramObject = {

                "DataType": DataType,
                "UserName": UserName
                
            };

            var promise = DataAccessService.getDataWithPara('api/AdminService/GetStatuswiseReport', paramObject);
            return promise;
        }


    })
})