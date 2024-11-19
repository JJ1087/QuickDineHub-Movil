// src/app/perfil-usuario/perfil-usuario.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PerfilUsuarioComponent
    
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule// Asegúrate de incluir IonicModule aquí también
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Agrega CUSTOM_ELEMENTS_SCHEMA
})
export class PerfilUsuarioModule { }
