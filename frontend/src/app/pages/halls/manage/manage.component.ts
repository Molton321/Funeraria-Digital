import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Campus as CampusModel } from 'src/app/models/campus/campus.model';
import { Hall as HallModel } from 'src/app/models/hall/hall.model';
import { CampusService } from 'src/app/services/campus/campus.service';
import { HallService } from 'src/app/services/hall/hall.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  
  mode: number; // 1->view, 2 ->create, 3->update
  theHall: HallModel;
  theFormGroup: FormGroup;
  trySend: boolean;
  theCampuses:CampusModel[];

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: HallService, 
    private campusService: CampusService, 
    private router: Router, 
    private theFormBuilder: FormBuilder
  ) { 
    this.trySend = false;
    this.mode = 1;
    this.theCampuses = [];
    this.theHall = { id: null, hall_name: '', hall_capacity: null, hall_is_active: null, campus_id: null };
  }

  ngOnInit(): void {
    this.theCampuses = [];
    this.configFormGroup();
    this.campusesList();
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
      this.theHall.id = this.activateRoute.snapshot.params.id;
      this.getHall(this.theHall.id);
    }
  }

  campusesList(){
    this.campusService.list().subscribe(data => {
      this.theCampuses = data;
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
      this.theHall = data;
    });
  }

  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Please fill in the fields correctly", "error");
    } else {
      this.service.create(this.theHall).subscribe(data => {
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
      this.service.update(this.theHall).subscribe(data => {
        Swal.fire("Completed", "The record has been updated correctly", "success");
        this.router.navigate(["halls/list"]);
      });
    }
  }

}
