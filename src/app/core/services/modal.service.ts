import { Injectable } from '@angular/core';
import MicroModal from 'micromodal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  openModal(idModal: string) {
    MicroModal.init({
      disableScroll: true,
    });
    MicroModal.show(idModal);

    document.getElementById('header').style.zIndex = '0';
    document.getElementById('footer').style.zIndex = '0';
    document.body.style.overflow = 'hidden';
  }

  closeModal(idModal: string) {
    MicroModal.init({
      awaitCloseAnimation: true,
    });
    MicroModal.close(idModal);

    document.getElementById('header').style.zIndex = '100';
    document.getElementById('footer').style.zIndex = '100';
    document.body.style.overflow = 'auto';
  }
}
