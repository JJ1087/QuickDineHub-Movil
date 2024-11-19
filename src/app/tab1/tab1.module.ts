import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';

import { ProductQuickviewComponent } from '../components/product-quickview/product-quickview.component';
import { PerfilUsuarioComponent } from '../perfil-usuario/perfil-usuario.component';
//import { FeedbackFormularioComponent } from '../components/feedback-formulario/feedback-formulario.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [
    Tab1Page,
    ProductQuickviewComponent,
    PerfilUsuarioComponent,
    //FeedbackFormularioComponent
  
  ]
})
export class Tab1PageModule {}
