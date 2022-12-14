import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccComponent } from './commonComponent/acc/acc.component';
import {  AkbariDatePickerModule } from 'akbari-date-picker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from './shared/material.persian-date.adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AutocompleteComponent } from './commonComponent/autocomplete/autocomplete.component';
import { Sample2Component } from './modules/sample2/sample2.component';
import { Sample2EntryComponent } from './modules/sample2/sample2-entry/sample2-entry.component';
import { ChipsComponent } from './commonComponent/chips/chips.component';
import { DatePickerComponent } from './commonComponent/date-picker/date-picker.component';
import { Group1Component } from './modules/sample2/group1/group1.component';
import { DropdownComponent } from './commonComponent/dropdown/dropdown.component';
import { GridComponent } from './commonComponent/detail-form/grid/grid.component';
import { DataEntryComponent } from './commonComponent/detail-form/data-entry/data-entry.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminGridComponent,
    MenuComponent,
    FishComponent,
    Sample1Component,
    AccComponent,
    AutocompleteComponent,
    Sample2Component,
    Sample2EntryComponent,
    ChipsComponent,
    DatePickerComponent,
    Group1Component,
    DropdownComponent,
    GridComponent,
    DataEntryComponent,

    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    AkbariDatePickerModule,
    MatInputModule,
    MatTabsModule,
    MatMenuModule,
    MatChipsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDialogModule,
    AgGridModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
     {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptorInterceptor,multi:true} ,
     { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
  ],
  bootstrap: [AppComponent],
  

})
export class AppModule { }
