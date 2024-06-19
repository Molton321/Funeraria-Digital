import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User as UserModel } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  mode: number; // 1->view, 2 ->create, 3->update
  theUser: UserModel;
  theFormGroup: FormGroup;
  trySend: boolean

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: UserService, 
    private router: Router, 
    private theFormBuilder:FormBuilder
  ) { 
    this.trySend=false
    this.mode = 1;
    this.theUser = { id: null, name: '', email: '', password: '' };
  }

  ngOnInit(): void {
    this.configFormGroup()
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')){
      this.mode = 1;
    }
    if (currentUrl.includes('create')){
      this.mode = 2;
    }
    if (currentUrl.includes('update')){
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id){
      this.theUser.id = this.activateRoute.snapshot.params.id;
      this.getUser(this.theUser.id);
    }
  }

  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      name:['',[Validators.required,Validators.minLength(2)]],
      email:['',[Validators.required,Validators.minLength(5)]],
      password:['',[Validators.required,Validators.minLength(5)]]
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

  create(){
    this.trySend=true
    if (this.theFormGroup.invalid) {
      Swal.fire("Error","Please fill in the fields correctly", "error")
    } else {
      this.service.create(this.theUser).subscribe(data=>{
        this.service.matchRole(data.id, '667217f155d1f267b8e9b4ca').subscribe(data=>{
          Swal.fire("Completado","The registry has been created correctly","success")
          this.router.navigate(["login"])
        })
      })
    }
  }
  
}
