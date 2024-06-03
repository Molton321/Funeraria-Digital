import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment as PaymentModel } from 'src/app/models/payment/payment.model';
import { Subscription as SubscriptionModel } from 'src/app/models/subscription/subscription.model';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1->view, 2 ->create, 3->update
  thePayment: PaymentModel;
  theFormGroup: FormGroup;
  trySend: boolean
  theSubscriptions: SubscriptionModel[];

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: PaymentService, 
    private subscriptionService: SubscriptionService, 
    private router: Router, 
    private theFormBuilder:FormBuilder
  ) { 
    this.trySend=false
    this.mode = 1;
    this.theSubscriptions = [];
    this.thePayment = { id: null, payment_date: null, payment_amount: null, payment_method: '', subscription_id: null };
  }

  ngOnInit(): void {
    this.subscriptionsList()
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
      this.thePayment.id = this.activateRoute.snapshot.params.id;
      this.getPayment(this.thePayment.id);
    }
  }

  subscriptionsList(){
    this.subscriptionService.list().subscribe(data => {
      this.theSubscriptions = data;
    })
  }

  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      payment_date:[null,[Validators.required]],
      payment_amount:[null,[Validators.required,Validators.min(0),Validators.max(10000000)]],
      payment_method:[null,[Validators.required]],
      subscription_id:[null,[Validators.required]]
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getPayment(id: number){
    this.service.view(id).subscribe(data=>{
      this.thePayment = data;
    })
  }

  create(){
    this.trySend=true
    if (this.theFormGroup.invalid) {
      Swal.fire("Error","Please fill in the fields correctly", "error")
    } else {
      this.service.create(this.thePayment).subscribe(data=>{
        Swal.fire("Completado","The registry has been created correctly","success")
        this.router.navigate(["payments/list"])
      })
    }
  }

  update(){
    this.trySend=true
    if (this.theFormGroup.invalid) {
      Swal.fire("Error","Please fill in the fields correctly", "error")
    } else {
      this.service.uptate(this.thePayment).subscribe(data=>{
        Swal.fire("Completado","The registry has been updated correctly","success")
        this.router.navigate(["payments/list"])
      })
    }
  }

}
