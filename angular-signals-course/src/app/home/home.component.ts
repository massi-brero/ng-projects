import { afterNextRender, Component, computed, effect, inject, signal } from '@angular/core'
import { CoursesService } from '../services/courses.service'
import { Course, sortCoursesBySeqNo } from '../models/course.model'
import { MatTab, MatTabGroup } from '@angular/material/tabs'
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component'
import { MatDialog } from '@angular/material/dialog'
import { openEditDialog } from '../edit-course-dialog/edit-course-dialog.component'
import { LoadingService } from '../loading/loading.service'

@Component({
  selector: 'home',
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  #courses = signal<Course[]>([])
  beginnerCourses = computed(() => {
    const courses = this.#courses()
    return courses.filter((course: Course) => course.category === 'BEGINNER')
  })
  advancedCourses = computed(() => {
    const courses = this.#courses()
    return courses.filter((course: Course) => course.category === 'ADVANCED')
  })
  coursesService = inject(CoursesService)
  dialog = inject(MatDialog)

  constructor() {
    /* effect(() => {
      console.log('beginner courses: ', this.beginnerCourses())
      console.log('advanced courses: ', this.advancedCourses())
    })*/

    afterNextRender(() => {
      this.loadAllCourses()
    })
  }

  async loadAllCourses() {
    try {
      const courses = await this.coursesService.loadAllCourses()
      this.#courses.set(courses.sort(sortCoursesBySeqNo))
    } catch (e) {
      alert('Error Loading Courses')
      console.error(e)
    }
  }

  onCourseUpdated(updatedCourse: Course) {
    const courses = this.#courses()
    const newCourses = courses.map((course: Course) => (course.id === updatedCourse.id ? updatedCourse : course))
    this.#courses.set(newCourses)
  }

  async onCourseDeleted(id: string) {
    try {
      await this.coursesService.deleteCourse(id)
      const courses = this.#courses()
      this.#courses.set(courses.filter((course: Course) => course.id !== id))
    } catch (e) {}
  }

  async onAddCourse() {
    const newCourse = await openEditDialog(this.dialog, {
      mode: 'create',
      title: 'Add Course',
    })
    const newCourses = [...this.#courses(), newCourse]
    this.#courses.set(newCourses)
  }
}
