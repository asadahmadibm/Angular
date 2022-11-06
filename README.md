# Angular
ارسال توکن در هدر به ازای هر درخواست
ساخت فایل اینترسپتور
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{


  constructor(){}

intercept(req , next)
{
var token = localStorage.getItem('token');

var authRequest = req.clone({
  headers : req.headers.set('Authorization', `Bearer ${token}`)
});

return next.handle(authRequest);
}

}
تنظیمات در اپ مايول
1- import {HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
2- in provider --> 
	,AuthService , {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
  }] ,
--------------------------------------------------
ذخیره سازی توکن
در سرویسی که نوشتیم داریم
return this.http.post("http://localhost:8238/api/Account",qq,{responseType: 'text'}).subscribe(res=>{
  console.log(res);
  localStorage.setItem('token',res)
  })
 ---------------------------------------------------
 ساخت توکن در بک اند
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
 
---------------------------------------------------
فرم ایجاد 
<div>
  <input type="text" [(ngModel)]="qq.Text" name="Text" >
  <input type="text" [(ngModel)]="qq.CorrectAnswer" name="CorrectAnswer" >
  <input type="text" [(ngModel)]="qq.Answer1" name="Answer1" >
  <input type="text" [(ngModel)]="qq.Answer2" name="Answer2" >
  <button (click)="post(qq)">post</button>
</div>
-------------------------------------------------------------------------------------------------------
crud in form
1-ساخت کلاس مدل و تعریف مدل 
export class User {
    UserId:number;
    UserName: string;
    EmailId: string;
    Gender: string;
    Address : string;
    MobileNo: string;
    PinCode:string;
}

2- ساخت کلاس سرویس و اضافه نمودن کدهای زیر در ان
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl:string = "http://localhost:49850/Api/User/";

  constructor(private http : HttpClient) { 
  }

  getUsers(): Observable<User[]> {  
    return this.http.get<User[]>(`${this.apiUrl}GetUserDetails`);
  }  
   
  addUser(user: User): Observable<string> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<string>(`${this.apiUrl}/InsertUserDetails/`, user, httpOptions);  
  }  
  updateUser(user: User): Observable<string> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<string>(`${this.apiUrl}/UpdateEmployeeDetails/`, user, httpOptions);  
  }  

  deleteUser(userId: string): Observable<string> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<string>(`${this.apiUrl}/DeleteUserDetails?id=` + userId, httpOptions);
  }
 
}
3-کدهای زیر در تی اس فرم
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {


  // row data and column definitions
  public users: User[];
  public columnDefs: ColDef[];

  // gridApi and columnApi
  private api: GridApi;
  private columnApi: ColumnApi;

  constructor(private userService: UserService, private router: Router,private toastr: ToastrService) {
    this.columnDefs = this.createColumnDefs();
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data
      }
    )
  }

  // one grid initialisation, grap the APIs and auto resize the columns to fit the available space
  onGridReady(params): void {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.sizeColumnsToFit();
  }

  // create column definitions
  private createColumnDefs() {
    return [
      { headerName: 'User Name', field: 'UserName', filter: true, enableSorting: true, editable: true, sortable: true },
      { headerName: 'Email Id', field: 'EmailId', filter: true, editable: true, sortable: true },
      { headerName: 'Gender', field: 'Gender', filter: true, sortable: true, editable: true, cellRenderer: '<a href="edit-user">{{email}}</a>' },
      { headerName: 'Address', field: 'Address', filter: true, editable: true, sortable: true },
      { headerName: 'Mobile', field: 'MobileNo', filter: true, editable: true }
    ]
  }

  status: any;

  //Update user
  editUser() {

   const d=this.api.getEditingCells();

    if (this.api.getSelectedRows().length == 0) {
      this.toastr.error("error", "Please select a User for update");
      return;
    }
    var row = this.api.getSelectedRows();

    this.userService.updateUser(row[0]).subscribe(data => {
      this.toastr.success("success",data);
      this.ngOnInit();
      });
  }

  //Delete user
  deleteUser() {
    debugger;
    var selectedRows = this.api.getSelectedRows();

    if (selectedRows.length == 0) {
      this.toastr.error("خطا", "لطفا کاربر را انتخاب نمایید");
      return;
    }
    this.userService.deleteUser(selectedRows[0].UserId).subscribe(data =>{
      this.toastr.success("موفق",data);
      this.ngOnInit();
      //this.api.refreshRows(null);
    });
  }

  Add()
  {
    this.router.navigate(['addUser']);
  }

}
4- change app.routing.component
import { CompanyComponent } from './company/company.component';

