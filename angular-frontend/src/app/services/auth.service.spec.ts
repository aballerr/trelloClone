import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';
import { HttpModule } from '@angular/http';

describe('AuthService', () => {
  let http: Http;
  let service: AuthService;



  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
