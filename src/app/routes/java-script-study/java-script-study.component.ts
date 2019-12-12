import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-java-script-study',
    templateUrl: './java-script-study.component.html',
    styles: [],
})
export class JavaScriptStudyComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        let person = { fname: 'John', lname: 'Doe', age: 25 };
        for (let personKey in person) {
            console.log(personKey);
        }

        let arrary = [
            { fname: 'John1', lname: 'Doe1', age: 25 },
            { fname: 'John2', lname: 'Doe2', age: 26 },
            { fname: 'John3', lname: 'Doe3', age: 27 },
            { fname: 'John4', lname: 'Doe4', age: 28 },
            { fname: 'John5', lname: 'Doe5', age: 29 },
        ];
        console.log(typeof arrary);
        arrary.forEach(res => {
            console.log(res);
        });
        this.myFunction();

        console.log('John'.constructor.name);
        console.log((123).constructor.name);
        console.log([1, 2, 3, 4].constructor.name);
        console.log({ name: 'John', age: 34 }.constructor.name);
    }

    myFunction() {
        let x = '';
        for (let i = 0; i < 10; i++) {
            if (i == 3) {
                break;
            }
            x = x + '该数字为 ' + i + '<br>';
        }
        console.log(x);
    }
}
