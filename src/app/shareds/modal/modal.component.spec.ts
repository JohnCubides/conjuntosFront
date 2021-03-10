import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { SharedsModule } from '../shareds.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalService } from 'src/app/core/services/modal.service';

describe('Test for ModalComponent', () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalComponent],
            imports: [
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
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        component.modalBasic = {
            idModal: 'testComponent',
            header: 'Test for Component',
            showFooter: false,
            btnClose: {
                id: 'btnCloseModal',
                svgIconUrl: 'assets/icons/close.svg',
                events: [
                    {
                        name: 'click',
                        event: () => {
                            this._MODAL.closeModal('CreateRol');
                            this.router.navigate([`/dashboard/administrator-rol`]);
                        }
                    }
                ]
            }
        };
        fixture.detectChanges();
    });

    it('should create component for modal', () => {
        expect(component).toBeTruthy();
    });

    it('should create component for modal without image', () => {
        component.modalBasic.btnClose.svgIconUrl = undefined;
        component.ngOnInit();
        // fixture.detectChanges();
        expect(component.cloneClose.svgIconUrl).toBeUndefined();
    });

    it('should validate window size is greater than 576', () => {
        expect(component.viewClose()).toBeFalse();
    });

    it('should validate window size is less than 577', () => {
        spyOnProperty(window, 'innerWidth').and.returnValue(570);
        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();
        expect(component.viewClose()).toBeTrue();
    });
});
