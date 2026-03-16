import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColreorderComponent } from './colreorder.component';

describe('ColreorderComponent', () => {
  let component: ColreorderComponent;
  let fixture: ComponentFixture<ColreorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColreorderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColreorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
