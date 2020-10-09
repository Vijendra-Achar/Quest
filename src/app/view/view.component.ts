import { element } from 'protractor';
import * as jsPDF from 'jspdf';
import { DataService } from './../services/data.service';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {

  @ViewChild('printContent') printContent: ElementRef;

  currentQuesPaper;

  paperDetails;

  paramSub: Subscription;


  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.paramSub = this.activatedRoute.paramMap.subscribe(params => {
      this.currentQuesPaper = params.get('paperId');
      console.log(this.currentQuesPaper);
    });

    this.dataService.getOneQuesPaper(this.currentQuesPaper).subscribe(data => {
      this.paperDetails = data;
    });

  }

  // downloadPDF() {
  //   let doc = new jsPDF();

  //   let elementHandlers = {
  //     '#editor': function (element, renderer) {
  //       return true;
  //     }
  //   };

  //   let content = this.printContent.nativeElement;

  //   doc.fromHTML(content.innerHTML, 15, 15, {
  //     'width': 190,
  //     'elementHandlers': elementHandlers
  //   });

  //   doc.save('test.pdf');
  // }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }

}
