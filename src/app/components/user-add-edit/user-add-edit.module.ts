import { UserAddEditRoutingModule } from './user-add-edit-routing.module';
import { UserAddEditComponent } from './user-add-edit.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserAddEditRoutingModule
    ],
    declarations: [
        UserAddEditComponent
    ]
})
export class UserAddEditModule { }