import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ColDef, SelectionChangedEvent } from "ag-grid-community";

@Component({
  selector: "app-admin-grid",
  templateUrl: "./admin-grid.component.html",
  styleUrls: ["./admin-grid.component.css"],
})
export class AdminGridComponent implements OnInit {
  @Input() datagrid: any;
  @Input() columnsgrid: any;
  @Input() heightGrid: any;
  @Output() refreshdata = new EventEmitter<any>();
  @Output() selectedRow=new EventEmitter<any>();

  public gridApi: any;

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
    this.refreshdata.emit(this.gridApi);
  }

  constructor() {}

  ngOnInit(): void {}

  onRowClicked(event: any) {
    this.selectedRow.emit(event);
  }
}
