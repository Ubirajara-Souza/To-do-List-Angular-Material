import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskModel } from '../model/taskModel';

import * as moment from 'moment';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm!: FormGroup;
  tasks: TaskModel[] = [];
  inProgress: TaskModel[] = [];
  done: TaskModel[] = [];
  updateId!: any;
  isEditEnabled: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateCompletion: ['', Validators.required]
    });
  }

  addTask() {
    let dateFormat = this.todoForm.value.dateCompletion;

    this.tasks.push({
      title: this.todoForm.value.title,
      description: this.todoForm.value.description,
      dateCompletion: moment(dateFormat).format('DD-MM-YYYY'),
      done: false
    });
    this.todoForm.reset();
  }

  deleteTask(i: number) {
    this.tasks.slice(i, 1)
  }

  editTask(task: TaskModel, i: number) {
    this.todoForm.controls['title'].setValue(task.title);
    this.todoForm.controls['description'].setValue(task.description);
    this.todoForm.controls['dateCompletion'].setValue(task.dateCompletion);
    this.updateId = i;
    this.isEditEnabled = true;
  }

  updateTask() {
    this.tasks[this.updateId].title = this.todoForm.value.title;
    this.tasks[this.updateId].description = this.todoForm.value.description;
    this.tasks[this.updateId].dateCompletion = this.todoForm.value.dateCompletion;
    this.tasks[this.updateId].done = false;

    this.todoForm.reset();
    this.updateId = undefined;
    this.isEditEnabled = false;
  }

  listTask(event: CdkDragDrop<TaskModel[]>) {
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
