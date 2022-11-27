import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { map, Observable, startWith } from "rxjs";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent implements ControlValueAccessor, OnInit {
  @Output() onSelect = new EventEmitter<string>();
  @Input() optionsData: string[] = [];
  @Input() require: boolean = false;
  inputControl!: FormControl;
  filteredOptions!: Observable<string[]>;
  _onChange?: Function;
  _onTouch?: Function;
  // methods for updating formControl state for parent
  onTouch() {
    if (!this._onTouch) return;
    this._onTouch(); // formControl will be marked as touched when blur occurs (when mat-autocomplete is closed)
  }
  onChange(event: any) {
    console.log(event);
    // this.onSelect.emit(value.option.value)
    if (!this._onChange) return;
    if (event.value) {
      const item = this.optionsData.find((item) => item === event.value);
      //debugger
      if (item) {
        this.inputControl.patchValue(item);
      } else {
        if (event.value == "") {
          // this.inputControl.patchValue(null);
          this.inputControl.reset();
          // this.inputControl.setValidators[Validators.required]
          console.log(this.inputControl.value);
        }
      }
    } else if (event.option.value) {
      this._onChange(event.option.value);
    }
  }

  ngOnInit(): void {
    this.inputControl = new FormControl(
      "",
      Validators.compose([
        this.require == true ? Validators.required : null,
        FormCustomValidators.valueSelected(this.optionsData),
      ])
    );
    this.filteredOptions = this.inputControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value || ""))
    );
  }

  constructor(private formBuilder: FormBuilder) {}

  // methods from ControlValueAccessor interface
  writeValue(value: any): void {
    this.inputControl?.setValue(value);
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  onFocus() {
    const value = this.inputControl.value;
    const item = this.optionsData.find((item) => item === value);
    if (item) this.inputControl.patchValue(item);
  }
  chnagevalue(event: any) {
    const value1 = event.target.value;
    const item = this.optionsData.find((item) => item === value1);
    debugger;
    if (item) {
      this.inputControl.patchValue(item);
      if (!this._onChange) return;
      this._onChange(item);
    } else {
      if (!this._onChange) return;
      this._onChange(item);
    }
    //this.inputControl.patchValue(value1);
  }

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsData.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
export class FormCustomValidators {
  static valueSelected(myArray: any[]): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      let selectboxValue = c.value;
      let pickedOrNot = myArray.filter((alias) => alias === selectboxValue);

      if (pickedOrNot.length > 0) {
        // everything's fine. return no error. therefore it's null.
        return null;
      } else {
        //there's no matching selectboxvalue selected. so return match error.
        return { match: true };
      }
    };
  }
}
