import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpellListModalPageRoutingModule } from './spell-list-modal-routing.module';

import { SpellListModalPage } from './spell-list-modal.page';
import { SpellCardModule } from '../../spell-card/spell-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpellListModalPageRoutingModule,
    SpellCardModule
  ],
  declarations: [SpellListModalPage]
})
export class SpellListModalPageModule {}
