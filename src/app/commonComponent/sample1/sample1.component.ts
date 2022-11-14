import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { ColDef } from "ag-grid-community";
import * as moment from "jalali-moment";
import { ToastrService } from "ngx-toastr";
import { map, Observable, startWith } from "rxjs";
import { industryModel, User } from "src/app/models/industry.model";
import { AuthenticateService } from "src/app/services/authenticate/authenticate.service";
import { IndustryService } from "src/app/services/crm/industry.service";
import { AdminGridComponent } from "../admin-grid/admin-grid.component";

@Component({
  selector: "app-sample1",
  templateUrl: "./sample1.component.html",
  styleUrls: ["./sample1.component.css"],
})
export class Sample1Component implements OnInit {
  aDate:any;
  MinDate:any;
  groupItem: string[] = [];
  options: string[] = ["1399", "1400", "1401"];
  filteredOptions!: Observable<string[]>;

  columnDefs: ColDef[] = [
    { field: "IndustryID", headerName: "کد" },
    { field: "IndustryName", headerName: "نام" },
    { field: "Month", headerName: "کد ماه" },
    { field: "Year", headerName: "سال" },
    { field: "Group", headerName: "گروه انتخابی" },
    { field: "BeginDate", headerName: "تاریخ " },
  ];

  rowData: industryModel[] = [];
  form: any;
  matselectdata: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private industryservice: IndustryService,
    private authenticateService: AuthenticateService
  ) {}

  ngOnInit(): void {
    this.initForm(); //set form controller and validations
    this.loginTest();
    this.getMonth();
    this.getindustry();

    this.filteredOptions = this.form.get("Year").valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value || ""))
    );

    this.groupItem = ["گروه 1", "گروه 2", "گروه 3", "گروه 4"];

    //this.form.get("BeganDate").patchValue(moment());
    this.MinDate = moment.from("1400-07-29", "fa");
    this.aDate= this.MinDate;

  }

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : "";
  }

  initForm() {
    // this.form.addControl("IndustryId", new FormControl());
    // this.form.addControl("IndustryName", new FormControl());
    this.form = this.formBuilder.group({
      IndustryID: ["", Validators.required],
      IndustryName: ["", Validators.required],
      Month: ["", Validators.required],
      Year: new FormControl("", Validators.required),
      Group: new FormControl("", Validators.required),
      BeginDate: new FormControl("", Validators.required),
    });
  }

  loginTest() {
    this.authenticateService.loginTest().subscribe((rest: any) => {
      localStorage.setItem("token", rest["data"]["token"]);
    });
  }

  getMonth() {
    this.matselectdata = [
      { id: 1, name: "فروردین" },
      { id: 2, name: "اردیبهشت" },
      { id: 3, name: "خرداد" },
    ];
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
        Group: "1",
        BeginDate: "1358/01/01",
      },
      {
        IndustryID: 2,
        IndustryName: "string2",
        Month: "2",
        Year: "1356",
        Group: "1,2",
        BeginDate: "1401/01/01",
      },
      {
        IndustryID: 3,
        IndustryName: "string3",
        Month: "3",
        Year: "1357",
        Group: "1",
        BeginDate: "1400/11/01",
      },
    ];
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
    console.log(this.form.value);

    if (this.form.invalid) return;
    console.log(this.form.value as industryModel);

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

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  onInput(event: MatDatepickerInputEvent<moment.Moment>) {
    console.log("OnInput: ", event.value);
  }

  onChange(event: MatDatepickerInputEvent<moment.Moment>) {
    const x = moment(event.value!).format("jYYYY/jMM/jDD");
    this.form.get("BeginDate").patchValue(x);
    console.log("OnChange: ", x);
  }
}
