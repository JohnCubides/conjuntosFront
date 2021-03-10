import { TableItem } from '../table-item/table-item';

export interface IModalBasic {
    idModal: string;
    header: string;
    showFooter: boolean;
    footer?: string;
    btnClose?: TableItem;
  }
export class ModalBasic implements IModalBasic {
    idModal: string;
    header: string;
    showFooter: boolean;
    btnClose?: TableItem;
    footer?: string;

    constructor(modal: IModalBasic) {
        this.idModal = modal.idModal;
        this.header = modal.header;
        this.showFooter = modal.showFooter;
        this.btnClose = modal.btnClose;
        this.footer = modal.footer;
    }
}
