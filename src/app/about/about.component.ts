import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {fromEvent, interval, noop, Observable, timer} from 'rxjs';
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



    const numbers = interval(1000);

    const vezes100$=numbers.pipe(map(res=>res*100));

    vezes100$.subscribe((res)=>console.log(res));





  }

}