const routes: Routes = [
  {path:'companys',  component:CompanyComponent},
  {path:'', component:CompanyComponent},
  {path:'Addcompany', component:AddcompanyComponent}

];
5- کدها زیر در ال تی ام ال
<div class="container">
    <h2 class="header">AG Grid CRUD Operations Example in Angular</h2>
    <hr>
    <div class="row">
        <div class="col-md-8"></div>
        <div class="col-md-4">
    <button class="btn btn-sm btn-success button" (click)="Add()">Add User</button>&nbsp;&nbsp;
    <button class="btn btn-sm btn-primary" (click)="editUser()">Edit User</button>&nbsp;&nbsp;
    <button class="btn btn-sm btn-danger" (click)="deleteUser()">Delete User</button>
</div>
</div>
    <br>
    <ag-grid-angular style="width: 100%; height: 200px;" class="ag-theme-blue" (gridReady)="onGridReady($event)"
        [columnDefs]="columnDefs" [rowData]="users" rowSelection="single" pagination="true" paginationPageSize=5
      >
    </ag-grid-angular>
</div>
6- جهت ایجاد فرم در تی اس ان داریم
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
7- در فرم اچ تی ام ال داریم
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
--------------------------------
ساخت سرویس ای پی ای
ng g s نام سرویس
برای استفاده از httpclient
add to app.module.ts --> import { HttpClientModule } from '@angular/common/http'; And in imports --> HttpClientModule

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
استفاده از سرویس ای پی ای
1-import { ServiceService } from '../service.service';
2-constructor(private api:ServiceService){}
ngOnInit()
  {
//	جهت استفاده حتما باید  subscribe  استفاده نمود
    this.api.getquestion().subscribe(res=>
      this.qq=res)
  }
  qq:Question[] | undefined
3-use in html
   
4-in asp.net core 
4-1 in ConfigureServices
            services.AddCors(option => option.AddPolicy("cors", bulder =>
               bulder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader()
            ));
4-2 in Configure app.UseCors("cors");

-----------------------------------
use variable in html
[(ngmodel)]="varname"
define varname in ts in export class


ng new نام پروژه
ng g c نام کامپوننت
ng g s نام سرویس
ng g class نام کلاس
----------------------------------------------
نصب node.js
npm install -g @angular/cli
in terminal vscode
ng new frontend                      //  ng new projectname  ساخت پروژه
ng serve -o        // اجرای پروژه
----------------------
npm i bootstrap --save                        اضافه کردن بوت استرپ

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
------------------------
ng add @angular/material        اضافه نمودن متریال دیزاین
add to style.css --> @import '~@angular/material/prebuilt-themes/deeppurple-amber.css';
add to app.module.ts --> import { MatButtonModule } from '@angular/material/button';  And in imports -->   MatButtonModule
example in html <button mat-raised-button color="primary">Primary</button>
----------------------------------------------
npm i --save ag-grid-community ag-grid-angular                  نصب ای جی گرید
add to style.css --> @import 'ag-grid-community/dist/styles/ag-grid.css';  
		     @import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; 
add to app.module.ts --> import { AgGridModule } from 'ag-grid-angular';  And in imports --> AgGridModule
-------------------------------------					 
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
-------------------------
font Iransans : 1- copy fonts in asset		 2- define in styles.css @font-face {...}
------------------------------------ 

extention for vscode
Angular Essentials
Angular Language Service
Angular Snippets
------------------------------------
add component.ts             ساخت کامپوننت
بعد از ساخت کامپوننت جهت استفاده در اچ تی ام ال داریم
<نام کامپوننت/><نام کامپوننت>
تعریف کامپوننت در دوجای زیر
1- import in app.component.ts
	import { questioncomponent نام کامپوننت } from './question.component';
2- add all component in app.moduls
	import { questioncomponent نام کامپوننت } from './question.component';
	add in  declarations



