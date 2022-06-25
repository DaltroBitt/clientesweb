import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CPFPipe } from './cpf.pipe';

import { AppComponent } from './app.component';
import { CadastrarClientesComponent } from './cadastrar-clientes/cadastrar-clientes.component';
import { ConsultarClientesComponent } from './consultar-clientes/consultar-clientes.component';
import { EditarClientesComponent } from './editar-clientes/editar-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    CPFPipe,
    CadastrarClientesComponent,
    ConsultarClientesComponent,
    EditarClientesComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
