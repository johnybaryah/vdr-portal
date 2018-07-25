import { Component, OnInit } from '@angular/core';
import { DocumentsService } from './documents.service';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs/Observable';
import { State } from '../../../node_modules/@progress/kendo-data-query';
import { statuses } from './documentStatus';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { IDocument } from './document';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentsService]
})
export class DocumentsComponent implements OnInit {
  public view: Observable<GridDataResult>;
  public documents: IDocument[];
  public currentStatus: string;
  public state: State;

  // public dataStateChange(state: DataStateChangeEvent): void {
  //     this.state = state;
  //     this._documentService.query(state);
  // }

  // this automatically injects DocumentsService instance! #NEAT
  constructor(private _route: ActivatedRoute, private _documentService: DocumentsService) {
    // this.view = _documentService;
    const status = this._route.snapshot.paramMap.get('status');
    // this.state = {
    //   skip: 0,
    //   take: 10,
    //   filter: {
    //     logic: 'and',
    //     filters: [
    //       { field: 'Status', operator: 'contains', value: status},
    //     ]
    //   }
    // };
    this._documentService.getAllDocuments().subscribe(d => this.documents = d);
  }

  ngOnInit(): void {
    const status = this._route.snapshot.paramMap.get('status');
    this.currentStatus = status;
    console.log(this.currentStatus);
  }
}
