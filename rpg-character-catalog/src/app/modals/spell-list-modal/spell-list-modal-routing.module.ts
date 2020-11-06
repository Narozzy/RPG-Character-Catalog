import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpellListModalPage } from './spell-list-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SpellListModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpellListModalPageRoutingModule {}
