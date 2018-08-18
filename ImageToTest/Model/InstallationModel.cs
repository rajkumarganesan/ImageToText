using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageToTest.Model
{
    public class InstallationModel
    {
        //Using to access the exception message
        public string ErrorMessage { get; set; }

        //Using to identify process is sucesses or not
        public bool Success { get; set; }

        //Using to access the unhandle exception
        public string UnhandleException { get; set; }

        public string Information { get; set; }

        public object Payload { get; set; }

        public int IsStart { get; set; }
    
    }
}
