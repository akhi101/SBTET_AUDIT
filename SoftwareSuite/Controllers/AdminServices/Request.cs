using System;
using System.Data;
using System.Net;
using System.Net.Http;

namespace SoftwareSuite.Controllers.CcicAdminServices
{
    internal class Request
    {
        public static object Content { get; internal set; }

        internal static HttpResponseMessage CreateResponse(HttpStatusCode oK, DataTable dt)
        {
            throw new NotImplementedException();
        }

        internal static HttpResponseMessage CreateResponse(HttpStatusCode oK, string message)
        {
            throw new NotImplementedException();
        }

        internal static HttpResponseMessage CreateResponse(HttpStatusCode gone, Exception ex)
        {
            throw new NotImplementedException();
        }
    }
}