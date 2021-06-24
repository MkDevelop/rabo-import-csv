import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'import',
    pathMatch: 'full'
  },
  {
    path: 'import',
    loadChildren: () =>
      import('./features/import/import.module').then((m) => m.ImportModule)
  },
  {
    path: '**',
    redirectTo: 'import'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
