export enum statuses {
  Approve = 'Approve',
  Reject = 'Reject',
  Pending = 'Pending'
}
export interface IDocumentStatus {
  status: statuses;
}
