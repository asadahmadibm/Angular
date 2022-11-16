import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  @Output() data =new EventEmitter<any>();
  @Input() value:string='';
 form!:any;
 
  options: string[] = ["1399", "1400", "1401"];
  filteredOptions!: Observable<string[]>;
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      Year: new FormControl(this.value, Validators.required),
    });

    this.filteredOptions = this.form.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value || ""))
    );
  }

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  chnagevalue()
  {
    this.data.emit(this.form.get('Year').value)
  }

  chnagevalue1(value:any)
  {
     this.data.emit(value)
  }

}
