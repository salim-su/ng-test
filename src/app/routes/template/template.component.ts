import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzIconService } from 'ng-zorro-antd/icon';
@Component({
    selector: 'app-template',
    templateUrl: './template.component.html',
    styles: [],
})
export class TemplateComponent implements OnInit {
    content: any;

    picUrl = 'https://www.baidu.com/img/xinshouyedong_4f93b2577f07c164ae8efa0412dd6808.gif';

    arr1 = [];
    a: any;

    stu: Student;

    // message: string = '我是子组件的message';

    messages: string[] = ['天之骄子，加入修仙之路群', 'Shadows，加入修仙之路群', 'Keriy，加入修仙之路群'];
    msg: any;
    showMsg: number = 1;
    onCustomClicked(num: number): void {
        console.log(num);
        this.showMsg = num;
    }
    // const IconFont = Icon.createFromIconfontCN({
    //     scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    // });

    constructor(private sanitizer: DomSanitizer, private _iconService: NzIconService) {
        this.arr1 = [
            { id: '1', name: 'su1' },
            { id: '2', name: 'su2' },
            { id: '3', name: 'su3' },
            { id: '4', name: 'su4' },
            { id: '5', name: 'su5' },
            { id: '6', name: 'su6' },
        ];
        this._iconService.fetchFromIconfont({
            // scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
            scriptUrl: 'https://at.alicdn.com/t/font_1437785_elkiq2yhr67.js',
        });
    }

    ngOnInit() {
        // this.content = '<h2>我是一个模板</h2>';

        this.content = `<div><h2 style="color: red">我是一个模板</h2><h3 style="color: #ffbb96">很简单的模板</h3></div>`;

        this.content = this.sanitizer.bypassSecurityTrustHtml(this.content);

        let salimsu = 'salim';

        this.a = salimsu;

        this.stu = {
            name: 'sa',
            age: 111,
            sex: 'men',
        };

        const p1: Point = { x: 10, y: 20 };
        p1.x = 5; // error!
    }

    click1() {
        this.msg = {
            age: 1,
            name: '1',
        };
    }
    click2() {
        this.msg = {
            age: 1,
            name: '1',
        };
    }
}
interface Student {
    name: string;
    age: number;
    sex: string;
}
interface Point {
    x: number;
    readonly y: number;
}
