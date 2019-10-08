import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
const api ='http://localhost:8080/auth/';
export class User {
  constructor(
    public status: string,
  ) { }

}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  model: any = {};
  
  constructor(
    private httpClient: HttpClient
  ) {
  }
  authenticate(username, password) {
    console.log(username);
    console.log(password);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get<User>(api+'login', { headers }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          let authString = 'Basic ' + btoa(username + ':' + password);
          sessionStorage.setItem('basicauth', authString);
          return userData;
        }
      )

    );
  }
  
  

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
   // console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('basicauth');
  }
  getAnnees(){
    let apiurl = api +'annees';
    return this.httpClient.get(apiurl);
  }
}