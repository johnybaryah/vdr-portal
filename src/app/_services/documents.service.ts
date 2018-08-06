import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IDocument } from '../_models/document';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private _documentUrl = 'api/documents/documents.json';
  public status: string;

  constructor(private _http: HttpClient) { }

  getAllDocuments(): Observable<IDocument[]> {
    return this._http
      .get<IDocument[]>(this._documentUrl)
      .catch(this.handleError);
  }

  getDocumentById(id: number): Observable<IDocument> {
    return this.getAllDocuments().pipe(
        map((products: IDocument[]) => products.find(p => p.Id === id)));
  }

  getDocumentsbyStatus(status: string): Observable<IDocument[]> {
    if (status === '') {
      throw new Error(('status is null'));
    }
    return this.getAllDocuments()
               .map(docs => docs.filter(e => e.Status === status));
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}

// export abstract class BaseService extends BehaviorSubject<GridDataResult> {
//   public loading: boolean;

//   private BASE_URL = 'api/documents/documents.json';

//   constructor(
//       private http: HttpClient
//   ) {
//       super(null);
//   }

//   public query(state: any): void {
//       this.fetch(state)
//           .subscribe(x => super.next(x));
//   }

//   protected fetch(state: any): Observable<GridDataResult> {
//       const queryStr = `${toODataString(state)}&$count=true`;
//       this.loading = true;

//       this.http.get(`${this.BASE_URL}?${queryStr}`).subscribe(d => {
//         console.log(d);
//       });

//       return this.http
//           .get(`${this.BASE_URL}?${queryStr}`)
//           .pipe(
//               map(response => (<GridDataResult>{
//                   data: response,
//                   total: Object.keys(response).length
//               })),
//               tap(() => this.loading = false)
//           );
//   }
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class DocumentsService extends BaseService {
//   constructor(http: HttpClient) { super(http); }

//   public queryForCategory({ Type }: { Type: string }, state?: any): void {
//       this.query(Object.assign({}, state, {
//           filter: {
//               filters: [{
//                   field: 'Type', operator: 'eq', value: Type
//               }],
//               logic: 'and'
//           }
//       }));
//   }

//   public queryForProductName(DocumentName: string, state?: any): void {
//       this.query(Object.assign({}, state, {
//           filter: {
//               filters: [{
//                   field: 'Name', operator: 'contains', value: DocumentName
//               }],
//               logic: 'and'
//           }
//       }));
//   }

// }
