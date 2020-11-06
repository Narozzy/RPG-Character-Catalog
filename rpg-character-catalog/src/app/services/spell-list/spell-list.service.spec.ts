import { TestBed } from '@angular/core/testing';

import { SpellListService } from './spell-list.service';

describe('SpellListService', () => {
  let service: SpellListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpellListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
