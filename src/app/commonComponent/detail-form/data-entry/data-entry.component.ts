import { Component, Inject, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { industryModel } from "src/app/models/industry.model";

@Component({
  selector: "app-data-entry",
  templateUrl: "./data-entry.component.html",
  styleUrls: ["./data-entry.component.css"],
})
export class DataEntryComponent implements OnInit {
  @Input() formdata!: industryModel;
  form: FormGroup = new FormGroup({});
  properties: string[] = [];
  constructor(
    public dialogRef: MatDialogRef<DataEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formdata = data;
  }

  ngOnInit(): void {
    // this.form.addControl('new1', new FormControl('', Validators.required));
    // this.form.addControl('new2', new FormControl('', Validators.required));
    // this.form.addControl('new3', new FormControl('', Validators.required));
    this.properties = Object.keys(
      this.formdata
    ) as (keyof typeof this.formdata)[];
    this.properties.forEach((element) => {
      console.log(element);

      this.form.addControl(element, new FormControl("", Validators.required));
    });
    //    this.form.addControl("new3", new FormControl('', Validators.required));
    this.refreshForm(this.formdata);
  }

  refreshForm(data: any) {
    if (data === undefined || this.form === undefined) return;
    this.form.setValue(data);
  }
  onSubmit() {
    console.log(this.form.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
