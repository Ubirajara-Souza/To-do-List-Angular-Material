import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryModel } from 'src/app/model/CategoryModel';
import { TaskModel } from 'src/app/model/taskModel';
import { TaskService } from 'src/app/service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  todoForm!: FormGroup;
  tasks: TaskModel[] = [];
  updateId!: number;

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

  addTask() {
    if (this.todoForm.valid) {
      this.tasksService.addTask(this.todoForm.value).subscribe({
        next: (res) => {
          alert("Tarefa adicionada com sucesso")
          this.router.navigate([""]);
        },
        error:() => {
          alert("Erro ao adicionada a tarefa")
        }
      })
    }
  }

  categories: CategoryModel[] = [
    {value: 1, viewValue: 'Easy'},
    {value: 2, viewValue: 'Difficult'},
    {value: 3, viewValue: 'Urgent'},
    {value: 4, viewValue: 'Priority'},
  ];

}
