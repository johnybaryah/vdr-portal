import { Component, OnInit, Input } from '@angular/core';
import { IDocument } from '../_models/document';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {
  @Input() document: IDocument;
  pageTitle: string;
  private errorMessage: any;

  ngOnInit() {
    console.log(this.document);
    this.pageTitle = this.document.ApplicantInfo.Name;
  }
}
