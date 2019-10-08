import { BasicAuthHtppInterceptorService } from './basic-auth-htpp-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { AppfooterComponent } from './appfooter/appfooter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplistsuivisComponent } from './applistsuivis/applistsuivis.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import {NgbModule,NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { SuivieleveComponent } from './suivieleve/suivieleve.component';
import { Ng5SliderModule } from 'ng5-slider';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent,
    DashboardComponent,
    ApplistsuivisComponent,
    SuivieleveComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here

    }),
    NgbModule,
    NgbAlertModule,
    Ng5SliderModule
  ],
 
  providers: [
    {  
      provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true 
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
