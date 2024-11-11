using System.Data;

namespace Core
{
    internal class Entities
    {
        internal class InvoiceInfo
        {
            public object InvoiceNumber { get; internal set; }
            public DataRow RowNumber { get; internal set; }
        }
    }
}