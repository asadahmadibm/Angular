import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
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
  onChange(value: MatAutocompleteSelectedEvent) {
    // this.onSelect.emit(value.option.value)
    if (!this._onChange) return;
    this._onChange(value.option.value);
  }

  ngOnInit(): void {
    this.inputControl = new FormControl(
      "",
      this.require == true ? Validators.required : null
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
    //debugger
    if (item) {
      this.inputControl.patchValue(item);
    } else {
      if (value1 == "") {
        // this.inputControl.patchValue(null);
        this.inputControl.reset();
        // this.inputControl.setValidators[Validators.required]
        console.log(this.inputControl.value);
      }
    }
  }

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsData.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
