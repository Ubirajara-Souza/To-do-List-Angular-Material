import { TaskService } from './../service/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../model/taskModel';
import { Router } from '@angular/router';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks: TaskModel[] = [];
  tasksDifficult: TaskModel[] = [];
  tasksUrgent: TaskModel[] = [];
  tasksPriority: TaskModel[] = [];
  done: TaskModel[] = [];

  constructor(
    private tasksService: TaskService,
    private router: Router,
    private register: UpdateComponent
  ) { }

  ngOnInit(): void {
   this.getTask();
  }

  getTask() {
    this.tasksService.getTask().subscribe({
      next: (res) => {
        this.tasks = res;
        this.tasksDifficult = res;
        this.tasksUrgent = res;
        this.tasksPriority = res;
      },
      error:() => {
        alert("Erro ao listas as Tarefas")
      }
    })
  }

  deleteTask(id: number) {
    this.tasksService.deleteTask(id).subscribe({
      next: (res) => {
        alert("Tarefa excluída com sucesso")
        this.getTask();
      },
      error:() => {
        alert("Erro ao excluír a tarefa")
      }
    })
  }

 editTask(id: number) {
    this.router.navigate(["/task/update/"]);
    this.register.editTask(id);
  }

  drop(event: CdkDragDrop<TaskModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
