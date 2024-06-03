import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService as PlanServiceModel } from 'src/app/models/plan-service/plan-service.model';
import { PlanService } from 'src/app/services/plan/plan.service';
import { Plan as PlanModel} from 'src/app/models/plan/plan.model';
import { Service as ServiceModel } from 'src/app/models/service/service.model';
import { PlanServiceService } from 'src/app/services/plan-service/plan-service.service';
import { ServiceService } from 'src/app/services/service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1->view, 2 ->create, 3->update
  thePlanService: PlanServiceModel;
  theFormGroup: FormGroup;
  trySend: boolean;
  theServices:ServiceModel[];
  thePlans:PlanModel[];

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: PlanServiceService, 
    private serviceService: ServiceService, 
    private planService: PlanService, 
    private router: Router, 
    private theFormBuilder:FormBuilder
  ) { 
    this.trySend=false
    this.mode = 1;
    this.theServices = [];
    this.thePlans = [];
    this.thePlanService = { id: null, service_id: null, plan_id: null };
  }

  ngOnInit(): void {
    this.theServices = [];
    this.thePlans = [];
    this.configFormGroup()
    this.servicesList()
    this.plansList()
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
      this.thePlanService.id = this.activateRoute.snapshot.params.id;
      this.getPlanService(this.thePlanService.id);
    }
  }

  servicesList(){
    this.serviceService.list().subscribe(data => {
      this.theServices = data;
    })
  }

  plansList(){
    this.planService.list().subscribe(data => {
      this.thePlans = data;
    })
  }

  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      service_id:[null,[Validators.required]],
      plan_id:[null,[Validators.required]]
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getPlanService(id: number){
    this.service.view(id).subscribe(data=>{
      this.thePlanService = data;
    })
  }

  create(){
    this.trySend=true
    if (this.theFormGroup.invalid) {
      Swal.fire("Error","Please fill in the fields correctly", "error")
    } else {
      this.service.create(this.thePlanService).subscribe(data=>{
        Swal.fire("Completado","The registry has been created correctly","success")
        this.router.navigate(["planServices/list"])
      })
    }
  }

  update(){
    this.trySend=true
    if (this.theFormGroup.invalid) {
      Swal.fire("Error","Please fill in the fields correctly", "error")
    } else {
      this.service.uptate(this.thePlanService).subscribe(data=>{
        Swal.fire("Completado","The registry has been updated correctly","success")
        this.router.navigate(["planServices/list"])
      })
    }
  }

}
