import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription as SubscriptionModel } from 'src/app/models/subscription/subscription.model';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { Plan as PlanModel} from 'src/app/models/plan/plan.model';
import { Client as ClientModel } from 'src/app/models/client/client.model';
import { PlanService } from 'src/app/services/plan/plan.service';
import { ClientService } from 'src/app/services/client/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1->view, 2 ->create, 3->update
  theSubscription: SubscriptionModel;
  theFormGroup: FormGroup;
  trySend: boolean
  theClients: ClientModel[];
  thePlans: PlanModel[];

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: SubscriptionService, 
    private clientService: ClientService, 
    private planService: PlanService, 
    private router: Router, 
    private theFormBuilder: FormBuilder
  ) { 
    this.trySend=false
    this.mode = 1;
    this.theClients = [];
    this.thePlans = [];
    this.theSubscription = { id: null, subscription_start_date: null, subscription_end_date: null, subscription_number_of_beneficiaries: null, plan_id: null, client_id: null };
  }

  ngOnInit(): void {
    this.clientsList()
    this.plansList()
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
      this.theSubscription.id = this.activateRoute.snapshot.params.id;
      this.getSubscription(this.theSubscription.id);
    }
  }

  clientsList(){
    this.clientService.list().subscribe(data => {
      this.theClients = data;
      console.log(this.theClients);
      
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
      subscription_start_date:[null,[Validators.required]],
      subscription_end_date:[null,[Validators.required]],
      subscription_number_of_beneficiaries:[null,[Validators.required]],
      plan_id:[null,[Validators.required]],
      client_id:[null,[Validators.required]],
      
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getSubscription(id: number){
    this.service.view(id).subscribe(data=>{
      this.theSubscription = data;
    })
  }

  create(){
    this.trySend=true
    if (this.theFormGroup.invalid) {
      Swal.fire("Error","Please fill in the fields correctly", "error")
    } else {
      this.service.create(this.theSubscription).subscribe(data=>{
        Swal.fire("Completado","The registry has been created correctly","success")
        this.router.navigate(["subscriptions/list"])
      })
    }
  }

  update(){
    this.trySend=true
    if (this.theFormGroup.invalid) {
      Swal.fire("Error","Please fill in the fields correctly", "error")
    } else {
      this.service.uptate(this.theSubscription).subscribe(data=>{
        Swal.fire("Completado","The registry has been updated correctly","success")
        this.router.navigate(["subscriptions/list"])
      })
    }
  }

}
