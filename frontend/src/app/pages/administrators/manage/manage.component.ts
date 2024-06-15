import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrator as AdministratorModel } from 'src/app/models/administrator/administrator.model';
import { AdministratorService } from 'src/app/services/administrator/administrator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1->view, 2 ->create, 3->update
  theAdministrator: AdministratorModel;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: AdministratorService, 
    private router: Router, 
    private theFormBuilder: FormBuilder
  ) { 
    this.trySend = false;
    this.mode = 1;
    this.theAdministrator = { id: null, administrator_state: null, user_id: '' };
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
      this.theAdministrator.id = this.activateRoute.snapshot.params.id;
      this.getAdministrator(this.theAdministrator.id);
    }
  }

  configFormGroup(){
    this.theFormGroup = this.theFormBuilder.group({
      Administrator_date: [null, [Validators.required]],
      service_id: [null, [Validators.required, Validators.minLength(1)]]
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls;
  }

  getAdministrator(id: number){
    this.service.view(id).subscribe(data => {
      this.theAdministrator = data;
    });
  }

  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Please fill in the fields correctly", "error");
    } else {
      this.service.create(this.theAdministrator).subscribe(data => {
        Swal.fire("Completed", "The record has been created correctly", "success");
        this.router.navigate(["administrators/list"]);
      });
    }
  }

  update(){
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Please fill in the fields correctly", "error");
    } else {
      this.service.update(this.theAdministrator).subscribe(data => {
        Swal.fire("Completed", "The record has been updated correctly", "success");
        this.router.navigate(["administrators/list"]);
      });
    }
  }

}
