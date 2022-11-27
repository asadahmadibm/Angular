import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminGridComponent } from 'src/app/commonComponent/admin-grid/admin-grid.component';
import { industryModel } from 'src/app/models/industry.model';
import { Sample2EntryComponent } from '../sample2-entry/sample2-entry.component';

@Component({
  selector: 'app-group1',
  templateUrl: './group1.component.html',
  styleUrls: ['./group1.component.css']
})
export class Group1Component implements OnInit {
  @ViewChild("admingrid") admingrid!: AdminGridComponent;
  private gridApi!: GridApi;
  columnDefs: ColDef[] = [
    { field: "IndustryID", headerName: "کد" },
    { field: "IndustryName", headerName: "نام" },
    { field: "Month", headerName: "کد ماه" },
    { field: "Year", headerName: "سال" },
    { field: "Year1", headerName: "سال" },
    // { field: "Group", headerName: "گروه انتخابی" },
    { field: "GroupNew", headerName: "گروه انتخابی" },
    { field: "BeginDate", headerName: "تاریخ " },
  ];
  rowsData: industryModel[] = [];
  constructor( public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getindustry();
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
    const index = this.rowsData.findIndex((item) => item.IndustryID == id);
    if (index > -1) {
      this.rowsData.splice(index, 1);
    }
    this.admingrid.gridApi.setRowData(this.rowsData);
    console.log(index);
  }
  openDialog(data: any): void {
    
    
    const dialogRef = this.dialog.open(Sample2EntryComponent);
    dialogRef.componentInstance.formdata = data;
    console.log("ddddddddd",data);

    dialogRef.afterClosed().subscribe((result: industryModel) => {
      const index = this.rowsData.findIndex(
        (item) => item.IndustryID == result.IndustryID
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

  getindustry() {
    // this.industryservice.getindustry2().subscribe((res) => {
    //   this.rowData = res;
    // });
    this.rowsData = [
      {
        IndustryID: 1,
        IndustryName: "string1",
        Month: "1",
        Year: "1355",
        Year1: "1356",
        // Group: "1",
        GroupNew: ["گروه 1", "گروه 2"],
        BeginDate: "1358/01/01",
      },
      {
        IndustryID: 2,
        IndustryName: "string2",
        Month: "2",
        Year: "1356",
        Year1: "1356",
        // Group: "1,2",
        GroupNew: ["گروه 2", "گروه 3"],
        BeginDate: "1401/12/28",
      },
      {
        IndustryID: 3,
        IndustryName: "string3",
        Month: "3",
        Year: "1357",
        Year1: "1356",
        GroupNew: ["گروه 1"],
        // Group: "1",
        BeginDate: "1400/11/01",
      },
    ];
  }

}
