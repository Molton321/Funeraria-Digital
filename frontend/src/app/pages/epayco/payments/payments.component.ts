import { Component, OnInit } from '@angular/core';
import {loadStripe,Stripe} from '@stripe/stripe-js'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  handler: any;
  data: any;
  private stripe: Stripe;
  private elements

  constructor() {  }

  async ngOnInit() {
    this.stripe = await loadStripe(environment.stripe_public_key);
    console.log(this.stripe);
  }

  pay(){
    this.handler.open(this.data);
  }

  initForm(){
    this.elements = this.stripe.elements();
    const cardElement = this.elements.create('card');
    cardElement.mount('.header bg-gradient-danger pb-8 pt-5 pt-md-8')
  }


}
