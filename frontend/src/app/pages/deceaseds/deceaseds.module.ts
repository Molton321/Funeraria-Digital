import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeceasedsRoutingModule } from './deceaseds-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    DeceasedsRoutingModule
  ]
})
export class DeceasedsModule { }
