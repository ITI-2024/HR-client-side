import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.css']
})
export class AddPermissionComponent implements OnInit {
  section:any=['Employee','Holiday','Public Setting','Users','Roles']
roles:any
error:any
 role:any
roleId:any
  formGroup=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3)]),

  })

constructor(public router: Router,public permissionService: PermissionService,public activeRoute:ActivatedRoute) {

}
get getName(){
  return this.formGroup.controls['name'];
}
  ngOnInit(): void {

 this.roleId=this.activeRoute.snapshot.paramMap.get('id');
 console.log(this.roleId)
 this.role=this.permissionService.getById(this.roleId).subscribe({
   next:(data)=>{
     this.role=data
     this.getName.setValue(this.role.name)
   },
   error:(err)=>console.log(err)
 })
  }


}



