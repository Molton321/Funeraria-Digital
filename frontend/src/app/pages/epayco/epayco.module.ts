import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpaycoRoutingModule } from './epayco-routing.module';
import { PaymentsComponent } from './payments/payments.component';


@NgModule({
  declarations: [
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    EpaycoRoutingModule
  ]
})
export class EpaycoModule { }
