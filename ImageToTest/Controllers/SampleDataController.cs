using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
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
        public static string _handwrittenUniqueId = "";
        public static string _printedUniqueId = "";
        public static string _pdfUniqueId = "";
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
                if (_handwrittenUniqueId != ImageuniqueId)
                {
                    _handwrittenUniqueId = ImageuniqueId;
                    System.IO.File.WriteAllText(utils.getAppSettingValue("Script:Imagelog"), "");

                    ExecutePythonScript(utils.getAppSettingValue("Script:PYImageProcess"), ImgURL);
                    //string ImagetoTest = ReadText(utils.getAppSettingValue("Script:Imagelog"));
                    //System.Diagnostics.Debug.WriteLine(ImagetoTest);
                    //_installationModel.Success = true;
                    //_installationModel.Information = ImagetoTest;
                }
            }
            catch (Exception ex)
            {
                _installationModel.UnhandleException = ex.Message.ToString();
            }
            return Json(_installationModel);

        }

        [HttpGet("[action]")]
        public JsonResult StatusCheck()
        {
            _installationModel = new InstallationModel();
            try
            {
                string ImagetoTest = ReadText(utils.getAppSettingValue("Script:Imagelog"));
                if (!string.IsNullOrEmpty(ImagetoTest))
                {
                    _installationModel.Success = true;
                    _installationModel.Information = GetWordWrappedParagraph(ImagetoTest);
                    //GetWordWrappedParagraph(ImagetoTest);
                }

            }
            catch (Exception ex)
            {
                _installationModel.Success = false;
                _installationModel.Information = ex.Message.ToString();
            }
            return Json(_installationModel);
        }
        //[HttpPost("[action]")]
        //  public JsonResult ConvertImagetoTest([FromBody] string strifiedData)
        //{
        //    _installationModel = new InstallationModel();
        //    try
        //    {
        //         //string imgname = "\"" + ImgURL + "\"";
        //        //string str = "\"+strifiedData\"+";
        //        if (_handwrittenUniqueId != ImageuniqueId)
        //        {
        //            _handwrittenUniqueId = ImageuniqueId;
        //            System.IO.File.WriteAllText(utils.getAppSettingValue("Script:Imagelog"), "");

        //        ExecutePythonScript(utils.getAppSettingValue("Script:PYImageProcess"), ImgURL);
        //        string ImagetoTest = ReadText(utils.getAppSettingValue("Script:Imagelog"));
        //        System.Diagnostics.Debug.WriteLine(ImagetoTest);
        //        _installationModel.Success = true;
        //        _installationModel.Information = ImagetoTest;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        _installationModel.UnhandleException = ex.Message.ToString();
        //    }
        //    return Json(_installationModel);

        //}

        #endregion AI

        #region PrintedtoText
        [HttpGet("[action]")]
        public JsonResult PrintedtoText(string ImgURL, string ImageuniqueId)
        {
            _installationModel = new InstallationModel();
            try
            {
                if (_printedUniqueId != ImageuniqueId)
                {
                    _printedUniqueId = ImageuniqueId;
                    System.IO.File.WriteAllText(utils.getAppSettingValue("Script:PrintedImagelog"), "");

                    ExecutePythonScript(utils.getAppSettingValue("Script:PYPrintedImageProcess"), ImgURL);
                }
            }
            catch (Exception ex)
            {
                _installationModel.UnhandleException = ex.Message.ToString();
            }
            return Json(_installationModel);

        }


        [HttpGet("[action]")]
        public JsonResult PrintedStatusCheckCall()
        {
            _installationModel = new InstallationModel();
            try
            {
                string PrintedtoText = ReadText(utils.getAppSettingValue("Script:PrintedImagelog"));

                if (!string.IsNullOrEmpty(PrintedtoText))
                {
                    _installationModel.Success = true;
                    _installationModel.Information = PrintedtoText;
                }
            }
            catch (Exception ex)
            {
                _installationModel.Success = false;
                _installationModel.Information = ex.Message.ToString();
            }
            return Json(_installationModel);
        }

        #endregion PrintedtoText

        #region PDF toText
        [HttpGet("[action]")]
        public JsonResult PrintedPDFtoText(string ImgURL, string ImageuniqueId)
        {
            _installationModel = new InstallationModel();
            try
            {
                if (_pdfUniqueId != ImageuniqueId)
                {
                    _pdfUniqueId = ImageuniqueId;
                    System.IO.File.WriteAllText(utils.getAppSettingValue("Script:PrintedPdflog"), "");

                    ExecutePythonScript(utils.getAppSettingValue("Script:PYPrintedPdfProcess"));
                  
                }
            }
            catch (Exception ex)
            {
                _installationModel.UnhandleException = ex.Message.ToString();
            }
            return Json(_installationModel);

        }

        [HttpGet("[action]")]
        public JsonResult PrintedPdfStatusCheckCall()
        {
            _installationModel = new InstallationModel();
            try
            {
                string PdftoText = ReadText(utils.getAppSettingValue("Script:PrintedPdflog"));
                if (!string.IsNullOrEmpty(PdftoText))
                {
                    _installationModel.Success = true;
                    _installationModel.Information = PdftoText;
                }
            }
            catch (Exception ex)
            {
                _installationModel.Success = false;
                _installationModel.Information = ex.Message.ToString();
            }
            return Json(_installationModel);
        }


        #endregion PDF toText


        public static string GetWordWrappedParagraph(string paragraph)
        {
            var width = 70;
            if (string.IsNullOrWhiteSpace(paragraph))
            {
                return string.Empty;
            }
            var approxLineCount = paragraph.Length / width;
            //var approxLineCount = paragraph.Length / 400;
            var lines = new StringBuilder(paragraph.Length + (approxLineCount * 4));

            for (var i = 0; i < paragraph.Length;)
            {
                var grabLimit = Math.Min(width, paragraph.Length - i);
                var line = paragraph.Substring(i, grabLimit);
                var isLastChunk = grabLimit + i == paragraph.Length;

                if (isLastChunk)
                {
                    i = i + grabLimit;
                    lines.Append(line);
                }
                else
                {
                    var lastSpace = line.LastIndexOf(" ", StringComparison.Ordinal);
                    lines.AppendLine(line.Substring(0, lastSpace));
                    //Trailing spaces needn't be displayed as the first character on the new line
                    i = i + lastSpace + 1;
                }
            }
            return lines.ToString();
        }

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
