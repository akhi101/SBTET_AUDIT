using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace SoftwareSuite.Models.TWSH
{
    public class KycReq
    {        
        [JsonProperty("ret")]
        public string Ret { get; set; }

        [JsonProperty("code")]
        public string Code { get; set; }

        [JsonProperty("txn")]
        public string Txn { get; set; }

        [JsonProperty("ts")]
        public string Ts { get; set; }

        [JsonProperty("err")]
        public string Err { get; set; }

        [JsonProperty("errdesc")]
        public string Errdesc { get; set; }

        [JsonProperty("rrn")]
        public string Rrn { get; set; }

        [JsonProperty("ref")]
        public string Ref { get; set; }

        [JsonProperty("responseXML")]
        public string ResponseXml { get; set; }   
    }
}
