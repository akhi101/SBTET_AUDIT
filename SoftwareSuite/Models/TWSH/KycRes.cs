using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace SoftwareSuite.Models.TWSH
{
  
    [XmlRoot(ElementName = "Poi")]
    public class Poi
    {
        [XmlAttribute(AttributeName = "name")]
        public string Name { get; set; }
        [XmlAttribute(AttributeName = "dob")]
        public string Dob { get; set; }
        [XmlAttribute(AttributeName = "gender")]
        public string Gender { get; set; }
    }

    [XmlRoot(ElementName = "Poa")]
    public class Poa
    {
        [XmlAttribute(AttributeName = "co")]
        public string Co { get; set; }
        [XmlAttribute(AttributeName = "house")]
        public string House { get; set; }
        [XmlAttribute(AttributeName = "street")]
        public string Street { get; set; }
        [XmlAttribute(AttributeName = "lm")]
        public string Lm { get; set; }
        [XmlAttribute(AttributeName = "loc")]
        public string Loc { get; set; }
        [XmlAttribute(AttributeName = "vtc")]
        public string Vtc { get; set; }
        [XmlAttribute(AttributeName = "subdist")]
        public string Subdist { get; set; }
        [XmlAttribute(AttributeName = "dist")]
        public string Dist { get; set; }
        [XmlAttribute(AttributeName = "state")]
        public string State { get; set; }
        [XmlAttribute(AttributeName = "country")]
        public string Country { get; set; }
        [XmlAttribute(AttributeName = "pc")]
        public string Pc { get; set; }
        [XmlAttribute(AttributeName = "po")]
        public string Po { get; set; }
    }

    [XmlRoot(ElementName = "LData")]
    public class LData
    {
        [XmlAttribute(AttributeName = "lang")]
        public string Lang { get; set; }
        [XmlAttribute(AttributeName = "name")]
        public string Name { get; set; }
        [XmlAttribute(AttributeName = "co")]
        public string Co { get; set; }
        [XmlAttribute(AttributeName = "house")]
        public string House { get; set; }
        [XmlAttribute(AttributeName = "street")]
        public string Street { get; set; }
        [XmlAttribute(AttributeName = "lm")]
        public string Lm { get; set; }
        [XmlAttribute(AttributeName = "loc")]
        public string Loc { get; set; }
        [XmlAttribute(AttributeName = "vtc")]
        public string Vtc { get; set; }
        [XmlAttribute(AttributeName = "subdist")]
        public string Subdist { get; set; }
        [XmlAttribute(AttributeName = "dist")]
        public string Dist { get; set; }
        [XmlAttribute(AttributeName = "state")]
        public string State { get; set; }
        [XmlAttribute(AttributeName = "country")]
        public string Country { get; set; }
        [XmlAttribute(AttributeName = "pc")]
        public string Pc { get; set; }
        [XmlAttribute(AttributeName = "po")]
        public string Po { get; set; }
    }

    [XmlRoot(ElementName = "UidData")]
    public class UidData
    {
        [XmlElement(ElementName = "Poi")]
        public Poi Poi { get; set; }
        [XmlElement(ElementName = "Poa")]
        public Poa Poa { get; set; }
        [XmlElement(ElementName = "LData")]
        public LData LData { get; set; }
        [XmlElement(ElementName = "Pht")]
        public string Pht { get; set; }
        [XmlAttribute(AttributeName = "uid")]
        public string Uid { get; set; }
        [XmlAttribute(AttributeName = "tkn")]
        public string Tkn { get; set; }
    }

    [XmlRoot(ElementName = "KycRes")]
    public class KycRes
    {
        [XmlElement(ElementName = "Rar")]
        public string Rar { get; set; }
        [XmlElement(ElementName = "UidData")]
        public UidData UidData { get; set; }
        [XmlElement(ElementName = "Signature")]
        public string Signature { get; set; }
        [XmlAttribute(AttributeName = "ret")]
        public string Ret { get; set; }
        [XmlAttribute(AttributeName = "code")]
        public string Code { get; set; }
        [XmlAttribute(AttributeName = "txn")]
        public string Txn { get; set; }
        [XmlAttribute(AttributeName = "ts")]
        public string Ts { get; set; }
        [XmlAttribute(AttributeName = "ttl")]
        public string Ttl { get; set; }
        [XmlAttribute(AttributeName = "info")]
        public string Info { get; set; }
        [XmlAttribute(AttributeName = "uuid")]
        public string Uuid { get; set; }
    }
}
