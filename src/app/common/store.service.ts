import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, timer} from 'rxjs';
import {Course} from '../model/course';
import {createHttpObservable} from './util';
import {delayWhen, filter, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {COURSES} from '../../../server/db-data';
import {fromPromise} from 'rxjs/internal-compatibility';

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


  saveCourse(courseId:number,changes):Observable<any> {
     const courses=this.subject.getValue();

     const courseIndex=courses.findIndex(course=>course.id ==courseId);

     const newCourses=courses.slice(0);

      newCourses[courseIndex]={
        ...courses[courseIndex],
        ...changes
      };

      this.subject.next(newCourses);

    return fromPromise(fetch(`http://localhost:9000/api/courses/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }));
  }

  selectCourseById(courseId:number) {
    return this.courses$.pipe(
      map(courses=>courses.find(course=>course.id==courseId)),
      filter(course=>!!course)
    );
  }
}
