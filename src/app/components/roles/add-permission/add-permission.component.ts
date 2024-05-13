import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionService } from 'src/app/services/encryption.service';
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
  uniqueError: any;
  validPemission: any;
  isDiabled: boolean = false;

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
    "name": 'Groups',
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
  decryptedId: any;



  constructor(public router: Router, public roleservice: RoleService, public activeRoute: ActivatedRoute,private encryptionService: EncryptionService) {

   }




  ngOnInit(): void {

   // this.roleId=this.activeRoute.snapshot.params['id'];
   const encryptedId = this.activeRoute.snapshot.paramMap.get('id');

   if(encryptedId==null) return
   this.decryptedId = this.encryptionService.decryptData(encryptedId);
   this.roleId=this.decryptedId
   

    this.roleservice.getById(this.decryptedId).subscribe({
      next: (data:any) => {
        this.roleName=data.groupName
        this.permissions=data.permissions
        const HtmlElement=document.getElementById("roleName")as HTMLInputElement;
        HtmlElement.value=this.roleName
        this.isDiabled=true;
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

          if (perm.name == 'SalaryReport'||perm.name == 'Groups') {
            updateCheckbox.disabled = true;
            updateCheckbox.setAttribute('disabled', 'true');
            deleteCheckbox.disabled =true;
            createCheckbox.disabled =true;

            // deletePermission.disabled = true;
          }
          else if(perm.name =='PublicSetting'){
            deleteCheckbox.disabled =true;
          }
          else if(perm.name == 'Users' ){
            updateCheckbox.disabled = true;
            updateCheckbox.setAttribute('disabled', 'true');
            deleteCheckbox.disabled =true;
          }
          else{
            updateCheckbox.disabled = false;
            updateCheckbox.setAttribute('disabled', 'false');
            deleteCheckbox.disabled =false;
          }
      });
      },
      error: (err:any)=>{console.log(err)}
    })

  }



  onSubmit(myForm:NgForm): void {



     if(this.roleId==0){
    this.permissions.forEach((prem:any,index:any) => {
      let view=document.getElementById(`${prem.name}_view`)as HTMLInputElement;
      let create=document.getElementById(`${prem.name}_create`)as HTMLInputElement;
      let update=document.getElementById(`${prem.name}_update`)as HTMLInputElement;
      let deelete=document.getElementById(`${prem.name}_delete`)as HTMLInputElement;
      this.permissions[index].create=create.checked;
      this.permissions[index].update=update.checked;
      this.permissions[index].delete=deelete.checked;
      this.permissions[index].view=view.checked;

if (create.checked || update.checked || deelete.checked) {
  this.permissions[index].view = true;
}
    })

    this.uniqueError = '';
    this.validPemission = '';
    const hasPermission = this.permissions.some((prem:any) => prem.view || prem.create || prem.update || prem.delete);
    if (!hasPermission) {
      this.validPemission = 'You must determine at least one permission';
      return;
    }


   let getName=document.getElementById("roleName")as HTMLInputElement;



   let newrole={
    name:getName.value,
    permissions:this.permissions
   }
  this.roleservice.getByName(getName.value).subscribe({
  next: (data:any) => {
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
    error: (err:any)=>{console.log(err)

    }
   });

   },
error: (err:any)=>{console.log(err)
  this.uniqueError=err.error;
if(err.error==null)
  this.uniqueError="Group Name Can't contain special character"
}
})
  //end getbyname


}
 //end add function
     //else update function
     else{
      console.log('add function')

      this.permissions.forEach((prem:any,index:any) => {
        let view=document.getElementById(`${prem.name}_view`)as HTMLInputElement;
        let create=document.getElementById(`${prem.name}_create`)as HTMLInputElement;
        let update=document.getElementById(`${prem.name}_update`)as HTMLInputElement;
        let deelete=document.getElementById(`${prem.name}_delete`)as HTMLInputElement;
        this.permissions[index].create=create.checked;
        this.permissions[index].update=update.checked;
        this.permissions[index].delete=deelete.checked;
        this.permissions[index].view=view.checked;
// Check 'view' permission if any other permission is checked
  if (create.checked || update.checked || deelete.checked) {
    this.permissions[index].view = true;
  }
      })

      this.uniqueError = '';
      this.validPemission = '';
      const hasPermission = this.permissions.some((prem:any) => prem.view || prem.create || prem.update || prem.delete);
      if (!hasPermission) {
        this.validPemission = 'You must determine at least one permission';
        return;
      }
     let getName=document.getElementById("roleName")as HTMLInputElement;
        getName.value=this.roleName
        console.log(this.roleName);
        console.log(getName.value);
     let newrole={
      name:getName.value,
      permissions:this.permissions
     }
     this.roleservice.updateRole(newrole,this.decryptedId).subscribe({
      next: (data:any) => {
      console.log(data);

      Swal.fire({
        title: 'Success!',
        text: 'Group updated Successfully',
        icon: 'success', // Custom icon HTML
        showCancelButton: false,
        confirmButtonColor: 'purple',
        confirmButtonText: 'Ok',

      }).then((result) => {
        result.isConfirmed ? this.router.navigate(['/roles']) : null
      })
    },
      error: (err:any)=>{console.log(err)
        console.log(getName.value);
        console.log(newrole);
      }
    })


     }//end else



  


  }




 }
