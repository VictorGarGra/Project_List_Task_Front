// src/app/components/task/task.component.ts

import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../task.service';
import { FormTaskComponent } from '../../components/form-task/form-task.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormTaskComponent, FormsModule],
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  title = 'Mi Lista de Tareas';
  tasks: Task[] = [];

  editingTask: Task | null = null;
  private originalTask: Task | null = null;
  public isLoading: boolean = true;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
      this.isLoading = false;
    });
  }

  onTaskAdded(newTask: Task): void {
    this.tasks.push(newTask);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  toggleTaskStatus(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe();
  }

  startEdit(task: Task): void {
    this.originalTask = { ...task };
    this.editingTask = task;
  }

  saveEdit(task: Task): void {
    if (this.editingTask) {
      this.taskService.updateTask(task).subscribe(() => {
        this.editingTask = null;
        this.originalTask = null;
      });
    }
  }

  cancelEdit(task: Task): void {
    if (this.originalTask) {
      Object.assign(task, this.originalTask);
    }
    this.editingTask = null;
    this.originalTask = null;
  }
}
