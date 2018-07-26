import {Component, Input} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { IDocument } from '../documents/document';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-modal-basic',
  templateUrl: './common-modal.component.html'
})

export class CommonModalComponent {
  @Input() document: IDocument;
  closeResult: string;
  faFilePdf = faFilePdf;
  constructor(private modalService: NgbModal) { }

  open(content, event) {
    event.preventDefault();
    this.modalService
      .open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'})
      .result.then((result) => {
        console.log(`${this.document.Id} will be: ${result}`);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
