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

    //Image to text
    imagetotest: boolean = true;
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string, private router: Router) {
        debugger/*Get Base URL*/
        this.baseUrl = baseUrl;
        //this.baseUrl = 'http://localhost:50459/home';
        this.imagetotest = true;
    }

    ConvertImagetoTest() {
       
       let imgurl = "http://1.bp.blogspot.com/-j2sZWroQJ9I/UdbTs41hJMI/AAAAAAAAAWY/AkNUM_tsriI/s1600/";
       // let imgurl = this.url;
      
       // let UserPhoto = this.url.replace(/data:image\/jpeg;base64,/g, '');
        this.http.get(this.baseUrl + 'api/SampleData/ConvertImagetoTest?ImgURL=' + imgurl + "&ImageuniqueId=" + new Date().getTime())
            .map(response => response.json())
            .subscribe(data => {
                console.log(data);
                if (data.information != null)
                    this.infomsg = data.information;
            });
    }

    public bootBoxMessage(Message: string = "") {
        bootbox.dialog({
            title: 'DA Info',
            message: '<span style="color:red">' + Message + '</span>',
            buttons: {
                ok: {
                    label: "OK",
                    className: 'btn-info',
                }
            }
        }).find('.modal-content').css({ 'margin-top': '38%', 'margin-left': '85px', 'margin-right': '- 48px', 'width': '418px' });
    }

 

    readUrl(event: any) {
        debugger
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
