import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Campus as CampusModel } from 'src/app/models/campus/campus.model';
import { CampusService } from 'src/app/services/campus/campus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1->view, 2 ->create, 3->update
  theCampus: CampusModel;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: CampusService, 
    private router: Router, 
    private theFormBuilder: FormBuilder
  ) { 
    this.trySend = false;
    this.mode = 1;
    this.theCampus = { id: null, campus_name: '', campus_is_active: 1, city_id: null };
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
      this.theCampus.id = this.activateRoute.snapshot.params.id;
      this.getCampus(this.theCampus.id);
    }
  }

  configFormGroup(){
    this.theFormGroup = this.theFormBuilder.group({
      campus_name: ['', [Validators.required, Validators.minLength(4)]],
      campus_is_active: [1, [Validators.required]],
      city_id: [null, [Validators.required, Validators.min(1)]]
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls;
  }

  getCampus(id: number){
    this.service.view(id).subscribe(data => {
      this.theCampus = data;
    });
  }

  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Please fill in the fields correctly", "error");
    } else {
      this.service.create(this.theCampus).subscribe(data => {
        Swal.fire("Completed", "The record has been created correctly", "success");
        this.router.navigate(["campuses/list"]);
      });
    }
  }

  update(){
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Please fill in the fields correctly", "error");
    } else {
      this.service.update(this.theCampus).subscribe(data => {
        Swal.fire("Completed", "The record has been updated correctly", "success");
        this.router.navigate(["campuses/list"]);
      });
    }
  }

}
