# Angular

for Use Angular Project
  
    Install node.js https://nodejs.org/en/download/
    npm install -g @angular/cli
    install Vscode
    extention for vscode
	    Angular Essentials
	    Angular Language Service
	    Angular Snippets
    in terminal vscode
      ng new frontend     // Make Project                 
      Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
      ng serve -o         //Run Project
# Common Command
    ng new نام پروژه
    ng g c نام کامپوننت
    ng g s نام سرویس
    ng g class نام کلاس
بعد از ساخت کامپوننت جهت استفاده در اچ تی ام ال داریم <نام کامپوننت/><نام کامپوننت> تعریف کامپوننت در دوجای زیر

    1- import in app.component.ts
	    import { questioncomponent نام کامپوننت } from './question.component';
    2- add all component in app.moduls
	    import { questioncomponent نام کامپوننت } from './question.component';
	    add in  declarations
# Best Component For Project
	npm i bootstrap --save اضافه کردن بوت استرپ
		add to style.css --> @import '~bootstrap/dist/css/bootstrap.min.css';
		add to Angular.json  in styles --> "./node_modules/bootstrap/dist/css/bootstrap.min.css"
		example in html <button class="btn btn-success">تایید</button>
		
	ng add @angular/material اضافه نمودن متریال دیزاین
		add to style.css --> @import '~@angular/material/prebuilt-themes/deeppurple-amber.css';
		add to app.module.ts --> import { MatButtonModule } from '@angular/material/button';  And in imports -->   MatButtonModule
		example in html <button mat-raised-button color="primary">Primary</button>	

	npm i --save ag-grid-community ag-grid-angular نصب ای جی گرید
		add to style.css --> @import 'ag-grid-community/dist/styles/ag-grid.css';  
				     @import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; 
		add to app.module.ts --> import { AgGridModule } from 'ag-grid-angular';  And in imports --> AgGridModule
		example 
		in ts :
			import { ColDef } from 'ag-grid-community';
			export class AppComponent  {
			    columnDefs: ColDef[] = [
				{ field: 'make' },
				{ field: 'model' },
				{ field: 'price' }
			    ];
			    rowData = [
				{ make: 'Toyota', model: 'Celica', price: 35000 },
				{ make: 'Ford', model: 'Mondeo', price: 32000 },
				{ make: 'Porsche', model: 'Boxster', price: 72000 }
			    ];
			}
		in html :
			<ag-grid-angular
			    style="width: 500px; height: 350px;"
			    class="ag-theme-alpine"
			    [rowData]="rowData"
			    [enableRtl]="true"
			    [columnDefs]="columnDefs">
			</ag-grid-angular>

	npm i ngx-toastr --save نصب toastr
		add to Angular.json  in styles -->  "./node_modules/ngx-toastr/toastr.css"
		add to app.module.ts --> import { ToastrModule } from 'ngx-toastr'; And in imports --> ToastrModule.forRoot()
		example use 
		import { ToastrService } from 'ngx-toastr';

		@Component({...})
		export class YourComponent {
		  constructor(private toastr: ToastrService) {}

		  showSuccess() {
		    this.toastr.success('Hello world!', 'Toastr fun!');
		  }
		}
font Bnazanin :

1- copy fonts in asset		 
2- define in styles.css
	@font-face {
	    font-family: Bnazanin;
		    font-weight: normal;
	     	    src: url('/assets/fonts/nazanin/B NAZANIN_YASDL.COM.ttf');
	    src: url('/assets/fonts/nazanin/B NAZANIN_YASDL.COM.ttf') format('truetype'), 
	    url('/assets/fonts/nazanin/B NAZANIN BOLD_YASDL.COM.ttf') format('truetype');
	}
Use HttpClient
add to app.module.ts --> import { HttpClientModule } from '@angular/common/http'; And in imports --> HttpClientModule

ng g s نام سرویس
in service :
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
	constructor(private http:HttpClient) { }

	getquestion(): Observable<Question[]> {
  		return this.http.get<Question[]>("https://www.ag-grid.com/example-assets/row-data.json")
	}

	postquestion2(question: any) : Observable<string> {
 		return  this.http.post<string>("http://localhost:19698/api/question", question)
    	}
}

use service
	1-import { ServiceService } from '../service.service';
	2-constructor(private api:ServiceService){}
	ngOnInit()
	{
	//	جهت استفاده حتما باید  subscribe  استفاده نمود
			this.api.getquestion().subscribe(res=>
  			this.qq=res)
	}
	qq:Question[] | undefined


in asp.net core 
	in ConfigureServices
	    services.AddCors(option => option.AddPolicy("cors", bulder =>
	       bulder.AllowAnyOrigin()
	       .AllowAnyMethod()
	       .AllowAnyHeader()
	    ));
	in Configure app.UseCors("cors");
