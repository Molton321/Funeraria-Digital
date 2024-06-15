import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department as DepartmentModel } from 'src/app/models/department/department.model';
import { DepartmentService } from 'src/app/services/department/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1->view, 2 ->create, 3->update
  theDepartment: DepartmentModel;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: DepartmentService, 
    private router: Router, 
    private theFormBuilder: FormBuilder
  ) { 
    this.trySend = false;
    this.mode = 1;
    this.theDepartment = { id: null, department_name: '' };
  }

  ngOnInit(): void {
    this.configFormGroup();
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
      this.theDepartment.id = this.activateRoute.snapshot.params.id;
      this.getDepartment(this.theDepartment.id);
    }
  }

  configFormGroup(){
    this.theFormGroup = this.theFormBuilder.group({
      department_name: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls;
  }

  getDepartment(id: number){
    this.service.view(id).subscribe(data => {
      this.theDepartment = data;
    });
  }

  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Please fill in the fields correctly", "error");
    } else {
      this.service.create(this.theDepartment).subscribe(data => {
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
      this.service.update(this.theDepartment).subscribe(data => {
        Swal.fire("Completed", "The record has been updated correctly", "success");
        this.router.navigate(["halls/list"]);
      });
    }
  }

}
