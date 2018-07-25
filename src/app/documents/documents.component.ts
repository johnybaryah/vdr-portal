import { Component, OnInit, OnDestroy } from '@angular/core';
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

export class DocumentsComponent implements OnInit, OnDestroy {
  // public view: Observable<GridDataResult>;
  public documents: IDocument[];
  public currentStatus: string;
  public state: State;

  // public dataStateChange(state: DataStateChangeEvent): void {
  //     this.state = state;
  //     this._documentService.query(state);
  // }

  // this automatically injects DocumentsService instance! #NEAT
  constructor(private _route: ActivatedRoute, private _documentService: DocumentsService) { }

  ngOnInit(): void {
    const status = this._route.snapshot.paramMap.get('status');
    this._documentService.getAllDocuments()
        .subscribe(
          d => {
            this.documents = d.filter(x => x.Status === status);
            console.log(this.documents);
          }
        );
  }

  ngOnDestroy(): void {
    console.log('destroyed');
  }
}
