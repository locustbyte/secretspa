import { TestBed } from '@angular/core/testing';

import { MetaweatherService } from './metaweather.service';

describe('MetaweatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetaweatherService = TestBed.get(MetaweatherService);
    expect(service).toBeTruthy();
  });
});
