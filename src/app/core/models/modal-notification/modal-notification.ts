import { IModalBasic } from '../modal-basic/modal-basic';
import { TableItem } from '../table-item/table-item';
export interface IModalNotification extends IModalBasic {
    message?: string;
    actionModal?: 'success' | 'error' | 'warning' | 'face-404';
    buttonsFooter?: TableItem[];
}

export class ModalNotification implements IModalNotification {

    idModal: string;
    header: string;
    showFooter: boolean;
    message?: string;
    actionModal?: 'success' | 'error' | 'warning' | 'face-404';
    buttonsFooter?: TableItem[];
    btnClose?: TableItem;
    footer?: string;

    constructor(modal: IModalNotification) {
        this.message = modal.message;
        this.actionModal = modal.actionModal;
        this.buttonsFooter = modal.buttonsFooter;
        this.idModal = modal.idModal;
        this.header = modal.header;
        this.showFooter = modal.showFooter;
        this.footer = modal.footer;
        this.btnClose = modal.btnClose;
    }
}

