import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sample2EntryComponent } from './sample2-entry.component';

describe('Sample2EntryComponent', () => {
  let component: Sample2EntryComponent;
  let fixture: ComponentFixture<Sample2EntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sample2EntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sample2EntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
