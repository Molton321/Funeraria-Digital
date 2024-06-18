import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Move as MoveModel } from 'src/app/models/transfer/move';
import { MoveService } from 'src/app/services/move/move.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1->view, 2 ->create, 3->update
  theMove: MoveModel;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: MoveService, 
    private router: Router, 
    private theFormBuilder: FormBuilder
  ) { 
    this.trySend = false;
    this.mode = 1;
    this.theMove = { id: null, move_location: '', move_date: null, move_type: '', service_id: null };
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
      this.theMove.id = this.activateRoute.snapshot.params.id;
      this.getMove(this.theMove.id);
    }
  }

  configFormGroup(){
    this.theFormGroup = this.theFormBuilder.group({
      move_location: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      move_date: [null, [Validators.required]],
      move_type: ['', [Validators.required, Validators.minLength(3)]],
      service_id: [null, [Validators.required, Validators.min(1)]]
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls;
  }

  getMove(id: number){
    this.service.view(id).subscribe(data => {
      this.theMove = data;
    });
  }

  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Please fill in the fields correctly", "error");
    } else {
      this.service.create(this.theMove).subscribe(data => {
        Swal.fire("Completed", "The record has been created correctly", "success");
        this.router.navigate(["moves/list"]);
      });
    }
  }

  update(){
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Please fill in the fields correctly", "error");
    } else {
      this.service.update(this.theMove).subscribe(data => {
        Swal.fire("Completed", "The record has been updated correctly", "success");
        this.router.navigate(["moves/list"]);
      });
    }
  }

}
