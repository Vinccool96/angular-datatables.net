import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let spectator: SpectatorRouting<PersonComponent>;
  let component: PersonComponent;

  const createComponent = createRoutingFactory({
    component: PersonComponent,
    params: { id: 154 },
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
