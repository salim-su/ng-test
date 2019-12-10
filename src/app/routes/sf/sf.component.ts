import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
    selector: 'app-sf',
    templateUrl: './sf.component.html',
    styles: [],
})
export class SfComponent implements OnInit, OnChanges {
    @Input() msg: any;
    @Output() customClick = new EventEmitter<number>();

    onClciked() {
        this.customClick.emit(99);
        // alert(11111111);
    }

    click1() {
        alert('salimsu');
        console.log(111111111);
    }
    constructor() {}

    ngOnInit() {}

    schema: SFSchema = {
        properties: {
            email: {
                type: 'string',
                title: '邮箱',
                format: 'email',
                maxLength: 20,
            },
            name: {
                type: 'string',
                title: '姓名',
                minLength: 3,
            },
            mobileNumber: { type: 'string', title: '手机号', pattern: '^1[0-9]{10}$' },
        },
    };

    ui: SFUISchema = {
        '*': {
            spanLabelFixed: 100,
            grid: { span: 24 },
        },
        $mobileNumber: {
            widget: 'string',
            errors: { pattern: '请输入11位手机号码' },
        },
    };

    submit(value: any) {}

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        console.log(changes.msg.currentValue);
        if (changes.msg.currentValue == changes.msg.previousValue) {
            console.log('前后数据一致');
        } else {
            console.log('前后数据不一致');
        }
    }
}
