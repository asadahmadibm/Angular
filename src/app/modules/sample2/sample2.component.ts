import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ColDef } from "ag-grid-community";
import * as moment from "jalali-moment";
import { Fruit, industryModel } from "src/app/models/industry.model";
import { AuthenticateService } from "src/app/services/authenticate/authenticate.service";


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
  formmaster:any
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

  constructor(    private authenticateService: AuthenticateService,private fb:FormBuilder
   
  ) {}

  ngOnInit(): void {
    this.formmaster=this.fb.group({
      id:['',Validators.required],
      name:new FormControl(''),
      sal:new FormControl('',Validators.required),
      sal2:new FormControl(''),
      gn:new FormControl(''),
      date1:new FormControl('',Validators.required),
    })
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


  onsubmit()
  {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    
    if(changes["formmaster"] && changes["formdata"].currentValue){
      console.log(changes["formmaster"] && changes["formdata"].currentValue);
      
      //this.refreshForm(changes["formdata"].currentValue as industryModel);
    }
  }

 
}
