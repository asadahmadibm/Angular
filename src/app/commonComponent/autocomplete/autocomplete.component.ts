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
  @Input()  id!:number
   myControl = new FormControl('');
 
  options: string[] = ["1399", "1400", "1401"];
  filteredOptions!: Observable<string[]>;
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
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

  chnagevalue(id:number)
  {
    let generalvar=[]
    generalvar.push(this.myControl.value)
    generalvar.push(id)
    this.data.emit(generalvar)
  }

  chnagevalue1(value:any,id:number)
  {
    let generalvar=[]
    generalvar.push(value)
    generalvar.push(id)
     this.data.emit(generalvar)
  }

}
