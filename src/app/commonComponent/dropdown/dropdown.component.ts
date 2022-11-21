import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor, OnInit {
  @Input() require:boolean=false;
  inputControl!: FormControl;

  _onChange?: Function;
  _onTouch?: Function;
 
  @Input()  matselectdata: any ;
  constructor() { }

  ngOnInit(): void {

    
    this.inputControl = new FormControl( "",this.require==true ? Validators.required : null);
    console.log(this.inputControl );
  }

  onTouch() {
    if (!this._onTouch) return;
    this._onTouch(); // formControl will be marked as touched when blur occurs (when mat-autocomplete is closed)
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  writeValue(value: any): void {
    this.inputControl?.setValue(value);
  }

  doSomething(value:any)
  {

    this.inputControl.patchValue(value.value);
    if (!this._onChange) return;
    this._onChange(value.value);
    
  }

}
