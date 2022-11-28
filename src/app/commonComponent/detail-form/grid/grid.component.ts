import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminGridComponent } from '../../admin-grid/admin-grid.component';
import { DataEntryComponent } from '../data-entry/data-entry.component';

@Component({
  selector: 'app-grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.css']
})
export class GridComponent implements OnInit {
@ViewChild("admingrid") admingrid!: AdminGridComponent;
@Input() caption : string="";
@Input() rowsData : any;
@Input() columnDefs : any;

  constructor(public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  editform() {
    const selectedrow = this.admingrid.gridApi.getSelectedRows();
    if (selectedrow[0] === undefined) {
      this.toastr.error("لطفا ردیفی را انتخاب نمایید");
      return;
    }
    this.openDialog(selectedrow[0]);
  }
  addform() {
    this.openDialog(null);
  }
  onClickDeleteBtn() {
    const selectedrow = this.admingrid.gridApi.getSelectedRows();
    if (selectedrow[0] === undefined) {
      this.toastr.error("لطفا ردیفی را انتخاب نمایید");
      return;
    }
    this.deleterow(selectedrow[0].IndustryID);
  }

  deleterow(id: number) {
    const index = this.rowsData.findIndex((item:any) => item.IndustryID == id);
    if (index > -1) {
      this.rowsData.splice(index, 1);
    }
    this.admingrid.gridApi.setRowData(this.rowsData);
    console.log(index);
  }
  openDialog(data: any): void {
    const dialogRef = this.dialog.open(DataEntryComponent);
    dialogRef.componentInstance.formdata = data;
    dialogRef.afterClosed().subscribe((result: any) => {
      const index = this.rowsData.findIndex(
        (item:any) => item.IndustryID == result.IndustryID
      );
      if (index > -1) {
        this.rowsData[index]=result;
      }
      else
      {
        this.rowsData.push(result);
      }
      this.admingrid.gridApi.setRowData(this.rowsData);
      console.log("The dialog was closed", result);
    });
  }
}
