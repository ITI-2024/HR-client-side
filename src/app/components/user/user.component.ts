import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  rolesName: any[] = [];
  roledata:any;
  name:any;
  disabledbtn:boolean=true;
  usernameuser:any;
  fullnameuser:any;
  passworduser:any;
  emailuser:any;
  roleuser:any;
  user:any;
  errorRegister:any;
    constructor(public userService: LoginService, public router: Router , public role: RoleService){

  }
  ngOnInit(): void {
   
    this.role.getRole().subscribe({
      next:data=>{
      
        this.roledata=data;
        this.roledata.forEach((ele: { name: any; }) => {
          this.name=ele.name;
          this.rolesName.push(this.name);
          
        });
    
       
      }
                    
    })
  }
    nameFormatValidator(control: FormControl): { [key: string]: any } | null {
      const namePattern = /^[^\d]+$/;
      if (control.value && !namePattern.test(control.value)) {
        return { 'invalidName': true };
      }
      return null;
    }

   
    emailFormatValidator(control: FormControl): { [key: string]: any } | null {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (control.value && !emailPattern.test(control.value)) {
        return { 'invalidEmail': true };
      }
      return null;
    } 
    passwordFormatValidator(control: FormControl): { [key: string]: any } | null {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
      if (control.value && !passwordPattern.test(control.value)) {
        return { 'invalidPassword': true };
      }
      return null;
    }
  registerForm = new FormGroup({

    fullName: new FormControl('',
      [
        Validators.required,
        this.nameFormatValidator,
      ]
    ),
    email: new FormControl(null,
      [
        Validators.required,
        this.emailFormatValidator
      ]
    ),
    username: new FormControl('',
      [
        Validators.required
      ]
    ),
    password: new FormControl('',
      [
        Validators.required,
        this.passwordFormatValidator,
      ]
    ),
    rolename: new FormControl('', [ Validators.required, ]),
  });
  get getName() {
    return this.registerForm.controls['fullName'];
  }
  get getEmail() {
    return this.registerForm.controls['email'];
  }
  get getuserName() {
    return this.registerForm.controls['username'];
  }
  get getRole() {
   return this.registerForm.controls['rolename'];
  }
  get getPassword() {
    return this.registerForm.controls['password'];
  }
  adduser(e:any){
    e.preventDefault();
    if(this.registerForm.status == 'VALID'){
      console.log(this.registerForm.value+' successfully');
      this.userService.AddUser(this.registerForm.value).subscribe({
        next:data=>{
          this.user=data;
          console.log(this.user);
        }
        ,
        error: (error) => {
          this.errorRegister=error.error;
          console.log(error)
        },
      })

    }
  }

}
