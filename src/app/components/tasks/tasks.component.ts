import { Component, OnInit } from '@angular/core';

import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  //Service importieren, um die Daten zu empfangen 
  constructor(private taskService: TaskService) { }

  //Sobald die Komponente geladen wird, werden die Tasks aus dem Service abgeholt und in den Task Array gestellt
  //Mit dem Observer, welcher als return-Wert in der Methode getTasks im definiert wurde, kann man nun diese Methode subscriben und mit einer Lambda 
  //der Variabel tasks zuweisen
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  deleteTask(task: Task){
      this.taskService
        //Im service die Methode aufrufen, welche die Tasks löscht. Dies geschieht, wenn der Knopf gedrückt wird, welcher diese Methode triggered
        .deleteTask(task)
        //wenn es gelöscht ist, dann (THEN) soll es auch nicht mehr auf dem UI angezeigt werden
        .subscribe(
          ()=> this.tasks = this.tasks.filter(t => t.id !== task.id));
  }

  toggleReminder(task: Task){
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

}
