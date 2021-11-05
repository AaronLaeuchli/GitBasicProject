import { Injectable } from '@angular/core';
import { Task } from '../Task';
import { TASKS } from '../mock-tasks';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders} from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]>{
    //Mit dem of wird der TASKS Array zu einem Observable Array vom Typ Task konvertiert, damit er mitgegeben werden kann
    //const tasks = of(TASKS);
    //return tasks;

    //Über den HttpRequest werden die Daten aus meinem Mock-Server importiert (get)
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(task: Task): Observable<Task>{
    const urlToDelete = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(urlToDelete);
  } 

  updateTaskReminder(task: Task): Observable<Task>{
    const urlToUpdate = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(urlToUpdate, task, httpOptions);
  }
}
