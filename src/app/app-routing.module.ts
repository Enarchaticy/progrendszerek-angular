import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./edit/edit.module').then((m) => m.EditModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./list/list.module').then((m) => m.ListModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./error/error.module').then((m) => m.ErrorModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
