import { Component, OnInit, Input, Injector, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ModalNotification } from './../../core/models/modal-notification/modal-notification';
import { EventsForms } from './../../core/models/events-forms/events-forms';
import { ModalService } from './../../core/services/modal.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-notification',
  templateUrl: './modal-notification.component.html',
  styleUrls: ['./modal-notification.component.scss']
})
export class ModalNotificationComponent extends EventsForms implements OnInit, AfterViewInit {
  @Input() modalNotification: ModalNotification;
  @ViewChild('footerForm', { static: true }) footerForm: ElementRef;
  private faces = [
    { icon: 'success', url: `face_action_performed.svg` },
    { icon: 'error', url: `face_action_rejected.svg` },
    { icon: 'warning', url: `face_are_you_sure.svg` },
    { icon: 'face-404', url: `face-404.svg` },
  ];
  constructor(injector: Injector, private _MODAL: ModalService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.modalNotification && this.modalNotification.buttonsFooter) {
      this.events(this.modalNotification.buttonsFooter, this.footerForm);
    }
  }

  public urlIcon(): string {
    let url = '';
    this.faces.forEach(face => {
      if (face.icon === this.modalNotification.actionModal) {
        const file = window.innerWidth < 577 ? 'mobile' : 'desktop';
        const dom = this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/images/${file}/${face.url}`);
        this.matIconRegistry.addSvgIcon(face.icon + file, dom);
        url = face.icon + file;
      }
    });
    return url;
  }
  ngAfterViewInit(): void {
    this._MODAL.openModal(this.modalNotification.idModal);
  }
}
