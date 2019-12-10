import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-element',
    templateUrl: './element.component.html',
    styles: [],
})
export class ElementComponent implements OnInit {
    @ViewChild('pieNode', { static: true }) private mountNode: ElementRef;

    constructor(private ele: ElementRef) {}

    ngOnInit() {
        console.dir(this.ele.nativeElement.querySelector('salimsu'));
        console.dir(this.mountNode.nativeElement);
    }
}
