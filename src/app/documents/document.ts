import { IDocumentStatus } from './documentStatus';

export interface IDocument {
  Id: number;
  Name: string;
  Type: string;
  vdrRequestDate: Date;
  Status: IDocumentStatus;
}
