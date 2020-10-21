import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { DmViewComponent } from './dm-view.page';
import { CommonModule } from '@angular/common';
import { SecondPageModule } from '../modals/create-npc-modal/second.module';
import { CharacterCardModule } from '../character-card/character.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GroupModule } from '../group/group.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    SecondPageModule,
    CharacterCardModule,
    DragDropModule,
    GroupModule,
  ],
  declarations: [DmViewComponent],
  exports: [DmViewComponent]
})
export class DmViewModule {}