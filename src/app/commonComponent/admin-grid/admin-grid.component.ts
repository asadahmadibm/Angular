import { Component, Input, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-admin-grid',
  templateUrl: './admin-grid.component.html',
  styleUrls: ['./admin-grid.component.css']
})

export class AdminGridComponent implements OnInit {

  @Input() datagrid:any;
  @Input() columnsgrid:any;
  private gridApi:any;




          onGridReady(params:any) {
            params.api.sizeColumnsToFit();
            this.gridApi = params.api;

          }
  constructor() { }

  ngOnInit(): void {
  }

}
