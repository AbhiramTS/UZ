import { TestBed } from '@angular/core/testing';

import { Web3ServiceService } from './web3-service.service';

describe('Web3ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Web3ServiceService = TestBed.get(Web3ServiceService);
    expect(service).toBeTruthy();
  });
});
