import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RemoteCallService } from './config.service';

describe('RemoteCallService', () => {
    beforeEach(() => {
        let service: RemoteCallService;
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [RemoteCallService]
        });
        service = TestBed.get(RemoteCallService);
    });

  it('should be created', () => {
    const service: RemoteCallService = TestBed.get(RemoteCallService);
    expect(service).toBeTruthy();
  });

  it('should be sendRequest', () => {
    const service: RemoteCallService = TestBed.get(RemoteCallService);
    service.sendRequest("334","2434");
    expect(service).toBeTruthy();
  });
});