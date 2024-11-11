using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Web;

namespace SoftwareSuite.Models.Database
{
    public class DataTableHelper
    {
        public static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    var o = dr[column.ColumnName] == System.DBNull.Value ? null : dr[column.ColumnName];
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, o, null);
                    else
                        continue;
                }
            }
            return obj;
        }

    }
}
