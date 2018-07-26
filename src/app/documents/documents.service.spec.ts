import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { DocumentsService } from './documents.service';
import { ActivatedRoute } from '@angular/router';
import { IDocument } from './document';
// import { ConsoleReporter } from 'jasmine';

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
    const docs = service.getAllDocuments();
    const allDocs: IDocument[] = [];

    docs.subscribe(d =>
      d.map(
        s => {
          allDocs.push(s);
          expect(allDocs.length).not.toBeGreaterThan(0);
        }
    ));
  }));

  it('should only have pending documents', inject([DocumentsService, HttpClient], (service: DocumentsService) => {
    service.getDocumentsbyStatus('Pending').subscribe(d => {
      d.forEach(element => {
        expect(element.Status).toEqual('Approve');
      });
    });
  }));

  it('should only have Approved documents', inject([DocumentsService, HttpClient], (service: DocumentsService) => {
    service.getDocumentsbyStatus('Approve').subscribe(d => {
      d.forEach(element => {
        console.log(element);
        expect(element.Status).toEqual('Approve');
      });
    });
  }));
});
