import { HomeComponent } from './home/home.component';
import { ApplistsuivisComponent } from './applistsuivis/applistsuivis.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SuivieleveComponent } from './suivieleve/suivieleve.component';
import { AppComponent } from './app.component';



const routes: Routes = [
 
  {  path: 'login',  component: LoginComponent},
  
  {
    path: '',
    component: DashboardComponent,
    
  },
  {
    path: 'index',
    component: DashboardComponent,
   
  },
  {
    path: 'suivis',
    component: ApplistsuivisComponent,
   
  },
  {
    path: 'suivi-eleve/:id',
    component: SuivieleveComponent,
   
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
