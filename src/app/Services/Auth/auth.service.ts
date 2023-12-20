import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/Environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '@angular/compiler';
import { TokenApiModel } from 'src/app/Models/Token/token-api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = environment.apiURL
  private loginURL = environment.apiURL + 'User/authenticate'
  private SignupURL = environment.apiURL + 'User/register'
  private userPayload: any;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.userPayload = this.decodedToken();
  }

  isLogin(loginObj: any) {
    return this.http.post<any>(`${this.loginURL}`, loginObj)
  }
  isSignup(signupObj: any) {
    return this.http.post<any>(`${this.SignupURL}`, signupObj)
  }


  storeToken(tokenValue: string) {
    this.cookieService.set('token', tokenValue)
  }
  getToken() {
    return this.cookieService.get('token')
  }
  storeRefreshToken(tokenValue: string) {
    this.cookieService.set('Refreshtoken', tokenValue)
  }


  getRefreshToken() {
    return this.cookieService.get('Refreshtoken')
  }



  isLoggedIn() {
    return !!this.cookieService.get('token')
  }


  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token)
  }

  getFullNameFromToken() {
    if (this.userPayload) {
      return this.userPayload.name;
    }
  }


  getRoleFromToken() {
    if (this.userPayload) {
      return this.userPayload.role;
    }
  }


  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<any>(`${this.apiURL + 'User/refresh'}`, tokenApi)
  }
}
