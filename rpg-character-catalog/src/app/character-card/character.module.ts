import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { CharacterCardComponent } from './character.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    DragDropModule
  ],
  declarations: [CharacterCardComponent],
  exports: [CharacterCardComponent]
})
export class CharacterCardModule {}