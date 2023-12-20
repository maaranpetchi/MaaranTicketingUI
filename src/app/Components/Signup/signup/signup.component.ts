import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import validateForm from 'src/app/Helpers/validateform';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { SpinnerService } from 'src/app/Services/Spinner/spinner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: String = "fa-eye-slash"


  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,private loginService:AuthService,private spinnerservice:SpinnerService,private router:Router,private cookieService: CookieService) {


    this.signupForm = this.fb.group({
      firstname: [""],
      lastname: [""],
      username: ["", Validators.required],
      password: ["", Validators.required],
    })
  }



  ngOnInit(): void {
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }


  Update() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.spinnerservice.requestStarted();
      this.loginService.isSignup(this.signupForm.value).subscribe((result) => {
        this.spinnerservice.requestEnded();
        if(result.message=="UserName Already Exists"){
          Swal.fire('info','UserName Already Exists','info').then((res)=>{
            if(res.isConfirmed){
              this.signupForm.reset();
            }
          })
        }
        else{
          Swal.fire('Done','User Register Successfully','success').then((res)=>{
            if(res.isConfirmed){


              this.router.navigate(['/dashboard']);
            }
          })

        }
      })
    } else {
      validateForm.ValidateAllFormFields(this.signupForm)
    }
  }
}
