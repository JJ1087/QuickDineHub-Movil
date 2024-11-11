// src/app/perfil-usuario/perfil-usuario.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule
import { PerfilUsuarioComponent } from './perfil-usuario.component';

@NgModule({
  declarations: [PerfilUsuarioComponent],
  imports: [
    CommonModule,
    IonicModule, // Asegúrate de incluir IonicModule aquí también
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Agrega CUSTOM_ELEMENTS_SCHEMA
})
export class PerfilUsuarioModule { }
