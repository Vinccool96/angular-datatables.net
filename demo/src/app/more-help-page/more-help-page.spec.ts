import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreHelpPage } from './more-help-page';

describe('MoreHelpPage', () => {
  let component: MoreHelpPage;
  let fixture: ComponentFixture<MoreHelpPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreHelpPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MoreHelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
