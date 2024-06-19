import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client as ClientModel } from 'src/app/models/client/client.model';
import { User as UserModel } from 'src/app/models/user/user.model';
import { ClientService } from 'src/app/services/client/client.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1->view, 2 ->create, 3->update
  theClient: ClientModel;
  theFormGroup: FormGroup;
  trySend: boolean;
  theUsers: UserModel[];

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: ClientService, 
    private userService: UserService, 
    private router: Router, 
    private theFormBuilder: FormBuilder
  ) { 
    this.trySend=false
    this.mode = 1;
    this.theUsers = [];
    this.theClient = { id: null, client_address: '', client_phone: '', client_state: null, client_alive: null, user_id: '' };
  }

  ngOnInit(): void {
    this.theUsers = [];
    this.configFormGroup()
    this.usersList()
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
      const currentUrlArray = currentUrl.split("/");
      if (currentUrlArray.length == 1){
        this.theClient.id = this.activateRoute.snapshot.params.id;
        this.getClient(this.theClient.id);
      }
      if (currentUrlArray.length > 1){
        if (currentUrlArray[1] == 'user'){
          this.getClientByUser(currentUrlArray[2]);
        }
      }
    }
  }

  usersList(){
    this.userService.list().subscribe(data => {
      this.theUsers = data;
    })
  }

  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      client_address:['',[Validators.required,Validators.minLength(10)]],
      client_phone:['',[Validators.required,Validators.minLength(10)]],
      client_state:['',[Validators.required]],
      client_alive:[null,[Validators.required]],
      user_id:[null,[Validators.required]]
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getClient(id: number){
    this.service.view(id).subscribe(data=>{
      this.theClient = data;
    })
  }

  getClientByUser(id: string){
    this.service.viewByUser(id).subscribe(data=>{
      this.theClient = data;
    })
  }

  create(){
    this.trySend=true
    if (this.theFormGroup.invalid) {
      Swal.fire("Error","Please fill in the fields correctly", "error")
    } else {
      this.service.create(this.theClient).subscribe(data=>{
        Swal.fire("Success","The registry has been created correctly","success")
        this.router.navigate(["clients/list"])
      })
    }
  }

  viewTo(id: number, route: string) {
    this.router.navigate([route+id])
  }

  update(){
    this.trySend=true
    if (this.theFormGroup.invalid) {
      Swal.fire("Error","Please fill in the fields correctly", "error")
    } else {
      this.service.update(this.theClient).subscribe(data=>{
        Swal.fire("Success","The registry has been updated correctly","success")
        this.router.navigate(["clients/list"])
      })
    }
  }

}
