import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [ // Si creas un nuevo componente, ¡debes declararlo aquí para que Angular lo reconozca!
    AppComponent // Aquí se declaran TODOS los componentes, directivas y pipes de este módulo.
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Aquí se importan OTROS MÓDULOS que necesitemos.
  ],
  providers: [], // Es el lugar para registrar servicios que estarán disponibles para toda la aplicación.
  bootstrap: [AppComponent] // Aquí se indica con cual componente se inicia en la APP.
})
export class AppModule { }
