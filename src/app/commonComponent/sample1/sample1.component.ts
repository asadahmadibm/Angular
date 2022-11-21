import { identifierName } from "@angular/compiler";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatChipList } from "@angular/material/chips";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { ColDef } from "ag-grid-community";
import * as moment from "jalali-moment";
import { ToastrService } from "ngx-toastr";
import { map, Observable, startWith } from "rxjs";
import { Fruit, industryModel, User } from "src/app/models/industry.model";
import { AuthenticateService } from "src/app/services/authenticate/authenticate.service";
import { IndustryService } from "src/app/services/crm/industry.service";
import { AdminGridComponent } from "../admin-grid/admin-grid.component";

@Component({
  selector: "app-sample1",
  templateUrl: "./sample1.component.html",
  styleUrls: ["./sample1.component.css"],
})
export class Sample1Component implements OnInit {
  aDate: any;
  defaultSelect: any;
  MinDate: any = moment.from("1400-07-29", "fa");
  groupItem: string[] = ["گروه 1", "گروه 2", "گروه 3", "گروه 4"];
  options: string[] = ["1399", "1400", "1401"];
  autocompletedata: any = ["", ""];
  matselectdata: any = [
    { id: "1", name: "فروردین" },
    { id: "2", name: "اردیبهشت" },
    { id: "3", name: "خرداد" },
  ];

  columnDefs: ColDef[] = [
    { field: "IndustryID", headerName: "کد" },
    { field: "IndustryName", headerName: "نام" },
    { field: "Month", headerName: "کد ماه" },
    { field: "Year", headerName: "سال" },
    { field: "Year1", headerName: "سال" },
    // { field: "Group", headerName: "گروه انتخابی" },
    { field: "GroupNew", headerName: "گروه انتخابی" },
    { field: "BeginDate", headerName: "تاریخ " },
  ];

  @ViewChild("chipList")
  chipList!: MatChipList;
  fruits: Fruit[] = [
    { name: "گروه 1", selected: false },
    { name: "گروه 2", selected: false },
    { name: "گروه 3", selected: false },
    { name: "گروه 4", selected: false },
    { name: "گروه 5", selected: false },
    { name: "گروه 6", selected: false },
  ];


  rowData: industryModel[] = [];

  form: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private industryservice: IndustryService,
    private authenticateService: AuthenticateService
  ) {}

  ngOnInit(): void {
    this.initForm(); //set form controller and validations
    this.loginTest();
    this.getindustry();
  }

  selectedRow(value: any) {
    this.form.setValue(value.data);
    // this.form.get("IndustryID").patchValue(value.data.IndustryID);
    // this.form.get("IndustryName").patchValue(value.data.IndustryName);

    this.autocompletedata = [];
    this.autocompletedata.push(value.data.Year);
    this.autocompletedata.push(value.data.Year1);

    this.defaultSelect = value.data.Month;
    this.form.get("Month").patchValue(this.defaultSelect);
    // this.form.get("Year").patchValue(value.data.Year);
    this.aDate = moment.from(value.data.BeginDate, "fa");
    this.form.get("BeginDate").patchValue(value.data.BeginDate);
    this.form.get("GroupNew").patchValue(value.data.GroupNew);
    console.log(this.form.value);
  }

  initForm() {
    // this.form.addControl("IndustryId", new FormControl());
    // this.form.addControl("IndustryName", new FormControl());
    this.form = this.formBuilder.group({
      IndustryID: ["", Validators.required],
      IndustryName: ["", Validators.required],
      Month: [""],
      Year: new FormControl("", Validators.required),
      Year1: new FormControl("", Validators.required),
      // Group: new FormControl("", Validators.required),
      GroupNew: new FormControl("", Validators.required),
      BeginDate: new FormControl("", Validators.required),
    });
  }

  loginTest() {
    this.authenticateService.loginTest().subscribe((rest: any) => {
      localStorage.setItem("token", rest["data"]["token"]);
    });
  }



  getindustry() {
    // this.industryservice.getindustry2().subscribe((res) => {
    //   this.rowData = res;
    // });
    this.rowData = [
      {
        IndustryID: 1,
        IndustryName: "string1",
        Month: "1",
        Year: "1355",
        Year1: "1356",
        // Group: "1",
        GroupNew: ["گروه 1", "گروه 2"],
        BeginDate: "1358/01/01",
      },
      {
        IndustryID: 2,
        IndustryName: "string2",
        Month: "2",
        Year: "1356",
        Year1: "1356",
        // Group: "1,2",
        GroupNew: ["گروه 2", "گروه 3"],
        BeginDate: "1401/12/28",
      },
      {
        IndustryID: 3,
        IndustryName: "string3",
        Month: "3",
        Year: "1357",
        Year1: "1356",
        GroupNew: ["گروه 1"],
        // Group: "1",
        BeginDate: "1400/11/01",
      },
    ];
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : "";
  }
  apigrid: any;
  refresh(e: any) {
    this.apigrid = e;
  }

  onSubmit() {
    // this.industryservice
    //   .insert(this.form.value)
    //   .subscribe((rest: resultMessage) => {
    //     console.log(rest);
    //     this.getindustry();
    //     this.toastr.success("Hello world!", "Toastr fun!");
    //   });
    
    this.form.get('Month').patchValue(this.defaultSelect);
    console.log(this.form.value as industryModel);
    if (this.form.invalid) return;

    this.rowData.push(this.form.value as industryModel);
    this.apigrid.setRowData(this.rowData);
    this.showSuccess();
  }
  showSuccess() {
    this.toastr.success("Hello world!", "Toastr fun!");
  }

  onChipRemoved(chip: string, formControl: AbstractControl) {
    const chips = formControl.value as string[];
    this.removeFirst(chips, chip);
    formControl.setValue(chips); // To trigger change detection
  }

  getdatacompelete(value: any) {
    console.log("aaaaaaa", value);
    if (value[1] == "0") {
      this.form.get("Year").patchValue(value[0]);
    } else if (value[1] == "1") {
      this.form.get("Year1").patchValue(value[0]);
    }
  }
  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }


}
