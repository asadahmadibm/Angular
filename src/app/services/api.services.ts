import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ServiceErrorsModel, ServiceModel } from "../models/Service.model";
import { ToastService } from "./toast.service";

@Injectable({
  providedIn: "root",
})
export class ApiServices {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastService
  ) {}

  post(
    url: string,
    parameters: {}[] | {} | any,
    checkIsAuthenticated: boolean = true
  ): Observable<ServiceModel> {
    return this.http
      .post<any>(environment.apiUrl + url, parameters, this.httpOptions)
      .pipe(
        map((result: ServiceModel) => {
          if (result["errors"] && result["errors"]?.length > 0)
            this.errorHandler(result);

          return new ServiceModel(
            result["data"],
            result["errors"],
            result["statusCode"]
          );
        }),
        catchError((resultError) => {
          return this.catchErrorHandler(resultError);
        })
      );
  }

  put(
    url: string,
    parameters: {}[] | {},
    checkIsAuthenticated: boolean = true
  ): Observable<ServiceModel> {
    return this.http
      .put<any>(environment.apiUrl + url, parameters, this.httpOptions)
      .pipe(
        map((result: ServiceModel) => {
          if (result["errors"] && result["errors"]?.length > 0)
            this.errorHandler(result);

          return new ServiceModel(
            result["data"],
            result["errors"],
            result["statusCode"]
          );
        }),
        catchError((resultError) => {
          return this.catchErrorHandler(resultError);
        })
      );
  }

  get(
    url: string,
    checkIsAuthenticated: boolean = true
  ): Observable<ServiceModel> {
    return this.http.get<any>(environment.apiUrl + url, this.httpOptions).pipe(
      map((result: ServiceModel) => {
        if (result["errors"] && result["errors"]?.length > 0)
          this.errorHandler(result);

        return new ServiceModel(
          result["data"],
          result["errors"],
          result["statusCode"]
        );
      }),
      catchError((resultError) => {
        return this.catchErrorHandler(resultError);
      })
    );
  }

  getData<T>(url: string, checkIsAuthenticated: boolean = true): Observable<T> {
    return this.http.get<any>(environment.apiUrl + url, this.httpOptions).pipe(
      catchError((resultError) => {
        return this.catchErrorHandler(resultError);
      })
    );
  }

  delete(url: string, parameters: {}[] | {}): Observable<ServiceModel> {
    let newHttpOption = {
      headers: this.httpOptions.headers,
      body: parameters,
    };

    return this.http.delete<any>(environment.apiUrl + url, newHttpOption).pipe(
      map((result: ServiceModel) => {
        if (result["errors"] && result["errors"]?.length > 0)
          this.errorHandler(result);

        return new ServiceModel(
          result["data"],
          result["errors"],
          result["statusCode"]
        );
      }),
      catchError((resultError) => {
        return this.catchErrorHandler(resultError);
      })
    );
  }

  catchErrorHandler(resultError: any) {
    console.log(
      "error=",resultError
    );

    if (resultError["status"] === 404) {
      this.toastr.error("globalApiError");
      this.router.navigate(["/404"]);
    }

    if (resultError["status"] === 401) {
      this.router.navigate(["/logout"]);
    }

    if (
      resultError["error"]["errors"] &&
      resultError["error"]["errors"].length > 0
    ) {
      resultError["error"]["errors"].forEach((error: ServiceErrorsModel) => {
        if (error["code"]) this.toastr.error(error["code"].toString());
        else this.showGlobalError();
      });
    } else {
      this.showGlobalError();
    }

    return throwError(
      () =>
        new ServiceModel(
          resultError["error"]["data"],
          resultError["error"]["errors"],
          resultError["error"]["statusCode"]
        )
    );
  }

  errorHandler(resultError: ServiceModel) {
    if (resultError["statusCode"] === 404) {
      this.toastr.error("globalApiError");
      this.router.navigate(["/404"]);
    }

    if (resultError["statusCode"] === 401) {
      this.router.navigate(["/logout"]);
    }

    if (resultError["errors"] && resultError["errors"].length > 0) {
      resultError["errors"].forEach((error: ServiceErrorsModel) => {
        if (error["code"]) {
          this.toastr.error(error["code"].toString());
        } else this.showGlobalError();
      });
    } else {
      this.showGlobalError();
    }
  }
  showGlobalError() {
    this.toastr.error("globalError");
  }
}
