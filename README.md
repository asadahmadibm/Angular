# Angular
# for Use Angular Project
	Install node.js https://nodejs.org/en/download/
	npm install -g @angular/cli
	install Vscode
	extention for vscode
		Angular Essentials
		Angular Language Service
		Angular Snippets
	in terminal vscode
	ng new frontend     // Make Project                 
	ng serve -o         //Run Project
	
#  Common Command
	ng new نام پروژه
	ng g c نام کامپوننت
	ng g s نام سرویس
	ng g class نام کلاس
# Best Component For Project

npm i bootstrap --save اضافه کردن بوت استرپ

	add to style.css --> @import '~bootstrap/dist/css/bootstrap.min.css';
	add to Angular.json  in styles --> "./node_modules/bootstrap/dist/css/bootstrap.min.css"
	or
	"styles": [
              "src/styles.css", "./node_modules/bootstrap/dist/css/bootstrap.min.css",
              "./node_modules/font-awesome/css/font-awesome.css"
            ],
            "scripts": [
              "./node_modules/jquery/dist/jquery.min.js", "./node_modules/bootstrap/dist/js/bootstrap.min.js"
            ]
	example in html <button class="btn btn-success">تایید</button>

ng add @angular/material        اضافه نمودن متریال دیزاین
	
	add to style.css --> @import '~@angular/material/prebuilt-themes/deeppurple-amber.css';
	add to app.module.ts --> import { MatButtonModule } from '@angular/material/button';  And in imports -->   MatButtonModule
	example in html <button mat-raised-button color="primary">Primary</button>	
	
npm i --save ag-grid-community ag-grid-angular                  نصب ای جی گرید

	add to style.css --> @import 'ag-grid-community/dist/styles/ag-grid.css';  
			     @import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; 
	add to app.module.ts --> import { AgGridModule } from 'ag-grid-angular';  And in imports --> AgGridModule
	
npm i ngx-toastr --save   نصب toastr

	add to Angular.json  "./node_modules/ngx-toastr/toastr.css"
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

font Iransans : 
	1- copy fonts in asset		 
	2- define in styles.css @font-face {...}

	

