import { Component, OnInit } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { ToastrService } from "ngx-toastr";
import { industryModel } from "src/app/models/industry.model";
import { resultMessage } from "src/app/models/resultMessage.model";
import { AuthenticateService } from "src/app/services/authenticate/authenticate.service";
import { IndustryService } from "src/app/services/crm/industry.service";


@Component({
  selector: "app-sample1",
  templateUrl: "./sample1.component.html",
  styleUrls: ["./sample1.component.css"],
})
export class Sample1Component implements OnInit {
  constructor(
    private toastr: ToastrService,
    private industryservice: IndustryService,
    private authenticateService: AuthenticateService
  ) {}
  industrydate: industryModel[] = [];
  industry: industryModel = { IndustryID: 11, IndustryName: "name11" };
  ngOnInit(): void {
    this.authenticateService.loginTest().subscribe((rest: any) => {
      localStorage.setItem("token", rest["data"]["token"]);
    });

    // this.industryservice.getindustry().subscribe((rest) => {
    //   this.industrydate = rest;
    //   //console.log(this.industrydate);
    // });

    this.industryservice.getindustry2().subscribe(res=>{
      this.industrydate = res;
      console.log(res);
      
    })
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
