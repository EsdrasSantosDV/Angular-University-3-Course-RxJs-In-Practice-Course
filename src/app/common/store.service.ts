import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, timer} from 'rxjs';
import {Course} from '../model/course';
import {createHttpObservable} from './util';
import {delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';

@Injectable({
  //PRA SE TORNAR PRA TODA A APLICAÇÃO
  providedIn:'root'
})
export  class Store{
  private subject=new BehaviorSubject<Course[]>([]);
  courses$:Observable<Course[]>= this.subject.asObservable();


  init()
  {
    const http$:Observable<Course> = createHttpObservable('http://localhost:9000/api/courses');
    //pipe operator

    //PRECIAMOS CRIAR UMA SUBSCRIPTION
     http$.pipe(
      tap(()=>console.log("HTTP REQUEST EXECUTED")),
      map(
        res=> Object.values<Course>(res["payload"]),
      ),
      //VOCE UTILIZA ISSO PARA COMPARTILHAR PARA VARIAS ASSINATURAS
      //FAZENDO COM QUE POR EXEMPLO, NÃO FAÇA VARIAS REQUISIÇOES POR EXEMPLO


    ).subscribe(
      courses=>this.subject.next(courses)

     );

    //NESSE CASO AS DUAS ESTÃO PEGANDO DO MESMO HTTP
    //FAZENDO DUAS REQUISIÇOES DISTINTAS
    //E NÃO QUEREMOS ISSO
  }


  selectBeginnerCourses() {
    return this.filterByCategory('BEGINNER');
  }

  selectAdvancedCourses() {
    return this.filterByCategory('ADVANCED');
  }

  filterByCategory(category:string){
    return this.courses$.pipe(
      map(courses=>courses.filter(course=>course.category==category))
    );
  }




}
