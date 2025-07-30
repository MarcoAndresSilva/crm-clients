// src/app/shared/material.module.ts
import { NgModule } from '@angular/core';

// Módulos de Angular Material que usaremos para el Layout
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ]
})
export class MaterialModule { }