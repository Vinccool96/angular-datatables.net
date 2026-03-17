import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreHelpComponent } from './more-help.component';

describe('MoreHelpComponent', () => {
  let component: MoreHelpComponent;
  let fixture: ComponentFixture<MoreHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreHelpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MoreHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
