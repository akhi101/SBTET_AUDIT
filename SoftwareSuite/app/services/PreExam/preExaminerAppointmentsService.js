$(function () {
    'use strict';
    angular.module('app')
        .factory('preExaminerAppointmentsService',
            function ($http, AppSettings) {

                var serviceBase = AppSettings.WebApiUrl + "api/PreExaminerAppointments/";
                var preExaminerAppointmentsService = {};

                preExaminerAppointmentsService.getBasicExaminerTypes = function () {
                    return $http.get(serviceBase + 'GetBasicExaminerTypes').then(function (results) {
                        return results.data;
                    });
                };

                preExaminerAppointmentsService.getBasicDistrictList = function () {
                    return $http.get(serviceBase + 'GetBasicDistrictList').then(function (results) {
                        return results.data;
                    });
                };

                preExaminerAppointmentsService.getBasicDistrictListByUserId = function (updLoginID) {
                    return $http.get(serviceBase + 'GetBasicDistrictListByUserId', { params: { UpdLoginID: updLoginID } }).then(function (results) {
                        return results.data;
                    });
                };

                preExaminerAppointmentsService.GetBasicDistrictListForCenterFill = function (updLoginID, courseID) {
                    return $http.get(serviceBase + 'GetBasicDistrictListForCenterFill', { params: { UpdLoginID: updLoginID, CourseID: courseID  } }).then(function (results) {
                        return results.data;
                    });
                };

                preExaminerAppointmentsService.getBasicCollegeListByDistrictID = function (districtID) {
                    return $http.get(serviceBase + 'GetBasicCollegeListByDistrictID', { params: { DistrictID: districtID } }).then(function (results) {
                        return results.data;
                    });
                };
                
                preExaminerAppointmentsService.getbasicCampusListByDistrictID = function (ExamInstID, SubType, DistrictID) {
                    return $http.get(serviceBase + 'GetbasicCampusListByDistrictID', { params: { ExamInstID: ExamInstID, SubType: SubType, DistrictID: DistrictID } }).then(function (results) {
                        return results.data;
                    });
                };

                preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneType = function (ExamInstID, ZoneType, DistrictID) {
                    return $http.get(serviceBase + 'GetPracticalCenterListByDistrictIDANDZoneType', { params: { ExamInstID: ExamInstID, ZoneType: ZoneType, DistrictID: DistrictID } }).then(function (results) {
                        return results.data;
                    });
                };
                preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneTypeUrdu = function (ExamInstID, ZoneType, DistrictID) {
                    return $http.get(serviceBase + 'GetPracticalCenterListByDistrictIDANDZoneTypeUrdu', { params: { ExamInstID: ExamInstID, ZoneType: ZoneType, DistrictID: DistrictID } }).then(function (results) {
                        return results.data;
                    });
                };
                preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneTypeByCollegeID = function (ExamInstID, ZoneType, DistrictID, CollegeID) {
                    return $http.get(serviceBase + 'GetPracticalCenterListByDistrictIDANDZoneTypeByCollegeID', { params: { ExamInstID: ExamInstID, ZoneType: ZoneType, DistrictID: DistrictID, CollegeID: CollegeID } }).then(function (results) {
                        return results.data;
                    });
                };


                preExaminerAppointmentsService.getSubjectListByCollegeID = function (collegeID, evalTypID, examID) {
                    return $http.get(serviceBase + 'GetSubjectListByCollegeID', { params: { CollegeID: collegeID, EvalTypID: evalTypID, ExamID: examID } }).then(function (results) {
                        return results.data;
                    });
                };

                preExaminerAppointmentsService.getExaminerListByCollegeID = function (collegeID, exmSubID, examinerTypeID, examID, mainGrpID) {
                    return $http.get(serviceBase + 'GetExaminerListByCollegeID', { params: { CollegeID: collegeID, ExmSubID: exmSubID, ExaminerTypID: examinerTypeID, ExamID: examID, MainGrpID: mainGrpID  } }).then(function (results) {
                        return results.data;
                    });
                };

                preExaminerAppointmentsService.getExaminerListByCollegeIDUrdu = function (collegeID, exmSubID, examinerTypeID, examID, mainGrpID) {
                    return $http.get(serviceBase + 'GetExaminerListByCollegeIDUrdu', { params: { CollegeID: collegeID, ExmSubID: exmSubID, ExaminerTypID: examinerTypeID, ExamID: examID, MainGrpID: mainGrpID } }).then(function (results) {
                        return results.data;
                    });
                };


                preExaminerAppointmentsService.getExaminerBridgeListByCollegeID = function (collegeID, exmSubID, examinerTypeID, examID, mainGrpID) {
                    return $http.get(serviceBase + 'GetExaminerBridgeListByCollegeID', { params: { CollegeID: collegeID, ExmSubID: exmSubID, ExaminerTypID: examinerTypeID, ExamID: examID, MainGrpID: mainGrpID } }).then(function (results) {
                        return results.data;
                    });
                };


                preExaminerAppointmentsService.postPreExaminerAppointmentList = function (preExaminerAppointmentsList) {
                    return $http.post(serviceBase + 'PostPreExaminerAppointmentList', preExaminerAppointmentsList).then(function (results) {
                        return results.data;
                    });
                };

                preExaminerAppointmentsService.deletePreExaminerAppointmentList = function (preExaminerAppointmentsList) {
                    return $http.post(serviceBase + 'DeletePreExaminerAppointmentList', preExaminerAppointmentsList).then(function (results) {
                        return results.data;
                    });
                };
                preExaminerAppointmentsService.getExaminerAppoinmentDetails = function (ExaminerID, ExamInstID) {
                    return $http.get(serviceBase + 'GetExaminerAppoinmentDetails', { params: { ExaminerID: ExaminerID, ExamInstID: ExamInstID } }).then(function (results) {
                        return results.data;
                    });
                };

                preExaminerAppointmentsService.UpdateExaminerAppoinments = function (UpdateExaminer) {
                    return $http.post(serviceBase + 'PostExaminerAppoinments', UpdateExaminer).then(function (results) {
                        return results.data;
                    });
                };
                preExaminerAppointmentsService.ProcessBulkExaminerAppointmnet = function (BulkExaminerAppointmnet) {
                    return $http.post(serviceBase + 'ProcessBulkExaminerAppointmnet', BulkExaminerAppointmnet).then(function (results) {
                        return results.data;
                    });
                };
                preExaminerAppointmentsService.ProcessBulkExaminerAppointmnetGenPract = function (BulkExaminerAppointmnet) {
                    return $http.post(serviceBase + 'ProcessBulkExaminerAppointmnetGenPract', BulkExaminerAppointmnet).then(function (results) {
                        return results.data;
                    });
                };
                preExaminerAppointmentsService.getDistrictWiseTheoryAnswerBookRequirementStatement = function (ExamInstID, DistrictID) {
                    return $http.get(serviceBase + 'GetDistrictWiseTheoryAnswerBookRequirementStatement', { params: { ExamInstID: ExamInstID, DistrictID: DistrictID } }).then(function (results) {
                        return results.data;
                    });
                };
                preExaminerAppointmentsService.GetApoitmentUnApointment = function (ExamInstID, DistrictID, CourseID, ReportType) {
                    return $http.get(serviceBase + 'GetApoitmentUnApointment', { params: { ExamInstID: ExamInstID, DistrictID: DistrictID, CourseID: CourseID, ReportType: ReportType  } }).then(function (results) {
                        return results.data;
                    });
                };
                preExaminerAppointmentsService.GetZoneDetailsText = function (DistrictID, ExamInstID, ReportType) {
                    return $http.get(AppSettings.WebApiUrl + 'api/PreZoneCenter/GetZoneDetailsText', { params: { DistrictID: DistrictID, ExamInstID: ExamInstID, ReportType: ReportType} }).then(function (results) {
                        return results.data;
                    });
                };
                preExaminerAppointmentsService.GetPracticalExamSubjectForPracticalAppointmentList = function (MainGrpID, ExamID) {
                    return $http.get(AppSettings.WebApiUrl + 'api/BasicExamSubject/GetPracticalExamSubjectForPracticalAppointmentList', { params: { MainGrpID: MainGrpID, ExamID: ExamID } }).then(function (results) {
                        return results.data;
                    });
                };
                preExaminerAppointmentsService.GetPracticalExamSubjectForPracticalBridgeAppointmentList = function (ExamID, EvalTypID) {
                    return $http.get(AppSettings.WebApiUrl + 'api/BasicExamSubject/GetPracticalExamSubjectForPracticalBridgeAppointmentList', { params: { ExamID: ExamID, EvalTypID: EvalTypID } }).then(function (results) {
                        return results.data;
                    });
                };
                preExaminerAppointmentsService.GetCenterCollegeID = function (ZoneType, PrePractCntrID, InstanceID) {
                    return $http.get(AppSettings.WebApiUrl + 'api/PreExaminerAppointments/GetCenterCollegeID', { params: { ZoneType: ZoneType, PrePractCntrID: PrePractCntrID, InstanceID: InstanceID } }).then(function (results) {
                        return results.data;
                    });
                };

                return preExaminerAppointmentsService;
            });
}());