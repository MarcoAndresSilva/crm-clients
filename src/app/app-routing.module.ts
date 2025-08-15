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
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      { 
        path: '', redirectTo: 'dashboard', pathMatch: 'full' 
      }
    ]
  },
  { 
    path: '**', redirectTo: '' 
  }
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
