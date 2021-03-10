import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user/user';
import { ModalNotification } from 'src/app/core/models/modal-notification/modal-notification';
import { ApiService } from 'src/app/core/https/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-consult-user',
  templateUrl: './consult-user.component.html',
  styleUrls: ['./consult-user.component.scss']
})
export class ConsultUserComponent implements OnInit {
  public header = 'Consultar usuario';
  public user: User;
  public successful = false;
  public modal: ModalNotification = {
    idModal: 'modalUpdateUser',
    header: '',
    showFooter: false
  };

  constructor(private api: ApiService, private _MODAL: ModalService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.api.get(`/Users/${this.route.snapshot.paramMap.get('id')}`).then((result: User) => {
      this.user = result;
    }).catch(() => {
      // this.imageDefault = 'assets/images/avatar.png';
    });
  }
  showModal(header: string, message: string, actionModal: any) {
    this.modal.btnClose = undefined;
    this.modal.header = header;
    this.modal.message = message;
    this.modal.showFooter = true;
    this.modal.buttonsFooter = [
      {
        id: 'btnErrorClose',
        text: 'Cerrar',
        class: 'btnCloseError',
        events: [
          {
            name: 'click',
            event: () => {
              this.modal.actionModal = undefined;
              this._MODAL.closeModal('modalUpdateUser');
              if (actionModal === 'success') {
                this.router.navigate([`/user/administrator`]);
              }
            }
          }
        ]
      }
    ];
    this.modal.actionModal = actionModal;

    this.successful = actionModal === 'success';
  }
}
