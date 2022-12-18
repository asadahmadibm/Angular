# Angular

# for Use Angular Project
  
    Install node.js https://nodejs.org/en/download/
    npm install -g @angular/cli
    if not work
    		npm config set strict-ssl false
		npm config set registry "http://registry.npmjs.org/"
		npm --proxy http://username:password@cacheaddress.com.br:80 install packagename
		Skip the username:password part if proxy doesn't require you to authenticate
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
##  اضافه کردن بوت استرپ
	npm i bootstrap --save
	add to style.css --> @import '~bootstrap/dist/css/bootstrap.min.css';
	add to Angular.json  in styles --> "./node_modules/bootstrap/dist/css/bootstrap.min.css"
	example in html <button class="btn btn-success">تایید</button>
		
## اضافه نمودن متریال دیزاین
	ng add @angular/material
	add to style.css --> @import '~@angular/material/prebuilt-themes/deeppurple-amber.css';
	add to app.module.ts --> import { MatButtonModule } from '@angular/material/button';  And in imports -->   MatButtonModule
	example in html <button mat-raised-button color="primary">Primary</button>	

## نصب ای جی گرید
	npm i --save ag-grid-community ag-grid-angular
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

##  نصب toastr
	npm i ngx-toastr --save
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

## font IRANSans 
	1- copy fonts in asset		 
	2- define in styles.css
	@font-face {
		  font-family: IRANSans;
		  font-style: normal;
		  font-weight: normal;
		  src: url('/assets/fonts/iransans/eot/IRANSansWeb(FaNum).eot');
		  src: url('/assets/fonts/iransans/eot/IRANSansWeb(FaNum).eot?#iefix') format('embedded-opentype'),
		      /* IE6-8 */
		      url('/assets/fonts/iransans/woff2/IRANSansWeb(FaNum).woff2') format('woff2'),
		      /* FF39+,Chrome36+, Opera24+*/
		      url('/assets/fonts/iransans/woff/IRANSansWeb(FaNum).woff') format('woff'),
		      /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
		      url('/assets/fonts/iransans/ttf/IRANSansWeb(FaNum).ttf') format('truetype');
		}
	example use 
		:root {
			--main-fa-font: "IRANSans";
		}
		body {
			font-family: var(--main-fa-font) !important;
		}
		.mat-toolbar, .mat-button , .mat-raised-button, .mat-menu-item, .mat-input-element, .mat-form-field, .mat-option, .mat-select,
		.mat-slide-toggle-content {
		    font-family: var(--main-fa-font) !important;
		}

## Use HttpClient
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

