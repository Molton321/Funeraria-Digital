import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Viewing as ViewingModel } from 'src/app/models/viewing/viewing.model';
import { ViewingService } from 'src/app/services/viewing/viewing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  
  mode: number; // 1->view, 2 ->create, 3->update
  theViewing: ViewingModel;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: ViewingService, 
    private router: Router, 
    private theFormBuilder: FormBuilder
  ) { 
    this.trySend = false;
    this.mode = 1;
    this.theViewing = { id: null, viewing_entry_date: null, viewing_exit_date: null, service_id: null, room_id: null };
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
      this.theViewing.id = this.activateRoute.snapshot.params.id;
      this.getViewing(this.theViewing.id);
    }
  }

  configFormGroup(){
    this.theFormGroup = this.theFormBuilder.group({
      viewing_entry_date: [null, [Validators.required]],
      viewing_exit_date: [null, [Validators.required]],
      service_id: [null, [Validators.required, Validators.min(1)]],
      hall_id: [null, [Validators.required, Validators.min(1)]]
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls;
  }

  getViewing(id: number){
    this.service.view(id).subscribe(data => {
      this.theViewing = data;
    });
  }

  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Please fill in the fields correctly", "error");
    } else {
      this.service.create(this.theViewing).subscribe(data => {
        Swal.fire("Completed", "The record has been created correctly", "success");
        this.router.navigate(["viewings/list"]);
      });
    }
  }

  update(){
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Please fill in the fields correctly", "error");
    } else {
      this.service.update(this.theViewing).subscribe(data => {
        Swal.fire("Completed", "The record has been updated correctly", "success");
        this.router.navigate(["viewings/list"]);
      });
    }
  }

}
