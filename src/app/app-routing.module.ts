import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'user-list', loadChildren : () => import('./components/user-list/user-list.module').then(x => x.UserListModule)},
    { path: 'user-add-edit', loadChildren: () => import('./components/user-add-edit/user-add-edit.module').then(x => x.UserAddEditModule) },

    // otherwise redirect to user-list
    { path: '**', redirectTo: 'user-list' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }