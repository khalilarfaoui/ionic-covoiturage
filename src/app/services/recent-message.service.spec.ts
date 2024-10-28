import { TestBed } from '@angular/core/testing';

import { RecentMessageService } from './recent-message.service';

describe('RecentMessageService', () => {
  let service: RecentMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
