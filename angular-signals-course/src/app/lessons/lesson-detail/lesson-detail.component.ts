import { Component, inject, input, output } from '@angular/core'
import { Lesson } from '../../models/lesson.model'
import { ReactiveFormsModule } from '@angular/forms'
import { LessonsService } from '../../services/lessons.service'
import { MessageService } from '../../messages/message.service'

@Component({
  selector: 'lesson-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.scss',
})
export class LessonDetailComponent {}
