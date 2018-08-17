using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using ImageToTest.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace ImageToTest.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        #region Global Variables        
        InstallationModel _installationModel;
        IConfiguration _iconfiguration;
        utils utils;
        public static string _istallUniqueId = "";
        public static string _pythonResult = string.Empty;
        public static string _pythonErrorResult = string.Empty;
        #endregion Global Variables     
        #region Constructor        
        public SampleDataController(IConfiguration iconfiguration)
        {
            utils = new utils(iconfiguration);
            _iconfiguration = iconfiguration;
        }
        #endregion
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }

        #region AI
        [HttpGet("[action]")]
        public JsonResult ConvertImagetoTest(string ImgURL, string ImageuniqueId)
        {
            _installationModel = new InstallationModel();
            try
            {
                if (_istallUniqueId != ImageuniqueId)
                {
                    _istallUniqueId = ImageuniqueId;
                    System.IO.File.WriteAllText(utils.getAppSettingValue("Script:Imagelog"), "");

                    ExecutePythonScript(utils.getAppSettingValue("Script:PYImageProcess"));
                    string ImagetoTest = ReadText(utils.getAppSettingValue("Script:Imagelog"));
                    _installationModel.Success = true;
                    _installationModel.Information = ImagetoTest;
                }
            }
            catch (Exception ex)
            {
                _installationModel.UnhandleException = ex.Message.ToString();
            }
            return Json(_installationModel);

        }

        #endregion AI
        private string ReadText(string Path)
        {
            StreamReader file;
            string outputValue = string.Empty;
            if (System.IO.File.Exists(Path))
            {
                file = System.IO.File.OpenText(Path);
                outputValue = file.ReadToEnd();
            }
            return outputValue;
        }

        public void ExecutePythonScript(string cmd, string Arguments = null, string Arguments1 = null)
        {
            try
            {
                string FileName = utils.getAppSettingValue("Script:PythonParentFile");
                ProcessStartInfo cmdStartInfo = new ProcessStartInfo();
                cmdStartInfo = new ProcessStartInfo(FileName)
                {
                    RedirectStandardOutput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                    RedirectStandardError = true,
                    RedirectStandardInput = true
                };
                if (Arguments != null && Arguments1 != null)
                {
                    cmdStartInfo.Arguments = string.Format("{0} {1} {2}", cmd, Arguments, Arguments1);
                }
                else if (Arguments != null)
                {
                    cmdStartInfo.Arguments = string.Format("{0} {1}", cmd, Arguments);
                }
                else
                {
                    cmdStartInfo.Arguments = cmd;
                }
                Process p = new Process();
                p.StartInfo = cmdStartInfo;
                p.ErrorDataReceived += cmd_Error;
                p.OutputDataReceived += cmd_DataReceived;
                p.EnableRaisingEvents = true;

                p.Start();

                p.BeginOutputReadLine();
                p.BeginErrorReadLine();

                p.WaitForExit();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public void cmd_DataReceived(object sender, DataReceivedEventArgs e)
        {
            _pythonResult = _pythonResult + e.Data + Environment.NewLine;

        }

        public void cmd_Error(object sender, DataReceivedEventArgs e)
        {
            _pythonErrorResult = _pythonErrorResult + e.Data + Environment.NewLine;
        }

    }
}
