import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialDesignModule } from '@app/shared';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { OwlModule } from 'ngx-owl-carousel';
import { ScrollToModule } from 'ng2-scroll-to-el';

import {
    ContactFormComponent,
    HeaderComponent,
    LayoutComponent,
    PriceBlockComponent,
    SchoolsSignUpComponent,
    StudentsSignUpComponent,

} from '@app/landing-page/components';

import { LiteracyComponent } from './components/literacy/literacy.component';
import { NumeracyComponent } from './components/numeracy/numeracy.component';
import { WritingComponent } from './components/writing/writing.component';
import { GuideComponent } from './components/guide/guide.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialDesignModule,
        LandingPageRoutingModule,
        OwlModule,
        ScrollToModule.forRoot()
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        PriceBlockComponent,
        ContactFormComponent,
        SchoolsSignUpComponent,
        StudentsSignUpComponent,
        LiteracyComponent,
        NumeracyComponent,
        WritingComponent,
        GuideComponent
    ],
    exports: [LandingPageRoutingModule]
})
export class LandingPageModule
{
}
