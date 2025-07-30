import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent // Aquí se declaran TODOS los componentes, directivas y pipes de este módulo.
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Aquí se importan OTROS MÓDULOS que necesitemos.
  ],
  providers: [], // Aquí se declaran los SERVICIOS que necesitemos.
  bootstrap: [AppComponent] // Aquí se indica con cual componente se inicia en la APP.
})
export class AppModule { }
