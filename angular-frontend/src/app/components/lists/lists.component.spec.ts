import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { AuthService } from '../../services/auth.service';
import { NetworkCommandsService } from '../../services/network-commands.service';
import { ListsComponent } from './lists.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsComponent ],
      imports: [
        FormsModule,
        HttpModule,
        RouterTestingModule
      ],
      providers: [
        AuthService,
        NetworkCommandsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
