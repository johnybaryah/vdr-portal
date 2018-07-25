import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { DocumentsService } from './documents.service';
import { ActivatedRoute } from '@angular/router';

describe('DocumentsService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentsService, ActivatedRoute],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([DocumentsService], (service: DocumentsService, _route: ActivatedRoute) => {
    expect(service).toBeTruthy();
  }));

  it('should have a list of documents', inject([DocumentsService, ActivatedRoute], (service: DocumentsService, _route: ActivatedRoute) => {

    // service.query(state).subscribe(d => {
    //   expect(d).toBeGreaterThan(0);
    // });
  }));
});