## Use interceptor ارسال توکن در هدر به ازای هر درخواست		
	ساخت فایل اینترسپتور		
	add file authenticate.interceptor.ts
	import {
	  HttpInterceptor,
	  HttpRequest,
	  HttpHandler,
	  HttpEvent,
	} from "@angular/common/http";
	import { Injectable } from "@angular/core";
	import { Observable } from "rxjs";

	@Injectable()
	export class AuthInterceptor implements HttpInterceptor {
	  constructor() {}

	  intercept(
	    request: HttpRequest<any>,
	    next: HttpHandler
	  ): Observable<HttpEvent<any>> {
	    const token: string = localStorage.getItem("token") ?? "";
	    if (token) {
	      request = request.clone({
		headers: request.headers.set("Authorization", "Bearer " + token),
	      });
	    }
	    if (!request.headers.has("Content-Type")) {
	      request = request.clone({
		headers: request.headers.set("Content-Type", "application/json"),
	      });
	    }
	    request = request.clone({
	      headers: request.headers.set("Accept", "application/json"),
	    });

	    return next.handle(request);
	  }
	}
	
	تنظیمات در اپ مايول
	1- import {HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
	2- in provider --> 
		 {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi:true} ,

## ذخیره سازی توکن
	return this.http.post("http://localhost:8238/api/Account",qq,{responseType: 'text'}).subscribe(res=>{
	  console.log(res);
	  localStorage.setItem('token',res)
	  })
		  
##  ساخت توکن در بک اند
		  

	 1-Add in ConfigureService  -->
		  var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret key"));
		    services.AddAuthentication(options =>
		    {
			options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
			options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
		    }).AddJwtBearer(cfg =>
		    {
			cfg.RequireHttpsMetadata = false;
			cfg.SaveToken = true;
			cfg.TokenValidationParameters = new TokenValidationParameters()
			{
			    IssuerSigningKey = signingKey,
			    ValidateAudience = false,
			    ValidateIssuer = false,
			    ValidateLifetime = false,
			    ValidateIssuerSigningKey = true
			};
		    });
	2- add in services -->  app.UseAuthentication();
	3- add in register service -->
		    var claims = new Claim[]
		    {
			new Claim(JwtRegisteredClaimNames.Sub, user.Id) 
		    };

		    var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret key"));
		    var signingCredentials = new SigningCredentials(signingKey,SecurityAlgorithms.HmacSha256);

		    var jwt = new JwtSecurityToken(signingCredentials: signingCredentials,claims: claims);
		    return Content(new JwtSecurityTokenHandler().WriteToken(jwt));		
 
## جهت ایجاد فرم در تی اس ان داریم		  

	import { Component, OnInit } from '@angular/core';
	import { UserService } from 'src/app/services/user.service';
	import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
	import { Router } from '@angular/router';
	import { ToastrService } from 'ngx-toastr';

	@Component({
	  selector: 'app-add-user',
	  templateUrl: './add-user.component.html',
	  styleUrls: ['./add-user.component.css']
	})
	export class AddUserComponent implements OnInit {
	  submitted: boolean= false;
	  userForm: any;

	  constructor(private formBuilder: FormBuilder,private toastr: ToastrService,private userService: UserService,private router:Router) { }

	  ngOnInit(): void {
	    this.userForm = this.formBuilder.group({
	      "UserName": ["", Validators.required],
	      "EmailId": ["", Validators.required],
	      "Gender": ["", Validators.required],
	      "Address": ["", Validators.required],
	      "MobileNo": ["", Validators.required],
	      "PinCode": ["", Validators.required]
	    });

	  }

	  onSubmit() {
	    this.submitted = true;
	    if (this.userForm.invalid) {
	      return;
	    }

	    this.userService.addUser(this.userForm.value)
	      .subscribe( data => {
		this.toastr.success("success", data.toString());
		this.router.navigate(['users']);
	      });


	  }

	  Cancel()
	  {
	    this.router.navigate(['users']);
	  }

	}
	
## در فرم اچ تی ام ال داریم

	<div class="container">
	  <div class="row">

	    <div class="col-md-8">
	      <h1><span class="badge badge-dark" id="header">User Registration</span></h1>
	      <hr>
	      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">

		<div class="row">
		  <div class="col-md-4">
		    <label for="firstName">User Name:</label>
		  </div>
		  <div class="col-md-6">
		    <input type="text" class="form-control" formControlName="UserName">
		    <div *ngIf="submitted && userForm.controls.UserName.errors" class="error">
		      <div *ngIf="userForm.controls.UserName.errors.required">First name is required</div>
		    </div>
		  </div>
		</div>

		<div class="row">
		  <div class="col-md-4">
		    <label for="firstName">EmailId:</label>
		  </div>
		  <div class="col-md-6">
		    <input type="text" class="form-control" formControlName="EmailId">
		    <div *ngIf="submitted && userForm.controls.EmailId.errors" class="error">
		      <div *ngIf="userForm.controls.EmailId.errors.required">EmailId is required</div>
		    </div>
		  </div>
		</div>

		<div class="row">
		  <div class="col-md-4">
		    <label for="firstName">Gender:</label>
		  </div>
		  <div class="col-md-6">
		    <input type="email" class="form-control" formControlName="Gender">
		    <div *ngIf="submitted && userForm.controls.Gender.errors" class="error">
		      <div *ngIf="userForm.controls.Gender.errors.required">Gender is required</div>
		    </div>
		  </div>
		</div>

		<div class="row">
		  <div class="col-md-4">
		    <label for="firstName">Address:</label>
		  </div>
		  <div class="col-md-6">
		    <input type="text" class="form-control" formControlName="Address">
		    <div *ngIf="submitted && userForm.controls.Address.errors" class="error">
		      <div *ngIf="userForm.controls.Address.errors.required">Address is required</div>
		    </div>
		  </div>
		</div>

		<div class="row">
		  <div class="col-md-4">
		    <label for="firstName">Mobile:</label>
		  </div>
		  <div class="col-md-6">
		    <input type="text" class="form-control" formControlName="MobileNo">
		    <div *ngIf="submitted && userForm.controls.MobileNo.errors" class="error">
		      <div *ngIf="userForm.controls.MobileNo.errors.required">Mobile number is required</div>
		    </div>
		  </div>
		</div>

		<div class="row">
		  <div class="col-md-4">
		    <label for="firstName">Pin Code:</label>
		  </div>
		  <div class="col-md-6">
		    <input type="text" class="form-control" formControlName="PinCode">
		    <div *ngIf="submitted && userForm.controls.MobileNo.errors" class="error">
		      <div *ngIf="userForm.controls.PinCode.errors.required">PinCode is required</div>
		    </div>
		  </div>
		</div>

		<div class="row">
		  <div class="col-md-4">

		  </div>
		  <div class="col-md-4">
		    <button type="submit" class="btn btn-primary">Submit</button> &nbsp;&nbsp;
		    <input type="button" class="btn btn-warning" (click)="Cancel()" value="Cancel">
		</div>
		  </div>
	      </form>
	    </div>

	  </div>
	</div>
		  
		  
# CRUD In Form
	1- Create Model
	2- Create Service Form Crud
	3- Create Component Grid 
	4- Create Component FormDetial
	

		
