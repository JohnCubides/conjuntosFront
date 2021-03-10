import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { TreePermissions } from 'src/app/core/models/tree-permissions/tree-permissions';
import { RolAndPermissions } from 'src/app/core/models/rol-and-permissions/rol-and-permissions';
import { FormCanDeactivate } from 'src/app/shareds/form-validate/form-can-deactivate';


@Component({
  selector: 'app-form-rol',
  templateUrl: './form-rol.component.html',
  styleUrls: ['./form-rol.component.scss']
})


export class FormRolComponent extends FormCanDeactivate implements OnInit {

  @Input() public seeView: 'create' | 'modify' | 'consult' = 'create';
  @Input() public rolPermissions: RolAndPermissions;
  @Input() public errorMensagge: string;
  @Input() public tittle: string;
  @Output() public resultPermits = new EventEmitter<{ name: string, permits: number[] }>();
  @Output() public resultError = new EventEmitter<any>();
  @Output() formEmit = new EventEmitter<any>();
  public disabledConsult = false;
  public formRol: FormGroup;

  @ViewChild('form')
  form: NgForm;


  constructor(private fb: FormBuilder) {super() }

  ngOnInit() {
    this.disabledConsult = this.seeView === 'consult';
    this.formRol = this.fb.group({
      rol: new FormControl({ value: (this.rolPermissions.name ? this.rolPermissions.name : ''), disabled: this.disabledConsult }, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
        Validators.pattern('[A-Za-z0-9. -]{1,30}')
      ])
    });

    this.formRol.statusChanges.subscribe(()=>{
      this.formEmit.emit(this.form);
    })

  }

  public validateInput() {
    this.resultError.emit('error');
    let value = '';
    const input = this.formRol.get('rol').value.toString();
    const pattern = new RegExp('(^[A-Za-z0-9. -]{1,30}$)');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < input.length; i++) {
      if (input[i].search(pattern) !== -1) {
        value += input[i];
      }
    }
    value = (value.length > 30) ? value.substring(0, 30) : value;
    this.formRol.patchValue({
      rol: value
    });
  }

  public sendPermissionsAndRol() {
    const sendIds = {
      name: this.formRol.get('rol').value.trim(),
      permits: this.selectsIdsPermits(this.rolPermissions.permits)
    };
    this.resultPermits.emit(sendIds);
  }

  private selectsIdsPermits(permits: TreePermissions[]): number[] {
    const ids = [];
    permits.forEach(p => {
      if (p.state) {
        ids.push(p.id);
      }
      if (p.sonsPermits) {
        this.selectsIdsPermits(p.sonsPermits).forEach(sp => {
          ids.push(sp);
        });
      }
    });
    return ids;
  }
  public desktopLine(): boolean {
    return window.innerWidth > 600;
  }
}
