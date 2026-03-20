import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator';

import { PersonIdPage } from './person-id-page';

describe('PersonIdPage', () => {
  let spectator: SpectatorRouting<PersonIdPage>;
  let component: PersonIdPage;

  const createComponent = createRoutingFactory({
    component: PersonIdPage,
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
