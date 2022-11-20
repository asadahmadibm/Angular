import { Component, Inject, Input, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as moment from "jalali-moment";
import { Fruit, industryModel } from "src/app/models/industry.model";

@Component({
  selector: "app-sample2-entry",
  templateUrl: "./sample2-entry.component.html",
  styleUrls: ["./sample2-entry.component.css"],
})
export class Sample2EntryComponent implements OnInit {
  @Input() formdata!: industryModel;
  autocompletedata: any = "";
  form: any;
  defaultSelect: any;
  aDate: any;
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
  arrayDynamic: Fruit["name"][] = [];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      IndustryID: ["", Validators.required],
      IndustryName: ["", Validators.required],
      Month: ["", Validators.required],
      Year: new FormControl("", Validators.required),
      Year1: new FormControl("", Validators.required),
      // Group: new FormControl("", Validators.required),
      GroupNew: new FormControl("", Validators.required),
      BeginDate: new FormControl("", Validators.required),
    });

    // console.log(this.formdata);
      this.refreshForm(this.formdata);
  }
  onSubmit() {
    this.form.get('Month').patchValue(this.defaultSelect);
    console.log(this.form.value as industryModel);
  }
  getdatacompelete(value: any) {
     console.log("aaaaaaa", value);
    this.form.get("Year").patchValue(value);
    // console.log(this.form.get("Year").value);
    
  }


  refreshForm(data: industryModel) {

    // console.log("refreshForm",data);
    
    if(data===undefined || this.form===undefined) return;

    this.form.setValue(data);

    this.form.get("Year").patchValue(data.Year);
    this.autocompletedata = data.Year;

    this.defaultSelect = data.Month;
    this.form.get("Month").patchValue(this.defaultSelect);

    this.aDate = moment.from(data.BeginDate, "fa");
    this.form.get("BeginDate").patchValue(this.aDate);

    this.form.get("GroupNew").patchValue(data.GroupNew);
    console.log("after refreshForm",this.form.value);
  }

  ngOnChanges(changes: SimpleChanges) {
   console.log(changes["formdata"].currentValue as industryModel);
   
    this.refreshForm(changes["formdata"].currentValue as industryModel);
  }


  onInput(event: MatDatepickerInputEvent<moment.Moment>) {
    console.log("OnInput: ", event.value);
  }

  onChange(event: MatDatepickerInputEvent<moment.Moment>) {
    const x = moment(event.value!).format("jYYYY/jMM/jDD");
    this.form.get("BeginDate").patchValue(x);
  }
}
