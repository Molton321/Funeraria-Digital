import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City as CityModel } from 'src/app/models/city/city.model';
import { Department as DepartmentModel } from 'src/app/models/department/department.model';
import { CityService } from 'src/app/services/city/city.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  
  mode: number; // 1->view, 2 ->create, 3->update
  theCity: CityModel;
  theFormGroup: FormGroup;
  trySend: boolean;
  theDepartments:DepartmentModel[];

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: CityService, 
    private departmentService: DepartmentService, 
    private router: Router, 
    private theFormBuilder: FormBuilder
  ) { 
    this.trySend = false;
    this.mode = 1;
    this.theDepartments = [];
    this.theCity = { id: null, name: '', departmentId: null, postalCode:"",description:'' };
  }

  ngOnInit(): void {
    this.theDepartments = [];
    this.configFormGroup();
    this.departmentsList();
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
      this.theCity.id = this.activateRoute.snapshot.params.id;
      this.getHall(this.theCity.id);
    }
  }

  departmentsList(){
    this.departmentService.list().subscribe(data => {
      this.theDepartments = data;
    });
  }

  configFormGroup(){
    this.theFormGroup = this.theFormBuilder.group({
      hall_name: ['', [Validators.required, Validators.minLength(4)]],
      hall_capacity: [null, [Validators.required, Validators.min(10), Validators.max(40)]],
      hall_is_active: [null, [Validators.required]],
      campus_id: [null, [Validators.required, Validators.min(1)]]
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls;
  }

  getHall(id: number){
    this.service.view(id).subscribe(data => {
      this.theCity = data;
    });
  }

  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Please fill in the fields correctly", "error");
    } else {
      this.service.create(this.theCity).subscribe(data => {
        Swal.fire("Completed", "The record has been created correctly", "success");
        this.router.navigate(["halls/list"]);
      });
    }
  }

  update(){
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Please fill in the fields correctly", "error");
    } else {
      this.service.update(this.theCity).subscribe(data => {
        Swal.fire("Completed", "The record has been updated correctly", "success");
        this.router.navigate(["halls/list"]);
      });
    }
  }

}
