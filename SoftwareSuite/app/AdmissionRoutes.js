define([], function () {

    return {

        routes: {
            //'/': {
            //    url: "",
            //    templateurl: "app/indexintrm.html"
            //   // templateurl: 'website/about-right-info.html'
           
            //'about-right-info': {
            //    url: "/about-right-info",
            //    templateurl:  '/website/about-right-info.html'              
            //}, 
            //'about-sbtet': {AdmissionSub
            //    url: "/about-sbtet",
            //    templateurl: '/website/about-sbtet.html',
            //    dependencies: []
            //},
            //'affiliated-college': {
            //    url: "affiliated-college",Upload
            //    templateurl: ' /website/affiliated-college.html'
            //}, 
            //'affiliation-login': {
            //    url: "affiliation-login",
            //    templateurl: ' /website/affiliation-login.html'
            //}, 
            //'apio': {
            //    url: "apio",
            //    templateurl: ' /website/apio.html'
            //}, 
            //'ccic-portal': {
            //    url: "ccic-portal",
            //    templateurl: ' /website/ccic-portal.html'
            //}, 
            //'citizen-charter': {
            //    url: "citizen-charter",
            //    templateurl: ' /website/citizen-charter.html'
            //}, 
            //'contact-us': {
            //    url: "contact-us",
            //    templateurl: ' /website/contact-us.html'
            //}, 
            //'digital-evaluation': {
            //    url: "digital-evaluation",
            //    templateurl: ' /website/digital-evaluation.html'
            //}, 
            //'diploma-results': {
            //    url: "diploma-results",
            //    templateurl: ' /website/diploma-results.html'
            //}, 
            //'disclaimer': {
            //    url: "disclaimer",
            //    templateurl: ' /website/disclaimer.html'
            //}, 
            //'downloads': {
            //    url: "",
            //    templateurl: ' /website/downloads.html'
            //}, 
            //'events': {
            //    url: "events",
            //    templateurl: ' /website/events.html'
            //}, 
            //"faq's": {
            //    url: "faq's",
            //    templateurl: " /website/faq's.html"
            //}, 
            //"free-payment": {
            //    url: "free-payment",
            //    templateurl: " /website/free-payment.html"
            //}, 
            //"full-details-act": {
            //    url: "full-details-act",
            //    templateurl: " /website/full-details-act.html"
            //}, 
            //"government_orders": {
            //    url: "government_orders",
            //    templateurl: " /website/government_orders.html"
            //}, 
            //"hierarchy": {
            //    url: "hierarchy",
            //    templateurl: " /website/hierarchy.html"
            //}, 
            //"latest_news": {
            //    url: "latest_news",
            //    templateurl: " /website/latest_news.html"
            //}, 
            //"notifications": {
            //    url: "notifications",
            //    templateurl: " /website/notifications.html"
            //}, 
            //"obligations": {
            //    url: "obligations",
            //    templateurl: " /website/obligations.html"
            //}, 
            //"photo-copy-revaluation": {
            //    url: "photo-copy-revaluation",
            //    templateurl: " /website/photo-copy-revaluation.html"
            //}, 
            //"polycet-portal": {
            //    url: "polycet-portal",
            //    templateurl: " /website/polycet-portal.html"
            //}, 
            //"request-info": {
            //    url: "request-info",
            //    templateurl: " /website/request-info.html"
            //}, 
            //"rti-act": {
            //    url: "rti-act",
            //    templateurl: " /website/rti-act.html"
            //}, 
            //"sitemap": {
            //    url: "sitemap",
            //    templateurl: " /websitesitemap.html"
            //}, 
            //"staff": {
            //    url: "staff",
            //    templateurl: " /website/staff.html"
            //}, 
            //"state-government": {
            //    url: "state-government",
            //    templateurl: " /website/state-government.html"
            //}, 
            //"student-portal": {
            //    url: "student-portal",
            //    templateurl: " /website/student-portal.html"
            //}, 
            //"tenders": {
            //    url: "tenders",
            //    templateurl: " /website/tenders.html"
            //}, 
            //"time-tables": {
            //    url: "time-tables",
            //    templateurl: " /website/time-tables.html"
            //}, 
            //"twsh-portal": {
            //    url: "twsh-portal",
            //    templateurl: "website/twsh-portal.html"
            //}, 



            'Dashboard.UploadExcel': {
                url: "/UploadExcel",
                templateUrl: 'app/views/UploadExcel.html',
                dependencies: ['controllers/UploadExcelController', 'directives/saFileUpload', 'services/PreExamination/PreExaminationService', 'services/Assessment/AssessmentService', 'services/Results/StudentWiseService']
            },

            'components': {
                url: "/Component",
                templateUrl: 'app/views/Components.html',
                dependencies: []
            },

            'Components': {
                url: "/Components",
                templateUrl: 'app/views/Components.html',
                dependencies: ['controllers/ComponentsController', 'services/StudentResultService']
            },


            'login': {
                url: "/login",
                templateUrl: 'app/views/login.html',
                dependencies: ['controllers/loginController', 'services/SystemAdministration/SystemUserService']
            },




            ///////CCIC PORTAL ROUTES///////
            'index.FeePayment': {
                url: "/FeePayment",
                templateUrl: 'app/views/CCIC/ExamsSite/CcicFeePayment.html',
                dependencies: ['controllers/CCIC/ExamsSite/CcicFeePaymentController', 'services/PreExamination/PreExaminationService', 'services/Assessment/MarksEntryService', 'services/BillDesk/paymentService', 'directives/saTable']
            },

            'index.IVCRegistration': {
                url: "/IVCRegistration",
                templateUrl: 'app/views/IVC/IVCRegistration.html',
                dependencies: ['controllers/IVC/IVCRegistrationController', 'services/IVC/AdminService/IVCAdminService', 'services/IVC/SystemAdministration/IVCSystemUserService', 'services/IVC/IVCRegistrationService']
            },

            'index.IVCLogin': {
                url: "/IVCLogin",
                templateUrl: 'app/views/IVC/IVCLogin.html',
                dependencies: ['controllers/IVC/IVCLoginController', 'services/IVC/AdminService/IVCAdminService', 'services/IVC/SystemAdministration/IVCSystemUserService', 'services/IVC/IVCRegistrationService']
            },

            'StudentDashboard': {
                url: "/StudentDashboard",
                templateUrl: 'app/views/IVC/StudentDashboard.html',
                dependencies: ['controllers/IVC/StudentDashboardController', 'services/IVC/PreExamination/IVCPreExaminationService', 'services/BillDesk/paymentService', 'services/IVC/AdminService/IVCAdminService', 'services/IVC/IVCRegistrationService']
            },

            //'index.HallTicketDownload': {
            //    url: "/HallTicketDownload",
            //    templateUrl: 'app/views/CCIC/ExamsSite/CcicHallTicket.html',
            //    dependencies: ['controllers/CCIC/ExamsSite/CcicHallTicketController', , 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            //},


            'CcicIndex': {
                url: "/CcicIndex",
                templateUrl: 'app/views/CCIC/CcicIndex.html',
                dependencies: ['controllers/CCIC/CcicIndexController', 'services/PreExamination/PreExaminationService', 'services/AdminServices/AdminService']
            },


            'CcicLogin': {
                url: "/CcicLogin",
                templateUrl: 'app/views/CCIC/CcicLogin.html',
                dependencies: ['controllers/CCIC/CcicLoginController', 'services/CCIC/CcicSystemUserService']
            },

            'index.CcicResults': {
                url: "/CcicResults",
                templateUrl: 'app/views/CCIC/CcicResults.html',
                dependencies: ['controllers/CCIC/CcicResultsController', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/CCIC/StudentResult/CcicStudentResultService']
            },


            'CcicDashboard': {
                url: "/CcicDashboard",
                templateUrl: 'app/views/CCIC/CcicDashboard.html',
                dependencies: ['controllers/CCIC/CcicDashboardController', 'services/CCIC/CcicSystemUserService', 'services/CCIC/AdminServices/CcicAdminService']
            },


            'CcicDashboard.CcicChangePassword': {
                url: "/CcicChangePassword",
                templateUrl: 'app/views/CCIC/CcicChangePassword.html',
                dependencies: ['controllers/CCIC/CcicChangePasswordController', 'services/CCIC/CcicChangePasswordService', 'services/CCIC/CcicSystemUserService']
            },

            'CcicForgetPassword': {
                url: "/CcicForgetPassword",
                templateUrl: 'app/views/CCIC/CcicForgetPassword.html',
                dependencies: ['controllers/CCIC/CcicForgetPasswordController', 'services/CCIC/CcicForgetPasswordService', 'services/CCIC/CcicSystemUserService']
            },

            'CcicDashboard.Settings': {
                url: "/Settings",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicSettings.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicSettingsController', 'services/CCIC/CcicSystemUserService']
            },


            'CcicDashboard.Academic': {
                url: "/Academic",
                templateUrl: 'app/views/CCIC/Academic/CcicAcademic.html',
                dependencies: ['controllers/CCIC/Academic/CcicAcademicController', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/CCIC/CcicSystemUserService']
            },



            //'CcicDashboard.CircularsDashboard': {
            //    url: "/CircularsDashboard",
            //    templateUrl: 'app/views/CCIC/Circulars/CcicCircularsDashboard.html',
            //    dependencies: ['controllers/CCIC/Circulars/CcicCircularsDashboardController', 'services/CCIC/AdminServices/CcicAdminService']
            //},



            'CcicDashboard.Settings.RecentNews': {
                url: "/RecentNews",
                templateUrl: 'app/views/CCIC/CcicRecentNews.html',
                dependencies: ['controllers/CCIC/CcicRecentNewsController', 'directives/saDate', 'services/CCIC/AdminServices/CcicAdminService', 'services/CCIC/PreExamination/CcicPreExaminationService' ]
            },


            //'CcicDashboard.Settings.Circulars': {
            //    url: "/Circulars",
            //    templateUrl: 'app/views/CCIC/Circulars/CcicCirculars.html',
            //    dependencies: ['controllers/CCIC/Circulars/CcicCircularsController', 'services/CCIC/AdminServices/CcicAdminService', 'directives/saFileUpload']
            //},


            'CcicDashboard.Settings.ModulesSetting': {
                url: "/ModulesSetting",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicModulesSetting.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicModulesSettingController', 'services/CCIC/AdminServices/CcicAdminService', 'services/CCIC/CcicSettingsService']

            },

            'CcicDashboard.Settings.Users': {
                url: "/Users",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicUsers.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicUsersController', 'services/CCIC/CcicSettingsService', 'services/CCIC/CcicSystemUserService']
            },


            //----------------------------------------------------------------------------

            'CcicDashboard.Academic.AcademicYearSetting': {
                url: "/AcademicYearSetting",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicAcademicYearSettings.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicAcademicYearSettingsController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.Academic.EnrollementSettings': {
                url: "/EnrollementSettings",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicEnrollementSettings.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicEnrollementSettingsController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.Academic.Enrollment': {
                url: "/Enrollment",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicEnrollment.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicEnrollmentController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },


            'CcicDashboard.Academic.ViewStdDetails': {
                url: "/ViewStdDetails",
                templateUrl: 'app/views/CCIC/CcicSettings/ViewStdDetails.html',
                dependencies: ['controllers/CCIC/CcicSettings/ViewStdDetailsController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.Academic.EditStdDetails': {
                url: "/EditStdDetails",
                templateUrl: 'app/views/CCIC/CcicSettings/EditStdDetails.html',
                dependencies: ['controllers/CCIC/CcicSettings/EditStdDetailsController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/CCIC/CcicSystemUserService']
            },

            'CcicDashboard.Academic.ViewStuDetails': {
                url: "/ViewStuDetails",
                templateUrl: 'app/views/CCIC/CcicSettings/ViewStuDetails.html',
                dependencies: ['controllers/CCIC/CcicSettings/ViewStuDetailsController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.Academic.ViewStudentDetails': {
                url: "/ViewStudentDetails",
                templateUrl: 'app/views/CCIC/CcicSettings/ViewStudentDetails.html',
                dependencies: ['controllers/CCIC/CcicSettings/ViewStudentDetailsController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

           

            'CcicDashboard.Academic.EditStudentDetails': {
                url: "/EditStudentDetails",
                templateUrl: 'app/views/CCIC/CcicSettings/EditStudentDetails.html',
                dependencies: ['controllers/CCIC/CcicSettings/EditStudentDetailsController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService','services/CCIC/CcicSystemUserService']
            },

            'CcicDashboard.Academic.ViewStdDetailsVerification': {
                url: "/ViewStdDetailsVerification",
                templateUrl: 'app/views/CCIC/CcicSettings/ViewStdDetailsVer.html',
                dependencies: ['controllers/CCIC/CcicSettings/ViewStdDetailsVerController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.Academic.EnrollmentReport': {
                url: "/EnrollmentReport",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicEnrollmentReport.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicEnrollmentReportController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/CCIC/CcicSystemUserService']
            },

            

            'CcicDashboard.Academic.CcicEnrollmentReportData': {
                url: "/EnrollmentReport/CcicEnrollmentReportData",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicEnrollmentReportData.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicEnrollmentReportDataController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },


            'CcicDashboard.Academic.CcicAdmEnrollReportCourses': {
                url: "/EnrollmentReport/CcicAdmEnrollReportCourses",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicAdmEnrollReportCourses.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicAdmEnrollReportCoursesController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.Academic.CcicAdmEnrollmentReportData': {
                url: "/EnrollmentReport/CcicAdmEnrollReportCourses/CcicAdmEnrollmentReportData",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicAdmEnrollmentData.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicAdmEnrollmentDataController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },


            'CcicDashboard.Academic.Register': {
                url: "/Register",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicRegister.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicRegisterController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.Academic.CcicRegisterReportData': {
                url: "/Register/CcicRegisterReportData",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicRegisterReportData.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicRegisterReportDataController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },


            'CcicDashboard.Academic.CcicAdmRegisterReportCourses': {
                url: "/Register/CcicAdmRegisterReportCourses",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicAdmRegisterReportCourses.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicAdmRegisterReportCoursesController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.Academic.CcicAdmRegisterReportData': {
                url: "/Register/CcicAdmRegisterReportCourses/CcicAdmRegisterReportData",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicAdmRegisterData.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicAdmRegisterDataController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            //'CcicDashboard.Academic.CcicRegisterCourses': {
            //    url: "/Register/CcicRegisterCourses",
            //    templateUrl: 'app/views/CCIC/CcicSettings/CcicRegisterCourses.html',
            //    dependencies: ['controllers/CCIC/CcicSettings/CcicRegisterCoursesController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            //},


            'CcicDashboard.Academic.Verification': {
                url: "/Verification",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicVerification.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicVerificationController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.Academic.CcicVerificationData': {
                url: "Verification/CcicVerificationData",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicVerificationData.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicVerificationDataController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.Academic.CcicAdmVerificationCourses': {
                url: "/Verification/CcicAdmVerificationCourses",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicAdmVerificationCourses.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicAdmVerificationCoursesController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.Academic.CcicAdmVerificationData': {
                url: "/Verification/CcicAdmVerificationCourses/CcicAdmVerificationData",
                templateUrl: 'app/views/CCIC/CcicSettings/CcicAdmVerificationData.html',
                dependencies: ['controllers/CCIC/CcicSettings/CcicAdmVerificationDataController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.Academic.Courses': {
                url: "/Courses",
                templateUrl: 'app/views/CCIC/Academic/CcicCourses.html',
                dependencies: ['controllers/CCIC/Academic/CcicCoursesController',  'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            //'CcicDashboard.Academic.CcicVerificationCourses': {
            //    url: "/Verification/CcicVerificationCourses",
            //    templateUrl: 'app/views/CCIC/CcicSettings/CcicVerificationCourses.html',
            //    dependencies: ['controllers/CCIC/CcicSettings/CcicVerificationCoursesController', 'services/CCIC/CcicSettingsService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            //},

           

    //-------------------------------------------------------------------------------------------       

           

            'CcicDashboard.PreExamination': {
                url: "/PreExamination",
                templateUrl: 'app/views/CCIC/PreExamination/CcicPreExamination.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicPreExaminationController', 'services/CCIC/CcicSystemUserService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            //'CcicDashboard.PreExamination.DateSheet': {
            //    url: "/DateSheet",
            //    templateUrl: 'app/views/CCIC/PreExamination/CcicDateSheet.html',
            //    dependencies: ['controllers/CCIC/PreExamination/CcicDateSheetController', 'services/CCIC/CcicSystemUserService']
            //},

            'CcicDashboard.PreExamination.ExamMonthYearSettings': {
                url: "/ExamMonthYearSettings",
                templateUrl: 'app/views/CCIC/PreExamination/CcicCreateExamMonthYear.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicCreateExamMonthYearController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.PreExamination.GenerateDateSheet': {
                url: "/GenerateDateSheet",
                templateUrl: 'app/views/CCIC/PreExamination/CcicGenerateDateSheet.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicGenerateDateSheetController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },


            'CcicDashboard.PreExamination.UpdateDateSheet': {
                url: "/UpdateDateSheet",
                templateUrl: 'app/views/CCIC/PreExamination/CcicUpdateDateSheet.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicUpdateDateSheetController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.PreExamination.DownloadDateSheet': {
                url: "/DownloadDateSheet",
                templateUrl: 'app/views/CCIC/PreExamination/CcicDownloadDateSheet.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicDownloadDateSheetController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            //'CcicDashboard.PreExamination.FeeEligibleReports': {
            //    url: "/FeeEligibleReports",
            //    templateUrl: 'app/views/CCIC/PreExamination/CcicFeeEligibleReports.html',
            //    dependencies: ['controllers/CCIC/PreExamination/CcicFeeEligibleReportsController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            //},

            'CcicDashboard.PreExamination.FeePaymentReports': {
                url: "/FeePaymentReports",
                templateUrl: 'app/views/CCIC/PreExamination/CcicFeePaymentReports.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicFeePaymentReportsController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.PreExamination.CoursewiseFeePaymentReports': {
                url: "/CoursewiseFeePaymentReports",
                templateUrl: 'app/views/CCIC/PreExamination/CcicCoursewiseFeePaymentReports.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicCoursewiseFeePaymentReportsController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.PreExamination.InstitutewiseFeePaymentReports': {
                url: "/InstitutewiseFeePaymentReports",
                templateUrl: 'app/views/CCIC/PreExamination/CcicInstitutewiseFeePaymentReports.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicInstitutewiseFeePaymentReportsController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.PreExamination.FeePaymentReport': {
                url: "/FeePaymentReport",
                templateUrl: 'app/views/CCIC/PreExamination/CcicFeePaymentReport.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicFeePaymentReportController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.PreExamination.PrinterNRDownload': {
                url: "/PrinterNRDownload",
                templateUrl: 'app/views/CCIC/PreExamination/CcicPrinterNRDownload.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicPrinterNRDownloadController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.PreExamination.SetNRData': {
                url: "/SetNRData",
                templateUrl: 'app/views/CCIC/PreExamination/CcicSetNRData.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicSetNRDataController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },


            'CcicDashboard.PreExamination.SetExamCenters': {
                url: "/SetExamCenters",
                templateUrl: 'app/views/CCIC/PreExamination/CcicSetExamCenters.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicSetExamCentersController', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/CCIC/AdminServices/CcicAdminService']
            },


            'CcicDashboard.PreExamination.ExaminationCentres': {
                url: "/ExaminationCentres",
                templateUrl: 'app/views/CCIC/PreExamination/CcicExaminationCentres.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicExaminationCentresController', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/CCIC/AdminServices/CcicAdminService']
            },

            'CcicDashboard.PreExamination.SetFeeDates': {
                url: "/SetFeeDates",
                templateUrl: 'app/views/CCIC/PreExamination/CcicSetFeeDates.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicSetFeeDatesController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },


            'CcicDashboard.PreExamination.Amount': {
                url: "/Amount",
                templateUrl: 'app/views/CCIC/PreExamination/CcicAmount.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicAmountController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.PreExamination.FeePayment': {
                url: "/FeePayment",
                templateUrl: 'app/views/CCIC/PreExamination/CcicExamFeePayment.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicExamFeePaymentController', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/BillDesk/paymentService', 'services/CCIC/CcicStudentRegistrationService', 'services/PreExamination/PreExaminationService']
            },

            'CcicDashboard.PreExamination.HallTicketDownload': {
                url: "/HallTicketDownload",
                templateUrl: 'app/views/CCIC/PreExamination/CcicHallTicketDownload.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicHallTicketDownloadController', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/BillDesk/paymentService', 'services/CCIC/CcicStudentRegistrationService', 'services/PreExamination/PreExaminationService']
            },

            //'CcicDashboard.PreExamination.TesTingFeePayment': {
            //    url: "/TesTingFeePayment",
            //    templateUrl: 'app/views/CCIC/PreExamination/CcicTestingExamFeePayment.html',
            //    dependencies: ['controllers/CCIC/PreExamination/CcicTestingExamFeePaymentController', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/BillDesk/paymentService', 'services/CCIC/CcicStudentRegistrationService', 'services/PreExamination/PreExaminationService']
            //},
 

            'CcicDashboard.PreExamination.PaymentProcess': {
                url: "/ExamFeePayment/PaymentProcess",
                templateUrl: 'app/views/CCIC/PreExamination/CcicPaymentProcess.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicPaymentProcessController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.PreExamination.SubjectMaster': {
                url: "/SubjectMaster",
                templateUrl: 'app/views/CCIC/PreExamination/CcicSubjectMaster.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicSubjectMasterController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.PreExamination.HallTicketDates': {
                url: "/HallTicketDates",
                templateUrl: 'app/views/CCIC/PreExamination/CcicHallTicketDates.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicHallTicketDatesController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.PreExamination.NRDownload': {
                url: "/NRDownload",
                templateUrl: 'app/views/CCIC/PreExamination/CcicNRDownload.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicNRDownloadController', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/CCIC/AdminServices/CcicAdminService']
            },

            //'CcicDashboard.PreExamination.NRDownload.PhotoAttendenceSheet': {
            //    url: "/PhotoAttendenceSheet",
            //    templateUrl: 'app/views/CCIC/PreExamination/CcicPhotoAttendenceSheet.html',
            //    dependencies: ['controllers/CCIC/PreExamination/CcicPhotoAttendenceSheetController', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/CCIC/AdminServices/CcicAdminService']
            //},

            'CcicDashboard.PreExamination.NRDownload.NRExcel': {
                url: "/NRExcel",
                templateUrl: 'app/views/CCIC/PreExamination/CcicNRExcel.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicNRExcelController', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/CCIC/AdminServices/CcicAdminService']
            },

            'CcicHallTicket': {
                url: "/CcicHallTicket",
                templateUrl: 'app/views/CCIC/PreExamination/CcicHallTicket.html',
                dependencies: ['controllers/CCIC/PreExamination/CcicHallTicketController', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/CCIC/AdminServices/CcicAdminService']
            },

            //'index.HallTicketDownload': {
            //    url: "/HallTicketDownload",
            //    templateUrl: 'app/views/CCIC/ExamsSite/CcicHallTicket.html',
            //    dependencies: ['controllers/CCIC/ExamsSite/CcicHallTicketController', , 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            //},
//------------------------------------------------------------------------------

            'CcicDashboard.Assessment': {
                url: "/Assessment",
                templateUrl: 'app/views/CCIC/Assessment/CcicAssessment.html',
                dependencies: ['controllers/CCIC/Assessment/CcicAssessmentController', 'services/CCIC/CcicSystemUserService']

            },

            'CcicDashboard.Assessment.SetEntryDates': {
                url: "/SetEntryDates",
                templateUrl: 'app/views/CCIC/Assessment/CcicSetEntryDates.html',
                dependencies: ['controllers/CCIC/Assessment/CcicSetEntryDatesController', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/CCIC/CcicSettingsService', 'services/CCIC/Assessment/CcicAssessmentService']
            },

            'CcicDashboard.Assessment.MarksEntry': {
                url: "/MarksEntry",
                templateUrl: 'app/views/CCIC/Assessment/CcicMarksEntry.html',
                dependencies: ['controllers/CCIC/Assessment/CcicMarksEntryController', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/MenuService', 'services/CCIC/Assessment/CcicAssessmentService']

            },

            'CcicDashboard.Assessment.SubjectList': {
                url: "/MarksEntry/SubjectList",
                templateUrl: 'app/views/CCIC/Assessment/CcicMarksEntrySubjectList.html',
                dependencies: ['controllers/CCIC/Assessment/CcicMarksEntrySubjectListController','services/CCIC/Assessment/CcicAssessmentService']

            },

            'CcicDashboard.Assessment.MarksEntryPage': {
                url: "/MarksEntry/SubjectList/MarksEntry",
                templateUrl: 'app/views/CCIC/Assessment/CcicMarksEntryPage.html',
                dependencies: ['controllers/CCIC/Assessment/CcicMarksEntryPageController', 'services/CCIC/Assessment/CcicAssessmentService']

            },


            'CcicDashboard.Assessment.AssessmentReports': {
                url: "/AssessmentReports",
                templateUrl: 'app/views/CCIC/Assessment/CcicAssessmentReportsInstitute.html',
                dependencies: ['controllers/CCIC/Assessment/CcicAssessmentReportsInstituteController', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/CCIC/Assessment/CcicAssessmentService']
            },


            'CcicDashboard.Assessment.AssessmentReportsCourse': {
                url: "/AssessmentReportsCourse",
                templateUrl: 'app/views/CCIC/Assessment/CcicAssessmentReportsCourse.html',
                dependencies: ['controllers/CCIC/Assessment/CcicAssessmentReportsCourseController', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/CCIC/CcicSettingsService', 'services/CCIC/Assessment/CcicAssessmentService']
            },

            'CcicDashboard.Assessment.AssessmentReportsSubject': {
                url: "/AssessmentReportsSubject",
                templateUrl: 'app/views/CCIC/Assessment/CcicAssessmentReportsSubject.html',
                dependencies: ['controllers/CCIC/Assessment/CcicAssessmentReportsSubjectController', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/CCIC/CcicSettingsService', 'services/CCIC/Assessment/CcicAssessmentService']
            },

            'CcicDashboard.Assessment.AssessmentReportsData': {
                url: "/AssessmentReportsData",
                templateUrl: 'app/views/CCIC/Assessment/CcicAssessmentReportsData.html',
                dependencies: ['controllers/CCIC/Assessment/CcicAssessmentReportsDataController', 'services/CCIC/PreExamination/CcicPreExaminationService', 'services/CCIC/CcicSettingsService', 'services/CCIC/Assessment/CcicAssessmentService']
            },

//-------------------------------------------------------------------------------------------------

            'CcicDashboard.PostExamination': {
                url: "/PostExamination",
                templateUrl: 'app/views/CCIC/PostExamination/CcicPostExamination.html',
                dependencies: ['controllers/CCIC/PostExamination/CcicPostExaminationController', 'services/CCIC/CcicSystemUserService']
            },

            'CcicDashboard.PostExamination.ResultsProcessing': {
                url: "/ResultsProcessing",
                templateUrl: 'app/views/CCIC/PostExamination/Results/CcicResultsProcessing.html',
                dependencies: ['controllers/CCIC/PostExamination/Results/CcicResultsProcessingController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.PostExamination.RVRCProcessing': {
                url: "/RVRCProcessing",
                templateUrl: 'app/views/CCIC/PostExamination/CcicRVRCProcessing.html',
                dependencies: ['controllers/CCIC/PostExamination/CcicRVRCProcessingController', 'directives/saFileUpload', 'services/StudentResultService', 'services/Assessment/AssessmentService', 'services/Results/StudentWiseService', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.PostExamination.TabulatedReports': {
                url: "/TabulatedReports",
                templateUrl: 'app/views/CCIC/PostExamination/CcicTabulatedReports.html',
                dependencies: ['controllers/CCIC/PostExamination/CcicTabulatedReportsController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },

            'CcicDashboard.PostExamination.CertificatesData': {
                url: "/CertificatesData",
                templateUrl: 'app/views/CCIC/PostExamination/CcicCertificatesData.html',
                dependencies: ['controllers/CCIC/PostExamination/CcicCertificatesDataController', 'services/CCIC/PreExamination/CcicPreExaminationService']
            },







            'CcicCoursesCards': {
                url: "/CcicCoursesCards",
                templateUrl: 'app/views/CCIC/CcicCoursesCards.html',
                dependencies: ['controllers/CCIC/CcicCoursesCardsController', 'services/CCIC/CcicStudentRegistrationService']

            },




            'CcicInstiTable': {
                url: "/CcicInstiTable",
                templateUrl: 'app/views/CCIC/CcicInstiTable.html',
                dependencies: ['controllers/CCIC/CcicInstiTableController', 'services/CCIC/CcicStudentRegistrationService']

            },












            ///////////-----------------------------------Website Routes Start-------------------------------//////////////

            'index': {
                url: "/index",
                templateUrl: 'app/views/newwebsite/index.html',
                dependencies: ['views/newwebsite/controllers/IndexController', 'services/PreExamination/PreExaminationService', 'services/AdminServices/AdminService']
            },

            'index.GetDeCryptPaSSPage': {
                url: "/GetDeCryptPaSSPage",
                templateUrl: 'app/views/GetDeCryptPaSSPage.html',
                dependencies: ['controllers/GetDeCryptPaSSPageController', 'services/SystemAdministration/SystemUserService', 'services/ForgetPasswordService']
            },

            'index.GetCcicDeCryptPaSSPage': {
                url: "/GetCcicDeCryptPaSSPage",
                templateUrl: 'app/views/CCIC/GetCcicDeCryptPaSSPage.html',
                dependencies: ['controllers/CCIC/GetCcicDeCryptPaSSPageController', 'services/CCIC/CcicSystemUserService', 'services/CCIC/CcicForgetPasswordService']
            },


            'index.WebsiteLogin': {
                url: "/WebsiteLogin",
                templateUrl: 'app/views/newwebsite/WebsiteLogin.html',
                dependencies: ['views/newwebsite/controllers/WebsiteLoginController', 'services/SystemAdministration/SystemUserService']
            },

            'index.Timetable': {
                url: "/Timetable",
                templateUrl: 'app/views/ExamsSite/PreExamTimetable.html',
                dependencies: ['controllers/ExamsSite/PreExamTimetableController', , 'services/PreExamination/PreExaminationService', 'directives/saDate', 'services/StudentResultService', 'directives/saDate']
            },

            'index.FeeReciept': {
                url: "/FeeReciept",
                templateUrl: 'app/views/PreExamination/FeeReciept.html',
                dependencies: ['controllers/PreExamination/FeeRecieptController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            'index.StudentRequestForm': {
                url: "/StudentRequestForm",
                templateUrl: 'app/views/ExamsSite/StudentRequestForm.html',
                dependencies: ['controllers/ExamsSite/StudentRequestFormController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService','services/SystemAdministration/SystemUserService']
            },

            'Dashboard.PostExam.StudentRequestForm': {
                url: "/StudentRequestForm",
                templateUrl: 'app/views/StudentOnlineServices/StudentRequestForm.html',
                dependencies: ['controllers/StudentOnlineServices/StudentRequestFormController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService', 'directives/saDate']
            },

            'index.DiplomaFeePayment': {
                url: "/DiplomaFeePayment",
                templateUrl: 'app/views/ExamsSite/DiplomaFeePayment.html',
                dependencies: ['controllers/ExamsSite/DiplomaFeePaymentController', 'services/PreExamination/PreExaminationService', 'services/Assessment/MarksEntryService', 'services/BillDesk/paymentService', 'directives/saTable', 'services/SystemAdministration/SystemUserService']
            },


            'index.StudentFeedback': {
                url: "/StudentFeedback",
                templateUrl: 'app/views/ExamsSite/StudentFeedback.html',
                dependencies: ['controllers/ExamsSite/StudentFeedbackController', 'services/Academic/AcademicService']
            },
            'index.DiplomaHallticket': {
                url: "/DiplomaHallticket",
                //templateUrl: 'app/views/newwebsite/CommingSoon.html',
                //dependencies: ['views/newwebsite/controllers/CommingSoonController']
                templateUrl: 'app/views/Examssite/DiplomaHallticket.html',
                dependencies: ['controllers/ExamsSite/DiplomaHallticketController', , 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService', 'services/SystemAdministration/SystemUserService']
            },
           

            'index.TypingAndShorthandResults': {
                url: "/TypingAndShorthandResults",
                templateUrl: 'app/views/ExamsSite/TypingCumShorthand.html',
                dependencies: ['controllers/ExamsSite/TypingCumShorthandResultsController', 'services/StudentResultService']
            },

            'index.StudentAttendance': {
                url: "/StudentAttendance",
                templateUrl: 'app/views/Examssite/StudentAttendance.html',
              dependencies: ['controllers/Examssite/StudentAttendanceController', 'services/PreExamination/PreExaminationService', 'services/SystemAdministration/SystemUserService']

            },
            'index.GenuinenessCheckForm': {
                url: "/GenuinenessCheckForm",
                templateUrl: 'app/views/Examssite/GenuinenessCheckForm.html',
                dependencies: ['controllers/Examssite/GenuinenessCheckFormController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService', 'directives/saDate', 'services/SystemAdministration/SystemUserService']
            },

            'index.DiplomaStudentResult': {
                url: "/DiplomaStudentResult",
                templateUrl: 'app/views/Examssite/DiplomaStudentResult.html',
                // templateUrl: 'app/views/Results/StudentWise.html',
                dependencies: ['controllers/Examssite/DiplomaStudentResultController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/SystemAdministration/SystemUserService', 'services/MenuService', 'services/StudentResultService']
            },
            'index.TwshViewApplication': {
                url: "/ViewApplication",
                templateUrl: 'app/views/Examssite/TwshViewApplication.html',
                dependencies: ['controllers/Examssite/TwshViewApplicationController', 'services/TWSH/TwshStudentRegService']
            },

            'index.TwshHallticket': {
                url: "/Hallticket",
                templateUrl: 'app/views/Examssite/Hallticket.html',
                dependencies: ['controllers/Examssite/HallticketController', 'services/TWSH/TwshStudentRegService']
            },
            'index.TwshOnlineApplication': {
                url: "/OnlineApplication",
                templateUrl: 'app/views/Examssite/StudentReg.html',
                dependencies: ['controllers/Examssite/TwshStudentRegController', 'services/TWSH/TwshStudentRegService', 'services/SystemAdministration/SystemUserService']
            },

            'index.TestingCBTPAGE': {
                url: "/TestingCBTPAGE",
                templateUrl: 'app/views/CBT/TestingStudentReg.html',
                dependencies: ['controllers/CBT/TestingTwshStudentRegController', 'services/CBT/CbtStudentRegService', 'services/SystemAdministration/SystemUserService']
            },

            //'index.ViewCandidateDetails': {
            //    url: "/ViewCandidateDetails",
            //    templateUrl: 'app/views/CBT/ViewCandidateDetails.html',
            //    dependencies: ['controllers/CBT/ViewCandidateDetailsController', 'services/CBT/CbtStudentRegService']
            //},

            //'index.EditCandidateDetails': {
            //    url: "/TestingCBTPAGE/EditCandidateDetails",
            //    templateUrl: 'app/views/CBT/EditCandidateDetails.html',
            //    dependencies: ['controllers/CBT/EditCandidateDetailsController', 'services/CBT/CbtStudentRegService']
            //},

            'index.TwshFeePayment': {
                url: "/FeePayment",
                templateUrl: 'app/views/Examssite/FeePayment.html',
                dependencies: ['controllers/Examssite/FeePaymentController', 'services/TWSH/TwshStudentRegService', 'services/BillDesk/paymentService']
            },


            'index.TwshCourses': {
                url: "/TwshCourses",
                templateUrl: 'app/views/newwebsite/TwshCourses.html',
                dependencies: ['views/newwebsite/controllers/TwshCoursesController', 'services/AdminServices/AdminService']
            },
            'index.Aboutsbtet': {
                url: "/Aboutsbtet",
                templateUrl: 'app/views/newwebsite/about-sbtet.html',
                dependencies: ['views/newwebsite/controllers/AboutsbtetController']
            },
            'index.ViewSyllabus': {
                url: "/ViewSyllabus",
                templateUrl: 'app/views/newwebsite/ViewSyllabus.html',
                dependencies: ['views/newwebsite/controllers/ViewSyllabusController']
            },

            'index.CommingSoon': {
                url: "/ComingSoon",
                templateUrl: 'app/views/newwebsite/CommingSoon.html',
                dependencies: ['views/newwebsite/controllers/CommingSoonController']
            },


            'index.Courses': {
                url: "/Courses",
                templateUrl: 'app/views/newwebsite/courses.html',
                dependencies: ['views/newwebsite/controllers/CoursesController', 'services/AdminServices/AdminService']
            },
            'index.Downloads': {
                url: "/Downloads",
                templateUrl: 'app/views/newwebsite/downloads.html',
                dependencies: ['views/newwebsite/controllers/DownloadsController', 'services/AdminServices/AdminService']
            },
            'index.ContactUs': {
                url: "/ContactUs",
                templateUrl: 'app/views/newwebsite/contact-us.html',
                dependencies: ['views/newwebsite/controllers/ContactusController', 'services/AdminServices/AdminService']
            },
            //more
            'index.Disclaimer': {
                url: "/Disclaimer",
                templateUrl: 'app/views/newwebsite/disclaimer.html',
                dependencies: ['views/newwebsite/controllers/DisclaimerController']
            },
            'index.Events': {
                url: "/Events",
                templateUrl: 'app/views/newwebsite/events.html',
                dependencies: ['views/newwebsite/controllers/EventsController']
            },
            'index.Governmentorders': {
                url: "/Governmentorders",
                templateUrl: 'app/views/newwebsite/governmentorders.html',
                dependencies: ['views/newwebsite/controllers/GovernmentordersController']
            },
            'index.Hierarchy': {
                url: "/Hierarchy",
                templateUrl: 'app/views/newwebsite/hierarchy.html',
                dependencies: ['views/newwebsite/controllers/HierarchyController']
            },
            'index.Notifications': {
                url: "/Notifications",
                templateUrl: 'app/views/newwebsite/notifications.html',
                dependencies: ['views/newwebsite/controllers/NotificationsController', 'services/AdminServices/AdminService']
            },

            'index.AffiliatedTwshInstitutions': {
                url: "/AffiliatedTwshInstitutions",
                templateUrl: 'app/views/newwebsite/TwshAffiliatedInstitute.html',
                dependencies: ['views/newwebsite/controllers/TwshAffiliatedInstituteController', 'services/AdminServices/AdminService']
            },
            'index.Staff': {
                url: "/Staff",
                templateUrl: 'app/views/newwebsite/staff.html',
                dependencies: ['views/newwebsite/controllers/StaffController', 'services/AdminServices/AdminService']
            },
            'index.ReleasePolycetResults': {
                url: "/ReleasePolycetResults",
                templateUrl: 'app/views/Polycet/ReleasePolycetResults.html',
                dependencies: ['controllers/Polycet/ReleasePolycetResultsController', 'services/AdminServices/AdminService']
            },

            'index.Sitemap': {
                url: "/Sitemap",
                templateUrl: 'app/views/newwebsite/sitemap.html',
                dependencies: ['views/newwebsite/controllers/SitemapController']
            },
            'index.Tenders': {
                url: "/Tenders",
                templateUrl: 'app/views/newwebsite/tenders.html',
                dependencies: ['views/newwebsite/controllers/TendersController']
            },
            'index.Latestnews': {
                url: "/Latestnews",
                templateUrl: 'app/views/newwebsite/latest_news.html',
                dependencies: ['views/newwebsite/controllers/LatestnewsController', 'services/AdminServices/AdminService']
            },
            'index.Full-details-act': {
                url: "/Full-details-act",
                templateUrl: 'app/views/newwebsite/full-details-act.html',
                dependencies: ['views/newwebsite/controllers/Full-details-actController']
            },
            'index.About-right-info': {
                url: "/About-right-info",
                templateUrl: 'app/views/newwebsite/about-right-info.html',
                dependencies: ['views/newwebsite/controllers/About-right-infoController']
            },
            'index.Obligations': {
                url: "/Obligations",
                templateUrl: 'app/views/newwebsite/obligations.html',
                dependencies: ['views/newwebsite/controllers/ObligationsController']
            },
            'index.Request-info': {
                url: "/Request-info",
                templateUrl: 'app/views/newwebsite/request-info.html',
                dependencies: ['views/newwebsite/controllers/Request-infoController']
            },
            'index.State-government': {
                url: "/State-government",
                templateUrl: 'app/views/newwebsite/state-government.html',
                dependencies: ['views/newwebsite/controllers/State-governmentController']
            },
            'index.PrivacyPolicy': {
                url: "/PrivacyPolicy",
                templateUrl: 'app/views/newwebsite/faq.html',
                dependencies: ['views/newwebsite/controllers/FaqController']
            },
            //more end
            'index.Feedback': {
                url: "/Feedback",
                templateUrl: 'app/views/newwebsite/feedback.html',
                dependencies: ['views/newwebsite/controllers/FeedbackController', 'services/PreExamination/PreExaminationService',]
            },

            'index.StudentConsolidated': {
                url: "/StudentConsolidated",
                templateUrl: 'app/views/ExamsSite/StudentConsolidated.html',
                dependencies: ['controllers/ExamsSite/StudentConsolidatedController', 'services/StudentResultService', 'services/SystemAdministration/SystemUserService']
            },

            'index.StudentOnlineRequest': {
                url: "/StudentOnlineRequest",
                templateUrl: 'app/views/ExamsSite/StudentOnlineRequest.html',
                dependencies: ['controllers/ExamsSite/StudentOnlineRequestController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            'index.MercyFee': {
                url: "/MercyFee",
                templateUrl: 'app/views/ExamsSite/MersidiseCertificate.html',
                dependencies: ['controllers/ExamsSite/MersidiseCertificateController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService', 'services/SystemAdministration/SystemUserService', 'services/AdminServices/AdminService']
            },

            'index.TwoYearsCertificateRequest': {
                url: "/TwoYearsCertificateRequest",
                templateUrl: 'app/views/PostExam/TwoYearsCertificateRequest.html',
                dependencies: ['controllers/PostExam/TwoYearsCertificateRequestController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },
            

            'index.ApplyCertificate': {
                url: "/ApplyCertificate",
                templateUrl: 'app/views/TWSH/ApplyCertificate.html',
                dependencies: ['controllers/TWSH/ApplyCertificateController', 'services/TWSH/TwshStudentRegService', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            ///////////-----------------------------------Website Routes End-------------------------------//////////////



            'ResultsDashboard.StudentResult': {
                url: "/StudentResult",
                templateUrl: 'app/views/StudentExamResults/StudentResult.html',
                dependencies: ['controllers/StudentExamResults/StudentResultController', 'services/StudentResultService']
            },


            'Dashboard.ExamType': {
                url: "/ExamType",
                templateUrl: 'app/views/ExamType/ExamType.html',
                dependencies: ['controllers/ExamTypeController', 'services/ExamType/ExamTypeService']
            },



            'TWSH': {
                url: "/Twsh",
                templateUrl: 'app/views/TWSH/TwshDashBoard.html',
                dependencies: ['controllers/TWSH/TwshDashBoardController', 'services/TWSH/TwshStudentRegService']
            },
            'TWSH.Home': {
                url: "/Home",
                templateUrl: 'app/views/TWSH/TwshLogin.html',
                dependencies: ['controllers/TWSH/TwshLoginController', 'services/TWSH/TwshStudentRegService']
            },

            'TwshHome': {
                url: "/TwshHome",
                templateUrl: 'app/views/TWSH/TwshHome.html',
                dependencies: ['controllers/TWSH/TwshHomeController', 'services/TWSH/TwshStudentRegService', 'services/SystemAdministration/SystemUserService']
            },

            'TWSH.CbtStudents': {
                url: "/Cbt",
                templateUrl: 'app/views/TWSH/TwshCbtStudents.html',
                dependencies: ['controllers/TWSH/TwshCbtStudentsController', 'services/TWSH/TwshStudentRegService']
            },
            'TWSH.FeePayment': {
                url: "/FeePayment",
                templateUrl: 'app/views/TWSH/FeePayment.html',
                dependencies: ['controllers/TWSH/FeePaymentController', 'services/TWSH/TwshStudentRegService', 'services/BillDesk/paymentService']
            },

            'CBT.FeePayment': {
                url: "/FeePayment",
                templateUrl: 'app/views/CBT/FeePayment.html',
                dependencies: ['controllers/CBT/FeePaymentController', 'services/CBT/CbtStudentRegService', 'services/BillDesk/paymentService']
            },
            'TWSH.OnlineApplication': {
                url: "/OnlineApplication",
                templateUrl: 'app/views/TWSH/StudentReg.html',
                dependencies: ['controllers/TWSH/TwshStudentRegController', 'services/TWSH/TwshStudentRegService', 'services/SystemAdministration/SystemUserService']
            },
            'TWSH.ChangePassword': {
                url: "/ChangePassword",
                templateUrl: 'app/views/TWSH/TwshChangePasword.html',
                dependencies: ['controllers/TWSH/TwshChangePasswordController', 'services/TWSH/TwshStudentRegService']
            },
            'TWSH.TwshReports': {
                url: "/Reports",
                templateUrl: 'app/views/TWSH/TwshReports.html',
                dependencies: ['controllers/TWSH/TwshReportsController', 'services/TWSH/TwshStudentRegService', 'services/BillDesk/paymentService']
            },
            'TWSH.TwshQualifiedCount': {
                url: "/TwshQualifiedCount",
                templateUrl: 'app/views/TWSH/TwshQualifiedCount.html',
                dependencies: ['controllers/TWSH/TwshQualifiedCountController', 'services/TWSH/TwshStudentRegService']
            },



            'TWSH.TwshQualifiedList': {
                url: "/TwshQualifiedList",
                templateUrl: 'app/views/TWSH/TwshQualifiedList.html',
                dependencies: ['controllers/TWSH/TwshQualifiedListController', 'services/TWSH/TwshStudentRegService']
            },

            'TWSH.TwshPhotoNrDownload': {
                url: "/PhotoNrDownload",
                templateUrl: 'app/views/TWSH/TwshPhotoNR.html',
                dependencies: ['controllers/TWSH/TwshPhotoNRController', 'services/TWSH/TwshStudentRegService']
            },

            'TWSH.TwshResetPassword': {
                url: "/ResetPassword",
                templateUrl: 'app/views/TWSH/TwshResetPassword.html',
                dependencies: ['controllers/TWSH/TwshResetPasswordController', 'services/TWSH/TwshStudentRegService']
            },
            'TWSH.TwshPaymentResponse': {
                url: "/PaymentResponse/:data",
                templateUrl: 'app/views/TWSH/TwshPaymentResponse.html',
                dependencies: ['controllers/TWSH/TwshPaymentResponseController', 'services/TWSH/TwshStudentRegService', 'services/BillDesk/paymentService']
            },
            'TWSH.MultipleFeePayments': {
                url: "/MultipleFeePayments",
                templateUrl: 'app/views/TWSH/MultipleFeePayments.html',
                dependencies: ['controllers/TWSH/MultipleFeePaymentsController', 'services/TWSH/TwshStudentRegService']
            },
            'TWSH.PaymentProcess': {
                url: "/MultipleFeePayments/PaymentProcess",
                templateUrl: 'app/views/TWSH/PaymentProcess.html',
                dependencies: ['controllers/TWSH/PaymentProcessController', 'services/TWSH/TwshStudentRegService', 'services/BillDesk/paymentService']
            },
            'TWSH.ViewApplication': {
                url: "/ViewApplication",
                templateUrl: 'app/views/TWSH/TwshViewApplication.html',
                dependencies: ['controllers/TWSH/TwshViewApplicationController', 'services/TWSH/TwshStudentRegService']
            },

            'TWSH.ViewStudentApplication': {
                url: "/MultipleFeePayments/PaymentProcess/ViewStudentApplication",
                templateUrl: 'app/views/TWSH/ViewStudentApplication.html',
                dependencies: ['controllers/TWSH/ViewStudentApplicationController', 'services/TWSH/TwshStudentRegService']
            },
            'TWSH.TypeWritingCertificate': {
                url: "/TwshQualifiedList/TypeWritingCertificate",
                templateUrl: 'app/views/TWSH/TypeWritingCertificate.html',
                dependencies: ['controllers/TWSH/TypeWritingCertificateController', 'services/TWSH/TwshStudentRegService', 'services/PreExamination/PreExaminationService']
            },
            'TWSH.Authorization': {
                url: "/Authorization",
                templateUrl: 'app/views/TWSH/CollegeAuthorization.html',
                dependencies: ['controllers/TWSH/CollegeAuthorizationController', 'services/TWSH/TwshStudentRegService']
            },
            'TWSH.SmsService': {
                url: "/SmsService",
                templateUrl: 'app/views/TWSH/TwshSendSmsDetails.html',
                dependencies: ['controllers/TWSH/TwshSmsDetailsController', 'services/TWSH/TwshStudentRegService']
            },
            'TWSH.ViewAuthorization': {
                url: "/Authorization/ViewAuthorization",
                templateUrl: 'app/views/TWSH/ViewAuthorization.html',
                dependencies: ['controllers/TWSH/ViewAuthorizationController', 'services/TWSH/TwshStudentRegService']
            },
            'TWSH.AuthorizationDetails': {
                url: "/Authorization/ViewAuthorization/AuthorizationDetails",
                templateUrl: 'app/views/TWSH/ViewAuthorizationDetails.html',
                dependencies: ['controllers/TWSH/ViewAuthorizationDetailsController', 'services/TWSH/TwshStudentRegService']
            },

            'TWSH.DetailedReports': {
                url: "/Reports/DetailedReports",
                templateUrl: 'app/views/TWSH/TwshDetailedReports.html',
                dependencies: ['controllers/TWSH/TwshDetailedReportsController', 'services/TWSH/TwshStudentRegService']
            },

            'TWSH.Hallticket': {
                url: "/Hallticket",
                templateUrl: 'app/views/TWSH/Hallticket.html',
                dependencies: ['controllers/TWSH/HallticketController', 'services/TWSH/TwshStudentRegService']
            },

            'TWSH.Guidelines': {
                url: "/Guidelines",
                templateUrl: 'app/views/TWSH/Guidelines.html',
                dependencies: ['controllers/TWSH/GuidelinesController', 'services/TWSH/TwshStudentRegService']
            },
            'TWSH.InstituteRegistration': {
                url: "/InstituteRegistration",
                templateUrl: 'app/views/TWSH/InstituteRegistration.html',
                dependencies: ['controllers/TWSH/InstituteRegistrationController', 'services/TWSH/TwshStudentRegService']
            },


            'TWSH.TwshForgotPassword': {
                url: "/TwshForgotPassword",
                templateUrl: 'app/views/TWSH/TwshForgotPassword.html',
                dependencies: ['controllers/TWSH/TwshForgotPasswordController', 'services/TWSH/TwshStudentRegService']
            },
            'Dashboard.AdmissionDashboard.ReAdmissionSetDate': {
                url: "/ReAdmissionSetDate",
                templateUrl: 'app/views/Admission/ReAdmissionSetDate.html',
                dependencies: ['controllers/Admission/ReAdmissionSetDateController', 'directives/saFileUpload', 'services/Admission/ReAdmissionService', 'services/Assessment/AssessmentService', 'services/Results/StudentWiseService']
            },
            'Dashboard.TwshNewCertificate': {
                url: "/TwshNewCertificate",
                templateUrl: 'app/views/TWSH/TwshNewCertificate.html',
                dependencies: ['controllers/TWSH/TwshNewCertificateController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard': {
                url: "/Dashboard",
                templateUrl: 'app/views/Dashboard.html',
                dependencies: ['controllers/DashboardController', 'services/SystemAdministration/SystemUserService', 'services/MenuService', 'services/AdminServices/AdminService']
            },



            'Dashboard.AdmissionDashboard.SetSemisterDates': {
                url: "/SetSemisterDates",
                templateUrl: 'app/views/Admission/SetSemisterDates.html',
                dependencies: ['controllers/Admission/SetSemisterDatesController', 'services/Assessment/AssessmentService']
            },
            'Dashboard.AdmissionDashboard.UploadPolycetExcel': {
                url: "/UploadPolycetExcel",
                templateUrl: 'app/views/Admission/UploadPolycetExcel.html',
                dependencies: ['controllers/Admission/UploadPolycetExcelController', 'directives/saFileUpload', 'services/PreExamination/PreExaminationService', 'services/Assessment/AssessmentService', 'services/Results/StudentWiseService']
            },

            'Dashboard.AdmissionDashboard.UploadPolycetData': {
                url: "/UploadPolycetData",
                templateUrl: 'app/views/Admission/UploadPolycetData.html',
                dependencies: ['controllers/Admission/UploadPolycetDataController', 'directives/saFileUpload', 'services/PreExamination/PreExaminationService', 'services/Assessment/AssessmentService', 'services/Results/StudentWiseService']
            },

            'Dashboard.AdmissionDashboard.ReAdmissionSetDate': {
                url: "/ReAdmissionSetDate",
                templateUrl: 'app/views/Admission/ReAdmissionSetDate.html',
                dependencies: ['controllers/Admission/ReAdmissionSetDateController', 'directives/saFileUpload', 'services/Admission/ReAdmissionService', 'services/Assessment/AssessmentService', 'services/Results/StudentWiseService']
            },

            'Dashboard.TwshNewCertificate': {
                url: "/TwshNewCertificate",
                templateUrl: 'app/views/TWSH/TwshNewCertificate.html',
                dependencies: ['controllers/TWSH/TwshNewCertificateController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.AdmissionDashboard': {
                url: "/AdmissionDashboard",
                templateUrl: 'app/views/AdmissionDashboard.html',
                dependencies: ['controllers/AdmissionDashboardController', 'services/PreExamination/PreExaminationService']
            }, 'maintainance': {
                url: "/maintainance",
                templateUrl: 'app/views/Admission/ServerUnderMaintainace.html',
                dependencies: []
            },
            //'Dashboard.PaymentResponse': {
            //    url: "/PaymentResponse/:data",
            //    templateUrl: 'app/views/PaymentResponse.html',
            //    dependencies: ['controllers/PaymentGateway/PaymentResponseController',  'services/BillDesk/paymentService', ],

            //},
            // Academic Module
            'Dashboard.AcademicDashboard': {
                url: "/AcademicDashboard",
                templateUrl: 'app/views/Academic/AcademicDashboard.html',
                dependencies: ['controllers/Academic/AcademicDashboardController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/SystemAdministration/SystemUserService', 'services/MenuService', 'services/Admission/AdmissionService']
            },



            'Dashboard.CircularsDashboard': {
                url: "/CircularsDashboard",
                templateUrl: 'app/views/Circulars/CircularsDashboard.html',
                dependencies: ['controllers/Circulars/CircularsDashboardController', 'services/AdminServices/AdminService']
            },




            'Dashboard.MasterSettings.Notification': {
                url: "/Notification",
                templateUrl: 'app/views/Circulars/Notification.html',
                dependencies: ['controllers/Circulars/NotificationController', 'directives/saDate']
            },




            'Dashboard.MasterSettings.WebsiteFeedbackReport': {
                url: "/WebsiteFeedbackReport",
                templateUrl: 'app/views/MasterSettings/WebsiteFeedbackReport.html',
                dependencies: ['controllers/MasterSettings/WebsiteFeedbackReportController', 'services/MasterSettings/MasterSettingsService', 'directives/saDate']
            },


            'Dashboard.MasterSettings.c': {
                url: "/StaffInfo",
                templateUrl: 'app/views/Circulars/StaffInfo.html',
                dependencies: ['controllers/Circulars/StaffInfoController', 'services/AdminServices/AdminService', 'directives/saFileUpload']
            },

            'Dashboard.MasterSettings.Circulars': {
                url: "/Circulars",
                templateUrl: 'app/views/Circulars/Circulars.html',
                dependencies: ['controllers/Circulars/CircularsController', 'services/AdminServices/AdminService', 'directives/saFileUpload']
            },





            'Dashboard.MasterSettings.CreateDownloads': {
                url: "/CreateDownloads",
                templateUrl: 'app/views/Circulars/CreateDownloads.html',
                dependencies: ['controllers/Circulars/CreateDownloadsController', 'services/AdminServices/AdminService']
            },



            'Dashboard.MasterSettings.Tenders': {
                url: "/Tenders",
                templateUrl: 'app/views/Circulars/Tenders.html',
                dependencies: ['controllers/Circulars/TendersController', 'services/AdminServices/AdminService', 'directives/saFileUpload']
            },

            'Dashboard.MasterSettings.MobileAppUpdate': {
                url: "/MobileAppUpdate",
                templateUrl: 'app/views/MasterSettings/MobileAppUpdate.html',
                dependencies: ['controllers/MasterSettings/MobileAppUpdateController', 'services/MasterSettings/MasterPageService']
            },


            'Dashboard.MasterSettings.ModulesSetting': {
                url: "/ModulesSetting",
                templateUrl: 'app/views/MasterSettings/ModulesSetting.html',
                dependencies: ['controllers/MasterSettings/ModulesSettingController', 'services/AdminServices/AdminService', 'services/SystemAdministration/SystemUserService', 'services/MasterSettings/MasterSettingsService']

            },




            //'Dashboard.MasterSettings.CreateUser': {
            //    url: "/CreateUser",
            //    templateUrl: 'app/views/MasterSettings/CreateUser.html',
            //    dependencies: ['controllers/MasterSettings/CreateUserController', 'services/MasterSettings/MasterPageService', 'services/MasterSettings/MasterSettingsService', 'services/SystemAdministration/SystemUserService']
            //},

            'Dashboard.MasterSettings.CreateUser': {
                url: "/CreateUser",
                templateUrl: 'app/views/MasterSettings/CreateUser1.html',
                dependencies: ['controllers/MasterSettings/CreateUserController1', 'services/MasterSettings/MasterPageService', 'services/MasterSettings/MasterSettingsService', 'services/SystemAdministration/SystemUserService']
            },

            'Dashboard.MasterSettings.InsertMarks': {
                url: "/InsertMarks",
                templateUrl: 'app/views/MasterSettings/InsertMarks.html',
                dependencies: ['controllers/MasterSettings/InsertMarksController', 'services/MasterSettings/MasterSettingsService', 'services/StudentResultService']
            },

            'Dashboard.MasterSettings.AttendanceSms': {
                url: "/AttendanceSms",
                templateUrl: 'app/views/MasterSettings/AttendanceSms.html',
                dependencies: ['controllers/MasterSettings/AttendanceSmsController', 'services/MasterSettings/MasterSettingsService']
            },

            'Dashboard.MasterSettings.ViewPresumptiveAttendance': {
                url: "/ViewPresumptiveAttendance",
                templateUrl: 'app/views/MasterSettings/ViewPresumptiveAttendance.html',
                dependencies: ['controllers/MasterSettings/ViewPresumptiveAttendanceController', 'services/MasterSettings/MasterSettingsService', 'services/SystemAdministration/SystemUserService', 'services/PreExamination/PreExaminationService']

            },
            'Dashboard.MasterSettings.ChangeAttendance': {
                url: "/ChangeAttendance",
                templateUrl: 'app/views/MasterSettings/ChangeAttendance.html',
                dependencies: ['controllers/MasterSettings/ChangeAttendanceController', 'services/MasterSettings/MasterSettingsService']
            },

            'Dashboard.MasterSettings.SubjectMaster': {
                url: "/SubjectMaster",
                templateUrl: 'app/views/MasterSettings/SubjectMaster.html',
                dependencies: ['controllers/MasterSettings/SubjectMasterController', 'services/MasterSettings/MasterSettingsService']
            },




            'Dashboard.MasterSettings.CreateBranchScheme': {
                url: "/CreateBranchScheme",
                templateUrl: 'app/views/MasterSettings/CreateBranchScheme.html',
                dependencies: ['controllers/MasterSettings/CreateBranchSchemeController', 'services/MasterSettings/MasterSettingsService']
            },


            //Setsemester page
            'Dashboard.SetSemester': {
                url: "/SetSemester",
                templateUrl: 'app/views/MasterSettings/SetSemester.html',
                dependencies: ['controllers/MasterSettings/SetsemesterController', 'services/AdminServices/AdminService', 'services/SystemAdministration/SystemUserService']
            },


            'Dashboard.MasterSettings.SubModuleSettings': {
                url: "/ModulesSetting/SubModuleSettings",
                templateUrl: 'app/views/MasterSettings/SubModuleSettings.html',
                dependencies: ['controllers/MasterSettings/SubModuleSettingsController', 'services/AdminServices/AdminService', 'services/SystemAdministration/SystemUserService', 'services/MasterSettings/MasterSettingsService']
            },


            'Dashboard.MasterSettings.UserCredentials': {
                url: "/ModulesSetting/UserCredentials",
                templateUrl: 'app/views/MasterSettings/UserCredentials.html',
                dependencies: ['controllers/MasterSettings/UserCredentialsController', 'services/AdminServices/AdminService', 'services/ForgetPasswordService', 'services/SystemAdministration/SystemUserService']
            },

            'Dashboard.DcBillsDashboard': {

                url: "/DcBillsDashboard",

                templateUrl: 'app/views/DcBills/DcBillsDashboard.html',

                dependencies: ['controllers/DcBills/DcBillsDashboardController', 'services/SystemAdministration/SystemUserService']

            },


            'Dashboard.DcBillsDashboard.ExamAdvance': {

                url: "/ExamAdvance",

                templateUrl: 'app/views/PostExam/ExamAdvance.html',

                dependencies: ['controllers/PostExam/ExamAdvanceController', 'services/PreExamination/PreExaminationService']

            },


            'Dashboard.DcBillsDashboard.AddExamExpenditure': {

                url: "/AddExamExpenditure",

                templateUrl: 'app/views/DcBills/AddExamExpenditure.html',

                dependencies: ['controllers/DcBills/AddExamExpenditureController', 'services/PreExamination/PreExaminationService']

            },


            'Dashboard.DcBillsDashboard.SetExaminationExpenditureCharges': {

                url: "/SetExaminationExpenditureCharges",

                templateUrl: 'app/views/DcBills/Annexture.html',

                dependencies: ['controllers/DcBills/AnnextureController', 'services/PreExamination/PreExaminationService']

            },


            'Dashboard.DcBillsDashboard.TotalExpenditure': {

                url: "/TotalExpenditure",

                templateUrl: 'app/views/DcBills/TotalExpenditure.html',

                dependencies: ['controllers/DcBills/TotalExpenditureController', 'services/PreExamination/PreExaminationService']

            },


            'Dashboard.DcBillsDashboard.DetailedExpenditure': {

                url: "/DetailedExpenditure",

                templateUrl: 'app/views/DcBills/DetailedExpenditure.html',

                dependencies: ['controllers/DcBills/DetailedExpenditureController', 'services/PreExamination/PreExaminationService']

            },


            'Dashboard.PreExamination.SessionWiseStrength': {

                url: "/SessionWiseStrength",

                templateUrl: 'app/views/PreExamination/SessionWiseStrength.html',

                dependencies: ['controllers/PreExamination/SessionWiseStrengthController', 'services/PreExamination/PreExaminationService']

            },



            'Dashboard.PostExam.GeneratePinOdcData': {

                url: "/GeneratePinOdcData",

                templateUrl: 'app/views/PostExam/GeneratePinOdcData.html',

                dependencies: ['controllers/PostExam/GeneratePinOdcDataController', 'services/PreExamination/PreExaminationService']

            },





            'Dashboard.PostExam.WantingsReport': {

                url: "/WantingsReport",

                templateUrl: 'app/views/Admission/Reports/WantingsReport.html',

                dependencies: ['controllers/Admission/Reports/WantingsReportController', 'services/Admission/AdmissionService']

            },





            'Dashboard.DcBillsDashboard': {

                url: "/DcBillsDashboard",

                templateUrl: 'app/views/DcBills/DcBillsDashboard.html',

                dependencies: ['controllers/DcBills/DcBillsDashboardController', 'services/SystemAdministration/SystemUserService']

            },


            'Dashboard.PreExamination.ExamAdvance': {

                url: "/ExamAdvance",

                templateUrl: 'app/views/PostExam/ExamAdvance.html',

                dependencies: ['controllers/PostExam/ExamAdvanceController', 'services/PreExamination/PreExaminationService']

            },


            'Dashboard.PreExamination.AddExamExpenditure': {

                url: "/AddExamExpenditure",

                templateUrl: 'app/views/DcBills/AddExamExpenditure.html',

                dependencies: ['controllers/DcBills/AddExamExpenditureController', 'services/PreExamination/PreExaminationService']

            },




            'Dashboard.PreExamination.SetExaminationExpenditureCharges': {

                url: "/SetExaminationExpenditureCharges",

                templateUrl: 'app/views/DcBills/Annexture.html',

                dependencies: ['controllers/DcBills/AnnextureController', 'services/PreExamination/PreExaminationService']

            },


            'Dashboard.PreExamination.TotalExpenditure': {

                url: "/TotalExpenditure",

                templateUrl: 'app/views/DcBills/TotalExpenditure.html',

                dependencies: ['controllers/DcBills/TotalExpenditureController', 'services/PreExamination/PreExaminationService']

            },


            'Dashboard.PreExamination.DetailedExpenditure': {

                url: "/DetailedExpenditure",

                templateUrl: 'app/views/DcBills/DetailedExpenditure.html',

                dependencies: ['controllers/DcBills/DetailedExpenditureController', 'services/PreExamination/PreExaminationService']

            },

            'Dashboard.PostExam.ResultsAutomationExcelUpload': {

                url: "/ResultsAutomationExcelUpload",

                templateUrl: 'app/views/Results/ResultsAutomationExcelUpload.html',

                dependencies: ['controllers/Results/ResultsAutomationExcelUploadController', 'directives/saFileUpload', 'services/PreExamination/PreExaminationService', 'services/StudentResultService', 'services/Assessment/AssessmentService', 'services/Results/StudentWiseService']

            },


            'Dashboard.PostExam.RVRCResultsUpdation': {

                url: "/RVRCResultsUpdation",

                templateUrl: 'app/views/Results/RVRCResultsUpdation.html',

                dependencies: ['controllers/Results/RVRCResultsUpdationController', 'directives/saFileUpload', 'services/PreExamination/PreExaminationService', 'services/StudentResultService', 'services/Assessment/AssessmentService', 'services/Results/StudentWiseService']

            },




            'Dashboard.PreExamination.BonafideCertificate': {

                url: "/BonafideCertificate",

                templateUrl: 'app/views/PostExam/BonafideCertificate.html',

                dependencies: ['controllers/PostExam/BonafideCertificateController', 'services/PreExamination/PreExaminationService']

            },

            //'Dashboard.PreExamination.StudyCertificate': {

            //    url: "/StudyCertificate",

            //    templateUrl: 'app/views/PostExam/StudyCertificate.html',

            //    dependencies: ['controllers/PostExam/StudyCertificateController', 'services/PreExamination/PreExaminationService']

            //},



            'Dashboard.PostExam.AmbedkarResultsReport': {

                url: "/AmbedkarResultsReport",

                templateUrl: 'app/views/PostExam/AmbedkarResultsReport.html',

                dependencies: ['controllers/PostExam/AmbedkarResultsReportController', 'services/PreExamination/PreExaminationService', 'services/StudentResultService']

            },




            'Dashboard.PostExam.BacklogSubjects': {

                url: "/BacklogSubjects",

                templateUrl: 'app/views/PostExam/BacklogSubjects.html',

                dependencies: ['controllers/PostExam/BacklogSubjectsController', 'services/PreExamination/PreExaminationService', 'services/StudentResultService']

            },


            'Dashboard.PostExam.ResultsReports': {

                url: "/ResultsReports",

                templateUrl: 'app/views/PostExam/ResultsReports.html',

                dependencies: ['controllers/PostExam/ResultsReportsController', 'services/PreExamination/PreExaminationService', 'services/Admission/StudentRegService', 'services/StudentResultService']

            },


            'Dashboard.PostExam.BacklogIndustrialFailedReport': {

                url: "/BacklogIndustrialFailedReport",

                templateUrl: 'app/views/PostExam/BacklogIndustrialFailedReport.html',

                dependencies: ['controllers/PostExam/BacklogIndustrialFailedReportController', 'services/PreExamination/PreExaminationService', 'services/StudentResultService']

            },





            'Dashboard.PostExam.ExamAdvance': {

                url: "/ExamAdvance",

                templateUrl: 'app/views/PostExam/ExamAdvance.html',

                dependencies: ['controllers/PostExam/ExamAdvanceController', 'services/PreExamination/PreExaminationService']

            },

            'Dashboard.PostExam': {
                url: "/PostExam",
                templateUrl: 'app/views/PostExam/PostExam.html',
                dependencies: ['controllers/PostExam/PostExamController', 'services/SystemAdministration/SystemUserService']
            },



            'Dashboard.DcBillsDashboard': {
                url: "/DcBillsDashboard",
                templateUrl: 'app/views/DcBills/DcBillsDashboard.html',
                dependencies: ['controllers/DcBills/DcBillsDashboardController', 'services/SystemAdministration/SystemUserService']
            },

            'Dashboard.DcBillsDashboard.ExamAdvance': {
                url: "/ExamAdvance",
                templateUrl: 'app/views/PostExam/ExamAdvance.html',
                dependencies: ['controllers/PostExam/ExamAdvanceController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.DcBillsDashboard.AddExamExpenditure': {
                url: "/AddExamExpenditure",
                templateUrl: 'app/views/DcBills/AddExamExpenditure.html',
                dependencies: ['controllers/DcBills/AddExamExpenditureController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.DcBillsDashboard.SetExaminationExpenditureCharges': {
                url: "/SetExaminationExpenditureCharges",
                templateUrl: 'app/views/DcBills/Annexture.html',
                dependencies: ['controllers/DcBills/AnnextureController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.DcBillsDashboard.TotalExpenditure': {
                url: "/TotalExpenditure",
                templateUrl: 'app/views/DcBills/TotalExpenditure.html',
                dependencies: ['controllers/DcBills/TotalExpenditureController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.DcBillsDashboard.DetailedExpenditure': {
                url: "/DetailedExpenditure",
                templateUrl: 'app/views/DcBills/DetailedExpenditure.html',
                dependencies: ['controllers/DcBills/DetailedExpenditureController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.SessionWiseStrength': {
                url: "/SessionWiseStrength",
                templateUrl: 'app/views/PreExamination/SessionWiseStrength.html',
                dependencies: ['controllers/PreExamination/SessionWiseStrengthController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.GeneratePinOdcData': {
                url: "/GeneratePinOdcData",
                templateUrl: 'app/views/PostExam/GeneratePinOdcData.html',
                dependencies: ['controllers/PostExam/GeneratePinOdcDataController', 'services/PreExamination/PreExaminationService']
            },



            'Dashboard.PostExam.WantingsReport': {
                url: "/WantingsReport",
                templateUrl: 'app/views/Admission/Reports/WantingsReport.html',
                dependencies: ['controllers/Admission/Reports/WantingsReportController', 'services/Admission/AdmissionService']
            },


            'Dashboard.DcBillsDashboard': {
                url: "/DcBillsDashboard",
                templateUrl: 'app/views/DcBills/DcBillsDashboard.html',
                dependencies: ['controllers/DcBills/DcBillsDashboardController', 'services/SystemAdministration/SystemUserService']
            },

            'Dashboard.PreExamination.ExamAdvance': {
                url: "/ExamAdvance",
                templateUrl: 'app/views/PostExam/ExamAdvance.html',
                dependencies: ['controllers/PostExam/ExamAdvanceController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.AddExamExpenditure': {
                url: "/AddExamExpenditure",
                templateUrl: 'app/views/DcBills/AddExamExpenditure.html',
                dependencies: ['controllers/DcBills/AddExamExpenditureController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.SetExaminationExpenditureCharges': {
                url: "/SetExaminationExpenditureCharges",
                templateUrl: 'app/views/DcBills/Annexture.html',
                dependencies: ['controllers/DcBills/AnnextureController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.TotalExpenditure': {
                url: "/TotalExpenditure",
                templateUrl: 'app/views/DcBills/TotalExpenditure.html',
                dependencies: ['controllers/DcBills/TotalExpenditureController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.DetailedExpenditure': {
                url: "/DetailedExpenditure",
                templateUrl: 'app/views/DcBills/DetailedExpenditure.html',
                dependencies: ['controllers/DcBills/DetailedExpenditureController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.StudentOnlineRequest': {
                url: "/StudentOnlineRequest",
                templateUrl: 'app/views/StudentOnlineServices/StudentOnlineRequest.html',
                dependencies: ['controllers/StudentOnlineServices/StudentOnlineRequestController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            'Dashboard.PostExam.ResultsAutomationExcelUpload': {
                url: "/ResultsAutomationExcelUpload",
                templateUrl: 'app/views/Results/ResultsAutomationExcelUpload.html',
                dependencies: ['controllers/Results/ResultsAutomationExcelUploadController', 'directives/saFileUpload', 'services/PreExamination/PreExaminationService', 'services/StudentResultService', 'services/Assessment/AssessmentService', 'services/Results/StudentWiseService']
            },

            'Dashboard.PostExam.RVRCResultsUpdation': {
                url: "/RVRCResultsUpdation",
                templateUrl: 'app/views/Results/RVRCResultsUpdation.html',
                dependencies: ['controllers/Results/RVRCResultsUpdationController', 'directives/saFileUpload', 'services/PreExamination/PreExaminationService', 'services/StudentResultService', 'services/Assessment/AssessmentService', 'services/Results/StudentWiseService']
            },


            'Dashboard.PreExamination.StudyCertificate': {
                url: "/StudyCertificate",
                templateUrl: 'app/views/PostExam/StudyCertificate.html',
                dependencies: ['controllers/PostExam/StudyCertificateController', 'services/PreExamination/PreExaminationService']
            },


            'Dashboard.PostExam.AmbedkarResultsReport': {
                url: "/AmbedkarResultsReport",
                templateUrl: 'app/views/PostExam/AmbedkarResultsReport.html',
                dependencies: ['controllers/PostExam/AmbedkarResultsReportController', 'services/PreExamination/PreExaminationService', 'services/StudentResultService']
            },


            'Dashboard.PostExam.BacklogSubjects': {
                url: "/BacklogSubjects",
                templateUrl: 'app/views/PostExam/BacklogSubjects.html',
                dependencies: ['controllers/PostExam/BacklogSubjectsController', 'services/PreExamination/PreExaminationService', 'services/StudentResultService']
            },

            'Dashboard.PostExam.ResultsReports': {
                url: "/ResultsReports",
                templateUrl: 'app/views/PostExam/ResultsReports.html',
                dependencies: ['controllers/PostExam/ResultsReportsController', 'services/PreExamination/PreExaminationService', 'services/Admission/StudentRegService', 'services/StudentResultService']
            },

            'Dashboard.PostExam.3BacklogIndustrialFailedReport': {
                url: "/3BacklogIndustrialFailedReport",
                templateUrl: 'app/views/PostExam/3BacklogIndustrialFailedReport.html',
                dependencies: ['controllers/PostExam/3BacklogIndustrialFailedReportController', 'services/PreExamination/PreExaminationService', 'services/StudentResultService']
            },


            'Dashboard.PostExam.ExamAdvance': {
                url: "/ExamAdvance",
                templateUrl: 'app/views/PostExam/ExamAdvance.html',
                dependencies: ['controllers/PostExam/ExamAdvanceController', 'services/PreExamination/PreExaminationService']
            },



            'Dashboard.PostExam.TwshCertificate': {
                url: "/TwshCertificate",
                templateUrl: 'app/views/TWSH/TwshCertificate.html',
                dependencies: ['controllers/TWSH/TwshCertificateController', 'services/TWSH/TwshStudentRegService']
            },


            'Dashboard.PostExam.SeatingArrangement': {
                url: "/SeatingArrangement",
                templateUrl: 'app/views/PostExam/SeatingArrangement.html',
                dependencies: ['controllers/PostExam/SeatingArrangementController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            'Dashboard.PostExam.StudentFileUpload': {
                url: "/StudentFileUpload",
                templateUrl: 'app/views/StudentOnlineServices/StudentFileUpload.html',
                dependencies: ['controllers/StudentOnlineServices/StudentFileUploadController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            'Dashboard.PostExam.CertificateApproval': {
                url: "/CertificateApproval",
                templateUrl: 'app/views/PostExam/CertificateApproval.html',
                dependencies: ['controllers/CertificateApprovalController', 'services/PreExamination/PreExaminationService']
            },


            'Dashboard.PostExam.CertificateApproveList': {
                url: "/CertificateApproveList",
                templateUrl: 'app/views/PostExam/CertificateApproveList.html',
                dependencies: ['controllers/PostExam/CertificateApproveListController', 'services/PreExamination/PreExaminationService']
            },


            'Dashboard.PostExam.TranscriptApproval': {
                url: "/TranscriptApproval",
                templateUrl: 'app/views/PostExam/TranscriptApproval.html',
                dependencies: ['controllers/PostExam/TranscriptApprovalController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.TranscriptApprovalDetails': {
                url: "/TranscriptApproval/TranscriptApprovalDetails",
                templateUrl: 'app/views/PostExam/TranscriptApprovalDetails.html',
                dependencies: ['controllers/PostExam/TranscriptApprovalDetailsController', 'services/PreExamination/PreExaminationService', 'services/DigitalSignatureService']
            },
            'Dashboard.PostExam.Transcript_StudentDetails': {
                url: "/TranscriptApproval/TranscriptApprovalDetails/Transcript_StudentDetails",
                templateUrl: 'app/views/PostExam/Transcript_StudentDetails.html',
                dependencies: ['controllers/PostExam/Transcript_StudentDetailsController', 'services/PreExamination/PreExaminationService']
            },
            //Marks Memo ApproveList  

            'Dashboard.PostExam.MarksMemoApproval': {
                url: "/MarksMemoApproval",
                templateUrl: 'app/views/PostExam/MarksMemoApproval.html',
                dependencies: ['controllers/PostExam/MarksMemoApprovalController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.MarksMemoApprovalDetails': {
                url: "/MarksMemoApproval/MarksMemoApprovalDetails",
                templateUrl: 'app/views/PostExam/MarksMemoApprovalDetails.html',
                dependencies: ['controllers/PostExam/MarksMemoApprovalDetailsController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.SemesterData': {
                url: "/MarksMemoApproval/MarksMemoApprovalDetails/SemesterData",
                templateUrl: 'app/views/PostExam/SemesterData.html',
                dependencies: ['controllers/PostExam/SemesterDataController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.DMFinal': {
                url: "/MarksMemoApproval/MarksMemoApprovalDetails/DMFinal",
                templateUrl: 'app/views/PostExam/DMFinal.html',
                dependencies: ['controllers/PostExam/DMFinalController', 'services/PreExamination/PreExaminationService']
            },


            //TC ApproveList   


            'Dashboard.PostExam.Tc_StudentDetails': {
                url: "/TcApprovalList/TcApprovalListDetails/Tc_StudentDetails",
                templateUrl: 'app/views/PostExam/Tc_StudentDetails.html',
                dependencies: ['controllers/PostExam/Tc_StudentDetailsController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.IC_StudentDetails': {
                url: "/StudentCertificateApproveList/StudentCertificateApproveListDetails/IC_StudentDetails",
                templateUrl: 'app/views/PostExam/IC_StudentDetails.html',
                dependencies: ['controllers/PostExam/IC_StudentDetailsController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.MC_StudentDetails': {
                url: "/MigrationApprovalList/MigrationApprovalListdetails/MC_StudentDetails",
                templateUrl: 'app/views/PostExam/MC_StudentDetails.html',
                dependencies: ['controllers/PostExam/MC_StudentDetailsController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.TcApprovalList': {
                url: "/TcApprovalList",
                templateUrl: 'app/views/PostExam/TcApprovalList.html',
                dependencies: ['controllers/PostExam/TcApprovalListController', 'services/PreExamination/PreExaminationService', 'directives/saDate', 'services/DigitalSignatureService']
            },

            'Dashboard.PostExam.TcApprovalListDetails': {
                url: "/TcApprovalList/TcApprovalListDetails",
                templateUrl: 'app/views/PostExam/TcApprovalListDetails.html',
                dependencies: ['controllers/PostExam/TcApprovalListDetailsController', 'services/PreExamination/PreExaminationService', 'directives/saDate', 'services/DigitalSignatureService']
            },

            'Dashboard.PostExam.StudyCertificateApproveList': {
                url: "/StudyCertificateApproveList",
                templateUrl: 'app/views/PostExam/StudyCertificateApproveList.html',
                dependencies: ['controllers/PostExam/StudyCertificateApproveListController', 'services/PreExamination/PreExaminationService', 'directives/saDate', 'services/DigitalSignatureService']
            },



            'Dashboard.PostExam.StudyCertificateApproveListDetails': {
                url: "/StudyCertificateApproveList/StudyCertificateApproveListDetails",
                templateUrl: 'app/views/PostExam/StudyCertificateApproveListDetails.html',
                dependencies: ['controllers/PostExam/StudyCertificateApproveListDetailsController', 'services/PreExamination/PreExaminationService', 'directives/saDate', 'services/DigitalSignatureService']
            },

            'Dashboard.PostExam.BonafideCertApproveList': {
                url: "/BonafideCertApproveList",
                templateUrl: 'app/views/PostExam/BonafideCertApproveList.html',
                dependencies: ['controllers/PostExam/BonafideCertApproveListController', 'services/PreExamination/PreExaminationService', 'directives/saDate', 'services/DigitalSignatureService']
            },

            'Dashboard.PostExam.BonafideCertificateApproveListDetails': {
                url: "/BonafideCertificate/BonafideCertificateApproveListDetails",
                templateUrl: 'app/views/PostExam/BonafideCertApproveListDetails.html',
                dependencies: ['controllers/PostExam/BonafideCertApproveListDetailsController', 'services/PreExamination/PreExaminationService', 'directives/saDate', 'services/DigitalSignatureService']
            },

            'Dashboard.PostExam.TransferCertificatePending': {
                url: "/TcApprovalList/TcApprovalListDetails/TransferCertificatePending",
                templateUrl: 'app/views/PostExam/TransferCertificatePending.html',
                dependencies: ['controllers/PostExam/TransferCertificatePendingController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.MigrationApprovalList': {
                url: "/MigrationApprovalList",
                templateUrl: 'app/views/PostExam/MigrationApprovalList.html',
                dependencies: ['controllers/PostExam/MigrationApprovalListController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.MigrationApprovalListdetails': {
                url: "/MigrationApprovalList/MigrationApprovalListdetails",
                templateUrl: 'app/views/PostExam/MigrationApprovalListdetails.html',
                dependencies: ['controllers/PostExam/MigrationApprovalListdetailsController', 'services/PreExamination/PreExaminationService', 'services/DigitalSignatureService']
            },

            'Dashboard.PostExam.OdcApproveList': {
                url: "/OdcApproveList",
                templateUrl: 'app/views/PostExam/OdcApproveList.html',
                dependencies: ['controllers/PostExam/OdcApproveListController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.PostExam.OdcFinal': {
                url: "/OdcApproveList/OdcApproveListDetails/OdcFinal",
                templateUrl: 'app/views/PostExam/OdcFinal.html',
                dependencies: ['controllers/PostExam/OdcFinalController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.PostExam.OdcDataa': {
                url: "/OdcApproveList/OdcApproveListDetails/OdcData",
                templateUrl: 'app/views/PostExam/OdcData.html',
                dependencies: ['controllers/PostExam/OdcDataController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.PostExam.OdcApproveListDetails': {
                url: "/OdcApproveList/OdcApproveListDetails",
                templateUrl: 'app/views/PostExam/OdcApproveListDetails.html',
                dependencies: ['controllers/PostExam/OdcApproveListDetailsController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.Odc_StudentDetails': {
                url: "/OdcApproveList/OdcApproveListDetails/Odc_StudentDetails",
                templateUrl: 'app/views/PostExam/Odc_StudentDetails.html',
                dependencies: ['controllers/PostExam/Odc_StudentDetailsController', 'services/PreExamination/PreExaminationService']
            },





            'Dashboard.PostExam.Er91FinalCertificate': {
                url: "/Er91FinalCertificate",
                templateUrl: 'app/views/PostExam/Er91FinalCertificate.html',
                dependencies: ['controllers/PostExam/Er91FinalCertificateController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.MarksMemoFinal': {
                url: "/MarksMemoFinal",
                templateUrl: 'app/views/PostExam/MarksMemoFinal.html',
                dependencies: ['controllers/PostExam/MarksMemoFinalController', 'services/PreExamination/PreExaminationService']
            },





            'Dashboard.PostExam.GenuinenessApproval': {
                url: "/GenuinenessApproval",
                templateUrl: 'app/views/PostExam/GenuinenessApproval.html',
                dependencies: ['controllers/PostExam/GenuinenessApprovalController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.PostExam.GenuinenessApproveList': {
                url: "/GenuinenessApproval/GenuinenessApproveList",
                templateUrl: 'app/views/PostExam/GenuinenessApproveList.html',
                dependencies: ['controllers/PostExam/GenuinenessApproveListController', 'services/PreExamination/PreExaminationService', 'services/DigitalSignatureService']
            },

            'Dashboard.PostExam.OdcData': {
                url: "/GenuinenessApproval/GenuinenessApproveList/OdcData",
                templateUrl: 'app/views/PostExam/OdcData.html',
                dependencies: ['controllers/PostExam/OdcDataController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.GenuineOdc': {
                url: "/GenuinenessApproval/GenuinenessApproveList/GenuineOdc",
                templateUrl: 'app/views/PostExam/GenuineOdc.html',
                dependencies: ['controllers/PostExam/GenuineOdcController', 'services/PreExamination/PreExaminationService']
            },




            'Dashboard.PostExam.MigrationCertificate': {
                url: "/MigrationApprovalList/MigrationApprovalListdetails/MigrationCertificate",
                templateUrl: 'app/views/studentOnlineservices/MigrationCertificate.html',
                dependencies: ['controllers/studentOnlineservices/MigrationCertificateController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.Migrationpending': {
                url: "/MigrationApprovalList/MigrationApprovalListdetails/Migrationpending",
                templateUrl: 'app/views/PostExam/Migrationpending.html',
                dependencies: ['controllers/PostExam/MigrationpendingController', 'services/PreExamination/PreExaminationService']
            },



            'Dashboard.PostExam.CertificateApproveListDetails': {
                url: "/CertificateApproveList/CertificateApproveListDetails",
                templateUrl: 'app/views/PostExam/CertificateApproveListDetails.html',
                dependencies: ['controllers/PostExam/CertificateApproveListDetailsController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.PostExam.NoDataCertificateApproveList': {
                url: "/NoDataCertificateApproveList",
                templateUrl: 'app/views/PostExam/NoDataCertificateApproveList.html',
                dependencies: ['controllers/PostExam/NoDataCertificateApproveListController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.PostExam.NoDataCertificateApproveListDetails': {
                url: "/NoDataCertificateApproveList/NoDataCertificateApproveListDetails",
                templateUrl: 'app/views/PostExam/NoDataCertificateApproveListDetails.html',
                dependencies: ['controllers/PostExam/NoDataCertificateApproveListDetailsController', 'services/PreExamination/PreExaminationService']
            },
            //'Dashboard.PostExam.CertificateApproveListDetails': {
            //    url: "/NoDataCertificateApproveList/NoDataCertificateApproveListDetails/CertificateApproveListDetails",
            //    templateUrl: 'app/views/PostExam/NoDataCertificateApproveListDetails.html',
            //    dependencies: ['controllers/PostExam/NoDataCertificateApproveListDetailsController', 'services/PreExamination/PreExaminationService']
            //},


            'Dashboard.PostExam.CertificateApprovalDetails': {
                url: "/CertificateApproval/CertificateApprovalDetails",
                templateUrl: 'app/views/PostExam/CertificateApprovalDetails.html',
                dependencies: ['controllers/PostExam/CertificateApprovalDetailsController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.GetODCData': {
                url: "/GetODCData",
                templateUrl: 'app/views/PostExam/GetODCData.html',
                dependencies: ['controllers/PostExam/GetODCDataController', 'services/PreExamination/PreExaminationService','services/DigitalSignatureService']
            },


            'Dashboard.PreExamination': {
                url: "/PreExamination",
                templateUrl: 'app/views/PreExamination/PreExamination.html',
                dependencies: ['controllers/PreExamination/PreExaminationController', 'services/SystemAdministration/SystemUserService']
            },


           

            //TimeTable Page
            'Dashboard.TimeTablePage': {
                url: "/TimeTablePage",
                templateUrl: 'app/views/PreExamination/TimeTablePage.html',
                dependencies: ['controllers/PreExamination/TimeTablePageController', 'services/SystemAdministration/SystemUserService']
            },
            'Dashboard.PreExamination.NrSessionWiseReport': {
                url: "/NrSessionWiseReport",
                templateUrl: 'app/views/PreExamination/DaywiseNrReports.html',
                dependencies: ['controllers/PreExamination/DaywiseNrReportsController', , 'services/PreExamination/PreExaminationService', 'directives/saDate', 'directives/saTable']
            },


            'Dashboard.PreExamination.EligibleStudentsForFeePayment': {
                url: "/EligibleStudentsForFeePayment",
                templateUrl: 'app/views/PreExamination/EligibleStudentsForFeePayment.html',
                dependencies: ['controllers/PreExamination/EligibleStudentsForFeePaymentController', 'services/PreExamination/PreExaminationService', 'services/StudentResultService']
            },


            //'Dashboard.PreExamination.ElectiveMappingSubjectReport': {
            //    url: "/ElectiveMappingReport/ElectiveMappingSubjectReport",
            //    templateUrl: 'app/views/PreExamination/ElectiveMappingSubjectReport.html',
            //    dependencies: ['controllers/PreExamination/ElectiveMappingSubjectReportController', , 'services/PreExamination/PreExaminationService', 'directives/saDate']
            //},

            'Dashboard.PreExamination.GenerateTimeTable': {
                url: "/GenerateTimeTable",
                templateUrl: 'app/views/PreExamination/GenerateTimeTable.html',
                dependencies: ['controllers/PreExamination/GenerateTimeTableController', , 'services/PreExamination/PreExaminationService', 'services/StudentResultService', 'directives/saDate']
            },

            'Dashboard.PreExamination.EnableFeePayment': {
                url: "/EnableFeePayment",
                templateUrl: 'app/views/PreExamination/EnableFeepayment.html',
                dependencies: ['controllers/PreExamination/EnableFeepaymentController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.BranchOrSemFeeReports': {
                url: "/BranchOrSemFeeReports",
                templateUrl: 'app/views/PreExamination/BranchOrSemFeeReports.html',
                dependencies: ['controllers/PreExamination/BranchOrSemFeeReportsController', 'services/PreExamination/PreExaminationService', 'services/Admission/AdmissionService', 'services/StudentResultService']
            },

            'Dashboard.PreExamination.BranchOrSemFeeSubReports': {
                url: "/BranchOrSemFeeReports/BranchOrSemFeeSubReports",
                templateUrl: 'app/views/PreExamination/BranchOrSemFeeSubReports.html',
                dependencies: ['controllers/PreExamination/BranchOrSemFeeSubReportsController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.PreExamTimetable': {
                url: "/PreExamTimetable",
                templateUrl: 'app/views/PreExamination/PreExamTimetable.html',
                dependencies: ['controllers/PreExamination/PreExamTimetableController', , 'services/PreExamination/PreExaminationService', 'directives/saDate', 'services/StudentResultService', 'directives/saDate']
            },
            'Dashboard.PreExamination.UpdateTimeTable': {
                url: "/UpdateTimeTable",
                templateUrl: 'app/views/PreExamination/UpdateDateSheet.html',
                dependencies: ['controllers/PreExamination/UpdateDateSheetController', , 'services/PreExamination/PreExaminationService', 'directives/saDate', 'services/StudentResultService', 'directives/saDate']
            },
            'Dashboard.PreExamination.SetDates': {
                url: "/SetDates",
                templateUrl: 'app/views/PreExamination/FeeSetDates.html',
                dependencies: ['controllers/PreExamination/FeeSetDatesController', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService', 'services/Admission/AdmissionService']
            },
            'Dashboard.PreExamination.PaymentStatus': {
                url: "/PaymentStatus",
                templateUrl: 'app/views/PreExamination/PaymentStatus.html',
                dependencies: ['controllers/PreExamination/PaymentStatusController', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.AddExamHallCapacity': {
                url: "/AddExamHallCapacity",
                templateUrl: 'app/views/PreExamination/CreateSeatingList.html',
                dependencies: ['controllers/PreExamination/CreateSeatingListController', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService']
            },


            'Dashboard.PreExamination.ExamHallDetails': {
                url: "/ExamHallDetails",
                templateUrl: 'app/views/PreExamination/ExaminationHallDetails.html',
                dependencies: ['controllers/PreExamination/ExaminationHallDetailsController', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.GenerateSeatingPlan': {
                url: "/ExamHallDetails/GenerateSeatingPlan",
                templateUrl: 'app/views/PreExamination/SeatingPlanGenerator.html',
                dependencies: ['controllers/PreExamination/SeatingPlanGeneratorController', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.CreateSeatingPlan': {
                url: "/CreateSeatingPlan",
                templateUrl: 'app/views/PreExamination/CreateSeatingPlan.html',
                dependencies: ['controllers/PreExamination/CreateSeatingPlanController', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService']
            },


            'Dashboard.PreExamination.QueryPaymentStatus': {
                url: "/QueryPaymentStatus",
                templateUrl: 'app/views/PreExamination/QueryPaymentStatus.html',
                dependencies: ['controllers/PreExamination/QueryPaymentStatusController', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.PreExamination.SetExamCenters': {
                url: "/SetExamCenters",
                templateUrl: 'app/views/PreExamination/SetExamCenters.html',
                dependencies: ['controllers/PreExamination/SetExamCentersController', 'services/PreExamination/PreExaminationService', 'services/Admission/AdmissionService', 'services/Assessment/MarksEntryService']
            },
            'Dashboard.PreExamination.TransactionReport': {
                url: "/TransactionReport",
                templateUrl: 'app/views/PreExamination/TransactionReport.html',
                dependencies: ['controllers/PreExamination/TransactionReportController', 'services/PreExamination/PreExaminationService', 'services/Assessment/MarksEntryService', 'directives/saTable']
            },
            'Dashboard.PreExamination.SubBillerReport': {
                url: "/SubBillerReport",
                templateUrl: 'app/views/PreExamination/SubBillerReport.html',
                dependencies: ['controllers/PreExamination/SubBillerReportController', 'services/PreExamination/PreExaminationService', 'services/Assessment/MarksEntryService', 'directives/saTable']
            },
            'Dashboard.PreExamination.SmsService': {
                url: "/SmsService",
                templateUrl: 'app/views/PreExamination/SmsService.html',
                dependencies: ['controllers/PreExamination/SmsServiceController']
            },
            'Dashboard.PreExamination.NrDownload': {
                url: "/NrDownload",
                templateUrl: 'app/views/PreExamination/NrDownload.html',
                dependencies: ['controllers/PreExamination/NrDownloadController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.PreExamination.PrinterNrDownload': {
                url: "/PrinterNrDownload",
                templateUrl: 'app/views/PreExamination/PrinterNrDownload.html',
                dependencies: ['controllers/PreExamination/PrinterNrDownloadController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.CreateExamMonthYear': {
                url: "/CreateExamMonthYear",
                templateUrl: 'app/views/PreExamination/CreateExamMonthYear.html',
                dependencies: ['controllers/PreExamination/CreateExamMonthYearController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.PreExamination.NrExcelReport': {
                url: "/NrExcelReport",
                templateUrl: 'app/views/PreExamination/NrExcelReport.html',
                dependencies: ['controllers/PreExamination/NrExcelReportController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.PreExamination.BackLogStudentDetails': {
                url: "/BackLogStudentDetails",
                templateUrl: 'app/views/PreExamination/BackLogStudentDetails.html',
                dependencies: ['controllers/PreExamination/BackLogStudentDetailsController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.PreExamination.PreExamFeePayment': {
                url: "/PreExamFeePayment",
                templateUrl: 'app/views/PreExamination/PreExamFeePayment.html',
                dependencies: ['controllers/PreExamination/PreExamFeePaymentController', 'services/PreExamination/PreExaminationService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/BillDesk/paymentService']
            },

            'Dashboard.PreExamination.DiplomaFeePayment': {
                url: "/DiplomaFeePayment",
                templateUrl: 'app/views/PreExamination/DiplomaFeePayment.html',
                dependencies: ['controllers/PreExamination/DiplomaFeePaymentController', 'services/PreExamination/PreExaminationService', 'services/Assessment/MarksEntryService', 'services/BillDesk/paymentService', 'directives/saTable']
            },
            'Dashboard.PreExamination.PreExamReports': {
                url: "/PreExamReports",
                templateUrl: 'app/views/PreExamination/PreExamReports.html',
                dependencies: ['controllers/PreExamination/PreExamReportsController', 'services/PreExamination/PreExaminationService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService']
            },

            'Dashboard.PreExamination.AdminPreExamReports': {
                url: "/AdminPreExamReports",
                templateUrl: 'app/views/PreExamination/AdminPreExamReports.html',
                dependencies: ['controllers/PreExamination/AdminPreExamReportsController', 'services/PreExamination/PreExaminationService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService']
            },

            'Dashboard.PreExamination.HodCondonation': {
                url: "/HodCondonation",
                templateUrl: 'app/views/PreExamination/HodCondonation.html',
                dependencies: ['controllers/PreExamination/HodCondonationController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.PrincipalCondonation': {
                url: "/PrincipalCondonation",
                templateUrl: 'app/views/PreExamination/PrincipalCondonation.html',
                dependencies: ['controllers/PreExamination/PrincipalCondonationController']
            },

            'Dashboard.PreExamination.Condonation': {
                url: "/Condonation",
                templateUrl: 'app/views/PreExamination/Condonation.html',
                dependencies: ['controllers/PreExamination/CondonationController', 'services/PreExamination/PreExaminationService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService']
            },

            //'Dashboard.PreExamination.PostAttendance': {
            //    url: "/PostAttendance",
            //    templateUrl: 'app/views/PreExamination/PostAttendance.html',
            //    dependencies: ['controllers/PreExamination/PostAttendanceController', 'services/PreExamination/PreExaminationService']
            //},

            'Dashboard.PreExamination.CheckOnRole': {
                url: "/Condonation/CheckOnRole",
                templateUrl: 'app/views/PreExamination/CheckOnRole.html',
                dependencies: ['controllers/PreExamination/CheckOnRoleController', 'services/PreExamination/PreExaminationService', 'services/Assessment/AssessmentService', 'directives/saTable', 'services/Assessment/MarksEntryService']
            },

            'Dashboard.PreExamination.RecomendApproval': {
                url: "/RecomendApproval",
                templateUrl: 'app/views/PreExamination/RecomendApproval.html',
                dependencies: ['controllers/PreExamination/RecomendApprovalController', 'services/PreExamination/PreExaminationService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService']
            },

            'Dashboard.PreExamination.CondonationList': {
                url: "/CondonationList",
                templateUrl: 'app/views/PreExamination/CondonationList.html',
                dependencies: ['controllers/PreExamination/CondonationListController', 'services/PreExamination/PreExaminationService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService']
            },

            'Dashboard.PreExamination.Hallticket': {
                url: "/Hallticket",
                templateUrl: 'app/views/PreExamination/Hallticket.html',
                dependencies: ['controllers/PreExamination/HallticketController', 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            'Dashboard.PreExamination.DiplomaHallticket': {
                url: "/DiplomaHallticket",
                templateUrl: 'app/views/PreExamination/DiplomaHallticket.html',
                dependencies: ['controllers/PreExamination/DiplomaHallticketController', , 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },


            'Dashboard.PreExamination.BacklogHallticket': {
                url: "/BacklogHallticket",
                templateUrl: 'app/views/PreExamination/BacklogHallticket.html',
                dependencies: ['controllers/PreExamination/BacklogHallticketController', 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.SeatingArrangement': {
                url: "/SeatingArrangement",
                templateUrl: 'app/views/PreExamination/SeatingArrangement.html',
                dependencies: ['controllers/PreExamination/SeatingArrangementController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.PreExamination.TimeTable': {
                url: "/TimeTable",
                templateUrl: 'app/views/PreExamination/TimeTable.html',
                dependencies: ['controllers/PreExamination/TimeTableController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.PreExamination.TimeTable1': {
                url: "/TimeTable1",
                templateUrl: 'app/views/PreExamination/TimeTable1.html',
                dependencies: ['controllers/PreExamination/TimeTable1Controller', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.SeatingArrangementBlockwise': {
                url: "/SeatingArrangementBlockwise",
                templateUrl: 'app/views/PreExamination/SeatingArrangementBlockwise.html',
                dependencies: ['controllers/PreExamination/SeatingArrangementBlockwiseController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.OmrCount': {
                url: "/OmrCount",
                templateUrl: 'app/views/PreExamination/OmrCount.html',
                dependencies: ['controllers/PreExamination/OmrCountController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.ViewOmrCount': {
                url: "/OmrCount/ViewOmrCount",
                templateUrl: 'app/views/PreExamination/ViewOmrCount.html',
                dependencies: ['controllers/PreExamination/ViewOmrCountController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.MarksSheet': {
                url: "/MarksSheet",
                templateUrl: 'app/views/PreExamination/MarksSheet.html',
                dependencies: ['controllers/PreExamination/MarksSheetController']
            },


            'Dashboard.AdmissionDashboard.ActiveType': {
                url: "/ActiveType",
                templateUrl: 'app/views/Admission/Reports/ActiveType.html',
                dependencies: ['controllers/Admission/Reports/ActiveTypeController']
            },


            'Dashboard.PreExamination.PromotionalFee': {
                url: "/PromotionalFee",
                templateUrl: 'app/views/PreExamination/PromotionalFee.html',
                dependencies: ['controllers/PreExamination/PromotionalFeeController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService', 'services/Assessment/MarksEntryService']
            },

            'Dashboard.PreExamination.TimeTable': {
                url: "/TimeTable",
                templateUrl: 'app/views/PreExamination/TimeTable.html',
                dependencies: ['controllers/PreExamination/TimeTableController', 'directives/saInput', 'directives/saSelect', 'directives/saDate', 'directives/saDateRng', 'directives/saTime',]
            },


            'Dashboard.PreExamination.S2sTransactionReports': {
                url: "/S2sTransactionReports",
                templateUrl: 'app/views/PreExamination/S2sTransactionReports.html',
                dependencies: ['controllers/PreExamination/S2sTransactionReportsController', 'services/PreExamination/PreExaminationService', 'directives/saDate', 'directives/saTable', 'services/Assessment/MarksEntryService']
            },

            'Dashboard.PreExamination.StudentFeedbackForm': {
                url: "/StudentFeedbackForm",
                templateUrl: 'app/views/PreExamination/StudentFeedbackForm.html',
                dependencies: ['controllers/PreExamination/StudentFeedbackFormController', 'services/PreExamination/PreExaminationService', 'directives/saDate', 'directives/saTable']

            },

            'Dashboard.PreExamination.StudentOnlineRequest': {
                url: "/StudentOnlineRequest",
                templateUrl: 'app/views/StudentOnlineServices/StudentOnlineRequest.html',
                dependencies: ['controllers/StudentOnlineServices/StudentOnlineRequestController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },


            'Dashboard.PreExamination.MercyList': {
                url: "/MercyList",
                templateUrl: 'app/views/PreExamination/MercyList.html',
                dependencies: ['controllers/PreExamination/MercyListController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            'Dashboard.Academic.PostAttendance': {
                url: "/PostAttendance",
                templateUrl: 'app/views/PreExamination/PostAttendance.html',
                dependencies: ['controllers/PreExamination/PostAttendanceController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PreExamination.DaywisePcodeReport': {
                url: "/DaywisePcodeReport",
                templateUrl: 'app/views/PreExamination/DaywisePcodeReport.html',
                dependencies: ['controllers/PreExamination/DaywisePcodeReportController', 'services/PreExamination/PreExaminationService', 'services/Academic/AcademicService']
            },



            'Dashboard.PostExam.NameCorrectionApproveList': {
                url: "/NameCorrectionApproveList",
                templateUrl: 'app/views/PostExam/NameCorrectionApproveList.html',
                dependencies: ['controllers/PostExam/NameCorrectionApproveListController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            'Dashboard.PostExam.OdcGeneration': {
                url: "/OdcGeneration",
                templateUrl: 'app/views/PostExam/OdcGeneration.html',
                dependencies: ['controllers/PostExam/OdcGenerationController', 'services/PreExamination/PreExaminationService']
            },



            'Dashboard.PostExam.NBAReports': {
                url: "/NBAReports",
                templateUrl: 'app/views/PostExam/NBAReports.html',
                dependencies: ['controllers/PostExam/NBAReportsController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.GenerateC18MemosData': {
                url: "/GenerateC18MemosData",
                templateUrl: 'app/views/PostExam/GenerateC18MemosData.html',
                dependencies: ['controllers/PostExam/GenerateC18MemosDataController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.StudentServices.NameCorrectionApproveList': {
                url: "/NameCorrectionApproveList",
                templateUrl: 'app/views/PostExam/NameCorrectionApproveList.html',
                dependencies: ['controllers/PostExam/NameCorrectionApproveListController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            'Dashboard.StudentServices.GetODCData': {
                url: "/GetODCData",
                templateUrl: 'app/views/PostExam/GetODCData.html',
                dependencies: ['controllers/PostExam/GetODCDataController', 'services/PreExamination/PreExaminationService', 'services/DigitalSignatureService']
            },


            'Dashboard.PostExam.MarksMemo': {
                url: "/MarksMemo",
                templateUrl: 'app/views/PostExam/MarksMemo.html',
                dependencies: ['controllers/PostExam/MarksMemoController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            'Dashboard.PostExam.TwoYearsOdcReport': {
                url: "/TwoYearsOdcReport",
                templateUrl: 'app/views/PostExam/TwoYearsOdcReport.html',
                dependencies: ['controllers/PostExam/TwoYearsOdcReportController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            'Dashboard.PreExamination.TrSheet': {

                url: "/TrSheet",

                templateUrl: 'app/views/StudentOnlineServices/TrSheet.html',

                dependencies: ['controllers/StudentOnlineServices/TrSheetController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']

            },

            'Dashboard.PostExam.MemoTrSheet': {
                url: "/MemoTrSheet",
                templateUrl: 'app/views/StudentOnlineServices/MemoTrSheet.html',
                dependencies: ['controllers/StudentOnlineServices/MemoTrSheetController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },
            'Dashboard.PostExam.OdcTrSheet': {
                url: "/OdcTrSheet",
                templateUrl: 'app/views/StudentOnlineServices/OdcTrSheet.html',
                dependencies: ['controllers/StudentOnlineServices/OdcTrSheetController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },
            'Dashboard.PostExam.C18OdcTrSheet': {
                url: "/C18OdcTrSheet",
                templateUrl: 'app/views/PostExam/C18OdcTrSheet.html',
                dependencies: ['controllers/PostExam/C18OdcTrSheetController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            'Dashboard.PostExam.ThreeBacklogODCReport': {
                url: "/ThreeBacklogODCReport",
                templateUrl: 'app/views/PostExam/ThreeBacklogODCReport.html',
                dependencies: ['controllers/PostExam/ThreeBacklogODCReportController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },
            'Dashboard.PostExam.ThreeBacklogOdcData': {
                url: "/ThreeBacklogOdcData",
                templateUrl: 'app/views/PostExam/ThreeBacklogOdcData.html',
                dependencies: ['controllers/PostExam/ThreeBacklogOdcDataController', 'services/PostExam/ThreeBacklogOdcDataService', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.NameCorrectionApproveListDetails': {
                url: "/NameCorrectionApproveList/NameCorrectionApproveListDetails",
                templateUrl: 'app/views/PostExam/NameCorrectionApproveListDetails.html',
                dependencies: ['controllers/PostExam/NameCorrectionApproveListDetailsControler', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },


            'Dashboard.PostExam.NC_StudentDetails': {
                url: "/NameCorrectionApproveList/NameCorrectionApproveListDetails/NC_StudentDetails",
                templateUrl: 'app/views/PostExam/NC_StudentDetails.html',
                dependencies: ['controllers/PostExam/NC_StudentDetailsControllers', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            'Dashboard.PostExam.StudentCertificateApproveList': {
                url: "/StudentCertificateApproveList",
                templateUrl: 'app/views/StudentOnlineServices/StudentCertificateApproveList.html',
                dependencies: ['controllers/StudentOnlineServices/StudentCertificateApproveListController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },


            'Dashboard.PostExam.InterimCertificatePending': {
                url: "/StudentCertificateApproveList/StudentCertificateApproveListDetails/InterimCertificatePending",
                templateUrl: 'app/views/StudentOnlineServices/InterimCertificatePending.html',
                dependencies: ['controllers/StudentOnlineServices/InterimCertificatePendingController', 'directives/saCanvas', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService', 'services/DigitalSignatureService']

            },


            'Dashboard.PostExam.StudentCertificateApproveListDetails': {
                url: "/StudentCertificateApproveList/StudentCertificateApproveListDetails",
                templateUrl: 'app/views/StudentOnlineServices/StudentCertificateApproveListDetails.html',
                dependencies: ['controllers/StudentOnlineServices/StudentCertificateApproveListDetailsController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService', 'services/DigitalSignatureService']
            },

            'Dashboard.PostExam.InterimCertificate': {
                url: "/StudentCertificateApproveList/StudentCertificateApproveListDetails/InterimCertificate",
                templateUrl: 'app/views/StudentOnlineServices/InterimCertificatePending.html',
                dependencies: ['controllers/StudentOnlineServices/InterimCertificatePendingController', 'directives/saCanvas', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService', 'services/DigitalSignatureService']

            },

            'Dashboard.PreExamination.TrCertificate': {
                url: "/TrCertificate",
                templateUrl: 'app/views/StudentOnlineServices/TrCertificate.html',
                dependencies: ['controllers/StudentOnlineServices/TrCertificateController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },



            'Dashboard.PreExamination.MigrationCertificate': {
                url: "/MigrationCertificate",
                templateUrl: 'app/views/StudentOnlineServices/MigrationCertificate.html',
                dependencies: ['controllers/StudentOnlineServices/MigrationCertificateController', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService', 'services/Admission/AdmissionService']
            },
            //InterimCertificate

            'Dashboard.InterimCertificate': {
                url: "/InterimCertificate",
                templateUrl: 'app/views/StudentOnlineServices/InterimCertificate.html',
                dependencies: ['controllers/StudentOnlineServices/InterimCertificateController', 'directives/saCanvas', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService', 'services/Admission/AdmissionService']
            },
            //ConductCertificate

            'Dashboard.ConductCertificate': {
                url: "/ConductCertificate",
                templateUrl: 'app/views/StudentOnlineServices/ConductCertificate.html',
                dependencies: ['controllers/StudentOnlineServices/ConductCertificateController', 'directives/saCanvas', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService', 'services/Admission/AdmissionService']
            },

            //TC

            'Dashboard.PostExam.TransferCertificate': {
                url: "/TcApprovalList/TcApprovalListDetails/TransferCertificate",
                templateUrl: 'app/views/StudentOnlineServices/TransferCertificate.html',
                dependencies: ['controllers/StudentOnlineServices/TransferCertificateController', 'directives/saCanvas', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService', 'services/Admission/AdmissionService']
            },
            //TechincalExamnationCertificate

            'Dashboard.TechinicalExamnationCertificate': {
                url: "/TechinicalExamnationCertificate",
                templateUrl: 'app/views/StudentOnlineServices/TechinicalExamnationCertificate.html',
                dependencies: ['controllers/StudentOnlineServices/TechinicalExamnationCertificateController', 'directives/saCanvas', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService', 'services/Admission/AdmissionService']
            },

            'Dashboard.PreExamination.StudentRequestForm': {
                url: "/StudentRequestForm",
                templateUrl: 'app/views/StudentOnlineServices/StudentRequestForm.html',
                dependencies: ['controllers/StudentOnlineServices/StudentRequestFormController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            'Dashboard.PostExam.StudentRequestForm': {
                url: "/StudentRequestForm",
                templateUrl: 'app/views/StudentOnlineServices/StudentRequestForm.html',
                dependencies: ['controllers/StudentOnlineServices/StudentRequestFormController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService', 'directives/saDate']
            },

            'Dashboard.PostExam.GenuinenessCheckForm': {
                url: "/GenuinenessCheckForm",
                templateUrl: 'app/views/StudentOnlineServices/GenuinenessCheckForm.html',
                dependencies: ['controllers/StudentOnlineServices/GenuinenessCheckFormController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService', 'directives/saDate']
            },


            'Dashboard.PreExamination.StudentRequeststatus': {
                url: "/StudentRequeststatus",
                templateUrl: 'app/views/StudentOnlineServices/StudentRequeststatus.html',
                dependencies: ['controllers/StudentOnlineServices/StudentRequeststatusController', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService', 'services/Admission/AdmissionService']
            },
            'Dashboard.PreExamination.DuplicateMemo': {
                url: "/DuplicateMemo",
                templateUrl: 'app/views/StudentOnlineServices/DuplicateMemo.html',
                dependencies: ['controllers/StudentOnlineServices/DuplicateMemoController', 'directives/saCanvas', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService', 'services/Admission/AdmissionService']
            },
            'Dashboard.PreExamination.ProvisionalCertificate': {
                url: "/ProvisionalCertificate",
                templateUrl: 'app/views/StudentOnlineServices/ProvisionalCertificate.html',
                dependencies: ['controllers/StudentOnlineServices/ProvisionalCertificateController', 'directives/saCanvas']
            },

            'Dashboard.PreExamination.StudentNameCorrection': {
                url: "/StudentNameCorrection",
                templateUrl: 'app/views/StudentOnlineServices/StudentNameCorrection.html',
                dependencies: ['controllers/StudentOnlineServices/StudentNameCorrectionControler', 'services/PreExamination/PreExaminationService']
            },


            'Dashboard.MasterSettings': {
                url: "/MasterSettings",
                templateUrl: 'app/views/MasterSettings/MasterSettings.html',
                dependencies: ['controllers/MasterSettings/MasterSettingsController', 'services/SystemAdministration/SystemUserService']
            },



            'Dashboard.MasterSettings.ExamYearMonth': {
                url: "/ExamYearMonth",
                templateUrl: 'app/views/MasterSettings/ExamYearMonth.html',
                dependencies: ['controllers/MasterSettings/ExamYearMonthController', 'services/Admission/AdmissionService', 'services/PreExamination/PreExaminationService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/MasterSettings/MasterSettingsService']
            },

            'Dashboard.MasterSettings.HomePagePhotos': {
                url: "/HomePagePhotos",
                templateUrl: 'app/views/MasterSettings/HomePagePhotos.html',
                dependencies: ['controllers/MasterSettings/HomePagePhotosController', 'services/Admission/AdmissionService', 'services/PreExamination/PreExaminationService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/MasterSettings/MasterSettingsService']
            },

            

            'Dashboard.MasterSettings.AdminFeePayment': {
                url: "/AdminFeePayment",
                templateUrl: 'app/views/MasterSettings/AdminFeePayment.html',
                dependencies: ['controllers/MasterSettings/AdminFeePaymentController', 'services/PreExamination/PreExaminationService', 'services/Assessment/MarksEntryService', 'services/BillDesk/paymentService', 'directives/saTable']
            },
            'Dashboard.PreExamination.AdminFeePayment': {
                url: "/AdminFeePayment",
                templateUrl: 'app/views/MasterSettings/AdminFeePayment.html',
                dependencies: ['controllers/MasterSettings/AdminFeePaymentController', 'services/PreExamination/PreExaminationService', 'services/Assessment/MarksEntryService', 'services/BillDesk/paymentService', 'directives/saTable']
            },

            //Master Page Routes
            'Dashboard.MasterSettings.MastrBranch': {
                url: "/MastrBranch",
                templateUrl: 'app/views/MasterSettings/MastrBranch.html',
                dependencies: ['controllers/MasterSettings/MasterBranchController', 'services/MasterSettings/MasterPageService']
            },
            'Dashboard.MasterSettings.MasterSemester': {
                url: "/MasterSemester",
                templateUrl: 'app/views/MasterSettings/MasterSemester.html',
                dependencies: ['controllers/MasterSettings/MasterSemesterController', 'services/MasterSettings/MasterPageService']
            },
            'Dashboard.MasterSettings.CreateScheme': {
                url: "/CreateScheme",
                templateUrl: 'app/views/MasterSettings/CreateScheme.html',
                dependencies: ['controllers/MasterSettings/CreateSchemeController', 'services/MasterSettings/MasterSettingsService', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.MasterSettings.SemesterSettings': {
                url: "/SemesterSettings",
                templateUrl: 'app/views/MasterSettings/SemesterSettings.html',
                dependencies: ['controllers/MasterSettings/SemesterSettingsController', 'services/MasterSettings/MasterPageService', 'services/StudentResultService', 'services/PreExamination/PreExaminationService']
            },

            //'Dashboard.MasterSettings.AcademicYearSettings': {
            //    url: "/AcademicYearSettings",
            //    templateUrl: 'app/views/MasterSettings/AcademicYearSettings.html',
            //    dependencies: ['controllers/MasterSettings/AcademicYearSettingsController', 'services/MasterSettings/MasterPageService', 'services/PreExamination/PreExaminationService']
            //},

            'Dashboard.MasterSettings.ExamSessionSettings': {
                url: "/ExamSessionSettings",
                templateUrl: 'app/views/MasterSettings/ExamSessionSettings.html',
                dependencies: ['controllers/MasterSettings/ExamSessionSettingsController', 'services/MasterSettings/MasterPageService', 'services/PreExamination/PreExaminationService']
            },



            'Dashboard.MasterSettings.DateSheetMonthYearSettings': {
                url: "/DateSheetMonthYearSettings",
                templateUrl: 'app/views/MasterSettings/DateSheetMonthYear.html',
                dependencies: ['controllers/MasterSettings/DateSheetMonthYearController', 'services/MasterSettings/MasterPageService', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.MasterSettings.TimeTableMonthYearSettings': {
                url: "/TimeTableMonthYearSettings",
                templateUrl: 'app/views/MasterSettings/TimeTableMonthYearSettings.html',
                dependencies: ['controllers/MasterSettings/TimeTableMonthYearSettingsController', 'services/MasterSettings/MasterPageService', 'services/PreExamination/PreExaminationService', 'services/StudentResultService']
            },


            'Dashboard.MasterSettings.MastersBank': {
                url: "/MastersBank",
                templateUrl: 'app/views/MasterSettings/MastersBank.html',
                dependencies: ['controllers/MasterSettings/MastersBankController', 'services/MasterSettings/MasterPageService']
            },
            'Dashboard.MasterSettings.MasterCaste': {
                url: "/MasterCaste",
                templateUrl: 'app/views/MasterSettings/MasterCaste.html',
                dependencies: ['controllers/MasterSettings/MasterCasteController', 'services/MasterSettings/MasterPageService']
            },
            'Dashboard.MasterSettings.MasterDistirct': {
                url: "/MasterDistirct",
                templateUrl: 'app/views/MasterSettings/MasterDistirct.html',
                dependencies: ['controllers/MasterSettings/MasterDistrirctController', 'services/MasterSettings/MasterPageService']
            },
            'Dashboard.MasterSettings.MasterMandal': {
                url: "/MasterMandal",
                templateUrl: 'app/views/MasterSettings/MasterMandal.html',
                dependencies: ['controllers/MasterSettings/MasterMandalController', 'services/MasterSettings/MasterPageService']
            },

            'Dashboard.Academic': {
                url: "/Academic",
                templateUrl: 'app/views/Academic/Academic.html',
                dependencies: ['controllers/Academic/AcademicController', 'services/Assessment/MarksEntryService', 'services/Assessment/AssessmentService', 'services/Academic/ElectivesService', 'services/SystemAdministration/SystemUserService']
            },

            'Dashboard.Academic.FeedbackReport': {
                url: "/FeedbackReport",
                templateUrl: 'app/views/FeedbackReport.html',
                dependencies: ['controllers/Academic/Reports/FeedbackReportController', 'services/PreExamination/PreExaminationService', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/Academic/AcademicService']
            },

            'Dashboard.Academic.AttendanceReport': {
                url: "/AttendanceReport",
                templateUrl: 'app/views/Academic/AttendanceReport.html',
                dependencies: ['controllers/Academic/AttendanceReportController', 'services/PreExamination/PreExaminationService', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/Academic/AcademicService']
            },

            'Dashboard.Academic.AbsenteesList': {
                url: "/AbsenteesList",
                templateUrl: 'app/views/Academic/AbsenteesList.html',
                dependencies: ['controllers/Academic/AbsenteesListController', 'services/Assessment/AssessmentService', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.AdmissionDashboard.AbsenteesList': {
                url: "/AbsenteesList",
                templateUrl: 'app/views/Academic/AbsenteesList.html',
                dependencies: ['controllers/Academic/AbsenteesListController', 'services/Assessment/AssessmentService', 'services/PreExamination/PreExaminationService']
            },
            

            'Dashboard.Academic.PromotionalList': {
                url: "/PromotionalList",
                templateUrl: 'app/views/PostExam/PromotionalList.html',
                dependencies: ['controllers/PostExam/PromotionalListController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.BacklogSubjects': {
                url: "/BacklogSubjects",
                templateUrl: 'app/views/PostExam/BacklogSubjects.html',
                dependencies: ['controllers/PostExam/BacklogSubjectsController', 'services/PreExamination/PreExaminationService', 'services/StudentResultService']
            },

            'Dashboard.Academic.StudentPromotion': {
                url: "/StudentPromotion",
                templateUrl: 'app/views/PostExam/SemMigration.html',
                dependencies: ['controllers/PostExam/SemMigrationController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.Academic.ExamSchemeSemesterSettings': {
                url: "/ExamSchemeSemesterSettings",
                templateUrl: 'app/views/MasterSettings/ExamSchemeSemesterSettings.html',
                dependencies: ['controllers/MasterSettings/ExamSchemeSemesterSettingsController', 'services/MasterSettings/MasterPageService', 'services/PreExamination/PreExaminationService', 'services/StudentResultService']
            },
            'Dashboard.Academic.SubjectMaster': {
                url: "/SubjectMaster",
                templateUrl: 'app/views/MasterSettings/SubjectMaster.html',
                dependencies: ['controllers/MasterSettings/SubjectMasterController', 'services/MasterSettings/MasterSettingsService', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.Academic.ElectiveMappingReport': {
                url: "/ElectiveMappingReport",
                templateUrl: 'app/views/PreExamination/ElectiveMappedReport.html',
                dependencies: ['controllers/PreExamination/ElectiveMappedReportController', , 'services/PreExamination/PreExaminationService', 'directives/saDate']
            },


            'Dashboard.Academic.ElectiveMappingSubjectReport': {
                url: "/ElectiveMappingReport/ElectiveMappingSubjectReport",
                templateUrl: 'app/views/PreExamination/ElectiveMappingSubjectReport.html',
                dependencies: ['controllers/PreExamination/ElectiveMappingSubjectReportController', , 'services/PreExamination/PreExaminationService', 'directives/saDate']
            },

            'Dashboard.Academic.SixthSemStudents': {
                url: "/SixthSemStudents",
                templateUrl: 'app/views/Academic/SixthSemStudents.html',
                dependencies: ['controllers/Academic/SixthSemStudetsController', 'services/Academic/AcademicService']
            },

            'Dashboard.Academic.AlphaSelection': {
                url: "/AlphaSelection",
                templateUrl: 'app/views/Academic/AlphaSelection.html',
                dependencies: ['controllers/Academic/AlphaSelectionController', 'services/Academic/AcademicService']
            },

            'Dashboard.Academic.AcademicYearSettings': {
                url: "/AcademicYearSettings",
                templateUrl: 'app/views/MasterSettings/AcademicYearSettings.html',
                dependencies: ['controllers/MasterSettings/AcademicYearSettingsController', 'services/MasterSettings/MasterPageService', 'services/PreExamination/PreExaminationService']
            },



            'Dashboard.Academic.6thSemStudiedReport': {
                url: "/6thSemStudiedReport",
                templateUrl: 'app/views/Academic/Reports/6thSemStudiedReport.html',
                dependencies: ['controllers/Academic/Reports/6thSemStudiedReportController', 'services/Academic/AcademicService']
            },

            'Dashboard.Academic.SubjectsList': {
                url: "/SubjectsList",
                templateUrl: 'app/views/Academic/SubjectsList.html',
                dependencies: ['controllers/Academic/SubjectListController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/Assessment/AssessmentService', 'services/Academic/AcademicService', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.Academic.SubjectsFacultyList': {
                url: "/SubjectsFacultyList",
                templateUrl: 'app/views/Academic/SubjectsFacultyList.html',
                dependencies: ['controllers/Academic/SubjectsFacultyController', 'services/Assessment/MarksEntryService', 'directives/inputNumberOnly', 'directives/noSpecialChar']
            },

            'Dashboard.Academic.SyllabusCovered': {
                url: "/SubjectsList/SyllabusCovered",
                templateUrl: 'app/views/Academic/SyllabusCovered.html',
                dependencies: ['controllers/Academic/SyllabusCoveredController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/Academic/AcademicService', , 'services/PreExamination/PreExaminationService']
            },


            'Dashboard.Academic.SyllabusCoverage': {
                url: "/SyllabusCoverage",
                templateUrl: 'app/views/Academic/SyllabusCoverage.html',
                dependencies: ['controllers/Academic/SyllabusCoverageController']
            },

            'Dashboard.Academic.SyllabusCoverageReport': {
                url: "/SyllabusCoverageReport",
                templateUrl: 'app/views/Academic/Reports/SyllabusCoverageReport.html',
                dependencies: ['controllers/Academic/Reports/SyllabusCoverageReportController', 'services/Academic/AcademicService', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.Academic.PrincipalSyllabusCoverageReport': {
                url: "/SyllabusCoverageReport/PrincipalSyllabusCoverageReport",
                templateUrl: 'app/views/Academic/Reports/PrincipalSyllabusCoverageReport.html',
                dependencies: ['controllers/Academic/Reports/PrincipalSyllabusCoverageReportController', 'services/Academic/AcademicService']
            },


            'Dashboard.Academic.FacultyMappingReport': {
                url: "/FacultyMappingReport",
                templateUrl: 'app/views/Academic/Reports/FacultyMappingReport.html',
                dependencies: ['controllers/Academic/Reports/FacultyMappingReportController', 'services/Academic/AcademicService', 'services/PreExamination/PreExaminationService', 'services/Results/StudentWiseService']
            },

            'Dashboard.Academic.FacultySubjectMapping': {
                url: "/FacultySubjectMapping",
                templateUrl: 'app/views/Academic/FacultySubjectMapping.html',
                dependencies: ['controllers/Academic/FacultySubjectMappingController', 'services/Academic/AcademicService', 'services/PreExamination/PreExaminationService', 'services/Results/StudentWiseService']
            },
            'Dashboard.Academic.StudentAttendance': {
                url: "/StudentAttendance",
                templateUrl: 'app/views/Academic/StudentAttendance.html',
                dependencies: ['controllers/Academic/StudentAttendanceController', 'services/Academic/AcademicService']
            },
            'Dashboard.Academic.Electives': {
                url: "/Electives",
                templateUrl: 'app/views/Academic/Electives.html',
                dependencies: ['controllers/Academic/ElectivesController', 'services/Assessment/MarksEntryService', 'services/Assessment/AssessmentService', 'services/Academic/ElectivesService']
            },
            'Dashboard.Academic.Pinlist': {
                url: "/Electives/StudentList",
                templateUrl: 'app/views/Academic/ElectivesPinList.html',
                dependencies: ['controllers/Academic/ElectivesPinListController', 'services/Assessment/MarksEntryService', 'services/Assessment/AssessmentService', 'services/Academic/ElectivesService']
            },
            'Dashboard.ChangePassword': {
                url: "/ChangePassword",
                templateUrl: 'app/views/ChangePassword.html',
                dependencies: ['controllers/ChangePasswordController', 'services/SystemAdministration/ChangePasswordService',  'services/PreExamination/PreExaminationService', 'directives/inputNumberOnly', 'services/MenuService',
                    'services/SystemAdministration/SystemUserService']
            },


            //AssessMent Module
            'Dashboard.AssessmentDashboard.SetDates': {
                url: "/SetDates",
                templateUrl: 'app/views/Assessment/AdminSetDates.html',
                dependencies: ['controllers/Assessment/SetMarksEntryDatesController', 'services/MenuService', 'services/Assessment/MarksEntryService', 'services/Assessment/AssessmentService']
            },
            'Dashboard.AssessmentDashboard': {
                url: "/AssessmentDashboard",
                templateUrl: 'app/views/Assessment/AssessmentDashboard.html',
                dependencies: ['controllers/Assessment/AssessmentDashboardController', 'services/SystemAdministration/SystemUserService']

            },




            'Dashboard.AssessmentDashboard.Assessment': {
                url: "/Assessment",
                templateUrl: 'app/views/Assessment.html',
                dependencies: ['controllers/Assessment/AssessmentController', 'services/MenuService', 'services/Assessment/MarksEntryService', 'services/Assessment/AssessmentService']

            },


            'Dashboard.PaymentResponse': {
                url: "/PaymentResponse",
                templateUrl: 'app/views/PaymentResponse.html',
                dependencies: ['controllers/PaymentGateway/PaymentResponseController', 'services/BillDesk/paymentService']

            },
            'PaymentGatewayResponse': {
                url: "/PaymentGatewayResponse/:data",
                templateUrl: 'app/views/PaymentGatewayResponse.html',
                dependencies: ['controllers/PaymentGateway/PaymentGatewayResponseController', 'services/BillDesk/paymentService', 'services/PreExamination/PreExaminationService']

            },
            'CertificateFeePaymentGatewayResponse': {
                url: "/CertificateFeePaymentGatewayResponse/:data",
                templateUrl: 'app/views/CertificateFeePaymentGatewayResponse.html',
                dependencies: ['controllers/PaymentGateway/CertificateFeePaymentGatewayResponseController', 'services/BillDesk/paymentService', 'services/PreExamination/PreExaminationService']

            },
            'CcicPaymentGatewayResponse': {
                url: "/CcicPaymentGatewayResponse/:data",
                templateUrl: 'app/views/CCIC/PaymentGateway/CcicPaymentGatewayResponse.html',
                dependencies: ['controllers/CCIC/PaymentGateway/CcicPaymentGatewayResponseController', 'services/BillDesk/paymentService', 'services/PreExamination/PreExaminationService']

            },

            'TwshCertificateFeePaymentRouteRedirect': {
                url: "/TwshCertificateFeePaymentRouteRedirect/:data",
                templateUrl: 'app/views/TwshCertificateFeePaymentResponse.html',
                dependencies: ['controllers/PaymentGateway/TwshCertificateFeePaymentResponseController', 'services/BillDesk/paymentService', 'services/PreExamination/PreExaminationService']

            },

            'Dashboard.Circulars': {
                url: "/Circulars",
                templateUrl: 'app/views/Circulars/Circular.html',
                dependencies: ['controllers/Circulars/CircularController', 'services/Circulars/CircularService']
            },
            'Dashboard.Notification': {
                url: "/Circulars/Notification",
                templateUrl: 'app/views/Circulars/Notification.html',
                dependencies: ['controllers/Circulars/NotificationController', 'services/Assessment/AssessmentService', 'services/Circulars/CircularService']
            },




            'Dashboard.AssessmentDashboard.MarksSummary': {
                url: "/MarksSummary",
                templateUrl: 'app/views/Assessment/Reports/marksEntryReports.html',
                dependencies: ['controllers/Assessment/Reports/marksEntryReports', 'services/Assessment/MarksEntryService', 'services/Assessment/AssessmentService', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.AssessmentDashboard.PracticalEvents': {
                url: "/MarksSummary/PracticalEvents",
                templateUrl: 'app/views/Assessment/Reports/PracticalEvents.html',
                dependencies: ['controllers/Assessment/Reports/PracticalEventsController', 'services/Assessment/AssessmentService']
            },
            'Dashboard.AssessmentDashboard.Reports': {
                url: "/MarksSummary/PracticalEvents/Reports",
                templateUrl: 'app/views/Assessment/Reports/Reports.html',
                dependencies: ['controllers/Assessment/Reports/ReportsController', 'services/MenuService', 'services/Assessment/AssessmentService', 'services/Assessment/SessionalsService', 'services/Assessment/PracticalsService']
            },
            'Dashboard.AssessmentDashboard.StasticalReports': {
                url: "/StasticalReports",
                templateUrl: 'app/views/Assessment/Reports/StatisticalReports.html',
                dependencies: ['controllers/Assessment/Reports/StatisticalReportsController', 'services/Assessment/AssessmentService']
            },
            'Dashboard.AssessmentDashboard.SearchPin': {
                url: "/SearchPin",
                templateUrl: 'app/views/Assessment/Reports/SearchPin.html',
                dependencies: ['controllers/Assessment/Reports/SearchPinController', 'services/Assessment/AssessmentService', 'services/Admission/ReportService']
            },

            'Dashboard.AssessmentDashboard.StatisticalReports': {
                url: "/StatisticalReports",
                templateUrl: 'app/views/Assessment/Reports/StatisticalReports.html',
                dependencies: ['controllers/Assessment/Reports/StatisticalReportsController', 'services/Assessment/AssessmentService']
            },

            'Dashboard.AssessmentDashboard.TheoryEvents': {
                url: "/MarksSummary/TheoryEvents",
                templateUrl: 'app/views/Assessment/Reports/TheoryEvents.html',
                dependencies: ['controllers/Assessment/Reports/TheoryEventsController', 'services/Assessment/AssessmentService']
            },
            'Dashboard.AssessmentDashboard.TheoryReports': {
                url: "/MarksSummary/TheoryEvents/TheoryReports",
                templateUrl: 'app/views/Assessment/Reports/TheoryReports.html',
                dependencies: ['controllers/Assessment/Reports/TheoryReportsController', 'services/MenuService', 'services/Assessment/AssessmentService', 'services/Assessment/SessionalsService', 'services/Assessment/PracticalsService']
            },
            'Dashboard.AssessmentDashboard.TheorySummary': {
                url: "/MarksSummary/TheoryEvents/TheoryReports/TheorySummary",
                templateUrl: 'app/views/Assessment/Reports/TheorySummary.html',
                dependencies: ['controllers/Assessment/Reports/TheorySummaryController', 'services/MenuService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService']
            },
            //'Assessment': {
            //    url: "/Assessment",
            //    templateUrl: 'app/views/Assessment/AdminDashboard.html',
            //    dependencies: ['controllers/Assessment/AssessmentAdminDashboardController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/MenuService', 'services/Assessment/AssessmentService']
            //},
            'Dashboard.Rubracs': {
                url: "/Rubracs",
                templateUrl: 'app/views/Assessment/Reports/Rubracs.html',
                dependencies: ['controllers/Assessment/Reports/RubracsController', 'services/MenuService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/Assessment/PracticalsService', 'services/BillDesk/paymentService']
            },
            //practicals marks entry
            'Dashboard.AssessmentDashboard.practicals': {
                url: "/Assessment/Practicals",
                templateUrl: 'app/views/Assessment/PracticalMarksEntryEventList.html',
                dependencies: ['controllers/Assessment/PracticalMarksEntryEventListController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/MenuService', 'services/Assessment/AssessmentService', 'services/Assessment/PracticalsService']

            },
            'Dashboard.AssessmentDashboard.FinalReport': {
                url: "/Assessment/FinalReport",
                templateUrl: 'app/views/Assessment/Reports/FinalReports.html',
                dependencies: ['controllers/Assessment/Reports/FinalReportsController', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService']
            },
            'Dashboard.AssessmentDashboard.FinalReports': {
                url: "/MarksSummary/FinalReports",
                templateUrl: 'app/views/Assessment/Reports/FinalReports.html',
                dependencies: ['controllers/Assessment/Reports/FinalReportsController', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService']
            },
            'Dashboard.AssessmentDashboard.AdminReportSummary': {
                url: "/MarksSummary/FinalReports/AdminReportSummary",
                templateUrl: 'app/views/Assessment/Reports/AdminReportSummary.html',
                dependencies: ['controllers/Assessment/Reports/AdminReportSummaryController', 'services/Assessment/AssessmentService']
            },


            'Dashboard.AssessmentDashboard.AssessmentConsolidatedReport': {
                url: "/AssessmentConsolidatedReport",
                templateUrl: 'app/views/Assessment/Reports/AssessmentConsolidatedReport.html',
                dependencies: ['controllers/Assessment/Reports/AssessmentConsolidatedReportController', 'directives/saFileUpload', 'services/PreExamination/PreExaminationService', 'services/Assessment/AssessmentService', 'services/StudentResultService', 'services/Assessment/AssessmentService', 'services/Admission/StudentRegService', 'services/Results/StudentWiseService']
            },

            'Dashboard.AssessmentDashboard.PracticalSubjectList': {
                url: "/Assessment/Practicals/SubjectList", templateUrl: 'app/views/Assessment/PracticalMarksEntrySubjectList.html',
                dependencies: ['controllers/Assessment/PracticalMarksEntrySubjectListController', 'services/MenuService', 'services/Assessment/AssessmentService', 'services/Assessment/PracticalsService', 'services/Assessment/MarksEntryService', 'services/BillDesk/paymentService', 'services/PreExamination/PreExaminationService']

            },

            'Dashboard.AssessmentDashboard.PracticalMarksEntryList': {
                url: "/Assessment/Practicals/SubjectList/MarksEntry",
                templateUrl: 'app/views/Assessment/PracticalMarksEntry.html',
                dependencies: ['controllers/Assessment/PracticalMarksEntryController', 'services/MenuService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/Assessment/PracticalsService', 'services/BillDesk/paymentService', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.AssessmentDashboard.PracticalSummary': {
                url: "/MarksSummary/PracticalEvents/Reports/PracticalSummary",
                templateUrl: 'app/views/Assessment/Reports/PracticalSummary.html',
                dependencies: ['controllers/Assessment/Reports/PracticalSummaryController', 'services/MenuService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/Assessment/PracticalsService']
            },

            'Dashboard.AssessmentDashboard.theory': {
                url: "/Assessment/Theory",
                templateUrl: 'app/views/Assessment/TheoryMarksEntryEventList.html',
                dependencies: ['controllers/Assessment/TheoryMarksEntryEventListController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/MenuService', 'services/Assessment/AssessmentService']
            },
            //rubrics
            'Dashboard.AssessmentDashboard.Rubrics': {
                url: "/Assessment/Rubrics",
                templateUrl: 'app/views/Assessment/Rubrics.html',
                dependencies: ['controllers/Assessment/RubricsController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/MenuService', 'services/Assessment/AssessmentService']
            },
            // admin backlog marks entry  
            'Dashboard.AssessmentDashboard.AdminBacklogMarksEntry': {
                url: "/AdminBacklogMarksEntry",
                templateUrl: 'app/views/Assessment/AdminBacklogMarksEntry.html',
                dependencies: ['controllers/Assessment/AdminBacklogMarksEntryController', 'services/MenuService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/Assessment/PracticalsService', 'services/BillDesk/paymentService']
            },


            //rubricsSubjectlist
            'Dashboard.AssessmentDashboard.RubricsSubjectlist': {
                url: "/Assessment/Rubrics/RubricsSubjectlist",
                templateUrl: 'app/views/Assessment/RubricsSubjectlist.html',
                dependencies: ['controllers/Assessment/RubricsSubjectlistController', 'services/MenuService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/Assessment/SessionalsService', 'services/BillDesk/paymentService']
            },

            //rubricsMarkstStatus
            'Dashboard.AssessmentDashboard.RubricsMarkEntry': {
                url: "/Assessment/RubricsMarkEntry",
                templateUrl: 'app/views/Assessment/RubricsMarkEntry.html',
                dependencies: ['controllers/Assessment/RubricsMarkEnterController', 'services/MenuService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/Assessment/PracticalsService', 'services/BillDesk/paymentService']
            },



            //rubricsSubjectStatus
            'Dashboard.AssessmentDashboard.RubricsSubjectStatus': {
                url: "/Assessment/RubricsSubjectStatus",
                templateUrl: 'app/views/Assessment/RubricsSubjectStatus.html',
                dependencies: ['controllers/Assessment/RubricsSubjectStatusController', 'services/MenuService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/Assessment/PracticalsService', 'services/BillDesk/paymentService']
            },




            'Dashboard.AssessmentDashboard.TheorySubjectList': {
                url: "/Assessment/Theory/SubjectList",
                templateUrl: 'app/views/Assessment/TheoryMarksEntrySubjectList.html',
                dependencies: ['controllers/Assessment/TheoryMarksEntrySubjectListController', 'services/MenuService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/Assessment/SessionalsService', 'services/BillDesk/paymentService', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.AssessmentDashboard.TheoryMarksEntryList': {
                url: "/Assessment/Theory/SubjectList/MarksEntry",
                templateUrl: 'app/views/Assessment/TheoryMarksEntry.html',
                dependencies: ['controllers/Assessment/TheoryMarksEntryController', 'services/MenuService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/Assessment/PracticalsService', 'services/BillDesk/paymentService',  'services/PreExamination/PreExaminationService']
            },

            'Dashboard.AssessmentDashboard.ReleaseMarksEntry': {
                url: "/ReleaseMarksEntry",
                templateUrl: 'app/views/Assessment/ReleaseMarksEntry.html',
                dependencies: ['controllers/Assessment/ReleaseMarksEntryController', 'services/Admission/StudentRegService', 'services/PreExamination/PreExaminationService', 'services/Assessment/AssessmentService', 'services/Assessment/MarksEntryService', 'services/Assessment/PracticalsService']
            },

            'Dashboard.AdminServices': {
                url: "/AdminServices",
                templateUrl: 'app/views/AdminServices/AdminServiceModule.html',
                dependencies: ['controllers/AdminServices/AdminServiceModuleControler']
            },

            'Dashboard.Rubrics': {
                url: "/Rubrics",
                templateUrl: 'app/views/Assessment/Rubrics.html',
                dependencies: ['controllers/Assessment/RubricsController']
            },
            'Dashboard.AdminServices.LoginServices': {
                url: "/LoginServices",
                templateUrl: 'app/views/AdminServices/LoginServices.html',
                dependencies: ['controllers/AdminServices/LoginServiceController', 'services/AdminServices/AdminService']
            },




            //VS routing close

            // Student Results routes
            'ResultsDashboard': {
                url: "/ResultsDashboard",
                templateUrl: 'app/views/StudentExamResults/ExamResultsDashBoard.html',
                dependencies: ['controllers/StudentExamResults/ExamResultsDashBoardController']
            },
            'ResultsDashboard.StudentResult': {
                url: "/StudentResult",
                templateUrl: 'app/views/StudentExamResults/StudentResult.html',
                dependencies: ['controllers/StudentExamResults/StudentResultController', 'services/StudentResultService']
            },




            //'ResultsDashboard.StudentConsolidatedResult': {
            //    url: "/StudentConsolidatedResult",
            //    templateUrl: 'app/views/StudentExamResults/StudentConsolidatedResult.html',
            //    dependencies: ['controllers/StudentExamResults/StudentConsolidatedResultController', 'services/StudentResultService']
            //},

            'ResultsDashboard.TwshResults': {
                url: "/TwshResults",
                templateUrl: 'app/views/StudentExamResults/TypingCumShorthand.html',
                dependencies: ['controllers/StudentExamResults/TypingCumShorthandResultsController', 'services/StudentResultService']
            },

            // Admission module

            'Dashboard.UserManual': {
                url: "/UserManual",
                templateUrl: 'app/views/UserManual.html',
                dependencies: ['controllers/UserManualController', 'services/Assessment/MarksEntryService', 'services/Assessment/AssessmentService', 'services/Academic/ElectivesService', 'services/SystemAdministration/SystemUserService']
            },

            'Dashboard.TypeWriting': {
                url: "/TypeWriting",
                templateUrl: 'app/views/Twsh/TWSH.html',
                dependencies: ['controllers/Twsh/TWSHController', 'directives/inputNumberOnly', 'services/MenuService']
            },

            'Dashboard.ComputerBasedTest': {
                url: "/ComputerBasedTest",
                templateUrl: 'app/views/CBT/CBT.html',
                dependencies: ['controllers/CBT/CBTController', 'directives/inputNumberOnly', 'services/MenuService']
            },

            'Dashboard.TypeWriting.TwshStudentDetails': {
                url: "/TwshStudentDetails",
                templateUrl: 'app/views/TWSH/TwshStudentDetails.html',
                dependencies: ['controllers/TWSH/TwshStudentDetails', 'services/TWSH/TwshStudentRegService']
            },

            'Dashboard.TypeWriting.TwshExamDates': {
                url: "/TwshExamDates",
                templateUrl: 'app/views/TWSH/TwshExamDates.html',
                dependencies: ['controllers/TWSH/TwshExamDatesController', 'services/TWSH/TwshStudentRegService']
            },

            'Dashboard.TypeWriting.TwshNRDownloadDates': {
                url: "/TwshNRDownloadDates",
                templateUrl: 'app/views/TWSH/TwshNRDownloadDates.html',
                dependencies: ['controllers/TWSH/TwshNRDownloadDatesController', 'services/TWSH/TwshStudentRegService']
            },

            'Dashboard.TypeWriting.ApplyCertificate': {
                url: "/ApplyCertificate",
                templateUrl: 'app/views/TWSH/ApplyCertificate.html',
                dependencies: ['controllers/TWSH/ApplyCertificateController', 'services/TWSH/TwshStudentRegService', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            'Dashboard.TypeWriting.TwshCertificateReports': {
                url: "/TwshCertificateReports",
                templateUrl: 'app/views/TWSH/TwshCertificateReports.html',
                dependencies: ['controllers/TWSH/TwshCertificateReportsController', 'services/TWSH/TwshStudentRegService']
            },



            'Dashboard.TypeWriting.TwshAuthorizationReport': {
                url: "/TwshAuthorizationReport",
                templateUrl: 'app/views/TWSH/TwshAuthorizationReport.html',
                dependencies: ['controllers/TWSH/TwshAuthorizationReportController', 'services/TWSH/TwshStudentRegService']
            },

            'Dashboard.TypeWriting.TwshAuthorizationReportList': {
                url: "/TwshAuthorizationReport/TwshAuthorizationReportList",
                templateUrl: 'app/views/TWSH/TwshAuthorizationReportList.html',
                dependencies: ['controllers/TWSH/TwshAuthorizationReportListController', 'services/TWSH/TwshStudentRegService', 'services/PreExamination/PreExaminationService', 'services/DigitalSignatureService']
            },

            'Dashboard.TypeWriting.TwshViewAuthorizationDetails': {
                url: "/TwshAuthorizationReport/TwshAuthorizationReportList/TwshViewAuthorizationDetails",
                templateUrl: 'app/views/TWSH/TwshViewAuthorizationDetails.html',
                dependencies: ['controllers/TWSH/TwshViewAuthorizationDetailsController', 'services/TWSH/TwshStudentRegService', 'services/PreExamination/PreExaminationService', 'services/DigitalSignatureService']
            },

            'Dashboard.TypeWriting.TwshApprovalList': {
                url: "/TwshApprovalList",
                templateUrl: 'app/views/TWSH/TwshApprovalList.html',
                dependencies: ['controllers/TWSH/TwshApprovalListController', 'services/TWSH/TwshStudentRegService']
            },



            'Dashboard.TypeWriting.TwshApprovalListDetails': {
                url: "/TwshApprovalList/TwshApprovalListDetails",
                templateUrl: 'app/views/TWSH/TwshApprovalListDetails.html',
                dependencies: ['controllers/TWSH/TwshApprovalListDetailsController', 'services/TWSH/TwshStudentRegService', 'services/PreExamination/PreExaminationService', 'services/DigitalSignatureService']
            },

            'Dashboard.TypeWriting.TwshExamCenterStrength': {
                url: "/TwshExamCenterStrength",
                templateUrl: 'app/views/TWSH/TwshExamCenterStrength.html',
                dependencies: ['controllers/TWSH/TwshExamCenterStrengthController', 'services/TWSH/TwshStudentRegService']
            },

            'Dashboard.TypeWriting.GradewiseExamCenters': {
                url: "/GradewiseExamCenters",
                templateUrl: 'app/views/TWSH/GradewiseExamCenters.html',
                dependencies: ['controllers/TWSH/GradewiseExamCentersController', 'services/TWSH/TwshStudentRegService']
            },


            'Dashboard.TypeWriting.TwshExamCenterStrength': {
                url: "/TwshExamCenterStrength",
                templateUrl: 'app/views/TWSH/TwshExamCenterStrength.html',
                dependencies: ['controllers/TWSH/TwshExamCenterStrengthController', 'services/TWSH/TwshStudentRegService']
            },

            'Dashboard.TypeWriting.TwshResultsAutomation': {
                url: "/TwshResultsAutomation",
                templateUrl: 'app/views/TWSH/TwshResultsAutomation.html',
                dependencies: ['controllers/TWSH/TwshResultsAutomationController', 'services/TWSH/TwshStudentRegService', 'controllers/Results/ResultsAutomationExcelUploadController', 'directives/saFileUpload', 'services/PreExamination/PreExaminationService', 'services/StudentResultService', 'services/Assessment/AssessmentService', 'services/Results/StudentWiseService']
            },
            'Dashboard.TypeWriting.TwshRvrc': {
                url: "/TwshRvrc",
                templateUrl: 'app/views/TWSH/TwshRvrc.html',
                dependencies: ['controllers/TWSH/TwshRvrcController', 'services/TWSH/TwshStudentRegService', 'controllers/Results/ResultsAutomationExcelUploadController', 'directives/saFileUpload', 'services/PreExamination/PreExaminationService', 'services/StudentResultService', 'services/Assessment/AssessmentService', 'services/Results/StudentWiseService']
            },

            'Dashboard.TypeWriting.TwshExamMonthYear': {
                url: "/TwshExamMonthYear",
                templateUrl: 'app/views/TWSH/TwshExamMonthYear.html',
                dependencies: ['controllers/TWSH/TwshExamMonthYearController', 'services/TWSH/TwshStudentRegService']
            },

            'Dashboard.TypeWriting.ChangeExamCentreBatch': {
                url: "/ChangeExamCentreBatch",
                templateUrl: 'app/views/TWSH/TwshChangeExamCentre.html',
                dependencies: ['controllers/TWSH/TwshChangeExamCentreController', 'services/TWSH/TwshStudentRegService']
            },

            'Dashboard.TypeWriting.GenerateTwshNr': {
                url: "/GenerateTwshNr",
                templateUrl: 'app/views/TWSH/GenerateTwshNr.html',
                dependencies: ['controllers/TWSH/GenerateTwshNrController', 'services/TWSH/TwshStudentRegService']
            },


            'Dashboard.TypeWriting.TwshPrinterNrDownload': {
                url: "/TwshPrinterNrDownload",
                templateUrl: 'app/views/TWSH/TwshPrinterNrDownload.html',
                dependencies: ['controllers/TWSH/TwshPrinterNrDownloadController', 'services/TWSH/TwshStudentRegService']
            },

            'Dashboard.TypeWriting.InstituteRegistration': {
                url: "/InstituteRegistration",
                templateUrl: 'app/views/TWSH/InstituteRegistration.html',
                dependencies: ['controllers/TWSH/InstituteRegistrationController', 'services/TWSH/TwshStudentRegService']
            },


            'Dashboard.TypeWriting.TwshExamCenters': {
                url: "/TwshExamCenters",
                templateUrl: 'app/views/TWSH/TwshExamCenters.html',
                dependencies: ['controllers/TWSH/TwshExamCentersController', 'services/TWSH/TwshStudentRegService']
            },

            'Dashboard.TypeWriting.TwshExamCentersCourseWise': {
                url: "TwshExamCenters/TwshExamCentersCourseWise",
                templateUrl: 'app/views/TWSH/TwshExamCentresCourseWise.html',
                dependencies: ['controllers/TWSH/TwshExamCentresCourseWiseController', 'services/TWSH/TwshStudentRegService']
            },

            'Dashboard.TypeWriting.TwshExamTimeSlots': {
                url: "/TwshExamTimeSlots",
                templateUrl: 'app/views/TWSH/TwshExamTimeSlots.html',
                dependencies: ['controllers/TWSH/TwshExamTimeSlotsController', 'services/TWSH/TwshStudentRegService']
            },

            'Dashboard.TypeWriting.TwshFeeSetDates': {
                url: "/TwshFeeSetDates",
                templateUrl: 'app/views/TWSH/TwshFeeSetDates.html',
                dependencies: ['controllers/TWSH/TwshFeeSetDatesController', 'services/TWSH/TwshStudentRegService']
            },

            'Dashboard.TypeWriting.TwshOdcDownload': {
                url: "/TwshOdcDownload",
                templateUrl: 'app/views/TWSH/TwshOdcDownload.html',
                dependencies: ['controllers/TWSH/TwshOdcDownloadController', 'services/TWSH/TwshStudentRegService']
            },


            'Dashboard.TypeWriting.AcademicYearSetting': {
                url: "/AcademicYearSetting",
                templateUrl: 'app/views/TWSH/TwshAcademicYearSetting.html',
                dependencies: ['controllers/TWSH/TwshAcademicYearSettingController', 'services/TWSH/TwshAdminService', 'services/TWSH/TwshStudentRegService']
            },

            'Dashboard.TypeWriting.ViewApplication': {
                url: "/ViewApplication",
                templateUrl: 'app/views/Examssite/TwshAdmViewApplication.html',
                dependencies: ['controllers/Examssite/TwshAdmViewApplicationController', 'services/TWSH/TwshStudentRegService']
            },


            'Dashboard.AdmissionDashboard.Admission': {
                url: "/Admission",
                templateUrl: 'app/views/Admission.html',
                dependencies: ['controllers/AdmissionController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/SystemAdministration/SystemUserService', 'services/MenuService', 'services/Admission/AdmissionService']
            },
            //      Admin nav bar views
            'Dashboard.AdmissionDashboard.PinGeneratedReport': {
                url: "/PinGeneratedReport",
                templateUrl: 'app/views/Admission/Reports/PinGeneratedReport.html',
                dependencies: ['controllers/Admission/Reports/PinGeneratedReportController', 'services/SystemAdministration/SystemUserService', 'services/Admission/ReportService']
            },
            'Dashboard.AdmissionDashboard.AdmissionReports': {
                url: "/AdmissionReports",
                templateUrl: 'app/views/Admission/Reports/AdmissionReports.html',
                dependencies: ['controllers/Admission/Reports/AdmissionReportsController', 'directives/saFileUpload', 'services/PreExamination/PreExaminationService', 'services/StudentResultService', 'services/Assessment/AssessmentService', 'services/Admission/AdmissionService', 'services/Results/StudentWiseService']
            },
            'Dashboard.AdmissionDashboard.ReadmissionList': {
                url: "/ReadmissionList",
                templateUrl: 'app/views/Admission/Reports/ReadmissionList.html',
                dependencies: ['controllers/Admission/Reports/ReadmissionListController', 'directives/saFileUpload', 'services/PreExamination/PreExaminationService', 'services/StudentResultService', 'services/Assessment/AssessmentService', 'services/Admission/AdmissionService', 'services/Results/StudentWiseService']
            },

            'Dashboard.AdmissionDashboard.AdmissionSubReports': {
                url: "/AdmissionReports/AdmissionSubReports",
                templateUrl: 'app/views/Admission/Reports/AdmissionSubReports.html',
                dependencies: ['controllers/Admission/Reports/AdmissionSubReportsController', 'services/PreExamination/PreExaminationService', 'services/StudentResultService', 'services/Assessment/AssessmentService', 'services/Admission/AdmissionService', 'services/Results/StudentWiseService']
            },

            //'Dashboard.AdmissionDashboard.AdmissionSubReports': {
            //    url: "/AdmissionReports/AdmissionSubReports",
            //    templateUrl: 'app/views/Admission/Reports/AdmissionSubReports.html',
            //    dependencies: ['controllers/Admission/Reports/AdmissionSubReportsController', 'services/PreExamination/PreExaminationService']
            //},

            'Dashboard.AdmissionDashboard.AdmissionReportPinList': {
                url: "/AdmissionReports/AdmissionReportPinList",
                templateUrl: 'app/views/Admission/Reports/AdmissionReportPinList.html',
                dependencies: ['controllers/Admission/Reports/AdmissionReportPinListController', 'services/PreExamination/PreExaminationService', 'services/Admission/StudentRegService', 'services/Admission/RegisterAdmittedStudentService']
            },


            //'Dashboard.AdmissionDashboard.AdmissionReportPinList': {
            //    url: "/AdmissionReports/AdmissionSubReports/AdmissionReportPinList",
            //    templateUrl: 'app/views/Admission/Reports/AdmissionReportPinList.html',
            //    dependencies: ['controllers/Admission/Reports/AdmissionReportPinListController', 'services/PreExamination/PreExaminationService']
            //},
            //Sms setting 
            'Dashboard.Academic.StudentTransferReport': {
                url: "/StudentTransferReport",
                templateUrl: 'app/views/Academic/Reports/StudentTransferReport.html',
                dependencies: ['controllers/Academic/Reports/StudentTransferReportController', 'services/Academic/AcademicService']
            },

            
             'Dashboard.Academic.ReleaseSixthSem': {
                 url: "/ReleaseSixthSem",
                 templateUrl: 'app/views/Academic/ReleaseSixthSem.html',
                 dependencies: ['controllers/Academic/ReleaseSixthSemController', 'services/Academic/AcademicService', 'services/Admission/StudentRegService', 'services/PreExamination/PreExaminationService', , 'services/Assessment/AssessmentService']
            },

            'Dashboard.Academic.PrincipalTransferReport': {
                url: "/StudentTransferReport/PrincipalTransferReport",
                templateUrl: 'app/views/Academic/Reports/PrincipalTransferReport.html',
                dependencies: ['controllers/Academic/Reports/PrincipalTransferReportController', 'services/Academic/AcademicService']
            },

            'Dashboard.Academic.HodTransferReports': {
                url: "/StudentTransferReport/PrincipalTransferReport/HodTransferReports",
                templateUrl: 'app/views/Academic/Reports/HodTransferReports.html',
                dependencies: ['controllers/Academic/Reports/HodTransferReportsController', 'services/Academic/AcademicService']
            },

            'Dashboard.AdmissionDashboard.StudentTransferReport': {
                url: "/StudentTransferReport",
                templateUrl: 'app/views/Academic/Reports/StudentTransferReport.html',
                dependencies: ['controllers/Academic/Reports/StudentTransferReportController', 'services/Academic/AcademicService']
            },

            'Dashboard.AdmissionDashboard.PrincipalTransferReport': {
                url: "/StudentTransferReport/PrincipalTransferReport",
                templateUrl: 'app/views/Academic/Reports/PrincipalTransferReport.html',
                dependencies: ['controllers/Academic/Reports/PrincipalTransferReportController', 'services/Academic/AcademicService']
            },

            'Dashboard.AdmissionDashboard.HodTransferReports': {
                url: "/StudentTransferReport/PrincipalTransferReport/HodTransferReports",
                templateUrl: 'app/views/Academic/Reports/HodTransferReports.html',
                dependencies: ['controllers/Academic/Reports/HodTransferReportsController', 'services/Academic/AcademicService']
            },


            'Dashboard.AdmissionDashboard.TantalizationReports': {
                url: "/TantalizationReports",
                templateUrl: 'app/views/Admission/Reports/TantalizationReports.html',
                dependencies: ['controllers/Admission/Reports/TantalizationReportsController', 'services/Admission/AdmissionService']
            },


            'Dashboard.AdmissionDashboard.SmsSetting': {
                url: "/SmsSetting",
                templateUrl: 'app/views/Admission/SmsSetting.html',
                dependencies: ['controllers/Admission/SmsSettingController', 'services/PreExamination/PreExaminationService', 'directives/saDate', 'directives/saTable', 'services/Assessment/MarksEntryService']
            },

            'Dashboard.AdmissionDashboard.UpdateAttendance': {
                url: "/UpdateAttendance",
                templateUrl: 'app/views/Admission/UpdateAttendance.html',
                dependencies: ['controllers/Admission/UpdateAttendanceController', 'services/Admission/ReportService']
            },

            //ReadmmisionSetdates

            'Dashboard.AdmissionDashboard.ReadmmisionSetdates ': {
                url: "/ReadmmisionSetdates",
                templateUrl: 'app/views/Admission/ReadmmisionSetdates.html',
                dependencies: ['controllers/Admission/ReadmissionSetdatesController', 'services/Assessment/AssessmentService', 'directives/saDate', 'services/PreExamination/PreExaminationService', 'services/Assessment/MarksEntryService', 'services/Admission/AdmissionService']
            },
            'Dashboard.AdmissionDashboard.TransferStudent': {
                url: "/TransferStudent",
                templateUrl: 'app/views/Admission/TransferStudent.html',
                dependencies: ['controllers/Admission/TransferStudentController', 'services/Admission/StudentRegService']
            },
            'Dashboard.AdmissionDashboard.SearchStudent': {
                url: "/SearchStudent",
                templateUrl: 'app/views/Admission/Reports/StudentSearchReport.html',
                dependencies: ['controllers/Admission/Reports/StudentSearchReportController', 'services/SystemAdministration/SystemUserService', 'services/Admission/AttendanceService', 'services/Admission/ReportService', 'services/MenuService']
            },
            'Dashboard.AdmissionDashboard.AdminAdmissions': {
                url: "/AdminAdmissions",
                templateUrl: 'app/views/Admission/AdminAdmissions.html',
                dependencies: ['controllers/Admission/AdminAdmissionsController', 'services/Admission/AdmissionService']
            },
            'Dashboard.AdmissionDashboard.ReAdmission': {
                url: "/ReAdmission",
                templateUrl: 'app/views/Admission/ReAdmissionDashboard.html',
                dependencies: ['controllers/Admission/ReAdmissionController', 'services/Admission/ReAdmissionService']
            },
            'Dashboard.AdmissionDashboard.ReAdmissionStudentList': {
                url: "/ReAdmission/DetainedStudentList",
                templateUrl: 'app/views/Admission/ReAdmissionStudentList.html',
                dependencies: ['controllers/Admission/ReAdmissionStudentListController', 'services/Admission/ReAdmissionService']
            },

            'Dashboard.AdmissionDashboard.GetAttendanceReport': {
                url: "/AttendanceReport",
                templateUrl: 'app/views/Admission/Reports/AttendanceReport.html',
                dependencies: ['controllers/Admission/Reports/AttendanceReportController', 'services/Admission/AttendanceService', 'services/Admission/AdmissionService']
            },
            'Dashboard.AdmissionDashboard.AdminAttendanceReport': {
                url: "/AdminAttendanceReport",
                templateUrl: 'app/views/Admission/Reports/AdminAttendanceReport.html',
                dependencies: ['controllers/Admission/Reports/AdminAttendanceReportController', 'services/Admission/AttendanceService', 'services/Admission/AdmissionService']
            },
            'Dashboard.AdmissionDashboard.GetAttendanceReportBranchWise': {
                url: "/AttendanceReport/BranchWise",
                templateUrl: 'app/views/Admission/Reports/AttendanceReportStudList.html',
                dependencies: ['controllers/Admission/Reports/AttendanceReportStudListController', 'services/SystemAdministration/SystemUserService', 'services/Admission/AttendanceService']
            },

            //'Dashboard.AdmissionDashboard.SetSemisterDates': {
            //    url: "/SetSemisterDates",
            //    templateUrl: 'app/views/Admission/SetSemisterDates.html',
            //    dependencies: ['controllers/Admission/SetSemisterDatesController', 'services/Assessment/AssessmentService', 'services/Admission/AdmissionService']
            //},

            //StudentReAdmmision Routes
            'Dashboard.AdmissionDashboard.StudentReadmission': {
                url: "/StudentReadmission",
                templateUrl: 'app/views/Admission/StudentReadmission.html',
                dependencies: ['controllers/Admission/StudentReadmissionController', 'services/Assessment/AssessmentService', 'services/Admission/ReportService', 'services/Admission/AdmissionService']
            },


            // sub views for Admission module
            'Dashboard.AdmissionDashboard.Admission.StudentRegList': {
                url: "/StudentRegList",
                templateUrl: 'app/views/Admission/StudentRegList.html',
                dependencies: ['controllers/Admission/StudentRegListController', 'services/Admission/StudentRegService', 'services/Admission/RegisterAdmittedStudentService', 'services/SystemAdministration/SystemUserService']
            },
            'Dashboard.AdmissionDashboard.Admission.StudentReg': {
                url: "/StudentRegList/StudentReg",
                templateUrl: 'app/views/Admission/StudentReg.html',
                dependencies: ['controllers/Admission/StudentRegController', 'services/Admission/StudentRegService', 'directives/saDate']
            },
            'Dashboard.AdmissionDashboard.ReleaseAadhaar': {
                url: "/ReleaseAadhaar",
                templateUrl: 'app/views/Admission/ReleaseAadhaar.html',
                dependencies: ['controllers/Admission/ReleaseAadhaarController', 'services/Admission/AdmissionService']
            },

            'Dashboard.AdmissionDashboard.CategoryReports': {
                url: "/AdminCategoryReports/CategoryReports",
                templateUrl: 'app/views/Admission/Reports/CategoryReports.html',
                dependencies: ['controllers/Admission/Reports/CategoryReportsController', 'services/Admission/AdmissionService', 'services/Academic/AcademicService']
            },

            'Dashboard.AdmissionDashboard.AdminCategoryReports': {
                url: "/AdminCategoryReports",
                templateUrl: 'app/views/Admission/Reports/AdminCategoryReports.html',
                dependencies: ['controllers/Admission/Reports/AdminCategoryReportsController', 'services/Admission/AdmissionService', 'services/Academic/AcademicService']
            },

            'Dashboard.AdmissionDashboard.CategoryDetails': {
                url: "/AdminCategoryReports/CategoryReports/CategoryDetails",
                templateUrl: 'app/views/Admission/Reports/CategoryDetails.html',
                dependencies: ['controllers/Admission/Reports/CategoryDetailsController', 'services/Admission/AdmissionService']
            },
            //'Dashboard.AdminServices': {
            //    url: "/AdminServices",
            //    templateUrl: 'app/views/AdminServices/AdminServiceModule.html',
            //    dependencies: ['controllers/AdminServices/AdminServiceModuleControler']
            //},
            'Dashboard.AdmissionDashboard.LoginServices': {
                url: "/LoginServices",
                templateUrl: 'app/views/AdminServices/LoginServices.html',
                dependencies: ['controllers/AdminServices/LoginServiceController', 'services/AdminServices/AdminService']
            },

            // Admin Principal and branch wise results

            'Dashboard.Results': {
                url: "/Results",
                templateUrl: 'app/views/Results.html',
                dependencies: ['controllers/ResultsController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/MenuService', 'services/SystemAdministration/SystemUserService', 'services/Results/DrillDownService']
            },

            'Dashboard.Results.BranchWise': {
                url: "/BranchWise",
                templateUrl: 'app/views/Results/BranchWise.html',
                dependencies: ['controllers/Results/BranchWiseController', 'services/CommonMenuService', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/SystemAdministration/SystemUserService', 'services/StudentResultService', 'services/MenuService', 'services/Results/StudentWiseService', 'services/Results/BranchWiseService']
            },
            //'Dashboard.Results.StudentWise': {
            //    url: "/StudentWise",
            //    templateUrl: 'app/views/Results/StudentWise.html',
            //    dependencies: ['controllers/Results/StudentWiseController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/SystemAdministration/SystemUserService', 'services/MenuService', 'services/Results/StudentWiseService']
            //}, 
            'Dashboard.Results.TwshResults': {
                url: "/TwshResults",
                templateUrl: 'app/views/StudentExamResults/TypingCumShorthand.html',
                dependencies: ['controllers/StudentExamResults/TypingCumShorthandResultsController', 'services/StudentResultService']
            },

            'Dashboard.Results.ResultsAutomationExcelUpload': {
                url: "/ResultsAutomationExcelUpload",
                templateUrl: 'app/views/Results/ResultsAutomationExcelUpload.html',
                dependencies: ['controllers/Results/ResultsAutomationExcelUploadController', 'directives/saFileUpload', 'services/PreExamination/PreExaminationService', 'services/StudentResultService', 'services/Assessment/AssessmentService', 'services/Results/StudentWiseService']
            },


            'Dashboard.Results.WantingsReport': {
                url: "/WantingsReport",
                templateUrl: 'app/views/Results/WantingsReport.html',
                dependencies: ['controllers/Results/WantingsReportController', 'directives/saFileUpload', 'services/PreExamination/PreExaminationService', 'services/StudentResultService', 'services/Assessment/AssessmentService', 'services/Results/StudentWiseService']
            },

            'Dashboard.Results.StudentWise': {
                url: "/StudentWise",
                templateUrl: 'app/views/StudentExamResults/StudentResult.html',
                // templateUrl: 'app/views/Results/StudentWise.html',
                dependencies: ['controllers/StudentExamResults/StudentResultController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/SystemAdministration/SystemUserService', 'services/MenuService', 'services/StudentResultService']
            },


            'StudentMobileAppResult': {
                url: "/StudentMobileAppResult/Scheme/:SchemeId/StudentType/:StudentTypeId/SemYear/:SemYearId/ExamType/:ExamTypeId/ExamMonthYear/:ExamMonthYearId/Pin/:Pin",
                templateUrl: 'app/views/StudentExamResults/StudentMobileAppResult.html',
                dependencies: ['controllers/StudentExamResults/StudentMobileAppResultController', 'services/StudentResultService']
            },

            'MobileAppHallticket': {
                url: "/MobileAppHallticket/StudentTypeId/:StudentTypeId/ExamMonthYearId/:ExamMonthYearId/Pin/:Pin",
                templateUrl: 'app/views/PreExamination/MobileAppHallticket.html',
                dependencies: ['controllers/PreExamination/MobileAppHallticketController', 'services/Assessment/MarksEntryService', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']

            },

            'StudentMobileAppAttendance': {
                url: "/StudentMobileAppAttendance/Pin/:Pin",
                templateUrl: 'app/views/ExamsSite/StudentMobileAppAttendance.html',
                dependencies: ['controllers/ExamsSite/StudentMobileAppAttendanceController', 'services/AcademicService']
            },

            'Dashboard.Results.StudentConsolidatedResult': {
                url: "/StudentConsolidatedResult",
                templateUrl: 'app/views/StudentExamResults/StudentConsolidatedResult.html',
                dependencies: ['controllers/StudentExamResults/StudentConsolidatedResultController', 'services/StudentResultService', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.Results.StudentsResultsHistory': {
                url: "/StudentsResultsHistory",
                templateUrl: 'app/views/StudentExamResults/StudentsResultsHistory.html',
                dependencies: ['controllers/StudentExamResults/StudentsResultsHistoryController', 'services/StudentResultService']
            },

            'Dashboard.Results.StudentResults': {
                url: "/StudentResults",
                templateUrl: 'app/views/DiplomaResults/StudentsResults.html',
                dependencies: ['controllers/DiplomaResults/StudentsResultsController', 'services/Results/StudentWiseService']
            },

            'ResultsDashboard.StudentResult': {
                url: "/StudentResult",
                templateUrl: 'app/views/StudentExamResults/StudentResult.html',
                dependencies: ['controllers/StudentExamResults/StudentResultController', 'services/StudentResultService']
            },



            //'Dashboard.Results.BacklogResults': {
            //    url: "/BacklogResults",
            //    templateUrl: 'app/views/Results/BacklogResults.html',
            //    dependencies: ['controllers/Results/BacklogResultsController']
            //},
            'Dashboard.Results.BackLogDetailes': {
                url: "/BackLogDetailes",
                templateUrl: 'app/views/Results/BackLogDetailes.html',
                dependencies: ['controllers/Results/BackLogDetailesController', 'services/Results/BacklogResultsService']
            },
            //'Dashboard.AdminServices': {
            //    url: "/AdminServices",
            //    templateUrl: 'app/views/AdminServices/AdminServiceModule.html',
            //    dependencies: ['controllers/AdminServices/AdminServiceModuleControler']
            //},
            ////'Dashboard.AdminServices.LoginServices': {
            //    url: "/LoginServices",
            //    templateUrl: 'app/views/AdminServices/LoginServices.html',
            //    dependencies: ['controllers/AdminServices/LoginServiceController', 'services/AdminServices/AdminService']
            //},







            'ComingSoon': {
                url: "/ComingSoon",
                templateUrl: 'app/views/ComingSoon.html',
                dependencies: ['controllers/ComingSoonController']
            },
            'modules': {
                url: "/modules",
                templateUrl: 'app/views/modules.html',
                dependencies: ['controllers/ModuleController', 'services/MenuService']
            },



            'Exam': {
                url: "/Exam",
                templateUrl: 'app/views/Exam.html',
                dependencies: ['controllers/ExamController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/MenuService', 'services/ExamForm/DrillDownExamService']
            },






            'CenterManagemnet': {
                url: "/CenterManagemnet",
                templateUrl: 'app/views/CenterManagemnet.html',
                dependencies: ['controllers/CenterManagemnetController', 'directives/inputNumberOnly', 'services/MenuService', 'services/Masters/BasicExamInstanceService', 'services/CenterManagemenet/PreExamManagementNewService']
            },
            'Masters': {
                url: "/Masters",
                templateUrl: 'app/views/Masters.html',
                dependencies: ['controllers/MastersController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/MenuService']
            },
            //'Reports.CollegeSemWise': {               
            //    url: "/CollegeSemWise",
            //    templateUrl: 'app/views/Reports/CollegeSemWiseReport.html',
            //    dependencies: ['controllers/Reports/CollegeSemWiseController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/MenuService', 'services/Reports/CollegeSemWiseService']
            //},
            'Admission.BasicCasteList': {
                url: "/BasicCaste",
                templateUrl: 'app/views/Admission/BasicCasteList.html',
                dependencies: ['controllers/Admission/BasicCasteListController', 'services/Admission/BasicCasteService']
            },

            'Exam.BasicSubCasteList': {
                url: "/BasicSubCaste",
                templateUrl: 'app/views/Exam/BasicSubCasteList.html',
                dependencies: ['controllers/Exam/BasicSubCasteListController', 'services/Exam/BasicSubCasteService']
            },
            'ForgetPasswordSaved': {
                url: "/ForgetPasswordSaved/:SysUserID",
                templateUrl: 'app/views/ForgetPasswordSaved.html',
                dependencies: ['controllers/ForgetPasswordSavedController', 'services/ForgetPasswordService']
            },



            'ForgetPassword': {
                url: "/ForgetPassword",
                templateUrl: 'app/views/ForgetPassword.html',
                dependencies: ['controllers/ForgetPasswordController', 'services/ForgetPasswordService']
            },




            'BoardReportList': {
                url: "/BoardReportList",
                templateUrl: 'app/views/BoardReportList.html',
                dependencies: ['controllers/BoardReportListController', 'services/MenuService']
            },

            'Admission.ReportViewerController': {
                url: "/ReportViewerController/:ReportName/:url/:ds1/:ds2/:FromDate/:ToDate",
                templateUrl: 'app/views/ReportViewer.html',
                dependencies: ['controllers/ReportViewerController']
            },

            'Admission.StudentBioDataList': {
                url: "/StudentBioDataList",
                templateUrl: 'app/views/Admission/StudentBioDataList.html',
                dependencies: ['controllers/Admission/StudentBioDataListController', 'services/Admission/StudentRegService', 'services/Admission/RegisterAdmittedStudentService']
            },
            'Admission.StudentRegPhotoSignList': {
                url: "/StudentRegPhotoSignList",
                templateUrl: 'app/views/Admission/StudentRegPhotoSignList.html',
                dependencies: ['controllers/Admission/StudentRegPhotoSignListController', 'services/Admission/StudentRegService', 'services/Admission/RegisterAdmittedStudentService']
            },
            'Admission.StudentRegPhotoSign': {
                url: "/StudentRegPhotoSign/:StudRegID",
                templateUrl: 'app/views/Admission/StudentRegPhotoSign.html',
                dependencies: ['controllers/Admission/StudentRegPhotoSignController', 'services/Admission/StudentRegService']
            },
            'Admission.BioDeviceLinks': {
                url: "/Devicelinks",
                templateUrl: 'app/views/Admission/BioDeviceServiceLinks.html',
                dependencies: ['controllers/Admission/BiometricLinksController']
            },


            'Admission.StudentApprovalList': {
                url: "/StudentApproval",
                templateUrl: 'app/views/Admission/StudentApprovalList.html',
                dependencies: ['controllers/Admission/StudentApprovalListController', 'services/Admission/StudentRegService', 'services/Admission/RegisterAdmittedStudentService']
            },


            //VS routing open
            'preExam.marksEntry': {
                url: "/marksEntry",
                templateUrl: 'app/views/PostExam/marksEntry.html',
                dependencies: ['controllers/PostExam/markEntryController', 'directives/saInput', 'directives/saSelect', 'services/PostExam/basicCourseService', 'services/PostExam/basicCollegeService', 'services/PostExam/basicBranchService', 'services/PostExam/basicExamService', 'services/PostExam/missMatchService']
            },
            'hallTicketGeneration': {
                url: "/hallTicketGeneration",
                templateUrl: 'app/views/PreExam/hallTicketGeneration.html',
                dependencies: ['controllers/PreExam/hallTicketGenerationController', 'directives/saInput', 'directives/saSelect', 'services/preAssessment/hallTicketGenerationService']
            },
            'preExam': {
                url: "/preExam",
                templateUrl: 'app/views/PreExam/PreExamDashBoard.html',
                dependencies: ['controllers/preExam/preAssessmentController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/MenuService', 'services/PreAssessment/PreAssessmentService']
            },

            //Roles
            'Dashboard.MasterSettings.Roles': {
                url: "/Roles",
                templateUrl: 'app/views/MasterSettings/Roles.html',
                dependencies: ['controllers/MasterSettings/RolesController', 'services/MasterSettings/MasterPageService', 'directives/saInput', 'directives/saSelect', 'directives/saDate', 'directives/saDateRng', 'directives/saTime', 'services/Masters/BasicCourseService', 'services/Masters/BasicExamService', 'services/Masters/BasicDistrictsService', 'services/Masters/BasicCollegeService']
            },


            'StudentOnlineRequest': {
                url: "/StudentOnlineRequest",
                templateUrl: 'app/views/StudentOnlineRequest.html',
                dependencies: ['controllers/StudentOnlineRequestController', 'directives/inputNumberOnly', 'services/MenuService', 'services/SystemAdministration/SystemUserService']
            },
            'StudentOnlineRequest.EligibilityCertificateList': {
                url: "/EligibilityCertificateList",
                templateUrl: 'app/views/StudentOnlineRequest/EligibilityCertificateList.html',
                dependencies: ['controllers/StudentOnlineRequest/EligibilityCertificateListController', 'services/StudentOnlineRequest/EligibilityCertificateService', 'services/SystemAdministration/SystemUserService']
            },
            'StudentOnlineRequest.EligibilityCertificate': {
                url: "/EligibilityCertificate",
                templateUrl: 'app/views/StudentOnlineRequest/EligibilityCertificate.html',
                dependencies: ['controllers/StudentOnlineRequest/EligibilityCertificateController', 'services/StudentOnlineRequest/EligibilityCertificateService']
            },
            'StudentOnlineRequest.EligibilityCertificateFirst': {
                url: "/EligibilityCertificateFirst/:EligCertID/:FormNo",
                templateUrl: 'app/views/StudentOnlineRequest/EligibilityCertificateFirst.html',
                dependencies: ['controllers/StudentOnlineRequest/EligibilityCertificateFirstController', 'services/StudentOnlineRequest/EligibilityCertificateService']
            },
            'StudentOnlineRequest.EligibilityCertificateSecond': {
                url: "/EligibilityCertificateSecond/:EligCertID",
                templateUrl: 'app/views/StudentOnlineRequest/EligibilityCertificateSecond.html',
                dependencies: ['controllers/StudentOnlineRequest/EligibilityCertificateSecondController', 'services/StudentOnlineRequest/EligibilityCertificateService']
            },
            'StudentOnlineRequest.StudentRegList': {
                url: "/StudentReg",
                templateUrl: 'app/views/StudentOnlineRequest/StudentRegList.html',
                dependencies: ['controllers/StudentOnlineRequest/StudentRegListController', 'services/StudentOnlineRequest/StudentRegService', 'services/StudentOnlineRequest/RegisterAdmittedStudentService']
            },
            //'StudentOnlineRequest.Success': {
            //    url: "/Success",
            //    templateUrl: 'app/views/StudentOnlineRequest/success.html',
            //    //dependencies: ['controllers/StudentOnlineRequest/StudentRegListController', 'services/StudentOnlineRequest/StudentRegService', 'services/StudentOnlineRequest/RegisterAdmittedStudentService']
            //},


            'PreExam.PracticalExamTimeTableGeneration': {
                url: "/PracticalExamTimeTableGeneration",
                templateUrl: 'app/views/PreExam/PracticalExamTimeTableGeneration.html',
                dependencies: ['controllers/PreExam/PracticalExamTimeTableGenerationProceesController', 'services/Masters/BasicCourseService', 'services/Masters/BasicEvalTypesService', 'services/PreExam/examTimeTableService']
            },

            'PreExam.studentSms': {
                url: "/studentSms",
                templateUrl: 'app/views/PreExam/studentSms.html',
                dependencies: ['controllers/PreExam/studentSmsController', 'directives/saInput', 'directives/saSelect', 'directives/saTextarea', 'directives/saNumber', 'services/PreExam/basicCourseService', 'services/PreExam/basicCollegeService', 'services/PreExam/basicBranchService', 'services/PreExam/basicExamService', 'services/PreExam/studentSMSService', 'services/PreExam/basicMainGroupService', 'services/PreExam/basicDistrictsService']
            },


            'PreExam.studentDetailView': {
                url: "/studentDetailView",
                templateUrl: 'app/views/PreExam/studentDetailView.html',
                dependencies: ['controllers/PreExam/studentDetailViewController', 'directives/saInput', 'directives/saSelect', 'directives/saNumber', 'services/PreExam/studentDetailsViewService']
            },


            // PostExam
            'PostExam': {
                url: "/PostExam",
                templateUrl: 'app/views/PostExam.html',
                dependencies: ['controllers/PostExamController', 'directives/inputNumberOnly', 'services/MenuService']
            },



            'PostExam.studentStatusReport': {
                url: "/studentStatusReport",
                templateUrl: 'app/views/PostExam/studentStatusReport.html',
                dependencies: ['controllers/PostExam/studentStatusReportController', 'directives/saNumber', 'directives/saInput', 'services/PostExam/basicCourseService', 'services/PostExam/basicBranchService', 'services/PostExam/basicExamService', 'services/PostExam/studentStatusReportService']
            },




            //'Dashboard.Results.ResultsAutomationExcelUpload': {
            //    url: "/ResultsAutomationExcelUpload",
            //    templateUrl: 'app/views/Results/ResultsAutomationExcelUpload.html',
            //    dependencies: ['controllers/Results/ResultsAutomationExcelUploadController', 'directives/saFileUpload', 'services/PreExamination/PreExaminationService', 'services/StudentResultService', 'services/Assessment/AssessmentService', 'services/Results/StudentWiseService']
            //},

            'PostExam.updateMarks': {
                url: "/updateMarks",
                templateUrl: 'app/views/PostExam/updateMarks.html',
                dependencies: ['controllers/PostExam/updateMarksController', 'directives/saInput', 'directives/saSelect', 'directives/saNumber', 'services/PostExam/basicCourseService', 'services/PostExam/basicExamService', 'services/PostExam/basicBranchService', 'services/PostExam/updateMarkService']
            },

            'PostExam.resultReserve': {
                url: "/resultReserve",
                templateUrl: 'app/views/PostExam/resultReserve.html',
                dependencies: ['controllers/PostExam/resultReserveController', 'directives/saNumber', 'directives/saInput', 'directives/saSelect', 'services/PostExam/basicCourseService', 'services/PostExam/basicCollegeService', 'services/PostExam/basicExamService', 'services/PostExam/basicMalpracticeService', 'services/PostExam/resultReserveService']
            },

            'PostExam.reCountUpdateMarks': {
                url: "/reCountUpdateMarks",
                templateUrl: 'app/views/PostExam/reCountUpdateMarks.html',
                dependencies: ['controllers/PostExam/reCountUpdateMarksController', 'directives/saInput', 'directives/saSelect', 'directives/saNumber', 'services/PostExam/basicCourseService', 'services/PostExam/basicExamService', 'services/PostExam/basicBranchService', 'services/PostExam/updateMarkService']
            },

            'PostExam.postingOfMark': {
                url: "/postingOfMark",
                templateUrl: 'app/views/PostExam/postingOfMark.html',
                dependencies: ['controllers/PostExam/postingOfMarkController', 'directives/saInput', 'directives/saSelect', 'services/PostExam/basicCourseService', 'services/PostExam/basicExamService', 'services/PostExam/basicBranchService', 'services/PostExam/postingOfMarkService']
            },

            //'PostExam.resultProcess': {
            //    url: "/resultProcess",
            //    templateUrl: 'app/views/PostExam/resultProcess.html',
            //    dependencies: ['controllers/PostExam/resultProcessController', 'directives/saInput', 'directives/saSelect', 'services/PostExam/basicCourseService', 'services/PostExam/basicBranchService', 'services/PostExam/basicExamService', 'services/PostExam/basicCollegeService', , 'services/PostExam/resultService']
            //},

            'PostExam.UnfairStudentPunishment': {
                url: "/UnfairStudentPunishment",
                templateUrl: 'app/views/PostExam/UnfairStudentPunishment.html',
                dependencies: ['controllers/PostExam/UnfairStudentPunishmentController', 'directives/saDate', 'directives/saInput', 'directives/saSelect', 'directives/saSelectDisabled', 'services/PostExam/basicCourseService', 'services/PostExam/basicCollegeService', 'services/PostExam/basicBranchService', 'services/PostExam/basicExamService', 'services/PostExam/UnfStudCasesService', 'services/PostExam/unfairReasonsService', 'services/PostExam/basicMediumService', 'services/PostExam/basicMainGroupService']
            },

            'markEntry': {
                url: "/markEntry",
                templateUrl: 'app/views/PostExam/markEntry.html',
                dependencies: ['controllers/PostExam/markEntryController', 'directives/saInput', 'directives/saSelect', 'services/PostExam/basicCourseService', 'services/PostExam/basicCollegeService', 'services/PostExam/basicBranchService', 'services/PostExam/basicExamService', 'services/PostExam/missMatchService']
            },

            'PostExam.wantingList': {
                url: "/wantingList",
                templateUrl: 'app/views/PostExam/wantingList.html',
                dependencies: ['controllers/PostExam/wantingListController', 'directives/saInput', 'directives/saSelect', 'services/PostExam/basicCourseService', 'services/PostExam/basicExamService', 'services/PostExam/basicBranchService', 'services/PostExam/basicExamSubjectService', 'services/PostExam/wantingReportService']
            },

            'PostExam.studentReserve': {
                url: "/studentReserve",
                templateUrl: 'app/views/PostExam/studentReserve.html',
                dependencies: ['controllers/PostExam/studentReserveController', 'directives/saInput', 'directives/saSelect', 'services/PostExam/basicCourseService', 'services/PostExam/basicExamService', 'services/PostExam/basicMalpracticeService', 'services/PostExam/resultReserveService']
            },

            'PostExam.resultSheet': {
                url: "/resultSheet",
                templateUrl: 'app/views/PostExam/resultSheet.html',
                dependencies: ['controllers/PostExam/resultSheetController', 'directives/saDate', 'directives/saInput', 'directives/saSelect', 'services/PostExam/basicCourseService', 'services/PostExam/basicBranchService', 'services/PostExam/basicExamService', 'services/PostExam/resultService']
            },

            'PostExam.boardMeritList': {
                url: "/boardMeritList",
                templateUrl: 'app/views/PostExam/boardMeritList.html',
                dependencies: ['controllers/PostExam/boardMeritListController', 'directives/saInput', 'directives/saSelect', 'services/PostExam/basicCourseService', 'services/PostExam/basicCollegeService', 'services/PostExam/basicBranchService', 'services/PostExam/basicExamService', 'services/PostExam/meritService']
            },


            'PostExam.meritList': {
                url: "/meritList",
                templateUrl: 'app/views/PostExam/meritList.html',
                dependencies: ['controllers/PostExam/meritListController', 'directives/saInput', 'directives/saSelect', 'services/PostExam/basicCourseService', 'services/PostExam/basicCollegeService', 'services/PostExam/basicBranchService', 'services/PostExam/basicExamService', 'services/PostExam/meritService']
            },

            'PostExam.topperMeritList': {
                url: "/topperMeritList",
                templateUrl: 'app/views/PostExam/topperMeritList.html',
                dependencies: ['controllers/PostExam/topperMeritListController', 'directives/saCheckbox', 'directives/saInput', 'directives/saSelect', 'services/PostExam/basicCourseService', 'services/PostExam/basicCollegeService', 'services/PostExam/basicBranchService', 'services/PostExam/basicExamService', 'services/PostExam/basicMainGroupServive', 'services/PostExam/meritService']
            },
            'PreExam.PrePracticalScheduleReport': {
                url: "/PrePracticalScheduleReport",
                templateUrl: 'app/views/PreExam/PrePracticalScheduleReport.html',
                dependencies: ['controllers/PreExam/PrePracticalScheduleReportController', 'services/CenterManagemenet/PreZoneCenterService', 'services/Masters/BasicDistrictsService', 'services/Masters/BasicExamService', 'services/Masters/BasicCourseService', 'services/CenterManagemenet/PrePractCenterService']
            },
            'PreExam.PrePracVocScheduleReport': {
                url: "/PrePracVocScheduleReport",
                templateUrl: 'app/views/PreExam/PrePracVocScheduleReport.html',
                dependencies: ['controllers/PreExam/PrePracVocScheduleReportController', 'services/CenterManagemenet/PreZoneCenterService', 'services/Masters/BasicDistrictsService', 'services/Masters/BasicExamService', 'services/Masters/BasicCourseService', 'services/CenterManagemenet/PrePractCenterService', 'services/Masters/BasicMainGroupService']
            },
            'CenterManagemnet.PracticalCenterAllocationStudentList': {
                url: "/PracticalCenterAllocationStudentList",
                templateUrl: 'app/views/CenterManagemenet/Reports/PracticalCenterAllocationStudentList.html',
                dependencies: ['controllers/CenterManagemenet/Reports/PracticalCenterAllocationStudentListController', 'services/Masters/BasicDistrictsService', 'services/Masters/BasicExamService', 'services/Masters/BasicCourseService', 'services/Masters/BasicCollegeService', 'services/CenterManagemenet/PrePractCenterService', 'services/CenterManagemenet/PreVocationalCenterService', 'services/Masters/BasicMainGroupService', 'services/Masters/BasicExamSubjectService', 'services/PreExam/practicalEntryService']
            },
            'CenterManagemnet.GenGeographyPracticalAllocationStudentList': {
                url: "/GenGeographyPracticalAllocationStudentList",
                templateUrl: 'app/views/CenterManagemenet/Reports/GenGeographyPracticalAllocationStudentList.html',
                dependencies: ['controllers/CenterManagemenet/Reports/GeogPrctAllocationStudentListController', 'services/Masters/BasicDistrictsService', 'services/Masters/BasicExamService', 'services/Masters/BasicCourseService', 'services/Masters/BasicCollegeService', 'services/CenterManagemenet/PrePractCenterService', 'services/CenterManagemenet/PreVocationalCenterService', 'services/Masters/BasicMainGroupService', 'services/Masters/BasicExamSubjectService', 'services/PreExam/practicalEntryService']
            },
            'PreExam.VocationalPracticalBatchTimeTable': {
                url: "/VocationalPracticalBatchTimeTable",
                templateUrl: 'app/views/PreExam/VocationalPracticalBatchTimeTable.html',
                dependencies: ['controllers/PreExam/VocationalPracticalBatchTimeTableController', 'directives/saInput', 'directives/saSelect', 'directives/saDateRng', 'services/Masters/BasicDistrictsService', 'services/Masters/BasicCourseService', 'services/CenterManagemenet/PrePractCenterService', 'services/Masters/BasicMainGroupService']
            },
            'CenterManagemnet.VocBridgePracticalAllocationStudentList': {
                url: "/VocBridgePracticalAllocationStudentList",
                templateUrl: 'app/views/CenterManagemenet/Reports/VocBridgePracticalAllocationStudentList.html',
                dependencies: ['controllers/CenterManagemenet/Reports/VocBridgePractAllocStudentListController', 'services/Masters/BasicDistrictsService', 'services/Masters/BasicExamService', 'services/Masters/BasicCourseService', 'services/Masters/BasicCollegeService', 'services/CenterManagemenet/PrePractCenterService', 'services/CenterManagemenet/PreVocationalCenterService', 'services/Masters/BasicMainGroupService', 'services/Masters/BasicExamSubjectService', 'services/PreExam/practicalEntryService']
            },
            'CenterManagemnet.PracticalVocationalCenterAllocStudentList': {
                url: "/PracticalVocationalCenterAllocStudentList",
                templateUrl: 'app/views/CenterManagemenet/Reports/PracticalVocationalCenterAllocStudentList.html',
                dependencies: ['controllers/CenterManagemenet/Reports/VocPractCenterAllocStudListController', 'services/Masters/BasicDistrictsService', 'services/Masters/BasicExamService', 'services/Masters/BasicCourseService', 'services/Masters/BasicCollegeService', 'services/CenterManagemenet/PrePractCenterService', 'services/CenterManagemenet/PreVocationalCenterService', 'services/Masters/BasicMainGroupService', 'services/Masters/BasicExamSubjectService', 'services/PreExam/practicalEntryService']
            },


            //'Dashboard.ExamType': {
            //    url: "/ExamType",
            //    templateUrl: 'app/views/ExamType/ExamType.html',
            //    dependencies: ['controllers/ExamTypeController', 'services/ExamType/ExamTypeService']
            //},


            'Dashboard.Academic.SetSemesters': {
                url: "/SetSemesters",
                templateUrl: 'app/views/Academic/SetSemesters.html',
                dependencies: ['controllers/Academic/SetSemesterDatesController', 'services/MenuService', 'services/Assessment/MarksEntryService', 'services/Assessment/AssessmentService', 'services/Academic/AcademicService']
            },
            'Dashboard.Academic.StudentFeedback': {
                url: "/StudentFeedback",
                templateUrl: 'app/views/Academic/StudentFeedback.html',
                dependencies: ['controllers/Academic/StudentFeedbackController', 'services/Academic/AcademicService']
            },

            
               'Dashboard.Academic.AttendanceApproveList': {
                   url: "/AttendanceApproveList",
                   templateUrl: 'app/views/Academic/AttendanceApproveList.html',
                   dependencies: ['controllers/Academic/AttendanceApproveListController' , 'services/PreExamination/PreExaminationService','services/Academic/AcademicService']
            },

            'Dashboard.Academic.AttendanceApproveListDetails': {
                url: "/AttendanceApproveList/AttendanceApproveListDetails",
                templateUrl: 'app/views/Academic/AttendanceApproveListDetails.html',
                dependencies: ['controllers/Academic/AttendanceApproveListDetailsController', 'services/Academic/AcademicService', 'services/PreExamination/PreExaminationService']
            },
            

            'Dashboard.Results.BacklogResults': {
                url: "/BacklogResults",
                templateUrl: 'app/views/Results/BacklogResults.html',
                dependencies: ['controllers/Results/BacklogResultsController', 'services/Results/BacklogResultsService']
            },


            'Dashboard.ExamType': {
                url: "/ExamType",
                templateUrl: 'app/views/ExamType/ExamType.html',
                dependencies: ['controllers/ExamTypeController', 'services/ExamType/ExamTypeService']
            },
            //'Dashboard.Academic.SetSemesters': {
            //    url: "/SetSemesters",
            //    templateUrl: 'app/views/Academic/SetSemesters.html',
            //    dependencies: ['controllers/Academic/SetSemesterDatesController', 'services/MenuService', 'services/Assessment/MarksEntryService', 'services/Assessment/AssessmentService', 'services/Academic/AcademicService']
            //},
            'Dashboard.Results.BacklogResults': {
                url: "/BacklogResults",
                templateUrl: 'app/views/Results/BacklogResults.html',
                dependencies: ['controllers/Results/BacklogResultsController', 'services/Results/BacklogResultsService']
            },


            //'PostExam.collegeWisePercentageDetails': {
            //    url: "/collegeWisePercentageDetails",
            //    templateUrl: 'app/views/PostExam/collegeWisePercentageDetails.html',
            //    dependencies: ['controllers/PostExam/collegeWisePercentageDetailsController', 'directives/saCheckbox','directives/saInput', 'directives/saSelect', 'services/PostExam/basicCourseService', 'services/PostExam/basicExamService', 'services/PostExam/basicBranchService', 'services/PostExam/basicCollegeService', 'services/PostExam/percentageService']
            //},

            //'PostExam.ledgerYearly': {
            //    url: "/ledgerYearly",
            //    templateUrl: 'app/views/PostExam/ledgerYearly.html',
            //    dependencies: ['controllers/PostExam/ledgerYearlyController', 'directives/saInput', 'directives/saSelect', 'services/PostExam/basicCourseService', 'services/PostExam/basicCollegeService', 'services/PostExam/basicBranchService', 'services/PostExam/basicExamService']
            //},

            //'PostExam.marksheet': {
            //    url: "/marksheet",
            //    templateUrl: 'app/views/PostExam/marksheet.html',
            //},

            //'PostExam.rankCertificate': {
            //    url: "/rankCertificate",
            //    templateUrl: 'app/views/PostExam/rankCertificate.html',
            //},

            'Dashboard.DigitalSignatures': {
                url: "/DigitalSignatures",
                templateUrl: 'app/views/DigitalSignatures/DigitalSignatures.html',
                dependencies: ['controllers/DigitalSignatures/DigitalSignaturesController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/SystemAdministration/SystemUserService', 'services/MenuService', 'services/DigitalSignatureService']
            },

            'Dashboard.StudentServices': {
                url: "/StudentServices",
                templateUrl: 'app/views/StudentServices/StudentServices.html',
                dependencies: ['controllers/StudentServices/StudentServicesController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/SystemAdministration/SystemUserService', 'services/MenuService']
            },
            'Dashboard.StudentServices.TcApplicationForm': {
                url: "/TcApplicationForm",
                templateUrl: 'app/views/StudentServices/TcApplicationForm.html',
                dependencies: ['controllers/StudentServices/TcApplicationFormController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/SystemAdministration/SystemUserService', 'services/MenuService', 'services/Academic/AcademicService']
            },
            'Dashboard.StudentServices.AdministrationServices': {
                url: "/AdministrationServices",
                templateUrl: 'app/views/StudentServices/AdministrationServices.html',
                dependencies: ['controllers/StudentServices/AdministrationServicesController', 'services/Academic/AcademicService']
            },
            'Dashboard.StudentServices.TCApprovalHOD': {
                url: "/TCApprovalHOD",
                templateUrl: 'app/views/StudentServices/TCApprovalHOD.html',
                dependencies: ['controllers/StudentServices/TCApprovalHODController', 'directives/inputNumberOnly', 'directives/noSpecialChar', 'services/SystemAdministration/SystemUserService', 'services/MenuService', 'services/Academic/AcademicService']
            },
            'Dashboard.StudentServices.AdministrationServices': {
                url: "/AdministrationServices",
                templateUrl: 'app/views/StudentServices/AdministrationServices.html',
                dependencies: ['controllers/StudentServices/AdministrationServicesController', 'services/Academic/AcademicService']
            },
            'Dashboard.StudentServices.NameCorrectionApproveListDetails': {
                url: "/NameCorrectionApproveList/NameCorrectionApproveListDetails",
                templateUrl: 'app/views/PostExam/NameCorrectionApproveListDetails.html',
                dependencies: ['controllers/PostExam/NameCorrectionApproveListDetailsControler', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            'Dashboard.StudentServices.NC_StudentDetails': {
                url: "/NameCorrectionApproveList/NameCorrectionApproveListDetails/NC_StudentDetails",
                templateUrl: 'app/views/PostExam/NC_StudentDetails.html',
                dependencies: ['controllers/PostExam/NC_StudentDetailsControllers', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            
            'Dashboard.PostExam.TwoYearsCertificateListByScheme': {
                url: "/TwoYearsCertificateListByScheme",
                templateUrl: 'app/views/PostExam/TwoYearsCertificateListByScheme.html',
                dependencies: ['controllers/PostExam/TwoYearsCertificateListBySchemeController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.PostExam.TwoYearsCertificateList': {
                url: "/TwoYearsCertificateListByScheme/TwoYearsCertificateList",
                templateUrl: 'app/views/PostExam/TwoYearsCertificateList.html',
                dependencies: ['controllers/PostExam/TwoYearsCertificateListController', 'services/PreExamination/PreExaminationService', 'services/StudentResultService']
            },

            'Dashboard.PostExam.StatisticsReports': {
                url: "/StatisticsReports",
                templateUrl: 'app/views/PostExam/StatisticsReports.html',
                dependencies: ['controllers/PostExam/StatisticsReportsController', 'services/PreExamination/PreExaminationService', 'services/StudentResultService']
            },

            'Dashboard.StudentServices.MigrationApprovalList': {
                url: "/MigrationApprovalList",
                templateUrl: 'app/views/PostExam/MigrationApprovalList.html',
                dependencies: ['controllers/PostExam/MigrationApprovalListController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.StudentServices.MigrationApprovalListdetails': {
                url: "/MigrationApprovalList/MigrationApprovalListdetails",
                templateUrl: 'app/views/PostExam/MigrationApprovalListdetails.html',
                dependencies: ['controllers/PostExam/MigrationApprovalListdetailsController', 'services/PreExamination/PreExaminationService', 'services/DigitalSignatureService']
            },

            'Dashboard.StudentServices.StudentCertificateApproveList': {
                url: "/StudentCertificateApproveList",
                templateUrl: 'app/views/StudentOnlineServices/StudentCertificateApproveList.html',
                dependencies: ['controllers/StudentOnlineServices/StudentCertificateApproveListController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService']
            },

            'Dashboard.StudentServices.InterimCertificatePending': {
                url: "/StudentCertificateApproveList/StudentCertificateApproveListDetails/InterimCertificatePending",
                templateUrl: 'app/views/StudentOnlineServices/InterimCertificatePending.html',
                dependencies: ['controllers/StudentOnlineServices/InterimCertificatePendingController', 'directives/saCanvas', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService', 'services/DigitalSignatureService']

            },

            'Dashboard.StudentServices.StudentCertificateApproveListDetails': {
                url: "/StudentCertificateApproveList/StudentCertificateApproveListDetails",
                templateUrl: 'app/views/StudentOnlineServices/StudentCertificateApproveListDetails.html',
                dependencies: ['controllers/StudentOnlineServices/StudentCertificateApproveListDetailsController', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService', 'services/DigitalSignatureService']
            },

            'Dashboard.StudentServices.InterimCertificate': {
                url: "/StudentCertificateApproveList/StudentCertificateApproveListDetails/InterimCertificate",
                templateUrl: 'app/views/StudentOnlineServices/InterimCertificatePending.html',
                dependencies: ['controllers/StudentOnlineServices/InterimCertificatePendingController', 'directives/saCanvas', 'services/PreExamination/PreExaminationService', 'services/BillDesk/paymentService', 'services/DigitalSignatureService']

            },

            // transcript
            'Dashboard.StudentServices.TranscriptApproval': {
                url: "/TranscriptApproval",
                templateUrl: 'app/views/PostExam/TranscriptApproval.html',
                dependencies: ['controllers/PostExam/TranscriptApprovalController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.StudentServices.TranscriptApprovalDetails': {
                url: "/TranscriptApproval/TranscriptApprovalDetails",
                templateUrl: 'app/views/PostExam/TranscriptApprovalDetails.html',
                dependencies: ['controllers/PostExam/TranscriptApprovalDetailsController', 'directives/saCanvas', 'services/PreExamination/PreExaminationService', 'services/DigitalSignatureService']
            },
            'Dashboard.StudentServices.Transcript_StudentDetails': {
                url: "/TranscriptApproval/TranscriptApprovalDetails/Transcript_StudentDetails",
                templateUrl: 'app/views/PostExam/Transcript_StudentDetails.html',
                dependencies: ['controllers/PostExam/Transcript_StudentDetailsController', 'services/PreExamination/PreExaminationService']
            },
            //

            'Dashboard.StudentServices.TcApprovalList': {
                url: "/TcApprovalList",
                templateUrl: 'app/views/PostExam/TcApprovalList.html',
                dependencies: ['controllers/PostExam/TcApprovalListController', 'services/PreExamination/PreExaminationService', 'directives/saDate', 'services/DigitalSignatureService']
            },

            'Dashboard.StudentServices.TcApprovalListDetails': {
                url: "/TcApprovalList/TcApprovalListDetails",
                templateUrl: 'app/views/PostExam/TcApprovalListDetails.html',
                dependencies: ['controllers/PostExam/TcApprovalListDetailsController', 'services/PreExamination/PreExaminationService', 'directives/saDate', 'services/DigitalSignatureService']
            },

            'Dashboard.StudentServices.TransferCertificatePending': {
                url: "/TcApprovalList/TcApprovalListDetails/TransferCertificatePending",
                templateUrl: 'app/views/PostExam/TransferCertificatePending.html',
                dependencies: ['controllers/PostExam/TransferCertificatePendingController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.StudentServices.CertificateApproveList': {
                url: "/CertificateApproveList",
                templateUrl: 'app/views/PostExam/CertificateApproveList.html',
                dependencies: ['controllers/PostExam/CertificateApproveListController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.StudentServices.CertificateApproveListDetails': {
                url: "/CertificateApproveList/CertificateApproveListDetails",
                templateUrl: 'app/views/PostExam/CertificateApproveListDetails.html',
                dependencies: ['controllers/PostExam/CertificateApproveListDetailsController', 'services/PreExamination/PreExaminationService']
            },

            // ------------------genenuineness check
            'Dashboard.StudentServices.GenuinenessApproval': {
                url: "/GenuinenessApproval",
                templateUrl: 'app/views/PostExam/GenuinenessApproval.html',
                dependencies: ['controllers/PostExam/GenuinenessApprovalController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.StudentServices.GenuinenessApproveList': {
                url: "/GenuinenessApproval/GenuinenessApproveList",
                templateUrl: 'app/views/PostExam/GenuinenessApproveList.html',
                dependencies: ['controllers/PostExam/GenuinenessApproveListController', 'services/PreExamination/PreExaminationService', 'services/DigitalSignatureService']
            },

            'Dashboard.StudentServices.OdcData': {
                url: "/GenuinenessApproval/GenuinenessApproveList/OdcData",
                templateUrl: 'app/views/PostExam/OdcData.html',
                dependencies: ['controllers/PostExam/OdcDataController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.StudentServices.GenuineOdc': {
                url: "/GenuinenessApproval/GenuinenessApproveList/GenuineOdc",
                templateUrl: 'app/views/PostExam/GenuineOdc.html',
                dependencies: ['controllers/PostExam/GenuineOdcController', 'services/PreExamination/PreExaminationService']
            },

            // ------------------study certificate/ bonafide certificate---------------- 
            'Dashboard.StudentServices.StudyCertificateApproveList': {
                url: "/StudyCertificateApproveList",
                templateUrl: 'app/views/PostExam/StudyCertificateApproveList.html',
                dependencies: ['controllers/PostExam/StudyCertificateApproveListController', 'services/PreExamination/PreExaminationService', 'directives/saDate', 'services/DigitalSignatureService']
            },

            

            'Dashboard.StudentServices.StudyCertificateApproveListDetails': {
                url: "/StudyCertificateApproveList/StudyCertificateApproveListDetails",
                templateUrl: 'app/views/PostExam/StudyCertificateApproveListDetails.html',
                dependencies: ['controllers/PostExam/StudyCertificateApproveListDetailsController', 'services/PreExamination/PreExaminationService', 'directives/saDate', 'services/DigitalSignatureService']
            },

            'Dashboard.StudentServices.BonafideCertApproveList': {
                url: "/BonafideCertApproveList",
                templateUrl: 'app/views/PostExam/BonafideCertApproveList.html',
                dependencies: ['controllers/PostExam/BonafideCertApproveListController', 'services/PreExamination/PreExaminationService', 'directives/saDate', 'services/DigitalSignatureService']
            },

            'Dashboard.StudentServices.BonafideCertApproveListDetails': {
                url: "/BonafideCertApproveList/BonafideCertApproveListDetails",
                templateUrl: 'app/views/PostExam/BonafideCertApproveListDetails.html',
                dependencies: ['controllers/PostExam/BonafideCertApproveListDetailsController', 'services/PreExamination/PreExaminationService', 'directives/saDate', 'services/DigitalSignatureService']
            },

            //Marks Memo ApproveList  

            'Dashboard.StudentServices.MarksMemoApproval': {
                url: "/MarksMemoApproval",
                templateUrl: 'app/views/PostExam/MarksMemoApproval.html',
                dependencies: ['controllers/PostExam/MarksMemoApprovalController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.StudentServices.MarksMemoApprovalDetails': {
                url: "/MarksMemoApproval/MarksMemoApprovalDetails",
                templateUrl: 'app/views/PostExam/MarksMemoApprovalDetails.html',
                dependencies: ['controllers/PostExam/MarksMemoApprovalDetailsController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.StudentServices.SemesterData': {
                url: "/MarksMemoApproval/MarksMemoApprovalDetails/SemesterData",
                templateUrl: 'app/views/PostExam/SemesterData.html',
                dependencies: ['controllers/PostExam/SemesterDataController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.StudentServices.DMFinal': {
                url: "/MarksMemoApproval/MarksMemoApprovalDetails/DMFinal",
                templateUrl: 'app/views/PostExam/DMFinal.html',
                dependencies: ['controllers/PostExam/DMFinalController', 'services/PreExamination/PreExaminationService']
            },


            //---------------------duplicate diploma certificate------------------------
            'Dashboard.StudentServices.OdcApproveList': {
                url: "/OdcApproveList",
                templateUrl: 'app/views/PostExam/OdcApproveList.html',
                dependencies: ['controllers/PostExam/OdcApproveListController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.StudentServices.OdcFinal': {
                url: "/OdcApproveList/OdcApproveListDetails/OdcFinal",
                templateUrl: 'app/views/PostExam/OdcFinal.html',
                dependencies: ['controllers/PostExam/OdcFinalController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.StudentServices.OdcDataa': {
                url: "/OdcApproveList/OdcApproveListDetails/OdcData",
                templateUrl: 'app/views/PostExam/OdcData.html',
                dependencies: ['controllers/PostExam/OdcDataController', 'services/PreExamination/PreExaminationService']
            },
            'Dashboard.StudentServices.OdcApproveListDetails': {
                url: "/OdcApproveList/OdcApproveListDetails",
                templateUrl: 'app/views/PostExam/OdcApproveListDetails.html',
                dependencies: ['controllers/PostExam/OdcApproveListDetailsController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.StudentServices.Odc_StudentDetails': {
                url: "/OdcApproveList/OdcApproveListDetails/Odc_StudentDetails",
                templateUrl: 'app/views/PostExam/Odc_StudentDetails.html',
                dependencies: ['controllers/PostExam/Odc_StudentDetailsController', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.Tickets': {

                url: "/Tickets",

                templateUrl: 'app/views/Tickets/Tickets.html',

                dependencies: ['controllers/Tickets/TicketsController', 'services/PreExamination/PreExaminationService']

            },

            'Dashboard.TicketsReport': {

                url: "/Tickets/TicketsReport",

                templateUrl: 'app/views/Tickets/TicketsReport.html',

                dependencies: ['controllers/Tickets/TicketsReportController', 'services/AdminServices/AdminService']

            },

            'Dashboard.AddTickets': {

                url: "/AddTickets",

                templateUrl: 'app/views/Tickets/AddTickets.html',

                dependencies: ['controllers/Tickets/AddTicketsController', 'services/PreExamination/PreExaminationService']

            },

            'Dashboard.TicketsCountData': {

                url: "/TicketsCountData",

                templateUrl: 'app/views/Tickets/TicketsCountData.html',

                dependencies: ['controllers/Tickets/TicketsCountDataController', 'services/PreExamination/PreExaminationService']

            },
            

            'Dashboard.TicketsStatusWiseReport': {

                url: "/TicketsStatusWiseReport",

                templateUrl: 'app/views/Tickets/TicketsStatusWiseReport.html',

                dependencies: ['controllers/Tickets/TicketsStatusWiseReportController', 'services/PreExamination/PreExaminationService']

            },

            'Dashboard.MasterSettings.FeeSettings': {

                url: "/FeeSettings",

                templateUrl: 'app/views/StudentServices/FeeSettings.html',

                dependencies: ['controllers/StudentServices/FeeSettingsController', 'services/PreExamination/PreExaminationService']

            },



            //'Dashboard.PayRollDashboard': {
            //    url: "/PayRollDashboard",
            //    templateUrl: 'app/views/PayRollDashboard/PayRoll.html',
            //    dependencies: ['controllers/PayRollDashboard/PayRollController', 'services/SystemAdministration/SystemUserService']
            //},
            'Dashboard.PayRollMasters': {
                url: "/PayRollMasters",
                templateUrl: 'app/views/PayRoll/PayRollMasters.html',
                dependencies: ['controllers/PayRoll/PayRollMastersController', 'services/SystemAdministration/SystemUserService']
            },

            'Dashboard.PayRollMasters.Designation': {
                url: "/Designation",
                templateUrl: 'app/views/PayRoll/Designation.html',
                dependencies: ['controllers/PayRoll/DesignationController', 'services/PayRoll/PayRollService']
            },

            'Dashboard.PayRollMasters.Departments': {
                url: "/Departments",
                templateUrl: 'app/views/PayRoll/Department.html',
                dependencies: ['controllers/PayRoll/DepartmentController', 'services/PayRoll/PayRollService']
            },

            'Dashboard.PayRollMasters.BankDetails': {
                url: "/BankDetails",
                templateUrl: 'app/views/PayRoll/BankDetails.html',
                dependencies: ['controllers/PayRoll/BankDetailsController', 'services/PayRoll/PayRollService']
            },

            'Dashboard.PayRollMasters.EmployeeDetails': {
                url: "/EmployeeDetails",
                templateUrl: 'app/views/PayRoll/EmployeeDetails.html',
                dependencies: ['controllers/PayRoll/EmployeeDetailsController', 'services/PayRoll/PayRollService']
            },

            'Dashboard.PayRollMasters.SalaryDetails': {
                url: "/SalaryDetails",
                templateUrl: 'app/views/PayRoll/SalaryDetails.html',
                dependencies: ['controllers/PayRoll/SalaryDetailsController', 'services/PayRoll/PayRollService']
            },

            

            'Dashboard.PayRollMasters.FinancialYearSettings': {
                url: "/FinancialYearSettings",
                templateUrl: 'app/views/PayRoll/FinancialYearSettings.html',
                dependencies: ['controllers/PayRoll/FinancialYearSettingsController', 'services/PayRoll/PayRollService']
            },

       

            'Dashboard.PayRollDashboard': {
                url: "/PayRollDashboard",
                templateUrl: 'app/views/PayRoll/PayRollDashboard.html',
                dependencies: ['controllers/PayRoll/PayRollDashboardController', 'services/SystemAdministration/SystemUserService']
            },


            'Dashboard.PayRollDashboard.MonthlySalaryDetails': {
                url: "/MonthlySalaryDetails",
                templateUrl: 'app/views/PayRoll/MonthlySalaryDetails.html',
                dependencies: ['controllers/PayRoll/MonthlySalaryDetailsController', 'services/SystemAdministration/SystemUserService', 'services/PayRoll/PayRollService']
            },

            'Dashboard.PayRollDashboard.OverAllDeductions': {
                url: "/OverAllDeductions",
                templateUrl: 'app/views/PayRoll/OverAllDeductions.html',
                dependencies: ['controllers/PayRoll/OverAllDeductionsController', 'services/SystemAdministration/SystemUserService', 'services/PayRoll/PayRollService']
            },


         
            //'Dashboard.PayRollDashboard.Designation': {
            //    url: "/Designation",
            //    templateUrl: 'app/views/PayRoll/Designation.html',
            //    dependencies: ['controllers/PayRoll/DesignationController', 'services/PayRoll/PayRollService']
            //},

            //'Dashboard.PayRollDashboard.Departments': {
            //    url: "/Departments",
            //    templateUrl: 'app/views/PayRoll/Department.html',
            //    dependencies: ['controllers/PayRoll/DepartmentController', 'services/PayRoll/PayRollService']
            //},

            //'Dashboard.PayRollDashboard.BankDetails': {
            //    url: "/BankDetails",
            //    templateUrl: 'app/views/PayRoll/BankDetails.html',
            //    dependencies: ['controllers/PayRoll/BankDetailsController', 'services/PayRoll/PayRollService']
            //},

            //'Dashboard.PayRollDashboard.EmployeeDetails': {
            //    url: "/EmployeeDetails",
            //    templateUrl: 'app/views/PayRoll/EmployeeDetails.html',
            //    dependencies: ['controllers/PayRoll/EmployeeDetailsController', 'services/PayRoll/PayRollService']
            //},

         

            'Dashboard.PayRollMasters.SalaryDetails': {
                url: "/SalaryDetails",
                templateUrl: 'app/views/PayRoll/EmployeeSalaryDetails.html',
                dependencies: ['controllers/PayRoll/EmployeeSalaryDetailsController', 'services/PayRoll/PayRollService']
            },
            
            //'Dashboard.PayRollDashboard.FinancialYearSettings': {
            //    url: "/FinancialYearSettings",
            //    templateUrl: 'app/views/PayRoll/FinancialYearSettings.html',
            //    dependencies: ['controllers/PayRoll/FinancialYearSettingsController', 'services/PayRoll/PayRollService']
            //},
            
            'Dashboard.PayRollDashboard.CommonAllowances': {
                url: "/CommonAllowances",
                templateUrl: 'app/views/PayRoll/CommonAllowances.html',
                dependencies: ['controllers/PayRoll/CommonAllowancesController', 'services/PayRoll/PayRollService']
            },
        }


    }
})