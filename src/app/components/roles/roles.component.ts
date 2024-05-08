import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles:any
  error:any
  roleInfo:any
  roleId:any
    formGroup=new FormGroup({
      name:new FormControl('',[Validators.required,Validators.minLength(3)]),

    })

  constructor(public roleService:RoleService){}
  ngOnInit(): void {
    this.roleService.getRole().subscribe({
      
      next: (data)=>{
        this.roles=data
     
      },
    error: (err: any)=>{console.log(err)}
    })
  }
  get getName(){
    return this.formGroup.controls['name'];
  }
addRole(e:any){
  e.preventDefault();
  if(this.formGroup.status=="VALID"){

    this.roleService.addRole(this.formGroup.value).subscribe({

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
delete(id: any) {
  // Display SweetAlert confirmation dialog
  Swal.fire({
    title: 'Are you sure you want to delete?',
    text: 'Once deleted, you will not be able to recover data',
    iconHtml: '<i class="bi bi-trash text-danger"></i>', // Custom icon HTML
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#036088',
    confirmButtonText: 'Delete',
  }).then((result) => {
    if (result.isConfirmed) {
      // If user confirms, proceed with deletion
      this.roleService.deleteRole(id).subscribe({
        next: () => {
          // Remove the deleted employee from the employees array
          this.roles = this.roles.filter(
            (role: any) => role.roleId != id
          );
          // Show success message using SweetAlert
          window.location.reload();
        },
        error: (error) => {
          console.log(error);
          // Show error message using SweetAlert
          Swal.fire('Error!', 'An error occurred while deleting the role.', 'error');
        },
      });
    }
  });
}
selectRow(id:any){
  this.roleService.getById(id).subscribe({
    next: (data)=>{
      console.log(data)
      this.roleInfo=data

    },
    error: (err)=>{console.log(err)}
  })
}
}
