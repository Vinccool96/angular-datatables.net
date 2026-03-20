import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoNgTemplateRef } from './demo-ng-template-ref';

describe('DemoNgTemplateRef', () => {
  let component: DemoNgTemplateRef;
  let fixture: ComponentFixture<DemoNgTemplateRef>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoNgTemplateRef],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoNgTemplateRef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
