import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { ClientFormComponent } from './pages/client-form/client-form.component';

const routes: Routes = [
    { 
    path: 'new', 
    component: ClientFormComponent 
    },
    { 
      path: '', 
      component: ClientListComponent 
    },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClientsRoutingModule { }
