import { AuthenticationService } from './../authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {
islogged=false;
username=''
  constructor(private router:Router, private auth:AuthenticationService) { }

  ngOnInit() {
    let user = sessionStorage.getItem('username')
    this.username=user;
      if(user!=null){   
       this.islogged=true
      }
  }
  logout(){
    console.log("bonjour");
    this.auth.logOut();
    window.location.reload();
  }
  

}
