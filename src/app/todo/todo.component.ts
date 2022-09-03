import { TaskService } from './../service/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskModel } from '../model/taskModel';
import { CategoryModel } from '../model/CategoryModel';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm!: FormGroup;
  tasks: TaskModel[] = [];
  tasksDifficult: TaskModel[] = [];
  tasksUrgent: TaskModel[] = [];
  tasksPriority: TaskModel[] = [];
  done: TaskModel[] = [];
  updateId!: number;
  isEditEnabled: boolean = false;

  constructor(
    private tasksService: TaskService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
   this.getTask();

    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateCompletion: ['', Validators.required],
      category: ['', Validators.required]
    });
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

  addTask() {
    if (this.todoForm.valid) {
      this.tasksService.addTask(this.todoForm.value).subscribe({
        next: (res) => {
          alert("Tarefa adicionada com sucesso")
          this.todoForm.reset();
          this.getTask();
        },
        error:() => {
          alert("Erro ao adicionada a tarefa")
        }
      })
    }
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

  editTask(task: TaskModel, id: number) {
    this.todoForm.controls['title'].setValue(task.title);
    this.todoForm.controls['description'].setValue(task.description);
    this.todoForm.controls['category'].setValue(task.category);
    this.updateId = id;
    this.isEditEnabled = true;
  }

  updateTask() {
    this.tasksService.editTask(this.todoForm.value, this.updateId).subscribe({
      next: (res) => {
        alert("Tarefa alterada com sucesso")
        this.getTask();
      },
      error:() => {
        alert("Erro ao alterar a tarefa")
      }
    })

    this.todoForm.reset();
    this.updateId = 0;
    this.isEditEnabled = false;
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

  categories: CategoryModel[] = [
    {value: 1, viewValue: 'Easy'},
    {value: 2, viewValue: 'Difficult'},
    {value: 3, viewValue: 'Urgent'},
    {value: 4, viewValue: 'Priority'},
  ];

}
