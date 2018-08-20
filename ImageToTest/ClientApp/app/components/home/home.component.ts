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

    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string, private router: Router, private sanitizer: DomSanitizer) {
        /*Get Base URL*/
        this.baseUrl = baseUrl;
        this.imagetotest = true;
        this.ImageList = [
            { taskname: 'Image1', id: '1'},
            { taskname: 'Image2', id: '2'},
            { taskname: 'Image3', id: '3'},
            { taskname: 'Image4', id: '4'},
            { taskname: 'Image5', id: '5'},
            { taskname: 'Image6', id: '6'},
            { taskname: 'Image7', id: '7'},
            { taskname: 'Image8', id: '8'},
            { taskname: 'Image9', id: '9'},
            { taskname: 'Image10', id: '10'},
            { taskname: 'Image11', id: '11'},
            { taskname: 'Image12', id: '12'}
        ];
        this.PrintedImageList = [
            { taskname: 'PrintedImage1', id: '1' }
        ];
    }

    selectedPrintedImage(id: any) {
        if (id == "1") {
            this.imgurl = "printer.jpg";
            this.printedImgUrlHtml = require('../../../Images/Printer.jpg');
        }
    }
    selectedImage(id: any) {
        debugger
        if (id == "1") {
            this.imgurl = "1.jpg";
            this.imgurlHtml = require('../../../Images/1.jpg');
        } else if (id == "2") {

            this.imgurl = "text10.jpg"
            this.imgurlHtml = require('../../../Images/text10.jpg');
        }
        else if (id == "3") {
            this.imgurl = "text11.jpg"
            this.imgurlHtml = require('../../../Images/text11.jpg');
        }
        else if (id == "4") {
            this.imgurl = "text12.jpg"
            this.imgurlHtml = require('../../../Images/text12.jpg');
        }
        else if (id == "5") {
            this.imgurl = "text13.jpg"
            this.imgurlHtml = require('../../../Images/text13.jpg');
        }
        else if (id == "6") {
            this.imgurl = "text14.jpg"
            this.imgurlHtml = require('../../../Images/text14.jpg');
        }
        else if (id == "7") {
            this.imgurl = "text15.jpg"
            this.imgurlHtml = require('../../../Images/text15.jpg');
        }
        else if (id == "8") {
            this.imgurl = "text5.jpg"
            this.imgurlHtml = require('../../../Images/text5.jpg');
        }
        else if (id == "9") {
            this.imgurl = "text6.jpg"
            this.imgurlHtml = require('../../../Images/text6.jpg');
        }
        else if (id == "10") {
            this.imgurl = "text7.jpg"
            this.imgurlHtml = require('../../../Images/text7.jpg');
        }
        else if (id == "11") {
            this.imgurl = "text8.jpg"
            this.imgurlHtml = require('../../../Images/text8.jpg');
        }
        else if (id == "12") {
            this.imgurl = "text9.jpg"
            this.imgurlHtml = require('../../../Images/text9.jpg');
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
