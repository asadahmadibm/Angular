import {
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
import { Fruit } from "src/app/models/industry.model";

@Component({
  selector: "app-chips",
  templateUrl: "./chips.component.html",
  styleUrls: ["./chips.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsComponent),
      multi: true,
    },
  ],
})
export class ChipsComponent implements ControlValueAccessor, OnInit {
  @Input() items: Fruit[] = [];
  @Input() selecteditems: string[] = [];
  inputControl!: FormControl;
  arrayDynamic: Fruit["name"][] = [];
  constructor() {}
  _onChange?: Function;
  _onTouch?: Function;
  // methods for updating formControl state for parent
  onTouch() {
    if (!this._onTouch) return;
    this._onTouch(); // formControl will be marked as touched when blur occurs (when mat-autocomplete is closed)
  }
  // methods from ControlValueAccessor interface
  writeValue(value: any): void {
    this.arrayDynamic = [];
    for (let item of this.items) {
      item.selected = false;
    }
    for (let item of value) {
      const index = this.items.findIndex((i) => i.name === item);
      if (index > -1) {
        this.items[index].selected = true;
        this.arrayDynamic.push(this.items[index].name);
      }
    }
    this.inputControl?.setValue(value);
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }
  onChange() {}

  ngOnInit(): void {
    this.inputControl = new FormControl("", Validators.required);
    this.arrayDynamic = [];
    for (let item of this.items) {
      item.selected = false;
    }
    for (let item of this.selecteditems) {
      const index = this.items.findIndex((i) => i.name === item);
      if (index > -1) {
        this.items[index].selected = true;
        this.arrayDynamic.push(this.items[index].name);
      }
    }
  }

  onSelectFruit(fruit: any) {
    fruit.selected = !fruit.selected;
    this.arrayDynamic = [];
    for (let fruit of this.items) {
      if (fruit.selected) {
        this.arrayDynamic.push(fruit.name);
      }
    }
    this.inputControl.patchValue(this.arrayDynamic);
    if (!this._onChange) return;
    this._onChange(this.arrayDynamic);
  }
}
