import { Component, OnInit } from '@angular/core';
 import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
 import { PermissionService } from 'src/app/services/permission.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-add-permission',
   templateUrl: './add-permission.component.html',
   styleUrls: ['./add-permission.component.css']
 })
 export class AddPermissionComponent implements OnInit {
 //sections: any=['Employee', 'Holiday', 'Public Setting', 'Users', 'Salary Report', 'Permissions', 'Attendance'];
constructor(public role:RoleService,public router:Router){

}
 permissions: any=[{
  "name": 'Employee',
  "create": false,
  "delete": false,
  "view": false,
  "update":false
},
{
  "name": 'Holiday',
  "create": false,
  "delete": false,
  "view": false,
  "update":false
},
{
  "name": 'PublicSetting',
  "create": false,
  "delete": false,
  "view": false,
  "update":false
},
{
  "name": 'Users',
  "create": false,
  "delete": false,
  "view": false,
  "update":false
},
{
  "name": 'Permissions',
  "create": false,
  "delete": false,
  "view": false,
  "update":false
},
{
  "name": 'SalaryReport',
  "create": false,
  "delete": false,
  "view": false,
  "update":false
},
{
  "name": 'Attendance',
  "create": false,
  "delete": false,
  "view": false,
  "update":false
},

]
view:any;

  ngOnInit(): void {

  }
  onSubmit():void {
    this.permissions.forEach((prem:any,index:any) => {
      let view=document.getElementById(`${prem.name}_view`)as HTMLInputElement;
      let create=document.getElementById(`${prem.name}_create`)as HTMLInputElement;
      let update=document.getElementById(`${prem.name}_update`)as HTMLInputElement;
      let deelete=document.getElementById(`${prem.name}_delete`)as HTMLInputElement;
      this.permissions[index].create=create.checked;
      this.permissions[index].update=update.checked;
      this.permissions[index].delete=deelete.checked;
      this.permissions[index].view=view.checked;
    
    })
   let getName=document.getElementById("roleName")as HTMLInputElement;

   let newrole={
    name:getName.value,
    permissions:this.permissions
   }
   this.role.addRole(newrole).subscribe({
    next: data=>{
      console.log("Role");
    }
   });

  }






 }