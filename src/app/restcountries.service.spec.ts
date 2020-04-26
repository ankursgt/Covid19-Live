import { TestBed } from '@angular/core/testing';

import { RestcountriesService } from './restcountries.service';

describe('RestcountriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestcountriesService = TestBed.get(RestcountriesService);
    expect(service).toBeTruthy();
  });
});
