import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {concat, fromEvent, interval, noop, Observable, of, timer} from 'rxjs';
import {createHttpObservable} from '../common/util';
import {map} from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    //NESSE CASO DO INTERVALL NUNCA VAMOS VER O FLUXO 2 E 32
    const source1$=interval(1000);

    const source2$=of(4,5,6);

    const source3$=of(7,8,9);

    const result$=concat(
      source1$,
      source2$,
      source3$,
    )

    result$.subscribe(console.log);







  }

}


