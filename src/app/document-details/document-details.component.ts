import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentsService } from '../documents/documents.service';
import { IDocument } from '../documents/document';

@Component({
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {
  pageTitle: string;
  private document: IDocument;
  private errorMessage: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _documentService: DocumentsService) { }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    this._documentService.getProductById(id).subscribe(
      doc => {
        this.document = doc;
        this.pageTitle = doc.ApplicantInfo.Name;
      },
      error => this.errorMessage = <any>error
    );
  }

  onBack(): void {
    this._router.navigate(['/documents/Pending']);
  }

}
