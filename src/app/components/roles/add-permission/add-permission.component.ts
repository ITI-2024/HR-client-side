import { Component, OnInit } from '@angular/core';
 import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
 import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-permission',
   templateUrl: './add-permission.component.html',
   styleUrls: ['./add-permission.component.css']
 })
 export class AddPermissionComponent implements OnInit {


   role: any;
   roleId: any;
  roleName: any='';
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
    "name": 'Public Setting',
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
    "name": 'Salary Report',
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



  constructor(public router: Router, public roleservice: RoleService, public activeRoute: ActivatedRoute, public formbuilder:FormBuilder) {

   }




  ngOnInit(): void {
    this.roleId=this.activeRoute.snapshot.params['id'];
    this.roleservice.getById(this.roleId).subscribe({
      next: (data:any) => {
        this.roleName=data.groupName
        this.permissions=data.permissions
        const HtmlElement=document.getElementById("roleName")as HTMLInputElement;
        HtmlElement.value=this.roleName
        this.permissions.forEach((perm: any) => {
          // Get checkbox elements based on permission name
          const viewCheckbox = document.getElementById(`${perm.name}_view`) as HTMLInputElement;
          const createCheckbox = document.getElementById(`${perm.name}_create`) as HTMLInputElement;
          const updateCheckbox = document.getElementById(`${perm.name}_update`) as HTMLInputElement;
          const deleteCheckbox = document.getElementById(`${perm.name}_delete`) as HTMLInputElement;


          if (perm.view) {
              viewCheckbox.checked = true;
              viewCheckbox.setAttribute('checked', 'true');

          }
          if (perm.create) {
              createCheckbox.checked = true;
              createCheckbox.setAttribute('checked', 'true');
          }
          if (perm.update) {
              updateCheckbox.checked = true;
              updateCheckbox.setAttribute('checked', 'true');
          }
          if (perm.delete) {
              deleteCheckbox.checked = true;
              deleteCheckbox.setAttribute('checked', 'true');
          }
      });
      },
      error: (err:any)=>{console.log(err)}
    })

  }



  onSubmit(): void {

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
   this.roleservice.addRole(newrole).subscribe({
    next: (data:any) => {
    console.log(data);

    Swal.fire({
      title: 'Success!',
      text: 'Group Added Successfully',
      icon: 'success', // Custom icon HTML
      showCancelButton: false,
      confirmButtonColor: 'purple',
      confirmButtonText: 'Ok',

    }).then((result) => {
      result.isConfirmed ? this.router.navigate(['/roles']) : null
    })
    },
    error: (err:any)=>{console.log(err)}
   });

  }

    }









