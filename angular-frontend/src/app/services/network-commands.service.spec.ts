import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http'
import { NetworkCommandsService } from './network-commands.service';
import { AuthService } from './auth.service';

describe('NetworkCommandsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkCommandsService, AuthService],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([NetworkCommandsService], (service: NetworkCommandsService) => {
    expect(service).toBeTruthy();
  }));
});
