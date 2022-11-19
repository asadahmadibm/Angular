import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ColDef } from "ag-grid-community";
import { industryModel } from "src/app/models/industry.model";
import { AuthenticateService } from "src/app/services/authenticate/authenticate.service";
import { Sample2EntryComponent } from "./sample2-entry/sample2-entry.component";
import { Sample2modalComponent } from "./sample2modal/sample2modal.component";

@Component({
  selector: "app-sample2",
  templateUrl: "./sample2.component.html",
  styleUrls: ["./sample2.component.css"],
})
export class Sample2Component implements OnInit {

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
  rowData!: industryModel;
  constructor(public dialog: MatDialog,private authenticateService: AuthenticateService) {}

  ngOnInit(): void {
    this.loginTest();
    this.getindustry();
  }
  loginTest() {
    this.authenticateService.loginTest().subscribe((rest: any) => {
      localStorage.setItem("token", rest["data"]["token"]);
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

  selectedRow(value: any) {
    this.rowData = value.data as industryModel;
    //this.openDialog();
    
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(Sample2modalComponent, {
      // width: '100%',
      data:this.rowData ,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);

    });
  }
}
