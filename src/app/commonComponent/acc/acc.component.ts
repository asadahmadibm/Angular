import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-acc',
  templateUrl: './acc.component.html',
  styleUrls: ['./acc.component.css']
})
export class AccComponent implements OnInit {

  columnDefs: ColDef[] = [
    { field: "ردیف" },
    { field: "کد حساب کل " },
    { field: "کد حساب معین " },
    { field: "نام حساب معین " },
  ];

  rowData = [

  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
