import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleSwichComponent } from './toggle-swich.component';
import { BeforeAll } from 'cucumber';

describe('ToggleSwichComponent', () => {
  let component: ToggleSwichComponent;
  let fixture: ComponentFixture<ToggleSwichComponent>;
  let checkbox: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleSwichComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleSwichComponent);
    component = fixture.componentInstance;
    component.stateNode = false;
    component.idNodeFather = '011';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('validate variables initial', () => {

    it('stateNode false', () => {
      expect(component.stateNode).toBeFalse();
    });

    it('stateNode true', () => {
      fixture = TestBed.createComponent(ToggleSwichComponent);
      component = fixture.componentInstance;
      component.stateNode = true;
      component.idNodeFather = '011';
      fixture.detectChanges();
      expect(component.stateNode).toBeTrue();
    });

    it('idNodeFather', () => {
      expect(component.idNodeFather).toEqual('011');
    });
  });
  describe('Validate changes', () => {
    beforeEach(() => {
      checkbox = document.getElementById(`chk--switch-${component.idNodeFather}`) as HTMLElement;
      checkbox.click();
      component.changeStateCheckbox();
      fixture.detectChanges();
    });

    it('Toggle Swich in ON', () => {
      expect(component.stateNode).toBeTrue();
    });
    it('Toggle Swich in OFF', async () => {
      const element = document.getElementById(`chk--switch-${component.idNodeFather}`) as HTMLElement;
      element.click();
      component.changeStateCheckbox();
      expect(component.stateNode).toBeFalse();
    });
  });
});
