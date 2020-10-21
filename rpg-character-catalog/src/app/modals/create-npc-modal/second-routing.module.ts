import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNpcModal } from './second.page';

const routes: Routes = [
  {
    path: '',
    component: CreateNpcModal
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecondPageRoutingModule {}
