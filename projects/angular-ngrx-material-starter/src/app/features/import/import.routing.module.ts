import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportComponent } from './import/import.component';

const routes: Routes = [
  {
    path: '',
    component: ImportComponent,
    data: { title: 'anms.menu.settings' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportRoutingModule {}
