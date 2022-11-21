import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
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
export class Sample2EntryComponent implements OnInit, OnChanges {
  @Input() formdata!: industryModel;
  autocompletedata: any = "";
  form: any;
 
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
  constructor(
    private fb: FormBuilder ,
    public dialogRef: MatDialogRef<Sample2EntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: industryModel
  ) {
    this.formdata = data;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["formdata"] && changes["formdata"].currentValue){
      this.refreshForm(changes["formdata"].currentValue as industryModel);
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      IndustryID: ["", Validators.required],
      IndustryName: ["", Validators.required],
      Month: new FormControl("",Validators.required),
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
    console.log(this.form.value as industryModel);
  }

  refreshForm(data: industryModel) {
    // console.log("refreshForm",data);

    if (data === undefined || this.form === undefined) return;

    this.form.setValue(data);

    this.form.get("Year").patchValue(data.Year);
    this.autocompletedata = data.Year;

    this.form.get("Month").patchValue(data.Month);

    this.aDate = moment.from(data.BeginDate, "fa");
    this.form.get("BeginDate").patchValue(this.aDate);

    this.form.get("GroupNew").patchValue(data.GroupNew);
  }



  onNoClick(): void {
    this.dialogRef.close();
  }
}
