import {AsyncFactoryFn} from '@angular/cdk/testing';
import {AbstractControl} from '@angular/forms';
import {CoursesService} from '../services/courses.service';
import {map} from 'rxjs/operators';

export function courseTitleValidator(coursesService: CoursesService): AsyncFactoryFn< {
  return (control: AbstractControl) => {
    return coursesService.findAllCourses()
      .pipe(
        map(courses => {
          const titleExists = courses.find(course => course.description.toLowerCase() == control.value.toLowerCase());

          return titleExists ? {titleExists: true} : null;
        })
      );
  }
}
