import { Component, OnInit } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { ToastrService } from "ngx-toastr";
import { industryModel } from "src/app/models/industry.model";
import { resultMessage } from "src/app/models/resultMessage.model";
import { IndustryService } from "src/app/services/industry.service";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-sample1",
  templateUrl: "./sample1.component.html",
  styleUrls: ["./sample1.component.css"],
})
export class Sample1Component implements OnInit {
  constructor(
    private toastr: ToastrService,
    private industryservice: IndustryService,
    private loginServicea: LoginService
  ) {}
  industrydate: industryModel[] = [];
  industry: industryModel = { IndustryID: 11, IndustryName: "name11" };
  ngOnInit(): void {
    this.loginServicea.loginTest().subscribe((rest: any) => {
      console.log(rest["data"]["token"]);
      localStorage.setItem("token", rest["data"]["token"]);
    });

    this.industryservice.getindustry().subscribe((rest) => {
      this.industrydate = rest;
      console.log(this.industrydate);
    });
  }
  columnDefs: ColDef[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ];

  rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ];
  showSuccess() {
    this.industryservice
      .insert(this.industry)
      .subscribe((rest: resultMessage) => {
        console.log(rest);
      });
    this.toastr.success("Hello world!", "Toastr fun!");
  }
}
