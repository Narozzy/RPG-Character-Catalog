import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateNpcModal } from './second.page';

describe('SecondPage', () => {
  let component: CreateNpcModal;
  let fixture: ComponentFixture<CreateNpcModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNpcModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNpcModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
