import { waitForAsync } from '@angular/core/testing';

import { NewServerSideComponent } from './new-server-side.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';

describe('NewServerSideComponent', () => {
  let spectator: Spectator<NewServerSideComponent>;
  let component: NewServerSideComponent;

  const createComponent = createComponentFactory({
    component: NewServerSideComponent,
    declarations: [MockComponent(MarkdownComponent)],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have title "Server-side processing"', waitForAsync(() => {
    expect(component.pageTitle).toBe('Server-side processing');
  }));
});
