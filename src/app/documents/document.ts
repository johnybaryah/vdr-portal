import { IDocumentStatus } from './documentStatus';

interface IApplicantInfo {
  Name: string;
}
export interface IDocument {
  Id: number;
  Name: string;
  Type: string;
  vdrRequestDate: Date;
  Status: string;
  ApplicantInfo: IApplicantInfo;
}
