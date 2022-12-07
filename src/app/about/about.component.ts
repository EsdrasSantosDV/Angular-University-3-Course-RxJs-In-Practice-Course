import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AsyncSubject, BehaviorSubject, concat, fromEvent, interval, merge, noop, Observable, of, ReplaySubject, Subject, timer} from 'rxjs';
import {createHttpObservable} from '../common/util';
import {map} from 'rxjs/operators';
import {Course} from '../model/course';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {


    //O ASYNC SUBJECT EMITE O ULTIMO DEPOIS DE COMPLETAR
    //O REPLAY EMITE TODOS OS VALORES ANTES DE COMPLETAR
   // const subject =new AsyncSubject();
    const subject =new ReplaySubject();
    const series$=subject.asObservable();

    series$.subscribe(console.log);



    subject.next(1);
    subject.next(2);
    subject.next(3);



    setTimeout(()=>{
      series$.subscribe(console.log);
      subject.next(4);
    },3000);

   //  //NESSE CASO DO INTERVALL NUNCA VAMOS VER O FLUXO 2 E 32
   //  const source1$=interval(1000);
   //
   //  const source2$=of(4,5,6);
   //
   //  const source3$=of(7,8,9);
   //
   //  const result$=concat(
   //    source1$,
   //    source2$,
   //    source3$,
   //  )
   // // result$.subscribe(console.log);
   //  const interval1$=interval(1000);
   //  const interval3$=interval(10000);
   //  const insterval2$=interval1$.pipe(map(val=>10*val));
   //  //TRANSFORMA VARIOS OBSERVABLES EM UM SO
   //  const result2$=merge(interval1$,insterval2$,interval3$);
   // // result2$.subscribe(console.log)
   //
   //  const int1$= interval(1000);
   //
   //  const sub= int1$.subscribe();
   //
   //  setTimeout(()=>sub.unsubscribe(),5000);
   //
   //  const http$:Observable<Course> = createHttpObservable('http://localhost:9000/api/courses');
   //
   //  http$.subscribe(console.log);
   //  const sub1= http$.subscribe();
   //  setTimeout(()=>sub1.unsubscribe(),0);

  }

}


