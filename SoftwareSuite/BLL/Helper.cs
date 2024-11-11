using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Web;

namespace SoftwareSuite.BLL
{
    public static class Helper
    {
        public static List<T> DataTableToList<T>(this DataTable table) where T : class, new()
        {
            List<T> list = new List<T>();
            string ApplicantsList = JsonConvert.SerializeObject(table);
            var JsonConvertSettings = new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore,
                MissingMemberHandling = MissingMemberHandling.Ignore
            };
            list = JsonConvert.DeserializeObject<List<T>>(ApplicantsList, JsonConvertSettings);
            return list;
        }
        public static BindingList<T> DataTableToBindingList<T>(this DataTable table) where T : class, new()
        {
            BindingList<T> list = new BindingList<T>();
            string ApplicantsList = JsonConvert.SerializeObject(table);
            var JsonConvertSettings = new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore,
                MissingMemberHandling = MissingMemberHandling.Ignore
            };
            list = JsonConvert.DeserializeObject<BindingList<T>>(ApplicantsList, JsonConvertSettings);
            return list;
        }
        public static DataTable ListToDataTable<T>(this IEnumerable<T> collection)
        {
            DataTable dt = new DataTable();
            Type t = typeof(T);
            PropertyInfo[] pia = t.GetProperties();
            //Create the columns in the DataTable
            foreach (PropertyInfo pi in pia)
            {
                dt.Columns.Add(pi.Name, pi.PropertyType);
            }
            //Populate the table
            foreach (T item in collection)
            {
                DataRow dr = dt.NewRow();
                dr.BeginEdit();
                foreach (PropertyInfo pi in pia)
                {
                    dr[pi.Name] = pi.GetValue(item, null);
                }
                dr.EndEdit();
                dt.Rows.Add(dr);
            }
            return dt;
        }
    }
}