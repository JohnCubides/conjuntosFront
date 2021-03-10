import { ApiService } from 'src/app/core/https/http.service';
import { Injector } from '@angular/core';
import { TableItem } from '../../table-item/table-item';
import { ModalNotification } from '../../modal-notification/modal-notification';
import { ModalService } from 'src/app/core/services/modal.service';
import { Router } from '@angular/router';
import { AbstractBasic } from '../abstract-basic/abstract-basic';

export abstract class AbstractModal extends AbstractBasic {
    public _MODAL: ModalService;
    public modal: ModalNotification = {
        idModal: 'idModal',
        showFooter: false,
        header: '',
    };
    constructor(injector: Injector) {
        super(injector);
        this._MODAL = injector.get(ModalService);
    }

    public settingModal(message: string, actionModal: 'success' | 'error' | 'warning' | 'face-404', buttons?: TableItem[]) {
        this.modal.message = message;
        this.modal.actionModal = actionModal;
        if (buttons) {
            this.modal.buttonsFooter = buttons;
            this.modal.showFooter = true;
            this.modal.btnClose = undefined;
        } else {
            this.modal.buttonsFooter = undefined;
            this.modal.showFooter = false;
            this.modal.btnClose = {
                id: 'btnCloseModal',
                svgIconUrl: 'assets/icons/close.svg',
                events: []
            };
        }
    }
    public closeModal() {
        this._MODAL.closeModal(this.modal.idModal);
        this.modal.actionModal = undefined;
    }
}
