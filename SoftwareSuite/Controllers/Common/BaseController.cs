using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using SoftwareSuite.Models.Security;

namespace SoftwareSuite.Controllers
{
    public class BaseController : Controller
    {
        protected AuthToken token = null;

        protected override void OnActionExecuting(ActionExecutingContext ctx)
        {
            try
            {
                var tokenStr = ctx.HttpContext.Request.Headers.Get("token");
                var t = tokenStr.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                tokenStr = t[0];
                token = JsonConvert.DeserializeObject<AuthToken>(new HbCrypt(t[1]).Decrypt(tokenStr));
                if (token.ExpiryDate < DateTime.Now)
                {
                    ctx.Result = new HttpStatusCodeResult(HttpStatusCode.Unauthorized, "Not Authorised");
                }
            }
            catch (Exception ex)
            {
                ctx.Result = new HttpStatusCodeResult(HttpStatusCode.BadRequest, "Invalid Authentication Token");
            }
            base.OnActionExecuting(ctx);
        }
    }
}
