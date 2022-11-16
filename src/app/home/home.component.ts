import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    beginnerCourses: Course[];
    advancedCourses: Course[];


    ngOnInit() {
      const http$ = createHttpObservable('http://localhost:9000/api/courses');
      //pipe operator
      const courses$=http$.pipe(
        map(
          res=> Object.values<Course>(res["payload"])
        )
      );
      courses$.subscribe(courses => {
          this.beginnerCourses=courses.filter(course=>course.category=='BEGINNER')
          console.log(this.beginnerCourses);
          this.advancedCourses=courses.filter(course=>course.category=='ADVANCED')
          console.log(this.advancedCourses);
        },
        noop,
        ()=>console.log('complete')
      );


    }

}
