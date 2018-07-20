import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { MainComponent } from './components/main/main.component';
import { AuthComponent } from './components/auth/auth.component';
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import {HttpClientModule} from "@angular/common/http";
import { MenuComponent } from './components/menu/menu.component';
import { CurrentConsultComponent } from './components/main/current-consult/current-consult.component';
import { HistoryComponent } from './components/main/history/history.component';
import { PreloaderComponent } from './components/preloader/preloader/preloader.component';
import { AddstudentComponent } from "./components/main/current-consult/addstudent/addstudent.component";
import {NoAuthGuardService} from "./services/noauth-guard/noauth-guard.service";

const mainSubroutes:Routes = [
  {path:"",component:CurrentConsultComponent},
  {path:"history",component:HistoryComponent}
];

const routes:Routes = [
  {path:"",component:MainComponent,canActivate:[AuthGuardService], children: mainSubroutes},
  {path:"login",component:AuthComponent, canActivate:[NoAuthGuardService]}
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthComponent,
    MenuComponent,
    CurrentConsultComponent,
    HistoryComponent,
    PreloaderComponent,
    AddstudentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
