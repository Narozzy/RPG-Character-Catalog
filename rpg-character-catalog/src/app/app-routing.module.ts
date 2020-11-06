import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'second',
    loadChildren: () => import('./modals/create-npc-modal/second.module').then( m => m.SecondPageModule)
  },
  {
    path: 'spell-list-modal',
    loadChildren: () => import('./modals/spell-list-modal/spell-list-modal.module').then( m => m.SpellListModalPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
