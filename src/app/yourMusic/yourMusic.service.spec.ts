import { TestBed, inject } from '@angular/core/testing';

import { YourMusicService } from './yourMusic.service';

describe('YourMusicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YourMusicService]
    });
  });

  it('should be created', inject([YourMusicService], (service: YourMusicService) => {
    expect(service).toBeTruthy();
  }));
});
