import { TestBed, inject } from '@angular/core/testing';

import { FriendsLifeServiceService } from './friends-life-service.service';

describe('FriendsLifeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FriendsLifeServiceService]
    });
  });

  it('should be created', inject([FriendsLifeServiceService], (service: FriendsLifeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
