import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';

import { PasarelaPagosComponent } from '../components/pasarela-pagos/pasarela-pagos.component';
import { FeedbackFormularioComponent } from '../components/feedback-formulario/feedback-formulario.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule
  ],
  declarations: [
    Tab2Page,
    PasarelaPagosComponent,
    FeedbackFormularioComponent
  ]
})
export class Tab2PageModule {}
