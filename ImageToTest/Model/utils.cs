using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace ImageToTest.Model
{
    public class utils
    {
        IConfiguration _iconfiguration;

        public utils(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }

        public string getAppSettingValue(string key)
        {
            bool prodMode = _iconfiguration.GetValue<bool>("prodMode");

            if (prodMode == false)
            {
                string testValue = _iconfiguration.GetValue<string>("Test" + key);
                if (testValue != null && testValue != "")
                    return testValue;
            }
            return _iconfiguration.GetValue<string>(key);
        }

        public static string HashData(string s)
        {
            try
            {
                //Convert the string to a byte array
                byte[] bytDataToHash = (new System.Text.UnicodeEncoding()).GetBytes(s);
                //Compute the MD5 hash algorithm

                byte[] bytHashValue = new MD5CryptoServiceProvider().ComputeHash(bytDataToHash);
                return BitConverter.ToString(bytHashValue);
            }
            catch (Exception ex)
            {
                //MessageBox.Show(string.Concat("CreateNewPIEnotes()-HashData()", "- ", ex.Message), "AlphaMCS", MessageBoxButton.OK);
                throw ex;
            }
        }
    }
}
