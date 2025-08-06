import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [ // Si creas un nuevo componente, ¡debes declararlo aquí para que Angular lo reconozca! Aquí se declaran TODOS los componentes, directivas y pipes de este módulo.
    AppComponent 
  ],
  imports: [ // Aquí se importan OTROS MÓDULOS que necesitemos.
    BrowserModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    LayoutModule
  ],
  providers: [ // Es el lugar para registrar servicios que estarán disponibles para toda la aplicación.
        provideHttpClient()
  ], 
  bootstrap: [AppComponent] // Aquí se indica con cual componente se inicia en la APP.
})
export class AppModule { }
