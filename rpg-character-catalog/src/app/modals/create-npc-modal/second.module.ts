import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SecondPageRoutingModule } from './second-routing.module';
import { CreateNpcModal } from './second.page';
import { CamelCaseTransformModule } from '../../pipes/camel-case-transform/camel-case-transform.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SecondPageRoutingModule,
    CamelCaseTransformModule
  ],
  declarations: [CreateNpcModal],
  exports:[CreateNpcModal]
})
export class SecondPageModule {}
