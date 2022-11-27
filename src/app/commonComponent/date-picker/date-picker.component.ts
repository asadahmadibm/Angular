import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import * as moment from "jalali-moment";

@Component({
  selector: "app-date-picker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {
  @Input() MinDate: any = moment.from("1355-05-21", "fa");
  @Input() require:boolean=false;
  inputControl!: FormControl;
  _onChange?: Function;
  _onTouch?: Function;
  constructor() {}

  ngOnInit(): void {
    this.inputControl = new FormControl("",this.require==true ? Validators.required : null);
  }
  ngAfterContentInit () {
    console.log(this.inputControl.value);
    if (this.inputControl.value) {
      const x = moment(this.inputControl.value).format("jYYYY/jMM/jDD");
      const aDate = moment.from(x, "fa");
      this.inputControl.patchValue(aDate);
      if (!this._onChange) return;
      this._onChange(x);
    }
  }

  onTouch() {
    if (!this._onTouch) return;
    this._onTouch(); // formControl will be marked as touched when blur occurs (when mat-autocomplete is closed)
  }

  writeValue(value: any): void {
    const aDate = moment.from(value, "fa");
    this.inputControl?.setValue(aDate);
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  onInput(event: MatDatepickerInputEvent<moment.Moment>) {
    console.log("OnInput: ", event.value);
    if (!this._onChange) return;
    this._onChange(event.value);
  }

  onChange(event: MatDatepickerInputEvent<moment.Moment>) {
    const x = moment(event.value!).format("jYYYY/jMM/jDD");
    const aDate = moment.from(x, "fa");
    this.inputControl.patchValue(aDate);
    if (!this._onChange) return;
    this._onChange(x);
  }
}
