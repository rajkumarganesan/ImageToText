import { Component, Inject } from '@angular/core';
import "rxjs/add/operator/map";
import { Http } from "@angular/http";
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
    //Image to text
    imagetotest: boolean = true;
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string, private router: Router) {
        /*Get Base URL*/
        this.baseUrl = baseUrl;
        this.imagetotest = true;
    }

    ConvertImagetoText() {
       
       let imgurl = "http://1.bp.blogspot.com/-j2sZWroQJ9I/UdbTs41hJMI/AAAAAAAAAWY/AkNUM_tsriI/s1600/";
        this.http.get(this.baseUrl + 'api/SampleData/ConvertImagetoTest?ImgURL=' + imgurl + "&ImageuniqueId=" + new Date().getTime())
            .map(response => response.json())
            .subscribe(data => {
                console.log(data);
                if (data.information != null)
                    this.infomsg = data.information;
            });
    }

    ConvertPrintedtoText() {
        let imgurl = "http://1.bp.blogspot.com/-j2sZWroQJ9I/UdbTs41hJMI/AAAAAAAAAWY/AkNUM_tsriI/s1600/";
        this.http.get(this.baseUrl + 'api/SampleData/PrintedtoText?ImgURL=' + imgurl + "&ImageuniqueId=" + new Date().getTime())
            .map(response => response.json())
            .subscribe(data => {
                console.log(data);
                if (data.information != null)
                    this.PrintedText = data.information;
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
