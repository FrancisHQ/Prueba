import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { ContenidoComponent } from './layout/private/contenido/contenido.component';
import { SesionComponent } from './layout/public/sesion/sesion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa el módulo
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [
    AppComponent,
    ContenidoComponent,
    SesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    TabMenuModule,
    MenuModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
