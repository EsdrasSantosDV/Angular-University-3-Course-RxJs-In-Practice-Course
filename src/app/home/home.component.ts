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
    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;


    ngOnInit() {
      const http$:Observable<Course> = createHttpObservable('http://localhost:9000/api/courses');
      //pipe operator

      //PRECIAMOS CRIAR UMA SUBSCRIPTION
      const courses$ = http$.pipe(
        tap(()=>console.log("HTTP REQUEST EXECUTED")),
        map(
            res=> Object.values<Course>(res["payload"]),
        ),
        //VOCE UTILIZA ISSO PARA COMPARTILHAR PARA VARIAS ASSINATURAS
        //FAZENDO COM QUE POR EXEMPLO, NÃO FAÇA VARIAS REQUISIÇOES POR EXEMPLO
        shareReplay(),
      );

      //NESSE CASO AS DUAS ESTÃO PEGANDO DO MESMO HTTP
      //FAZENDO DUAS REQUISIÇOES DISTINTAS
      //E NÃO QUEREMOS ISSO
       courses$.subscribe();


      this.beginnerCourses$=courses$
        .pipe(
            map(courses=>courses.filter(course=>course.category=='BEGINNER'))
      );

      this.advancedCourses$=courses$
        .pipe(
          map(courses=>courses.filter(course=>course.category=='ADVANCED'))
        );



    }

}
