import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, LoginComponent ],
      imports: [FormsModule, HttpModule, RouterTestingModule],
      providers: [AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
