import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpellListModalPage } from './spell-list-modal.page';

describe('SpellListModalPage', () => {
  let component: SpellListModalPage;
  let fixture: ComponentFixture<SpellListModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellListModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpellListModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
