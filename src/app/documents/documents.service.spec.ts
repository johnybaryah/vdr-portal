import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { DocumentsService } from './documents.service';
import { ActivatedRoute } from '@angular/router';

describe('DocumentsService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentsService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([HttpClient], (service: DocumentsService) => {
    expect(service).toBeTruthy();
  }));

  it('should have a list of documents', inject([DocumentsService, HttpClient], (service: DocumentsService) => {
    service.getAllDocuments().subscribe(d => {
      expect(d).toBeGreaterThan(0);
    });
  }));

  it('should only have pending documents', inject([DocumentsService, HttpClient], (service: DocumentsService) => {
    service.getDocumentsbyStatus('Pending').subscribe(d => {
      d.forEach(element => {
        expect(element.Status).toBe('Pending');
      });
    });
  }));

  it('should only have Approved documents', inject([DocumentsService, HttpClient], (service: DocumentsService) => {
    service.getDocumentsbyStatus('Approve').subscribe(d => {
      d.forEach(element => {
        expect(element.Status).toBe('Approve');
      });
    });
  }));
});
