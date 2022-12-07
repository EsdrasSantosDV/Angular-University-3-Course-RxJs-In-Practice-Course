import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {concat, fromEvent, interval, merge, noop, Observable, of, Subject, timer} from 'rxjs';
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

    //O que é um Sujeito? Um Subject RxJS é um tipo especial de Observable
    // que permite que os valores sejam multicast para muitos Observers.
    const subject =new Subject();

    subject.subscribe(console.log);

    subject.subscribe(console.log);

    subject.next(1);
    subject.next(1);
    subject.next(2);
    subject.next(1);


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


