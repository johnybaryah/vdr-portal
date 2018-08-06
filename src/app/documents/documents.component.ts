import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentsService } from '../_services/documents.service';
import { GridDataResult, DataStateChangeEvent, GridComponent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { ActivatedRoute } from '@angular/router';
import { IDocument } from '../_models/document';
import { process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentsService]
})

export class DocumentsComponent implements OnInit, OnDestroy {
  public documents: IDocument[];
  public loading: boolean;
  public currentStatus: string;
  public requestedStatus: string;
  public activeTab: string;

  public state: State = this.createDefaultState(this.requestedStatus);

  public gridData: GridDataResult;

  // this automatically injects DocumentsService instance! #NEAT
  constructor(
    private _route: ActivatedRoute,
    private _documentService: DocumentsService
  ) { }

  createDefaultState(status: string): State {
    if (typeof(status) === 'undefined') {
      status = 'Pending';
    }

    return { skip: 0, take: 15,
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

  public reloadGrid(status: string): void {
    this.dataStateChange(this.createDefaultState(status));
  }

  public dataStateChange(state: any): void {
      this.state = state;
      this.gridData = process(this.documents, this.state);
  }

  ngOnInit(): void {
    this.loading = true;
    this.requestedStatus = this._route.snapshot.paramMap.get('status');
    this.activeTab = this.requestedStatus;
    this.state = this.createDefaultState(this.requestedStatus);

    this._documentService.getAllDocuments().subscribe(d => {
      this.documents = d;
      this.gridData = process(d, this.state);
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    console.log('destroyed');
  }
}
