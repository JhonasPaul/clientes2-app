import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ClienteComponent } from './cliente/cliente.component';
import { RouterModule, Routes } from '@angular/router';
import { DirectivaComponent } from './directiva/directiva.component';
import{HttpClientModule} from '@angular/common/http'
import { FormComponent } from './cliente/form.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DetalleComponent } from './cliente/detalle/detalle.component';



const routes: Routes = [
  {path:'', redirectTo: 'directivas', pathMatch:'full'},
  {path:'clientes', component: ClienteComponent},
  {path:'directivas',component: DirectivaComponent},
  {path:'clientes/page/:page', component:ClienteComponent},
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
