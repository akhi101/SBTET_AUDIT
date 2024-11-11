using System.Net.Http.Headers;

namespace result
{
    internal class Content
    {
        internal class Headers
        {
            public static ContentDispositionHeaderValue ContentDisposition { get; internal set; }
            public static MediaTypeHeaderValue ContentType { get; internal set; }
        }
    }
}