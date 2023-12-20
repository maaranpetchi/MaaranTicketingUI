import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import validateForm from 'src/app/Helpers/validateform';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { SpinnerService } from 'src/app/Services/Spinner/spinner.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from 'src/app/Services/UserStore/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss']
})

export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: String = "fa-eye-slash"

  loginForm !: FormGroup;

  constructor(private fb: FormBuilder, private loginService: AuthService, private http: HttpClient, private spinnerService: SpinnerService, private router: Router, private cookieService: CookieService, private toastr: ToastrService,private userstore:UserStoreService) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  ngOnInit(): void {
  }


  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }


  Submit() {
    if (this.loginForm.valid) {

      this.spinnerService.requestStarted();
      this.loginService.isLogin(this.loginForm.value).subscribe((result) => {
        this.spinnerService.requestEnded();
        console.log(result, "Result");

    
          this.loginForm.reset();
          this.loginService.storeToken(result.accessToken);
         const tokenPayload = this.loginService.decodedToken();
         this.userstore.setFullNameFromStore(tokenPayload.name);
         this.userstore.setRoleFromStore(tokenPayload.role);
         this.loginService.storeRefreshToken(result.refreshToken);

          this.toastr.success('Login Successful', 'success');
          this.router.navigate(['/dashboard']);
 
      })
    } else {
      validateForm.ValidateAllFormFields(this.loginForm);
    }
  }




}
