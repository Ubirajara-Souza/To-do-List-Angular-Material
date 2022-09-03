import { RegisterComponent } from './register/register.component';
import { TodoComponent } from './todo/todo.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', component: TodoComponent,
  },
  {
    path: 'task', component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
