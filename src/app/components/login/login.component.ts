import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any;
  myerror:any;
  email: string = ''; 
  password: string = '';
  
  constructor(public userServies: LoginService,public router:Router){

  }
  ngOnInit(): void {
      

  }

  emailFormatValidator(control: FormControl): { [key: string]: any } | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (control.value && !emailPattern.test(control.value)) {
      return { 'invalidEmail': true };
    }
    return null;
  }
  // Custom validator function for password format 
  passwordFormatValidator(control: FormControl): { [key: string]: any } | null {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    if (control.value && !passwordPattern.test(control.value)) {
      return { 'invalidPassword': true };
    }
    return null;
  }

  loginForm = new FormGroup({

    email: new FormControl(null,
      [
        Validators.required,
        this.emailFormatValidator
      ]
    ),
    password: new FormControl(null,
      [
        Validators.required,
        this.passwordFormatValidator
       
      ]
    )
  });
  get getEmail(){
    return this.loginForm.controls['email'];
  }
  get getPassword(){
    return this.loginForm.controls['password'];
  }
  loginHandler(e: any){
    e.preventDefault();
    this.userServies.getlogin({ 
    email: this.loginForm.get('email')?.value,
    password: this.loginForm.get('password')?.value}).subscribe({
      next: data=>{
      this.user = data;
      console.log(data);
      //Static 
      if(this.user.token){
        localStorage.setItem('username', this.user.username);
        this.router.navigate(['/']);
      }

    },
      error: data=>{
        this.myerror=data.error;
        console.log(this.myerror);

      }

    });
  }

}