import { Component, Inject } from '@angular/core';
import "rxjs/add/operator/map";
import { Http, Headers, RequestOptions  } from "@angular/http";
import { Router } from '@angular/router';
import { debounce } from 'rxjs/operator/debounce';
import { Observable } from "rxjs";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare var bootbox: any;
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
@Component({
    selector: 'ImageToText',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {
    private baseUrl: string;
    public userInfo: any;
    url: any;
    pdfUrl: any;
    infomsg: any;
    imageName: any;
    localUrl: any;
    PrintedText: any;
    PdftoText: any;
    //Image to text
    imagetotest: boolean = true;
    ImageList = new Array();
    PrintedImageList = new Array();
    imgurl: any;
    imgurlHtml: any;
    printedImgUrlHtml: any;
    StatusCheck: boolean = false;
    Loading: boolean = false;
    //printedTextName: any;
    //printedTextDate: any;
    //printedTextWeight: any;
    //printedTextMno: any;
    //printedTextBp: any;
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string, private router: Router, private sanitizer: DomSanitizer) {
        /*Get Base URL*/
        this.baseUrl = baseUrl;
        this.imagetotest = true;
        this.ImageList = [
            { taskname: 'Android', id: '1' },
            { taskname: 'Bigdata', id: '2' },
            { taskname: 'Breakingbad', id: '3' },
            { taskname: 'Gameofthrones', id: '4' },
            { taskname: 'Image_Processing', id: '5' },
            { taskname: 'Mobilephones', id: '6' },
            { taskname: 'Petanimal', id: '7' },
            { taskname: 'Social_Network', id: '8' },
            { taskname: 'Text_Analytics', id: '9' },
            { taskname: 'Virtual_Reality', id: '10' },
            { taskname: 'YouTube', id: '11' },
            { taskname: 'Bitcoin', id: '12' },

        ];
        this.PrintedImageList = [
            { taskname: 'PrintedImage1', id: '1' },
            { taskname: 'PrintedImage2', id: '2' },
            { taskname: 'PrintedImage3', id: '3' },
            { taskname: 'PrintedImage4', id: '4' },
            { taskname: 'PrintedImage5', id: '5' },
            { taskname: 'PrintedImage6', id: '6' },
            { taskname: 'PrintedImage7', id: '7' },
            { taskname: 'PrintedImage8', id: '8' },
            { taskname: 'PrintedImage9', id: '9' }
        ];
    }

    selectedPrintedImage(id: any) {
        //if (id == "1") {
        //    this.imgurl = "printer.jpg";
        //    this.printedImgUrlHtml = require('../../../Images/Printer.jpg');
        //}
        debugger
        switch (id) {
            case "1":
                this.imgurl = "PrintedImage1.jpg";
                this.printedImgUrlHtml = require('../../../Images/PrintedImage1.jpg');
                break;
            case "2":
                this.imgurl = "PrintedImage2.jpg";
                this.printedImgUrlHtml = require('../../../Images/PrintedImage2.jpg');
                break;
            case "3":
                this.imgurl = "PrintedImage3.jpg";
                this.printedImgUrlHtml = require('../../../Images/PrintedImage3.jpg');
                break;
            case "4":
                this.imgurl = "PrintedImage4.jpg";
                this.printedImgUrlHtml = require('../../../Images/PrintedImage4.jpg');
                break;
            case "5":
                this.imgurl = "PrintedImage5.jpg";
                this.printedImgUrlHtml = require('../../../Images/PrintedImage5.jpg');
                break;
            case "6":
                this.imgurl = "PrintedImage6.jpg";
                this.printedImgUrlHtml = require('../../../Images/PrintedImage6.jpg');
                break;
            case "7":
                this.imgurl = "PrintedImage7.jpg";
                this.printedImgUrlHtml = require('../../../Images/PrintedImage7.jpg');
                break;
            case "8":
                this.imgurl = "printer.jpg";
                this.printedImgUrlHtml = require('../../../Images/Printer.jpg');
                break;
            case "9":
                this.imgurl = "PrintedImage8.jpg";
                this.printedImgUrlHtml = require('../../../Images/PrintedImage8.jpg');
                break;
            default:
                alert("Sorry, that image is not in the system yet!");
        }
    }
    selectedImage(id: any) {
        debugger
        if (id == "1") {
            this.imgurl = "android.jpg";
            this.imgurlHtml = require('../../../Images/android.jpg');
        } else if (id == "2") {

            this.imgurl = "bigdata.jpg"
            this.imgurlHtml = require('../../../Images/bigdata.jpg');
        }
        else if (id == "3") {
            this.imgurl = "breakingbad.jpg"
            this.imgurlHtml = require('../../../Images/breakingbad.jpg');
        }
        else if (id == "4") {
            this.imgurl = "gameofthrones.jpg"
            this.imgurlHtml = require('../../../Images/gameofthrones.jpg');
        }
        else if (id == "5") {
            this.imgurl = "imageprocessing.jpg"
            this.imgurlHtml = require('../../../Images/imageprocessing.jpg');
        }
        else if (id == "6") {
            this.imgurl = "mobilephones.jpg"
            this.imgurlHtml = require('../../../Images/mobilephones.jpg');
        }
        else if (id == "7") {
            this.imgurl = "petanimal.jpg"
            this.imgurlHtml = require('../../../Images/petanimal.jpg');
        }
        else if (id == "8") {
            this.imgurl = "socialnetwork.jpg"
            this.imgurlHtml = require('../../../Images/socialnetwork.jpg');
        }
        else if (id == "9") {
            this.imgurl = "textanalytics.jpg"
            this.imgurlHtml = require('../../../Images/textanalytics.jpg');
        }
        else if (id == "10") {
            this.imgurl = "virtualreality.jpg"
            this.imgurlHtml = require('../../../Images/virtualreality.jpg');
        }
        else if (id == "11") {
            this.imgurl = "youtube.jpg"
            this.imgurlHtml = require('../../../Images/youtube.jpg');
        }
        else if (id == "12") {
            this.imgurl = "bitcoin.jpg"
            this.imgurlHtml = require('../../../Images/bitcoin.jpg');
        }
    }
    //ConvertImagetoText() {
    //    this.infomsg = "";
    //    // let imgurl = "http://1.bp.blogspot.com/-j2sZWroQJ9I/UdbTs41hJMI/AAAAAAAAAWY/AkNUM_tsriI/s1600/";
    //    let imgurl = this.url.replace("data:image/jpeg;base64,","");
       
    //    let apiName ='api/SampleData/ConvertImagetoTest';
    //    let strifiedData = imgurl;//  "test";
    //    //string str = "\"How to add doublequotes\"";
    //    let headers = new Headers();
    //    headers.append("Content-Type", "application/json")
    //    headers.append("Accept", "*/*")
    //    let options = new RequestOptions({ headers: headers });
    //    this.http.post(this.baseUrl + apiName, JSON.stringify(strifiedData), options)     
    //        .map(response => response.json())
    //        .subscribe(data => {
    //            console.log(data);
    //            if (data.information != null)
    //                this.infomsg = data.information;
    //        });
    //}

    //ConvertImagetoText() {
    //    debugger
    //    this.infomsg = "";
    //    //  let imgurl = "http://1.bp.blogspot.com/-j2sZWroQJ9I/UdbTs41hJMI/AAAAAAAAAWY/AkNUM_tsriI/s1600/";
    //    this.http.get(this.baseUrl + 'api/SampleData/ConvertImagetoTest?ImgURL=' + this.imgurl + "&ImageuniqueId=" + new Date().getTime())
    //        .map(response => response.json())
    //        .subscribe(PrintedtoText => {
    //            console.log(PrintedtoText);
    //            if (PrintedtoText.information != null)
    //                this.infomsg = PrintedtoText.information;
    //        });
    //}

    ConvertImagetoText() {
        this.StatusCheck = false;
        this.infomsg = "";
        this.http.get(this.baseUrl + 'api/SampleData/ConvertImagetoTest?ImgURL=' + this.imgurl + "&ImageuniqueId=" + new Date().getTime())
            .map(response => response.json())
            .subscribe(PrintedtoText => {
                //console.log(PrintedtoText);
                //if (PrintedtoText.information != null)
                //    this.infomsg = PrintedtoText.information;
            });
        this.Loading = true;
        var temp = this;
        setTimeout(function () { temp.StatusCheckcall(); }, 5000);
    }

    public StatusCheckcall() {

        Observable.interval(3000).takeWhile(() => !this.StatusCheck).subscribe(x => {
            this.http.get(this.baseUrl + 'api/SampleData/StatusCheck')
                .map(response => response.json())
                .subscribe(data => {
                    console.log(data);
                    if (data.success == true && data.information != null) {
                        this.Loading = false;
                        this.infomsg = data.information;                     
                        this.StatusCheck = true;
                    }
                });
        });
    }
    ConvertPrintedtoText() {
        this.StatusCheck = false;
        this.PrintedText = "";
        this.http.get(this.baseUrl + 'api/SampleData/PrintedtoText?ImgURL=' + this.imgurl + "&ImageuniqueId=" + new Date().getTime())
            .map(response => response.json())
            .subscribe(PrintedtoText => {
                //console.log(PrintedtoText);
                //if (PrintedtoText.information != null)
                //    this.PrintedText = PrintedtoText.information;
            });
        this.Loading = true;
        var temp = this;
        setTimeout(function () { temp.PrintedStatusCheck(); }, 5000);
    }
    public PrintedStatusCheck() {
        Observable.interval(3000).takeWhile(() => !this.StatusCheck).subscribe(x => {
            this.http.get(this.baseUrl + 'api/SampleData/PrintedStatusCheckCall')
                .map(response => response.json())
                .subscribe(data => {
                    console.log(data);
                    if (data.success == true && data.information != null) {
                        this.Loading = false;
                        this.PrintedText = data.information;
                        this.StatusCheck = true;
                        //this.printedTextName = this.PrintedText.match("NAME : (.*) DATE :");
                        //this.printedTextName = this.printedTextName[1];
                        //this.printedTextDate = this.PrintedText.match("DATE : (.*) WEIGHT :");
                        //this.printedTextDate = this.printedTextDate[1];
                        //this.printedTextWeight = this.PrintedText.match("WEIGHT :(.*) MNO.:");
                        //this.printedTextWeight = this.printedTextWeight[1];
                        //this.printedTextMno = this.PrintedText.match("MNO.: (.*) BP:");
                        //this.printedTextMno = this.printedTextMno[1];
                        //this.printedTextBp = this.PrintedText.match("BP: (.*) BMI:");
                        //this.printedTextBp = this.printedTextBp[1];
                    }
                });
        });
    }
    ConvertpdftoText() {
        this.StatusCheck = false;
        this.PdftoText = "";
        this.http.get(this.baseUrl + 'api/SampleData/PrintedPDFtoText?ImgURL=' + this.imgurl + "&ImageuniqueId=" + new Date().getTime())
            .map(response => response.json())
            .subscribe(PrintedPdfText => {
                //console.log(PrintedPdfText);
                //if (PrintedPdfText.information != null)
                //    this.PdftoText = PrintedPdfText.information;
            });
        this.Loading = true;
        var temp = this;
        setTimeout(function () { temp.PrintedPdfStatusCheck(); }, 5000);
    }

    public PrintedPdfStatusCheck() {
        Observable.interval(3000).takeWhile(() => !this.StatusCheck).subscribe(x => {
            this.http.get(this.baseUrl + 'api/SampleData/PrintedPdfStatusCheckCall')
                .map(response => response.json())
                .subscribe(data => {
                    console.log(data);
                    if (data.success == true && data.information != null) {
                        this.Loading = false;
                        this.PdftoText = data.information;
                        this.StatusCheck = true;
                    }
                });
        });
    }


    readUrl(event: any) {
        if (event.target.files && event.target.files[0]) {
            let files = event.target.files[0];
            this.imageName = files.name;
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.localUrl = event.target.result;
                this.url = reader.result;
                this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }
}
