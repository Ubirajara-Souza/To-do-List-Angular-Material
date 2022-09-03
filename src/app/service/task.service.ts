import { TaskModel } from './../model/taskModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  urlBase: string = "http://localhost:3000/tasks";

  constructor(private http : HttpClient ) {}

  addTask(task: TaskModel) : Observable<TaskModel>{
    task.dateCompletion = moment(task.dateCompletion).format('DD-MM-YYYY');
    return this.http.post<TaskModel>(this.urlBase, task)
  }

  getTask() : Observable<TaskModel[]>{
      return this.http.get<TaskModel[]>(this.urlBase)
  }

  deleteTask(id: number) : Observable<TaskModel>{
    return this.http.delete<TaskModel>(this.urlBase + '/'+ id)
  }

  editTask(task: TaskModel, id: number) : Observable<TaskModel>{
    task.dateCompletion = moment(task.dateCompletion).format('DD-MM-YYYY');
    return this.http.put<TaskModel>(this.urlBase + '/' + id, task)
  }
}
