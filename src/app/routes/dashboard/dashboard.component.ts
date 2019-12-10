import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import * as moment from 'moment';
import { NzIconService, NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';

const count = 5;
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styles: [
        `
            .demo-loadmore-list {
                min-height: 350px;
            }

            .loadmore {
                text-align: center;
                margin-top: 12px;
                height: 32px;
                line-height: 32px;
            }
        `,
    ],
})
export class DashboardComponent implements OnInit {
    flag = true;
    lists: any;
    /*一年前*/
    oneYearAgo: any;
    pieChart: any;
    /*加载更多*/
    initLoading = true; // bug
    loadingMore = false;
    data: any[] = [];
    list: Array<{ loading: boolean; name: any }> = [];
    flagCcroll = false;

    feikong = {
        name: '111',
    };
    feikongduanyan = undefined;

    dis = 'disabled';

    @ViewChild('pieNode', { static: true }) private mountNode: ElementRef;

    salimsuName: string;

    salesData: any[] = new Array(12).fill({}).map((_i, idx) => ({
        x: `${idx + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200,
    }));

    constructor(private http: _HttpClient, private _iconService: NzIconService, private msg: NzMessageService) {
        this._iconService.fetchFromIconfont({
            scriptUrl: 'https://at.alicdn.com/t/font_1437785_elkiq2yhr67.js',
        });
    }

    get salimsu(): string {
        return (this.salimsuName = 'salimsu111');
    }

    ngOnInit() {
        console.log(this.salimsu);

        this.lists = [
            {
                id: 1,
                name: 'su1',
            },
            {
                id: 2,
                name: 'su2',
            },
            {
                id: 3,
                name: 'su3',
            },
            {
                id: 4,
                name: 'su4',
            },
        ];

        /*获取去年的今月*/
        this.oneYearAgo = moment()
            .subtract(1, 'year')
            .format('YYYY-MM-DD');

        let data = [
            {
                item: '事例一',
                count: 40,
                percent: 0.4,
            },
            {
                item: '事例二',
                count: 21,
                percent: 0.21,
            },
            {
                item: '事例三',
                count: 17,
                percent: 0.17,
            },
            {
                item: '事例四',
                count: 13,
                percent: 0.13,
            },
            {
                item: '事例五',
                count: 9,
                percent: 0.09,
            },
        ];

        this.renderPie(data);

        this.getData((res: any) => {
            this.data = res.results;
            this.list = res.results;
            this.initLoading = false;
        });
    }

    changeFlag() {
        this.flag = !this.flag;
    }

    save(val) {
        console.log(val);
    }

    /*G2*/
    renderPie(data) {
        console.log(data);
        this.pieChart = new G2.Chart({
            container: this.mountNode.nativeElement,
            forceFit: true,
            height: 220,
            animate: true,
            padding: 'auto',
        });

        this.pieChart.source(data, {
            percent: {
                formatter: function formatter(val) {
                    val = val * 100 + '%';
                    return val;
                },
            },
        });
        this.pieChart.coord('theta', {
            radius: 0.75,
        });
        this.pieChart.tooltip({
            showTitle: false,
            itemTpl:
                '<li style="width: 100px;"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
        });
        this.pieChart
            .intervalStack()
            .position('percent')
            .color('item')
            .label('percent', {
                formatter: function formatter(val, item) {
                    return item.point.item + ': ' + val;
                },
            })
            .tooltip('item*percent', function(item, percent) {
                percent = percent * 100 + '%';
                return {
                    name: item,
                    value: percent,
                };
            })
            .style({
                lineWidth: 1,
                stroke: '#fff',
            });

        this.pieChart.render();
    }

    changePie() {}

    render(el: ElementRef) {
        const { DataView } = DataSet;
        let data = [
            {
                action: '浏览网站',
                pv: 50000,
            },
            {
                action: '放入购物车',
                pv: 35000,
            },
            {
                action: '生成订单',
                pv: 25000,
            },
            {
                action: '支付订单',
                pv: 15000,
            },
            {
                action: '完成交易',
                pv: 8000,
            },
        ];

        const dv = new DataView().source(data);
        dv.transform({
            type: 'percent',
            field: 'pv',
            dimension: 'action',
            as: 'percent',
        });
        data = dv.rows;
        const chart = new G2.Chart({
            container: el.nativeElement,
            forceFit: true,
            height: window.innerHeight,
            padding: [20, 120, 95],
        });
        chart.source(data, {
            percent: {
                nice: false,
            },
        });
        chart.axis(false);
        chart.tooltip({
            showTitle: false,
            itemTpl:
                '<li data-index={index} style="margin-bottom:4px;">' +
                '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
                '{name}<br/>' +
                '<span style="padding-left: 16px">浏览人数：{pv}</span><br/>' +
                '<span style="padding-left: 16px">占比：{percent}</span><br/>' +
                '</li>',
        });
        chart
            .coord('rect')
            .transpose()
            .scale(1, -1);
        chart
            .intervalSymmetric()
            .position('action*percent')
            .shape('funnel')
            .color('action', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'])
            .label(
                'action*pv',
                function(action, pv) {
                    return action + ' ' + pv;
                },
                {
                    offset: 35,
                    labelLine: {
                        lineWidth: 1,
                        stroke: 'rgba(0, 0, 0, 0.15)',
                    },
                },
            )
            .tooltip('action*pv*percent', function(action, pv, percent) {
                return {
                    name: action,
                    percent: (percent * 100).toFixed(2) + '%',
                    pv: pv,
                };
            });
        data.forEach((obj: any) => {
            // 中间标签文本
            chart.guide().text({
                top: true,
                position: {
                    action: obj.action,
                    percent: 'median',
                },
                content: (obj.percent * 100).toFixed(2) + '%', // 显示的文本内容
                style: {
                    fill: '#fff',
                    fontSize: '12',
                    textAlign: 'center',
                    shadowBlur: 2,
                    shadowColor: 'rgba(0, 0, 0, .45)',
                },
            });
        });
        chart.render();
    }

    getData(callback: (res: any) => void): void {
        this.http.get(fakeDataUrl).subscribe((res: any) => callback(res));
    }

    onLoadMore(): void {
        this.loadingMore = true;
        this.list = this.data.concat([...Array(count)].fill({}).map(() => ({ loading: true, name: {} })));
        this.http.get(fakeDataUrl).subscribe((res: any) => {
            this.data = this.data.concat(res.results);
            this.list = [...this.data];
            this.loadingMore = false;
        });
    }

    edit(item: any): void {
        this.msg.success(item.email);
    }

    @HostListener('window:scroll', ['$event']) public onScroll = $event => {
        //客户端高度
        var clientH = document.documentElement.clientHeight;
        // console.log(clientH);
        //body高度
        var bodyH = document.body.clientHeight;

        //滚动的高度
        var scrollTop = document.documentElement.scrollTop;
        // console.log(scrollTop);
        // console.log(bodyH);

        //滚动到底部60以内
        if (bodyH - clientH - scrollTop < 80) {
            if (!this.flagCcroll) {
                console.log('翻页');
                //翻页
                this.changePage('+');
            }
            this.flagCcroll = true;
        } else {
            this.flagCcroll = false;
        }
    };

    changePage(a) {
        console.log(a);
    }
}
