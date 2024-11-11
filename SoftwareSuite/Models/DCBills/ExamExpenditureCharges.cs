using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.DCBills
{
    public class ExamSessionalExpenditureCharges
    {
      public int Invigilatorcharges { get; set; }
        public int ChiefSuperintendent { get; set; }
        public int JointChiefSuperintendent { get; set; }
        public int PoliceBandobasth { get; set; }
        public int NumberOfStudentsPerInvigilator { get; set; }
        public int InternalFlyingSquadCharges { get; set; }
        public int ExamMonthYearId { get; set; }
        public int SeatingChargesPerStudent { get; set; }
        public int NumberOfStudentsPerAttenderCumWatermanCumSweeper { get; set; }
        public int ExaminationClerk_TypingCharges { get; set; }
        public int DeliveryChargesPerDay { get; set; }
        public double PrintingChargePerQuestionPaper { get; set; }
        public int PracticalExternalPaperSettingCharges { get; set; }
        public int PracticalInternalPaperSettingCharges { get; set; }
        public int PracticalLocalConveyanceChargesPerDay { get; set; }
        public int PracticalTechnicalAssistantCharges { get; set; }       
        public int NoOfStudentsPerPracticalSession { get; set; }
        public int PracticalPaperValuationChargesPerPaper { get; set; }
        public int EDEPChargesPerSession { get; set; }
        public int NoOfPoliceForBandobasthPerSession { get; set; }
        public int ControlRoomChargePerPerson { get; set; }
        public int NoOfStudentsPerExaminer { get; set; }
        public int PracticalAttenderChargesPerSubject { get; set; }
        public int PracticalWatermanCumSweeperChargesPerSubject { get; set; }
        public int TheoryAttenderCumWatermanCumSweeperChargesPerSubject { get; set; }
        public int PracticalVivaChargesforSixthSem { get; set; }
        
    }
    public class ExamEventExpenditureCharges
    {
        public int AoNotification { get; set; }
        public int Superintendent { get; set; }     
        public int SeatclerkCharges { get; set; }
    }
    public class ExamExpenditureCharges
    {
        public List<ExamSessionalExpenditureCharges> ExamSessionalExpenditureCharges { get; set; }
        public List<ExamEventExpenditureCharges> ExamEventExpenditureCharges { get; set; }
        
    }
}
