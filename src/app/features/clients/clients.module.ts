import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { MaterialModule } from '../../shared/material.module';


@NgModule({
  declarations: [
    ClientListComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ClientsModule { }
