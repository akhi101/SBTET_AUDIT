using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models
{
    public class SystemResponse
    {
        public bool IsSuccess { get; set; }

        public object Data { get; set; }

        public string Message { get; set; }
    }
}