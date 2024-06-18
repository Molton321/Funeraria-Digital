import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserChatsRoutingModule } from './user-chats-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    UserChatsRoutingModule
  ]
})
export class UserChatsModule { }
