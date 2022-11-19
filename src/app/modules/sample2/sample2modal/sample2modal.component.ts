import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { industryModel } from 'src/app/models/industry.model';

@Component({
  selector: 'app-sample2modal',
  templateUrl: './sample2modal.component.html',
  styleUrls: ['./sample2modal.component.css']
})
export class Sample2modalComponent implements OnInit {
  @Input() formdata!: industryModel;
  constructor( public dialogRef: MatDialogRef<Sample2modalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: industryModel) { 
      this.formdata = data;
    }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
