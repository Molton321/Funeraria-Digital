import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver as DriverModel } from 'src/app/models/driver/driver.model';
import { User as UserModel } from 'src/app/models/user/user.model';
import { DriverService } from 'src/app/services/driver/driver.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1->view, 2 ->create, 3->update
  theDriver: DriverModel;
  theFormGroup: FormGroup;
  trySend: boolean;
  theUsers: UserModel[];

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: DriverService, 
    private userService: UserService, 
    private router: Router, 
    private theFormBuilder: FormBuilder
  ) { 
    this.trySend=false
    this.mode = 1;
    this.theUsers = [];
    this.theDriver = { id: null, driver_license: '', driver_license_category: '', driver_license_expiration: null, user_id: '' };
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
        this.theDriver.id = this.activateRoute.snapshot.params.id;
        this.getDriver(this.theDriver.id);
      }
      if (currentUrlArray.length > 1){
        if (currentUrlArray[1] == 'user'){
          this.getDriverByUser(currentUrlArray[2]);
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
      driver_license:['',[Validators.required,Validators.minLength(10)]],
      driver_license_category:['',[Validators.required]],
      driver_license_expiration:['',[Validators.required]],
      user_id:[null,[Validators.required]]
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getDriver(id: number){
    this.service.view(id).subscribe(data=>{
      this.theDriver = data;
    })
  }

  getDriverByUser(id: string){
    this.service.viewByUser(id).subscribe(data=>{
      this.theDriver = data;
    })
  }

  create(){
    this.trySend=true
    if (this.theFormGroup.invalid) {
      Swal.fire("Error","Please fill in the fields correctly", "error")
    } else {
      this.service.create(this.theDriver).subscribe(data=>{
        Swal.fire("Success","The registry has been created correctly","success")
        this.router.navigate(["drivers/list"])
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
      this.service.update(this.theDriver).subscribe(data=>{
        Swal.fire("Success","The registry has been updated correctly","success")
        this.router.navigate(["drivers/list"])
      })
    }
  }

}
