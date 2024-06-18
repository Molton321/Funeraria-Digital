import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuneralHomesRoutingModule } from './funeral-homes-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    FuneralHomesRoutingModule
  ]
})
export class FuneralHomesModule { }
