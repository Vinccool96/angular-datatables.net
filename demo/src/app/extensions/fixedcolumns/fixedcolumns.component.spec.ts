import { FixedcolumnsComponent } from './fixedcolumns.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MarkdownComponent } from 'ngx-markdown';
import { provideMarkdownServiceTesting } from '../../../../test/provide-markdown-service-testing';

describe('FixedcolumnsComponent', () => {
  let spectator: Spectator<FixedcolumnsComponent>;
  let component: FixedcolumnsComponent;

  const createComponent = createComponentFactory({
    component: FixedcolumnsComponent,
    declarations: [MockComponent(MarkdownComponent)],
    providers: [provideMarkdownServiceTesting()],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
