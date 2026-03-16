import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoNgTemplateRefComponent } from './demo-ng-template-ref.component';

describe('DemoNgTemplateRefComponent', () => {
  let component: DemoNgTemplateRefComponent;
  let fixture: ComponentFixture<DemoNgTemplateRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoNgTemplateRefComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoNgTemplateRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
