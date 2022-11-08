import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { AgGridModule } from 'ag-grid-angular';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminGridComponent } from './commonComponent/admin-grid/admin-grid.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MenuComponent } from './commonComponent/menu/menu.component';
import { Sample1Component } from './commonComponent/sample1/sample1.component';
import { FishComponent } from './commonComponent/fish/fish.component';
import { AuthInterceptorInterceptor } from './services/interceptor/authenticate.interceptor';
import { LogoutComponent } from './commonComponent/Authenticate/logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AdminGridComponent,
    MenuComponent,
    Sample1Component,
    FishComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    AgGridModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
     {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptorInterceptor,multi:true} ,
  ],
  bootstrap: [AppComponent],
  

})
export class AppModule { }
