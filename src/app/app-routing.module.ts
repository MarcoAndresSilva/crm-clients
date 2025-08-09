import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  { 
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent, // El layout principal es el componente padre
    canActivate: [AuthGuard],
    children: [
      {
        path: 'clients',
        loadChildren: () => import('./features/clients/clients.module').then(m => m.ClientsModule)
      },
      { path: '', redirectTo: 'clients', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' } // Wildcard
];

@NgModule({
  imports: 
  [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
