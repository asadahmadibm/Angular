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
  matselectdata: any = [
    { id: "1", name: "فروردین" },
    { id: "2", name: "اردیبهشت" },
    { id: "3", name: "خرداد" },
  ];
  filteredOptions!: Observable<string[]>;

  columnDefs: ColDef[] = [
    { field: "IndustryID", headerName: "کد" },
    { field: "IndustryName", headerName: "نام" },
    { field: "Month", headerName: "کد ماه" },
    { field: "Year", headerName: "سال" },
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

  arrayDynamic: Fruit["name"][] = [];
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

    this.filteredOptions = this.form.get("Year").valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value || ""))
    );

  }


  selectedRow(value: any) {

    this.form.setValue(value.data);
    // this.form.get("IndustryID").patchValue(value.data.IndustryID);
    // this.form.get("IndustryName").patchValue(value.data.IndustryName);
    this.defaultSelect = value.data.Month;
    this.form.get("Month").patchValue(this.defaultSelect);
    // this.form.get("Year").patchValue(value.data.Year);
    this.aDate= moment.from(value.data.BeginDate, "fa");
    this.form.get("BeginDate").patchValue(value.data.BeginDate);
    for(let item of this.fruits)
    {
      item.selected=false;
    }
    console.log(value.data.GroupNew);
    
    var array = value.data.GroupNew;
    this.arrayDynamic = [];
    for (let item of array) {
      
      const index=this.fruits.findIndex(i => i.name === item)
      if(index>-1)
      {
        this.fruits[index].selected=true;
        this.arrayDynamic.push(this.fruits[index].name);
      }

      // let item1 = this.fruits.find(i => i.name === item);
      // this.fruits.find((value:any, index:any) => {
      //   if (index != 0) {
      //    this.fruits[index].selected=true;
      //    this.arrayDynamic.push(this.fruits[index].name);
      //   }
      // });

      // item1!.selected=true;
    }
    this.form.get("GroupNew").patchValue(this.arrayDynamic);
    console.log(this.form.value);
    
  }

  initForm() {
    // this.form.addControl("IndustryId", new FormControl());
    // this.form.addControl("IndustryName", new FormControl());
    this.form = this.formBuilder.group({
      IndustryID: ["", Validators.required],
      IndustryName: ["", Validators.required],
      Month: ["", Validators.required],
      Year: new FormControl("", Validators.required),
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

  onSelectFruit(fruit: any) {
    fruit.selected = !fruit.selected;
    this.arrayDynamic = [];
    for (let fruit of this.fruits) {
      if (fruit.selected) {
        this.arrayDynamic.push(fruit.name);
      }
    }
    this.form.get("GroupNew").patchValue(this.arrayDynamic);
    
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
        // Group: "1",
        GroupNew: ["گروه 1","گروه 2"],
        BeginDate: "1358/01/01",
      },
      {
        IndustryID: 2,
        IndustryName: "string2",
        Month: "2",
        Year: "1356",
        // Group: "1,2",
        GroupNew: ["گروه 2","گروه 3"],
        BeginDate: "1401/12/28",
      },
      {
        IndustryID: 3,
        IndustryName: "string3",
        Month: "3",
        Year: "1357",
        GroupNew: ["گروه 1"],
        // Group: "1",
        BeginDate: "1400/11/01",
      },
    ];
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
  }
}
