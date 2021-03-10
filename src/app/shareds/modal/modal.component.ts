import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Injector,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { TableItem } from 'src/app/core/models/table-item/table-item';
import { ModalBasic } from 'src/app/core/models/modal-basic/modal-basic';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { EventsForms } from 'src/app/core/models/events-forms/events-forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent extends EventsForms implements OnInit, AfterViewInit {

  @Input() modalBasic: ModalBasic;
  @Input() idModal: string;
  @Input() header: string;
  @Input() showFooter: boolean;
  @Input() showClose: boolean;
  @Input() footer: string;
  @Output() actions = new EventEmitter<any>();
  @ViewChild('btnClose', { static: true }) btnCloseForm: ElementRef;
  public cloneClose: TableItem;

  constructor(injector: Injector,
              private _MODAL: ModalService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    super(injector);
  }
  ngOnInit(): void {
    const btnClose = this.modalBasic.btnClose;
    if (btnClose) {
      btnClose.svgIcon = btnClose.svgIconUrl ? this.svgIcon(btnClose.svgIconUrl) : btnClose.svgIconUrl;
      if (!btnClose.positionIcon) {
        btnClose.positionIcon = 'left';
      }
      this.cloneClose = Object.assign({}, btnClose);
      this.cloneClose.id += 'Mobile';
    }
  }
  ngAfterViewInit(): void {
    this.eventClose();
  }

  private eventClose() {
    const btnClose = this.modalBasic.btnClose;
    if (btnClose && btnClose.events) {
      this.events([], this.btnCloseForm, btnClose);
      this.events([], this.btnCloseForm, this.cloneClose);
    }
  }

  private svgIcon(svgIconUrl: string): string {
    const icon = svgIconUrl.split('/')[svgIconUrl.split('/').length - 1].split('.svg')[0];
    this.matIconRegistry.addSvgIcon(icon, this.domSanitizer.bypassSecurityTrustResourceUrl(svgIconUrl));
    return icon;
  }
  public viewClose(): boolean {
    return window.innerWidth < 577;
  }

}
