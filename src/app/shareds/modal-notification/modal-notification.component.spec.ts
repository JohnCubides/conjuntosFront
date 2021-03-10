import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNotificationComponent } from './modal-notification.component';
import { ModalNotification } from 'src/app/core/models/modal-notification/modal-notification';
import { ModalService } from 'src/app/core/services/modal.service';
import { MatIconModule } from '@angular/material/icon';
import { SharedsModule } from '../shareds.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalComponent } from '../modal/modal.component';

describe('Test for ModalNotificationComponent', () => {
  let component: ModalNotificationComponent;
  let fixture: ComponentFixture<ModalNotificationComponent>;
  let modalService: ModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalNotificationComponent
      ],
      imports: [
        MatIconModule,
        HttpClientTestingModule,
        SharedsModule
      ],
      providers: [
        ModalService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNotificationComponent);
    modalService = TestBed.inject(ModalService);
    component = fixture.componentInstance;
    component.modalNotification = {
      idModal: 'testComponent',
      header: 'Test for Component',
      showFooter: false,
      message: 'test for component sucessfull',
      actionModal: 'success',
      buttonsFooter: [
        {
          id: 'testYes',
          text: 'Sí',
          class: 'prueba',
          events: [
            {
              name: 'click',
              event: () => {
                // console.log('prueba Sí');
              }
            }
          ]
        }
      ]
    };
    spyOn(modalService, 'openModal').and.returnValue();
    fixture.detectChanges();
  });

  it('should create component characteristics', () => {
    expect(component).toBeTruthy();
  });
  it('should behave...', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(570);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
