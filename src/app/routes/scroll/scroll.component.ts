import { Component, OnInit } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
@Component({
    selector: 'app-scroll',
    templateUrl: './scroll.component.html',
    styles: [],
    animations: [

        trigger('colorState', [

            state('active', style({

                background: 'red',

            })),

            state('inactive', style({

                background: 'blue',

            })),

            // transition('active => inactive', animate('500ms ease-in')),

            // transition('inactive => active', animate('500ms ease-out')),

            transition('active => inactive', [ // 进场动画
                animate(2000, keyframes([
                    style({opacity: 0, transform: 'translateX(0)', offset: 0}),
                    style({opacity: 1, transform: 'translateX(200px)',  offset: 0.3}),
                    style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
                ]))
            ]),
            transition('inactive => active', [ // 离场动画
                animate(2000, keyframes([
                    style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
                    style({opacity: 1, transform: 'translateX(-200px)', offset: 0.7}),
                    style({opacity: 0, transform: 'translateX(0)',  offset: 1.0})
                ]))
            ])

        ]),
    ],
})



export class ScrollComponent implements OnInit {
    isActive: boolean;

    toActive() {

        this.isActive = !this.isActive;

    }


    selector: string = '.main-panel';
    array = [
        { id: '1', name: '11' },
        { id: '2', name: '22' },
        { id: '3', name: '33' },
        { id: '4', name: '44' },
        { id: '5', name: '55' },
        { id: '6', name: '66' },
        { id: '7', name: '77' },
        { id: '8', name: '88' },
        { id: '9', name: '99' },
        { id: '10', name: '1010' },
        { id: '10', name: '1010' },
        { id: '10', name: '1010' },
        { id: '10', name: '1010' },
        { id: '10', name: '1010' },
        { id: '10', name: '1010' },
        { id: '10', name: '1010' },
    ];
    flag = 1;
    text = '加载更多';
    constructor() {
    }

    ngOnInit() {
        let a = [{
            id: '1', name: '1',
        }, {
            id: '2', name: '2',
        }];

        let b = [{
            id: '3', name: '3',
        }, {
            id: '4', name: '4',
        }];

        let aa = a.concat(b);
        console.log(aa);
    }

    onScrollDown() {
        this.flag++;
        console.log(this.flag);
        if (this.flag < 10) {
            console.log('scrolled down!!');
            let addArray = [{
                id: '1', name: '1',
            }, {
                id: 'q', name: 'q',
            }];
            this.array = this.array.concat(addArray);
            console.log(this.array);
        }

    }

    onScrollUp() {
        console.log('scrolled up!!');
    }

    onScroll() {
        this.text = '加载中'
        setTimeout(res=>{
            this.flag++;
            console.log(this.flag);
            if (this.flag < 10) {
                console.log('scrolled down!!');
                let addArray = [{
                    id: '1', name: '1',
                }, {
                    id: 'q', name: 'q',
                }];
                this.array = this.array.concat(addArray);
                console.log(this.array);
            }else{
                this.text = '无更多数据';
            }

        },3000)
    }
}
