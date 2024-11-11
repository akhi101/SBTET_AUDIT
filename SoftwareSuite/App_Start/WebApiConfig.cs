using SoftwareSuite.Controllers.Academic;
using System;
using System.Diagnostics;
using System.Globalization;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Filters;

namespace SoftwareSuite
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "API Default",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.Filters.Add(new CacheWebApiAttribute());
        }
    }

    public class CacheWebApiAttribute : ActionFilterAttribute
    {
        private int Duration = 3;
        public override void OnActionExecuted(HttpActionExecutedContext filterContext)
        {
            try
            {
                filterContext.Response.Headers.CacheControl = new CacheControlHeaderValue()
                {
                    MaxAge = TimeSpan.FromSeconds(Duration),
                    MustRevalidate = true,
                    Private = true
                };

                //MyScheduler.IntervalInDays(10, 00, 1, () =>
                //{
                //    DateTime dateAndTime = DateTime.Now;
                //    DateTime date = dateAndTime.Date;
                //    AcademicController academicController = new AcademicController();
                //    DayOfWeek day = CultureInfo.InvariantCulture.Calendar.GetDayOfWeek(dateAndTime);

                //    if (day == DayOfWeek.Sunday)
                //    {
                //        academicController.GetAttendance("75",0);
                //    }
                //});


                //  MyScheduler.IntervalInHours(00, 10, 1, () => Attendence());
            }
            catch (Exception ex)
            {

            }

        }


        //public static void Attendence()
        //{

        //    AcademicController academicController = new AcademicController();

        //    int hours = academicController.GetHoursForAttendence();
        //    int min = academicController.GetMinuteForAttendence();
        //    if (hours >= 0 && min >= 0)
        //    {
        //        hours = hours.ToString().Length >= 2 ? hours : Convert.ToInt32(0 + hours.ToString());
        //        min = min.ToString().Length >= 2 ? min : Convert.ToInt32(0 + min.ToString());

        //        var dateAndTime = DateTime.Now;
        //        DateTime date = dateAndTime.Date;

        //        int pHour = date.Hour;
        //        int pMinute = date.Minute;

        //        if (pHour+1 == hours)
        //        {
        //            MyScheduler.IntervalInDays(hours, min, 1,
        //            () =>
        //            {
        //                Debug.WriteLine("Calling");
        //                academicController.PresemptiveAttendence();
        //            });
        //        }
        //    }
        //    else
        //    {
        //    }

        //}
    }
}
