import { TestBed, inject } from '@angular/core/testing';

import { NetworkCommandsService } from './network-commands.service';

describe('NetworkCommandsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkCommandsService]
    });
  });

  it('should be created', inject([NetworkCommandsService], (service: NetworkCommandsService) => {
    expect(service).toBeTruthy();
  }));
});
