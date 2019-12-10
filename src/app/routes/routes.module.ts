import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { ScrollComponent } from './scroll/scroll.component';
import { TemplateComponent } from './template/template.component';
import { SfComponent } from './sf/sf.component';
import { ElementComponent } from './element/element.component';
import { TestmModule } from 'yg-team-test';
import { JavaScriptStudyComponent } from './java-script-study/java-script-study.component';

const COMPONENTS = [
    DashboardComponent,
    // passport pages
    UserLoginComponent,
    UserRegisterComponent,
    UserRegisterResultComponent,
    // single pages
    CallbackComponent,
    UserLockComponent,
    ScrollComponent,
    TemplateComponent,
    SfComponent,
    ElementComponent,
    JavaScriptStudyComponent
];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, RouteRoutingModule, TestmModule],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT ],
    entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {}
