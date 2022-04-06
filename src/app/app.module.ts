import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
/* paginadore poner el selector en  clientes.component.html */
import { PaginatorComponent } from './paginator/paginator.component';
import { ClienteComponent } from './cliente/cliente.component';
/* para usar rutas, agregar en import  */
import { RouterModule, Routes } from '@angular/router';
import { DirectivaComponent } from './directiva/directiva.component';
/* conectar spring con angular, agregar a  imports  */
import{HttpClientModule} from '@angular/common/http'
import { FormComponent } from './cliente/form.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
/* usar formularios, agregar a  imports  --> cliente.html.component*/
import { FormsModule } from '@angular/forms';
import { DetalleComponent } from './cliente/detalle/detalle.component';


/* crear variable constante de tipo Routes */
const routes: Routes = [
  {path:'', redirectTo: 'directivas', pathMatch:'full'},
  {path:'clientes', component: ClienteComponent},
  {path:'directivas',component: DirectivaComponent},
  /* PAGINADOR[1] ruta para paginacion  --> cliente.service.ts*/
  {path:'clientes/page/:page', component:ClienteComponent},
   /* mapeamos nuestra ruta al componente formulario */
  /* y lo ponemos en cliente.component.html con reuterLink para que nos lleve al formulario */
  {path:'clientes/form', component:FormComponent},
  {path:'clientes/form/:id', component:FormComponent}
/* verFoto[4]  --> cliente.component.html*/
  // {path:'clientes/ver/:id', component:DetalleComponent},  /* modal[1] eliminar   --> cliente.component.ts*/

]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PaginatorComponent,
    ClienteComponent,
    DirectivaComponent,
    FormComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
