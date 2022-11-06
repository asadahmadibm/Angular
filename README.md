# Angular
# for Use Angular Project
	Install node.js https://nodejs.org/en/download/
	npm install -g @angular/cli
	install Vscode
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
	

