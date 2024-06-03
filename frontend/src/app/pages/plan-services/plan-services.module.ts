import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanServicesRoutingModule } from './plan-services-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    PlanServicesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlanServicesModule { }
