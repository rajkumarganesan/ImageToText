import { Component, Inject } from '@angular/core';
import "rxjs/add/operator/map";
import { Http, Headers, RequestOptions  } from "@angular/http";
import { Router } from '@angular/router';
import { debounce } from 'rxjs/operator/debounce';
import { Observable } from "rxjs";
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
    infomsg: any;
    imageName: any;
    localUrl: any;
    PrintedText: any;
    PdftoText: any;
    //Image to text
    imagetotest: boolean = true;

    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string, private router: Router) {
        /*Get Base URL*/
        this.baseUrl = baseUrl;
        this.imagetotest = true;
    }
  
    ConvertImagetoText() {
        this.infomsg = "";
        // let imgurl = "http://1.bp.blogspot.com/-j2sZWroQJ9I/UdbTs41hJMI/AAAAAAAAAWY/AkNUM_tsriI/s1600/";
        let imgurl = this.url.replace("data:image/jpeg;base64,","");
       
        let apiName ='api/SampleData/ConvertImagetoTest';
        let strifiedData = imgurl;//  "test";
        //string str = "\"How to add doublequotes\"";
        let headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Accept", "*/*")
        let options = new RequestOptions({ headers: headers });
        this.http.post(this.baseUrl + apiName, JSON.stringify(strifiedData), options)     
            .map(response => response.json())
            .subscribe(data => {
                console.log(data);
                if (data.information != null)
                    this.infomsg = data.information;
            });
    }


    ConvertPrintedtoText() {
        debugger
        this.PrintedText = "";
      //  let imgurl = "http://1.bp.blogspot.com/-j2sZWroQJ9I/UdbTs41hJMI/AAAAAAAAAWY/AkNUM_tsriI/s1600/";
        let imgurl = this.url;

        this.http.get(this.baseUrl + 'api/SampleData/PrintedtoText?ImgURL=' + imgurl)
            .map(response => response.json())
            .subscribe(PrintedtoText => {
                console.log(PrintedtoText);
                if (PrintedtoText.information != null)
                    this.PrintedText = PrintedtoText.information;
            });
    }
    ConvertpdftoText() {
        this.PdftoText = "";
        let imgurl = "http://1.bp.blogspot.com/-j2sZWroQJ9I/UdbTs41hJMI/AAAAAAAAAWY/AkNUM_tsriI/s1600/";
        this.http.get(this.baseUrl + 'api/SampleData/PrintedPDFtoText?ImgURL=' + imgurl + "&ImageuniqueId=" + new Date().getTime())
            .map(response => response.json())
            .subscribe(PrintedPdfText => {
                console.log(PrintedPdfText);
                if (PrintedPdfText.information != null)
                    this.PdftoText = PrintedPdfText.information;
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
               
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }
}
