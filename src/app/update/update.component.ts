import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryModel } from 'src/app/model/CategoryModel';
import { TaskModel } from 'src/app/model/taskModel';
import { TaskService } from 'src/app/service/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  todoForm!: FormGroup;
  tasks: TaskModel[] = [];

  constructor(
    private tasksService: TaskService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateCompletion: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  updateTask() {
    let id = +this.route.snapshot.params['id'];

    this.tasksService.editTask(this.todoForm.value, id).subscribe({
      next: (res) => {
        alert("Tarefa alterada com sucesso")
        this.router.navigate([""]);
      },
      error: () => {
        alert("Erro ao alterar a tarefa")
      }
    })
  }

  categories: CategoryModel[] = [
    { value: 1, viewValue: 'Easy' },
    { value: 2, viewValue: 'Difficult' },
    { value: 3, viewValue: 'Urgent' },
    { value: 4, viewValue: 'Priority' },
  ];
}
