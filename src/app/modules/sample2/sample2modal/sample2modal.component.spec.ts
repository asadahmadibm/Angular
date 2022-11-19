import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sample2modalComponent } from './sample2modal.component';

describe('Sample2modalComponent', () => {
  let component: Sample2modalComponent;
  let fixture: ComponentFixture<Sample2modalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sample2modalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sample2modalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
