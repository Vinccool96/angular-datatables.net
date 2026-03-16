import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDemoComponent } from './base-demo.component';

describe('BaseDemoComponent', () => {
  let component: BaseDemoComponent;
  let fixture: ComponentFixture<BaseDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
