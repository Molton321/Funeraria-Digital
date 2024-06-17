import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan as PlanModel } from 'src/app/models/plan/plan.model';
import { PlanService } from 'src/app/services/plan/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1->view, 2 ->create, 3->update
  thePlan: PlanModel;
  theFormGroup: FormGroup;
  trySend: boolean

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: PlanService, 
    private router: Router, 
    private theFormBuilder:FormBuilder
  ) { 
    this.trySend=false
    this.mode = 1;
    this.thePlan = { id: null, plan_type: '', plan_description: '', plan_price: null, plan_beneficiaries_number: null, plan_state: null };
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
      this.thePlan.id = this.activateRoute.snapshot.params.id;
      this.getPlan(this.thePlan.id);
    }
  }

  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      plan_type:['',[Validators.required,Validators.minLength(4)]],
      plan_description:['',[Validators.required,Validators.minLength(15)]],
      plan_price:[null,[Validators.required,Validators.min(0),Validators.max(100000000)]],
      plan_beneficiaries_number:[null,[Validators.required,Validators.min(1),Validators.max(100)]],
      plan_state:[null,[Validators.required]]
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getPlan(id: number){
    this.service.view(id).subscribe(data=>{
      this.thePlan = data;
    })
  }

  create(){
    this.trySend=true
    if (this.theFormGroup.invalid) {
      Swal.fire("Error","Please fill in the fields correctly", "error")
    } else {
      this.service.create(this.thePlan).subscribe(data=>{
        Swal.fire("Completado","The registry has been created correctly","success")
        this.router.navigate(["plans/list"])
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
      this.service.uptate(this.thePlan).subscribe(data=>{
        Swal.fire("Completado","The registry has been updated correctly","success")
        this.router.navigate(["plans/list"])
      })
    }
  }

}
