import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
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
  form: any
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private industryservice: IndustryService,
    private authenticateService: AuthenticateService
  ) {}

  ngOnInit(): void {

    this.initForm(); //set form controller and validations

    this.authenticateService.loginTest().subscribe((rest: any) => {
      localStorage.setItem("token", rest["data"]["token"]);
    });

    // this.industryservice.getindustry().subscribe((rest) => {
    //   this.industrydate = rest;
    //   //console.log(this.industrydate);
    // });

    this.getindustry();
    
  }

  getindustry() {
    this.industryservice.getindustry2().subscribe((res) => {
      this.rowData = res;
    });
  }
  initForm() {
    // this.form.addControl("IndustryId", new FormControl());
    // this.form.addControl("IndustryName", new FormControl());
    this.form = this.formBuilder.group({
      "IndustryId": ["", Validators.required],
      "IndustryName": ["", Validators.required],
    });
  }

  columnDefs: ColDef[] = [{ field: "IndustryID" }, { field: "IndustryName" }];

  rowData: industryModel[] = [];

  onSubmit() {
    console.log(this.form.value);
    
    this.industryservice
      .insert(this.form.value)
      .subscribe((rest: resultMessage) => {
        console.log(rest);
        this.getindustry();
        this.toastr.success("Hello world!", "Toastr fun!");
      });
  }

  showSuccess() {
    this.toastr.success("Hello world!", "Toastr fun!");
  }
}
