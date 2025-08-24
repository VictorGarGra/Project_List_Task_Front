// src/app/task-form/task-form.component.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../../task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-task.component.html',
})
export class FormTaskComponent {
  @Output() taskAdded = new EventEmitter<Task>();
  newTaskDescription: string = '';

  constructor(private taskService: TaskService) {}

  addTask(): void {
    if (this.newTaskDescription.trim()) {
      this.taskService
        .createTask(this.newTaskDescription)
        .subscribe((newTask) => {
          this.taskAdded.emit(newTask);
          this.newTaskDescription = '';
        });
    }
  }
}
