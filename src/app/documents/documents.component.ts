import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentsService } from './documents.service';
import { GridDataResult, DataStateChangeEvent, GridComponent } from '@progress/kendo-angular-grid';
import { State } from '../../../node_modules/@progress/kendo-data-query';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { IDocument } from './document';
import { process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentsService]
})

export class DocumentsComponent implements OnInit, OnDestroy {
  public documents: IDocument[];
  public currentStatus: string;
  public requestedStatus: string;

  public state: State = this.createDefaultState(this.requestedStatus);

  public gridData: GridDataResult;

  createDefaultState(status: string): State {
    if (typeof(status) === 'undefined') {
      status = 'Pending';
    }

    return {
      skip: 0,
      take: 15,
      filter: {
        logic: 'and',
        filters: [
          {
            field: 'Status',
            operator: 'eq',
            value: status
          }
        ]
      }
    };
  }

  public dataStateChange(state: DataStateChangeEvent): void {
      this.state = state;
      this.gridData = process(this.documents, this.state);
  }

  // this automatically injects DocumentsService instance! #NEAT
  constructor(private _route: ActivatedRoute, private _documentService: DocumentsService) { }

  ngOnInit(): void {
    this.requestedStatus = this._route.snapshot.paramMap.get('status');
    this.state = this.createDefaultState(this.requestedStatus);

    this._documentService.getAllDocuments().subscribe(d => {
      this.documents = d;
      this.gridData = process(d, this.state);
    });
  }

  ngOnDestroy(): void {
    console.log('destroyed');
  }
}
