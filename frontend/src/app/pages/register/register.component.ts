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
      User_type:['',[Validators.required,Validators.minLength(4)]],
      User_description:['',[Validators.required,Validators.minLength(15)]],
      User_price:[null,[Validators.required,Validators.min(0),Validators.max(100000000)]],
      User_beneficiaries_number:[null,[Validators.required,Validators.min(1),Validators.max(100)]],
      User_state:[null,[Validators.required]]
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
        Swal.fire("Completado","The registry has been created correctly","success")
        this.router.navigate(["Users/list"])
      })
    }
  }
  
}
