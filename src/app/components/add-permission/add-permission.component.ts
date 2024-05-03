import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.css']
})
export class AddPermissionComponent implements OnInit {
roles:any
error:any
roleName:any
  formGroup=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3)]),

  })

constructor(public router: Router,public permissionService: PermissionService) {

}
get getName(){
  return this.formGroup.controls['name'];
}
  ngOnInit(): void {
    this.permissionService.getAll().subscribe({
      next: (data)=>{
        this.roles=data
      },
    error: (err)=>{console.log(err)}
    })
  }
addRole(e:any){
  e.preventDefault();
  if(this.formGroup.status=="VALID"){
    this.roleName=this.formGroup.value.name
    this.permissionService.addRole(this.formGroup.value).subscribe({

      next: (data)=>{
        window.location.reload();

        console.log(data)
      },
      error: (err)=>{console.log(err)
       this.error=err.error.title
       console.log(typeof(this.formGroup.value.name))
      }
    })
}
}
selectRow(id:any){

  this.permissionService.getById(id).subscribe({
    next: (data)=>{
      console.log(data)
    },
    error: (err)=>{console.log(err)}
  })
}
}



