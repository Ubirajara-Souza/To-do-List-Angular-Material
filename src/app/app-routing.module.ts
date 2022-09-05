import { RegisterComponent } from './register/register.component';
import { TodoComponent } from './todo/todo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateComponent } from './update/update.component';

export const routes: Routes = [
  {
    path: '', component: TodoComponent,
  },
  {
    path: 'task', component: RegisterComponent
  },
  {
    path: 'task/update/', component: UpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
