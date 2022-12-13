import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay, first, take
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, forkJoin} from 'rxjs';
import {Lesson} from '../model/lesson';
import {createHttpObservable} from '../common/util';
import {debug, RxJsLoggingLevel} from '../common/debug';
import {Store} from '../common/store.service';
import {logging} from 'protractor';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    courseId:number;
    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;

    course:Course;

    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute,private store:Store) {
    }

    ngOnInit() {
      this.courseId = this.route.snapshot.params['id'];
      //const course$ = createHttpObservable(`http://localhost:9000/api/courses/${this.courseId}`);



      this.course$=this.store.selectCourseById(this.courseId);


      this.loadLessons().pipe(withLatestFrom(this.course$)).subscribe(([lessons,course])=>{
        console.log("lessons",lessons);
        console.log("course",course);
      });





    }

    ngAfterViewInit() {



      //VAMOS CRIAR UM EVENTO
      //TAMOS CRIANDO UM FLUXO LIGANDO O INPUT DO CAMPO DE PESQUISA, AO EVENTO DE KEYUP
      this.lessons$=fromEvent<any>(this.input.nativeElement,'keyup').pipe(
        map(event=>event.target.value),
        //START WITH E O VALOR INCIIAL DO NOSSO FLUXO
        startWith(''),

        //Debounce time descarta os valores emitidos que levam menos que o tempo especificado
        //entre a saida
        //atrasa os valores emitidos por uma fonte para o devido tempo dado.
        // Se dentro desse tempo chegar um novo valor, o valor pendente anterior é descartado e o cronômetro é zerado.
        // Dessa forma, debounceTimerastreia
        //o valor mais recente e emite esse valor mais recente quando o tempo devido é passado
        debounceTime(400),
        //é evitar emissões duplicadas dos valores nas entradas.
        distinctUntilChanged(),
        switchMap(search=> this.loadLessons(search)),

        );



    }



    loadLessons(search = ''): Observable<Lesson[]> {
      return createHttpObservable(
        `http://localhost:9000/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
        .pipe(
          map(res => res["payload"])
        );
    }


}
