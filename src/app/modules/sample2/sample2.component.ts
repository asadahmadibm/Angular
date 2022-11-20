import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthenticateService } from "src/app/services/authenticate/authenticate.service";


@Component({
  selector: "app-sample2",
  templateUrl: "./sample2.component.html",
  styleUrls: ["./sample2.component.css"],
})
export class Sample2Component implements OnInit {


  constructor(    private authenticateService: AuthenticateService,
   
  ) {}

  ngOnInit(): void {
    this.loginTest();

  }
  loginTest() {
    this.authenticateService.loginTest().subscribe((rest: any) => {
      localStorage.setItem("token", rest["data"]["token"]);
    });
  }



 
}
