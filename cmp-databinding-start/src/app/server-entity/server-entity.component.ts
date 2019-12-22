import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-entity',
  templateUrl: './server-entity.component.html',
  styleUrls: ['./server-entity.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ServerEntityComponent implements
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

  @Input() entity: {
    type: string,
    name: string,
    content: string
  };
  @Input() name: string;
  @ViewChild('heading', { static: true }) header: ElementRef;
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef;

  constructor() {
    console.log('entity constructor called');
  }

  ngOnInit() {
    console.log('onInit called');
    console.log('content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called');
    console.log(changes);
  }

  ngDoCheck() {
    console.log('ngDoCheck was called');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit was called');
    console.log('content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked was called');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit was called');
    console.log('header' + this.header.nativeElement.textContent);
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked was called');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy was called');
  }
}
