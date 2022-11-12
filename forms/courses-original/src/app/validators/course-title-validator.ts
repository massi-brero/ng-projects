import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors,
} from '@angular/forms'
import { CoursesService } from '../services/courses.service'
import { map } from 'rxjs/operators'
import { Course } from '../model/course'
import { Observable, of } from 'rxjs'

export function courseTitleValidator(
    courses: CoursesService
): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return courses.findAllCourses().pipe(
            map((courses: Course[]) => {
                const course = courses.find((course: Course) => {
                    course.description.toLowerCase() ===
                        control.value.toLowerCase()

                    return course ? { titleExists: true } : null
                })
            })
        )
    }
}
