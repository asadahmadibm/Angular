import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-fish',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.css']
})
export class FishComponent implements OnInit {
  value = 'Clear me';
  rowData = [
    { make: "Toyota", model: "Celica" },
    { make: "Ford", model: "Mondeo" },
  ];
  columnDefs: ColDef[] = [
    { field: "کد پرسنلی" },
    { field: "نام و نام خانوادگی" },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
