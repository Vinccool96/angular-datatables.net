import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedcolumnsComponent } from './fixedcolumns.component';

describe('FixedcolumnsComponent', () => {
  let component: FixedcolumnsComponent;
  let fixture: ComponentFixture<FixedcolumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedcolumnsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FixedcolumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
