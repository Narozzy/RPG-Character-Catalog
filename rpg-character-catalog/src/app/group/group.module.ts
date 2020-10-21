import { NgModule } from "@angular/core";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { GroupComponent } from './group.page';
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common';
import { CharacterCardModule } from '../character-card/character.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    DragDropModule,
    CharacterCardModule
  ],
  declarations: [GroupComponent],
  exports: [GroupComponent]
})
export class GroupModule {}