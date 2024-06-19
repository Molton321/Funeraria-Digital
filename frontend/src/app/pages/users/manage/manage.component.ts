import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role as RoleModel } from 'src/app/models/role/role.model';
import { User as UserModel } from 'src/app/models/user/user.model';
import { RoleService } from 'src/app/services/role/role.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1->view, 2 ->create, 3->update
  theUser: UserModel;
  theFormGroup: FormGroup;
  trySend: boolean
  theRoles: RoleModel[];

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: UserService, 
    private roleService: RoleService, 
    private router: Router, 
    private theFormBuilder: FormBuilder
  ) { 
    this.trySend=false
    this.mode = 1;
    this.theRoles = [];
    this.theUser = { id: null, name: '', email: '', password: '', role: null };
  }

  ngOnInit(): void {
    this.theRoles = [];
    this.rolesList()
    this.configFormGroup()
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')){
      this.mode = 1;
    }
    if (currentUrl.includes('update')){
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id){
      this.theUser.id = this.activateRoute.snapshot.params.id;
      this.getUser(this.theUser.id);
    }
  }

  rolesList(){
    this.roleService.list().subscribe(data => {
      this.theRoles = data;
    })
  }

  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      name:['',[Validators.required,Validators.minLength(2)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(5)]],
      role:['',[Validators.required]]
      
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getUser(id: string){
    this.service.view(id).subscribe(data=>{
      this.theUser = data;
    })
  }

  viewTo(id: number, route: string) {
    this.router.navigate([route+id])
  }

  update(){
    this.trySend=true
    if (this.theFormGroup.invalid) {
      Swal.fire("Error","Please fill in the fields correctly", "error")
    } else {
      this.service.update(this.theUser).subscribe(data=>{
        Swal.fire("Completado","The registry has been updated correctly","success")
        this.service.matchRole(data.id, this.theUser.role.id).subscribe(data=>{
          Swal.fire("Completado","The registry has been created correctly","success")
          this.router.navigate(["users/list"])
        })
      })
    }
  }

}
