import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {fromEvent} from 'rxjs';
import {concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Store} from '../common/store.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

    form: FormGroup;
    course:Course;

    @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

    @ViewChild('searchInput', { static: true }) searchInput : ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,
        private store:Store
      ) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngOnInit() {
      this.form.valueChanges
        .pipe(
        // EMITE VALORES QUE PASSOU NA CONDIÇAÕ
          filter(()=>this.form.valid),
          //O MERGE MAP NÃO PRECISA ESPERAR CADA RODADA DE MERGE TERMINAR, ELE FAZ DE FORMA PARARELA
         //ELE E O MELHOR PRA MELHORAR A PERFORMACE DE UM HTTP REQUEST EM PARARELO
          concatMap(changes=>this.saveCourse(changes)),
        )
        .subscribe();
    }

    saveCourse(changes){
      return fromPromise(fetch(`http://localhost:9000/api/courses/${this.course.id}`,{
        method:'PUT',
        body:JSON.stringify(changes),
        headers:{
          'content-type':'application/json'
        }
      }));
    }

    ngAfterViewInit() {
      fromEvent(this.saveButton.nativeElement,'click').pipe(
        //VAI MAPEAR O OBSERVABLE, E IGRNOAR OS VALROES DO PRIMEIRO ATE QUE O SEGUNDO OBSERVABEL SEJA CONCLUIDO
        exhaustMap(changes=>this.saveCourse(this.form.value))

      ).subscribe();

    }



    close() {
        this.dialogRef.close();
    }

  save() {
      this.store.saveCourse(this.course.id,this.form.value)
        .subscribe(()=> this.close(),
          err=>console.log("Error saving course",err)
          );
      ;
  }
}
