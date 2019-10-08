import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formlogin= new FormGroup({
    username: new FormControl(null, [
        Validators.required
    ]),
    password: new FormControl(null, [
      Validators.required
  ]),
  annee: new FormControl(null, [
    
]),
  });  
  invalidLogin = false;
  annees=[];
  constructor(private router: Router,
    private loginservice: AuthenticationService , private http: HttpClient) { }

  ngOnInit() {
  this.loginservice.getAnnees().subscribe((data:any)=>{
    if(data.code==800){
      this.annees=data.datas;
     
    }
  });
    let user = sessionStorage.getItem('username')
      if(user!=null){  
          this.router.navigate(['']);
      }
  }
  
  checkLogin() {
  //  console.log("------------- "+this.formlogin.value);
    let login= this.formlogin.value;
    console.log(login);
    (this.loginservice.authenticate(login.username, login.password).subscribe(
      (data:any) => {
        console.log(data);
        if(data!=null){
          sessionStorage.setItem('idens', data['idenseignant']);
          sessionStorage.setItem('idannee',login.annee);
        }

       window.location.reload(); 
        this.router.navigate([''])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true

      }
    )
    );

  }
}
