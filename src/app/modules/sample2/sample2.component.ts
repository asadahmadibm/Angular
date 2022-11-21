import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import * as moment from "jalali-moment";
import { Fruit } from "src/app/models/industry.model";
import { AuthenticateService } from "src/app/services/authenticate/authenticate.service";


@Component({
  selector: "app-sample2",
  templateUrl: "./sample2.component.html",
  styleUrls: ["./sample2.component.css"],
})
export class Sample2Component implements OnInit {
  formmaster:any
  options: string[] = ["1399", "1400", "1401"];
  MinDate: any = moment.from("1400-07-29", "fa");
  matselectdata: any = [
    { id: "1", name: "فروردین" },
    { id: "2", name: "اردیبهشت" },
    { id: "3", name: "خرداد" },
  ];
  fruits: Fruit[] = [
    { name: "گروه 1", selected: false },
    { name: "گروه 2", selected: false },
    { name: "گروه 3", selected: false },
    { name: "گروه 4", selected: false },
    { name: "گروه 5", selected: false },
    { name: "گروه 6", selected: false },
  ];

  constructor(    private authenticateService: AuthenticateService,private fb:FormBuilder
   
  ) {}

  ngOnInit(): void {
    this.formmaster=this.fb.group({
      id:['',Validators.required],
      name:new FormControl(''),
      sal:new FormControl(''),
      sal2:new FormControl(''),
      gn:new FormControl(''),
      date1:new FormControl(''),
    })
    this.loginTest();

  }
  loginTest() {
    this.authenticateService.loginTest().subscribe((rest: any) => {
      localStorage.setItem("token", rest["data"]["token"]);
    });
  }

  onsubmit()
  {
    
  }

 
}
