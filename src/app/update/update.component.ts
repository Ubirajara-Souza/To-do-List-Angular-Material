import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryModel } from 'src/app/model/CategoryModel';
import { TaskModel } from 'src/app/model/taskModel';
import { TaskService } from 'src/app/service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  todoForm!: FormGroup;
  tasks: TaskModel[] = [];
  updateId: number = 0;

  constructor(
    private tasksService: TaskService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateCompletion: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  editTask(id: number) {
    this.updateId = id;
  }

  updateTask() {
    this.tasksService.editTask(this.todoForm.value, this.updateId).subscribe({
      next: (res) => {
        alert("Tarefa alterada com sucesso")
        this.router.navigate([""]);
      },
      error: () => {
        alert("Erro ao alterar a tarefa")
      }
    })
    this.updateId = 0;
  }

  categories: CategoryModel[] = [
    { value: 1, viewValue: 'Easy' },
    { value: 2, viewValue: 'Difficult' },
    { value: 3, viewValue: 'Urgent' },
    { value: 4, viewValue: 'Priority' },
  ];
}
