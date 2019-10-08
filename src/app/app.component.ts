import { AuthenticationService } from './authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'suiviscolaire-enseignant';
  islogged=false;
  constructor(private authenticationService:AuthenticationService, private router:Router) {
    this.islogged= this.authenticationService.isUserLoggedIn();
    let user = sessionStorage.getItem('username')
      if(user===null){   
        this.router.navigate(['login'])
      }else{
        this.islogged=true;
       
      }
      console.log(this.islogged);
   }

  ngOnInit() {
    
  }
}
